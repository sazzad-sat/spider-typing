import { signal } from '@preact/signals-react'
import { TypingPerformance } from './model'

export const todayPerformances = signal<TypingPerformance[]>([])
