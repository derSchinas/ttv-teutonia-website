// components/ahv/settings-form.tsx
'use client'

import { useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { updateApplicationEmail } from '@/lib/actions/settings-actions'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" disabled={pending}>{pending ? 'Speichern...' : 'Speichern'}</Button>;
}

export function SettingsForm({ currentEmail }: { currentEmail: string }) {
  const initialState = { message: null };
  const [state, dispatch] = useActionState(updateApplicationEmail, initialState);

  useEffect(() => {
    if (state?.message) {
      if (state.message.includes('erfolgreich')) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bewerbungs-Einstellungen</CardTitle>
        <CardDescription>
          Legen Sie hier die E-Mail-Adresse fest, an die neue Zimmerbewerbungen gesendet werden.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={dispatch} className="flex items-end gap-4">
          <div className="flex-grow">
            <Label htmlFor="email">Empfänger-E-Mail</Label>
            <Input id="email" name="email" type="email" defaultValue={currentEmail} required />
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}