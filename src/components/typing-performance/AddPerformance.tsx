'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Calendar } from '../ui/calendar'
import TimePicker from '../ui/time-picker'
import { keyboardKeys } from '@/db/schema/enums'
import { addTypingPerformance as createTypingPerformance } from './actions'
import { useFormState } from 'react-dom'
import { useEffect } from 'react'

const formSchema = z.object({
  practiceDate: z.date({
    required_error: 'Date is required',
  }),
  startTime: z.date(),
  endTime: z.date(),
  problemKeys: z.array(z.string()),
})

type FormSchema = z.infer<typeof formSchema>

export default function AddPerformance() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      practiceDate: new Date(),
      startTime: new Date(new Date().setHours(12, 0, 0)),
      endTime: new Date(new Date().setHours(12, 5, 0)),
      problemKeys: [],
    },
  })

  const [state, formAction] = useFormState(createTypingPerformance, { error: '' })

  useEffect(() => {
    if (state?.error) form.setError('root', { message: state?.error })
  })

  const problemKeys = keyboardKeys.enumValues.map((k) => k.toUpperCase())

  return (
    <div className="bg-white p-8 mt-4 shadow rounded-lg">
      <Form {...form}>
        <form action={formAction} className="flex flex-col gap-8">
          <FormField
            control={form.control}
            name="practiceDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Practice Date</FormLabel>

                <input type="hidden" name="practiceDate" value={field.value.toString()} />

                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'max-w-[15rem] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? format(field.value, 'PP') : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <div className="flex flex-wrap gap-8">
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem className="flex flex-col grow">
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <TimePicker name="startTime" date={field.value} setDate={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem className="flex flex-col grow">
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    <TimePicker name="endTime" date={field.value} setDate={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="problemKeys"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Problem Keys</FormLabel>

                {field.value.map((key) => (
                  <input key={key} name="problemKeys[]" type="hidden" value={key.toLowerCase()} />
                ))}

                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full justify-between text-left font-normal',
                          !field.value.length && 'text-muted-foreground'
                        )}
                      >
                        {field.value.length
                          ? field.value.sort().join(', ')
                          : 'The keys you made a mistake with'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <div className="grid grid-cols-6 gap-2 p-4">
                        {problemKeys.map((key) => (
                          <Button
                            key={key}
                            variant={field.value.includes(key) ? 'default' : 'outline'}
                            className={cn('w-full justify-between text-left font-normal')}
                            onClick={() => {
                              if (field.value.includes(key)) {
                                field.onChange(field.value.filter((k) => k !== key))
                              } else {
                                field.onChange([...field.value, key])
                              }
                            }}
                          >
                            {key}
                          </Button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </FormControl>
              </FormItem>
            )}
          />

          <FormMessage>{form.formState.errors.root?.message}</FormMessage>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}
