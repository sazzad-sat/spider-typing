import db from '@/db'
import { typingPerformance } from '@/db/schema/typingPerformance'
import { and, eq, ne } from 'drizzle-orm'
import { auth } from '@clerk/nextjs/server'
import { formatDistanceStrict } from 'date-fns'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { timeToDate } from './utils'
import { Button } from '../ui/button'
import { MoreHorizontal } from 'lucide-react'

export default async function PreviousPerformance() {
  const { userId } = auth().protect()

  const perfs = await db
    .select()
    .from(typingPerformance)
    .where(
      and(ne(typingPerformance.practiceDate, new Date()), eq(typingPerformance.userId, userId))
    )

  return (
    <section>
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Previous Performance</h2>
      </header>

      <Table className="mt-6 rounded-lg bg-white">
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead className="whitespace-nowrap">Start Time</TableHead>
            <TableHead className="whitespace-nowrap">End Time</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead className="whitespace-nowrap">Total Problems</TableHead>
            <TableHead>Problem Keys</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {perfs.map((perf) => (
            <TableRow key={perf.id}>
              <TableCell>{perf.practiceDate.toLocaleDateString()}</TableCell>
              <TableCell>{perf.startTime}</TableCell>
              <TableCell>{perf.endTime}</TableCell>
              <TableCell className="whitespace-nowrap">
                {formatDistanceStrict(timeToDate(perf.endTime), timeToDate(perf.startTime), {
                  unit: 'second',
                  locale: { formatDistance: (_, count) => `${count}s` },
                })}
              </TableCell>
              <TableCell>{perf.problemKeys.length}</TableCell>
              <TableCell className="whitespace-break-spaces">
                {perf.problemKeys.length > 0
                  ? perf.problemKeys.join(' | ').toUpperCase()
                  : 'No Problems'}
              </TableCell>

              <TableCell>
                <Button variant={'ghost'} size={'icon'} className="size-8 rounded">
                  <MoreHorizontal size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}
