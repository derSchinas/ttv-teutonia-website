// lib/actions/profile-actions.ts
'use server'

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const ProfileSchema = z.object({
  firstName: z.string().min(2, 'Vorname ist erforderlich.'),
  lastName: z.string().min(2, 'Nachname ist erforderlich.'),
  alias: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  email_visibility: z.enum(['public', 'ahv', 'admin']),
  phone_visibility: z.enum(['public', 'ahv', 'admin']),
  address_visibility: z.enum(['public', 'ahv', 'admin']),
})

type State = { message?: string | null; success?: boolean };

export async function updateMyProfile(prevState: State, formData: FormData): Promise<State> {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { message: 'Nicht authentifiziert.', success: false }

  const validatedFields = ProfileSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    alias: formData.get('alias'),
    phone: formData.get('phone'),
    address: formData.get('address'),
    email_visibility: formData.get('email_visibility'),
    phone_visibility: formData.get('phone_visibility'),
    address_visibility: formData.get('address_visibility'),
  })

  if (!validatedFields.success) {
    return { message: 'Validierungsfehler.', success: false }
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      first_name: validatedFields.data.firstName,
      last_name: validatedFields.data.lastName,
      alias: validatedFields.data.alias,
      phone: validatedFields.data.phone,
      address: validatedFields.data.address,
      email_visibility: validatedFields.data.email_visibility,
      phone_visibility: validatedFields.data.phone_visibility,
      address_visibility: validatedFields.data.address_visibility,
    })
    .eq('id', user.id) // Wichtig: Nur das eigene Profil aktualisieren!

  if (error) {
    return { message: 'Fehler beim Speichern des Profils.', success: false }
  }

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/profile/edit')
  return { message: 'Profil erfolgreich aktualisiert!', success: true }
}