// lib/actions/application-actions.ts
'use server'

import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { ApplicationEmail } from '@/components/emails/application-email'
import React from 'react'

const ApplicationSchema = z.object({
  firstName: z.string().min(2, 'Vorname ist erforderlich.'),
  lastName: z.string().min(2, 'Nachname ist erforderlich.'),
  email: z.string().email('Ungültige E-Mail-Adresse.'),
  phone: z.string().optional(),
  moveInDate: z.string().optional(),
  introduction: z.string().min(10, 'Bitte erzähle uns etwas mehr über dich.'),
});
type State = {
  errors?: { [key: string]: string[] | undefined };
  message?: string | null;
  success?: boolean;
};

export async function submitApplication(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = ApplicationSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    moveInDate: formData.get('moveInDate'),
    introduction: formData.get('introduction'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Bitte fülle alle erforderlichen Felder korrekt aus.',
      success: false,
    };
  }

  const { firstName, lastName, email, phone, moveInDate, introduction } = validatedFields.data;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { error: dbError } = await supabase.from('applications').insert({
    first_name: firstName,
    last_name: lastName,
    email: email,
    phone: phone,
    move_in_date: moveInDate || null,
    introduction: introduction,
  });

  if (dbError) {
    console.error('Application submission error:', dbError);
    return { message: 'Fehler beim Speichern der Bewerbung. Bitte versuche es später erneut.', success: false };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data: settings, error: settingsError } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'application_email')
      .single();

    if (settingsError || !settings || !settings.value) {
      throw new Error('Empfänger-E-Mail nicht konfiguriert.');
    }
    const targetEmail = settings.value;

    await resend.emails.send({
      from: 'bewerbung@ttv-teutonia.de', // WICHTIG: Ersetzen!
      to: targetEmail,
      // === HIER IST DIE KORREKTUR ===
      replyTo: email, // Geändert von reply_to zu replyTo
      subject: `Neue Zimmerbewerbung: ${firstName} ${lastName}`,
      react: ApplicationEmail({ firstName, lastName, email, phone, moveInDate, introduction }) as React.ReactElement,
    });
  } catch (error) {
    console.error('Email sending error:', error);
  }

  return { message: 'Vielen Dank! Deine Bewerbung wurde erfolgreich gesendet.', success: true };
}