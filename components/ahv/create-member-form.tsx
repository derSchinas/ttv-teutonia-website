// components/ahv/create-member-form.tsx
'use client'

import { useActionState, useEffect } from 'react' // 1. 'useActionState' aus 'react' importieren
import { useFormStatus } from 'react-dom' // 'useFormStatus' bleibt in 'react-dom'
import { createMember } from '@/lib/actions/member-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'react-hot-toast'

// Eine separate Komponente für den Submit-Button, um den Pending-Status zu nutzen
function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Wird erstellt...' : 'Neues Mitglied erstellen'}
    </Button>
  )
}

export function CreateMemberForm() {
  const initialState = { message: null, errors: {} }
  // 2. Den Hook zu 'useActionState' umbenennen
  const [state, dispatch] = useActionState(createMember, initialState)

  useEffect(() => {
    // Zeige eine Fehlermeldung an, wenn die Server Action eine zurückgibt
    if (state.message) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <form action={dispatch} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">Vorname</Label>
          <Input id="firstName" name="firstName" placeholder="Max" required />
          {state.errors?.firstName && <p className="text-sm text-red-500 mt-1">{state.errors.firstName[0]}</p>}
        </div>
        <div>
          <Label htmlFor="lastName">Nachname</Label>
          <Input id="lastName" name="lastName" placeholder="Mustermann" required />
          {state.errors?.lastName && <p className="text-sm text-red-500 mt-1">{state.errors.lastName[0]}</p>}
        </div>
      </div>
      <div>
        <Label htmlFor="email">E-Mail</Label>
        <Input id="email" name="email" type="email" placeholder="max.mustermann@beispiel.de" required />
        {state.errors?.email && <p className="text-sm text-red-500 mt-1">{state.errors.email[0]}</p>}
      </div>
      <div>
        <Label htmlFor="password">Initialpasswort</Label>
        <Input id="password" name="password" type="password" required minLength={8} />
        {state.errors?.password && <p className="text-sm text-red-500 mt-1">{state.errors.password[0]}</p>}
      </div>
      <div>
        <Label htmlFor="role">Rolle</Label>
        <Select name="role" defaultValue="member">
          <SelectTrigger>
            <SelectValue placeholder="Rolle auswählen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="member">Mitglied</SelectItem>
            <SelectItem value="ahv">AHV</SelectItem>
            <SelectItem value="admin">Administrator</SelectItem>
          </SelectContent>
        </Select>
        {state.errors?.role && <p className="text-sm text-red-500 mt-1">{state.errors.role[0]}</p>}
      </div>
      <SubmitButton />
    </form>
  )
}