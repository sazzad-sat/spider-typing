'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { todayPerformances } from './store'
import { useSignals } from '@preact/signals-react/runtime'
import PerformanceOptions from './PerformanceOptions'

export function TodayPerformanceTable() {
  useSignals()

  return (
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
        {todayPerformances.value.map((perf) => (
          <TableRow key={perf.id}>
            <TableCell>Today</TableCell>
            <TableCell>{perf.startTime}</TableCell>
            <TableCell>{perf.endTime}</TableCell>
            <TableCell className="whitespace-nowrap">{perf.duration}</TableCell>
            <TableCell>{perf.problemKeys?.length}</TableCell>
            <TableCell className="min-w-40">
              {perf.problemKeys?.length
                ? perf.problemKeys?.join(' | ').toUpperCase()
                : 'No Problems'}
            </TableCell>

            <TableCell>
              <PerformanceOptions id={perf.id!} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
