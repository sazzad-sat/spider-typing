'use client'

import { Plus } from 'lucide-react'
import { Button } from '../ui/button'
import AddPerformance from './AddPerformance'
import { useSignal } from '@preact/signals-react'
import { useSignals } from '@preact/signals-react/runtime'

export default function TodaysPerformanceHeader() {
  const isAddFormOpen = useSignal(false)

  useSignals()

  return (
    <>
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Today{"'"}s Performance</h2>

        <Button
          className={'gap-2 transition'}
          variant={isAddFormOpen.value ? 'destructive' : 'default'}
          size={'sm'}
          onClick={() => (isAddFormOpen.value = !isAddFormOpen.value)}
        >
          <Plus size={16} className={isAddFormOpen.value ? 'rotate-45' : ''} />
          {isAddFormOpen.value ? 'Close' : 'Add Record'}
        </Button>
      </header>

      {isAddFormOpen.value && <AddPerformance />}
    </>
  )
}
