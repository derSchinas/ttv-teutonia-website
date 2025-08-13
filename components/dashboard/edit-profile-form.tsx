// components/dashboard/edit-profile-form.tsx
'use client'

import { useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { updateMyProfile } from '@/lib/actions/profile-actions'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Annahme: Der 'Profile'-Typ ist in einer globalen Datei oder wird hier definiert
type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  alias: string | null;
  phone: string | null;
  address: string | null;
  email_visibility: 'public' | 'ahv' | 'admin';
  phone_visibility: 'public' | 'ahv' | 'admin';
  address_visibility: 'public' | 'ahv' | 'admin';
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return <Button type="submit" className="w-full" disabled={pending}>{pending ? 'Speichern...' : 'Änderungen speichern'}</Button>
}

export function EditProfileForm({ profile }: { profile: Profile }) {
  const [state, dispatch] = useActionState(updateMyProfile, { message: null, success: false })

  useEffect(() => {
    if (state.message) {
      state.success ? toast.success(state.message) : toast.error(state.message)
    }
  }, [state])

  return (
    <form action={dispatch} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><Label htmlFor="firstName">Vorname</Label><Input id="firstName" name="firstName" defaultValue={profile.first_name || ''} required /></div>
        <div><Label htmlFor="lastName">Nachname</Label><Input id="lastName" name="lastName" defaultValue={profile.last_name || ''} required /></div>
      </div>
      <div>
        <Label htmlFor="alias">Alias / Biername</Label>
        <Input
          id="alias"
          name="alias"
          defaultValue={profile.alias || ""}
          placeholder="z.B. Zipfel"
        />
      </div>
      <div><Label htmlFor="phone">Telefonnummer</Label><Input id="phone" name="phone" type="tel" defaultValue={profile.phone || ''} /></div>
      <div><Label htmlFor="address">Adresse</Label><Input id="address" name="address" defaultValue={profile.address || ''} /></div>
      
      <div className="space-y-4 pt-4 border-t">
        <h3 className="font-semibold">Sichtbarkeits-Einstellungen</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="email_visibility">E-Mail sichtbar für</Label>
            <Select name="email_visibility" defaultValue={profile.email_visibility}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Alle Mitglieder</SelectItem>
                <SelectItem value="ahv">Nur AHV & Admins</SelectItem>
                <SelectItem value="admin">Nur Admins</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="phone_visibility">Telefon sichtbar für</Label>
            <Select name="phone_visibility" defaultValue={profile.phone_visibility}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Alle Mitglieder</SelectItem>
                <SelectItem value="ahv">Nur AHV & Admins</SelectItem>
                <SelectItem value="admin">Nur Admins</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="address_visibility">Adresse sichtbar für</Label>
            <Select name="address_visibility" defaultValue={profile.address_visibility}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Alle Mitglieder</SelectItem>
                <SelectItem value="ahv">Nur AHV & Admins</SelectItem>
                <SelectItem value="admin">Nur Admins</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <SubmitButton />
    </form>
  )
}