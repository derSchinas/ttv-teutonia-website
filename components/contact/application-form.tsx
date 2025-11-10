// components/contact/application-form.tsx
'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { submitApplication } from '@/lib/actions/application-actions'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Wird gesendet...' : 'Bewerbung absenden'}
    </Button>
  )
}

export function ApplicationForm() {
  const initialState = { message: null, errors: {}, success: false }
  const [state, dispatch] = useActionState(submitApplication, initialState)
  const formRef = useRef<HTMLFormElement>(null)
  const [date, setDate] = useState<Date>()

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message)
        formRef.current?.reset()
        setDate(undefined)
      } else {
        toast.error(state.message)
      }
    }
  }, [state])

  return (
    <form ref={formRef} action={dispatch} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">Vorname</Label>
          <Input id="firstName" name="firstName" required />
          {state.errors?.firstName && <p className="text-sm text-red-500 mt-1">{state.errors.firstName[0]}</p>}
        </div>
        <div>
          <Label htmlFor="lastName">Nachname</Label>
          <Input id="lastName" name="lastName" required />
          {state.errors?.lastName && <p className="text-sm text-red-500 mt-1">{state.errors.lastName[0]}</p>}
        </div>
      </div>
      <div>
        <Label htmlFor="email">E-Mail</Label>
        <Input id="email" name="email" type="email" required />
        {state.errors?.email && <p className="text-sm text-red-500 mt-1">{state.errors.email[0]}</p>}
      </div>
      <div>
        <Label htmlFor="phone">Telefonnummer (Optional)</Label>
        <Input id="phone" name="phone" type="tel" />
      </div>
      <div>
        <Label htmlFor="moveInDate">Bevorzugtes Einzugsdatum (Optional)</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : <span>Datum auswählen</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
        <input type="hidden" name="moveInDate" value={date ? format(date, 'yyyy-MM-dd') : ''} />
      </div>
      <div>
        <Label htmlFor="introduction">Stelle dich kurz vor</Label>
        <Textarea id="introduction" name="introduction" rows={5} required />
        {state.errors?.introduction && <p className="text-sm text-red-500 mt-1">{state.errors.introduction[0]}</p>}
      </div>
      <SubmitButton />
    </form>
  )
}