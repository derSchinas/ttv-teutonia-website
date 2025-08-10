// lib/actions/member-actions.ts
'use server'

import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const CreateMemberSchema = z.object({
  firstName: z.string().min(2, { message: 'Vorname ist zu kurz' }),
  lastName: z.string().min(2, { message: 'Nachname ist zu kurz' }),
  email: z.string().email({ message: 'Ungültige E-Mail-Adresse' }),
  password: z.string().min(8, { message: 'Passwort muss mindestens 8 Zeichen haben' }),
  role: z.enum(['member', 'ahv', 'admin'], { message: 'Ungültige Rolle' }),
})

// Wir definieren einen Typ für den Rückgabewert der Funktion
type State = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
    role?: string[];
  };
  message?: string | null;
};

export async function createMember(prevState: State, formData: FormData): Promise<State> {
  // Daten aus dem Formular validieren
  const validatedFields = CreateMemberSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Fehler bei der Validierung.',
    }
  }

  const { firstName, lastName, email, password, role } = validatedFields.data

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  try {
    // Benutzer in Supabase Auth erstellen
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true,
      user_metadata: { first_name: firstName, last_name: lastName },
    })

    if (authError) throw new Error(`Fehler beim Erstellen des Benutzers: ${authError.message}`);
    if (!authData.user) throw new Error('Unbekannter Fehler: Benutzer konnte nicht erstellt werden.');

    // Zugehöriges Profil in der 'profiles'-Tabelle erstellen
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: authData.user.id,
        first_name: firstName,
        last_name: lastName,
        email: email,
        role: role,
      })

    if (profileError) throw new Error(`Fehler beim Erstellen des Profils: ${profileError.message}`);

  } catch (error) {
    // Fehler an das Formular zurückgeben
    if (error instanceof Error) {
      return { message: error.message };
    }
    return { message: 'Ein unbekannter Fehler ist aufgetreten.' };
  }

  // Bei Erfolg: Cache neu validieren und DANN weiterleiten
  revalidatePath('/ahv/members', 'page') // ÄNDERUNG: 'page' als zweiten Parameter hinzufügen
  redirect('/ahv/members')
}