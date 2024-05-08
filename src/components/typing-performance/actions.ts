'use server'

import db from '@/db'
import { typingPerformance } from '@/db/schema/typingPerformance'
import { auth } from '@clerk/nextjs/server'
import { and, eq } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

const insertSchema = createInsertSchema(typingPerformance, {
  userId: (schema) => schema.userId.optional(),
})
  .refine((data) => data.endTime >= data.startTime, {
    message: 'End time must be greater than start time',
  })
  .refine((data) => data.practiceDate <= new Date(), {
    message: 'Practice date must be less than or equal to today',
  })

export async function addTypingPerformance(prevState: any, formData: FormData) {
  const { userId } = auth().protect()

  const { data, success, error } = insertSchema.safeParse({
    practiceDate: new Date(formData.get('practiceDate') as string),
    startTime: formData.get('startTime'),
    endTime: formData.get('endTime'),
    problemKeys: Array.from(formData.getAll('problemKeys[]')),
  })

  if (!success)
    return {
      error: error.issues[0].message,
    }

  try {
    const perf = await db
      .insert(typingPerformance)
      .values({ ...data, problemKeys: data.problemKeys as any, userId })
      .returning()

    return {
      data: perf[0],
    }
  } catch (e) {
    if (e instanceof Error) {
      return {
        error: e.message,
      }
    }

    return {
      error: 'Something went wrong',
    }
  }
}

const deleteSchema = z.object({ id: z.coerce.number() })

export async function deleteTypingPerformance(prevState: any, formData: FormData) {
  const { userId } = auth().protect()

  const { data, success, error } = deleteSchema.safeParse(Object.fromEntries(formData))

  if (!success)
    return {
      error: error.issues[0].message,
    }

  try {
    const perf = await db
      .delete(typingPerformance)
      .where(and(eq(typingPerformance.userId, userId), eq(typingPerformance.id, data.id)))

    if (!perf.rowCount) throw new Error('Failed to delete record')

    return {
      data: data.id,
    }
  } catch (e) {
    if (e instanceof Error) {
      return {
        error: e.message,
      }
    }

    return {
      error: 'Something went wrong',
    }
  }
}
