'use client'

import { useFormState } from 'react-dom'
import { deleteTypingPerformance } from './actions'
import { Button } from '../ui/button'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { todayPerformances } from './store'
import { useSignals } from '@preact/signals-react/runtime'

export default function DeletePerformance({
  id,
  onSuccess,
}: {
  id: number
  onSuccess?: () => void
}) {
  const [state, formAction] = useFormState(deleteTypingPerformance, { data: undefined, error: '' })

  useEffect(() => {
    if (state.error) {
      toast.error(state.error)
    } else if (state.data) {
      todayPerformances.value = todayPerformances.value.filter((p) => p.id !== id)
      onSuccess?.()
    }
  }, [state])

  useSignals()

  return (
    <form action={formAction} className="inline-block">
      <input type="hidden" name="id" value={id} />

      <Button type="submit" variant={'destructive'}>
        Delete
      </Button>
    </form>
  )
}
