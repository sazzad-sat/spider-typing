'use client'

import { todayPerformances } from './store'
import { TypingPerformance } from './model'
import { PropsWithChildren } from 'react'
import { useSignals } from '@preact/signals-react/runtime'

export default function TodaysPerformance({
  performances,
  children,
}: PropsWithChildren<{ performances: any[] }>) {
  todayPerformances.value = performances.map((p) => new TypingPerformance(p))

  useSignals()

  return <section className="mb-8">{children}</section>
}
