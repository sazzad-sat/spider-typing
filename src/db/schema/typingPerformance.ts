import { doublePrecision, jsonb, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { type KeyboardKeys } from './enums'

export const typingPerformance = pgTable('typing_performance', {
  id: serial('id').primaryKey(),
  practiceDate: timestamp('practice_date', { mode: 'date' }).notNull(),
  duration: doublePrecision('duration').notNull(),
  problemKeys: jsonb('problem_keys').$type<KeyboardKeys[]>().default([]).notNull(),
  userId: text('user_id').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
})
