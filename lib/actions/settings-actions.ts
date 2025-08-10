// lib/actions/settings-actions.ts
'use server'

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const EmailSchema = z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein.');

// Wir definieren einen klaren State-Typ, der 'null' für den Anfangszustand erlaubt
type State = {
  message: string | null;
};

// Wir verwenden diesen State-Typ in der Funktionssignatur
export async function updateApplicationEmail(prevState: State, formData: FormData): Promise<State> {
  const email = formData.get('email') as string;

  const validatedEmail = EmailSchema.safeParse(email);
  if (!validatedEmail.success) {
    return { message: validatedEmail.error.errors[0].message };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from('settings')
    .update({ value: validatedEmail.data })
    .eq('key', 'application_email');

  if (error) {
    return { message: 'Fehler beim Speichern der E-Mail-Adresse.' };
  }

  revalidatePath('/ahv/rooms/manage');
  return { message: 'E-Mail-Adresse erfolgreich aktualisiert!' };
}