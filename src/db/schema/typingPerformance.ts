import { time, pgTable, serial, text, timestamp, unique, date } from 'drizzle-orm/pg-core'
import { keyboardKeys } from './enums'
import { sql } from 'drizzle-orm'

export const typingPerformance = pgTable(
  'typing_performance',
  {
    id: serial('id').primaryKey(),
    practiceDate: date('practice_date', { mode: 'date' }).notNull(),
    startTime: time('start_time').notNull(),
    endTime: time('end_time').notNull(),
    problemKeys: keyboardKeys('problem_keys')
      .array()
      .default(sql`'{}'`)
      .notNull(),
    userId: text('user_id').notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => ({
    uniqueRecord: unique().on(t.practiceDate, t.startTime, t.endTime, t.userId),
  })
)
