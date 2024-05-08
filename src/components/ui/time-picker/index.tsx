'use client'

import * as React from 'react'
import { Label } from '@/components/ui/label'
import { TimePickerInput } from './input'
import { TimePeriodSelect } from './period-select'
import { Period } from './utils'
import { format } from 'date-fns'

interface TimePickerDemoProps {
  date: Date
  setDate: (date: Date | undefined) => void
  showLabel?: boolean
  name?: string
}

export default function TimePicker({ date, setDate, name, showLabel }: TimePickerDemoProps) {
  const [period, setPeriod] = React.useState<Period>('PM')

  const minuteRef = React.useRef<HTMLInputElement>(null)
  const hourRef = React.useRef<HTMLInputElement>(null)
  const secondRef = React.useRef<HTMLInputElement>(null)
  const periodRef = React.useRef<HTMLButtonElement>(null)

  return (
    <div className="flex items-end gap-2">
      <input name={name} type="hidden" value={format(date, 'H:mm:ss')} />

      <div className="grid gap-1 text-center">
        <TimePickerInput
          picker="12hours"
          period={period}
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
        {showLabel && (
          <Label htmlFor="hours" className="text-xs">
            Hours
          </Label>
        )}
      </div>
      <div className="grid gap-1 text-center">
        <TimePickerInput
          picker="minutes"
          id="minutes12"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => secondRef.current?.focus()}
        />
        {showLabel && (
          <Label htmlFor="minutes" className="text-xs">
            Minutes
          </Label>
        )}
      </div>
      <div className="grid gap-1 text-center">
        <TimePickerInput
          picker="seconds"
          id="seconds12"
          date={date}
          setDate={setDate}
          ref={secondRef}
          onLeftFocus={() => minuteRef.current?.focus()}
          onRightFocus={() => periodRef.current?.focus()}
        />
        {showLabel && (
          <Label htmlFor="seconds" className="text-xs">
            Seconds
          </Label>
        )}
      </div>
      <div className="grid gap-1 text-center">
        <TimePeriodSelect
          period={period}
          setPeriod={setPeriod}
          date={date}
          setDate={setDate}
          ref={periodRef}
          onLeftFocus={() => secondRef.current?.focus()}
        />
        {showLabel && (
          <Label htmlFor="period" className="text-xs">
            Period
          </Label>
        )}
      </div>
    </div>
  )
}
