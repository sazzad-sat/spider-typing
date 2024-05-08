import { createSelectSchema } from 'drizzle-zod'
import { timeToDate } from './utils'
import { typingPerformance } from '@/db/schema/typingPerformance'
import { z } from 'zod'
import { formatDuration, intervalToDuration } from 'date-fns'

const selectFeild = createSelectSchema(typingPerformance, {
  problemKeys: (schema) => schema.problemKeys.array(),
}).partial()

type TypingPerformanceBase = z.infer<typeof selectFeild>

export class TypingPerformance implements TypingPerformanceBase {
  public id
  public practiceDate
  public startTime
  public endTime
  public problemKeys
  public userId
  public createdAt
  public updatedAt

  get duration() {
    if (!this.startTime || !this.endTime) throw new Error('Missing start or end time')
    return formatDuration(
      intervalToDuration({ start: timeToDate(this.startTime), end: timeToDate(this.endTime) }),
      {
        format: ['minutes', 'seconds'],
        locale: {
          formatDistance: (t, count) => (t === 'xSeconds' ? `${count}s` : `${count}m`),
        },
      }
    )
  }

  constructor({
    id,
    practiceDate,
    startTime,
    endTime,
    problemKeys,
    userId,
    createdAt,
    updatedAt,
  }: Partial<TypingPerformanceBase>) {
    this.id = id
    this.practiceDate = practiceDate
    this.startTime = startTime
    this.endTime = endTime
    this.problemKeys = problemKeys
    this.userId = userId
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
