// app/(auth)/dashboard/profile/edit/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { EditProfileForm } from '@/components/dashboard/edit-profile-form'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import Link from 'next/link'

async function getMyProfile() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) notFound()

  const { data: profile, error } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  if (error) notFound()
  return profile
}

export default async function EditProfilePage() {
  const profile = await getMyProfile()

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-4">
        <Link href="/dashboard" className="text-sm text-blue-600 hover:underline">
          &larr; Zurück zum Verzeichnis
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Eigenes Profil bearbeiten</CardTitle>
          <CardDescription>
            Ändere deine Kontaktdaten und lege fest, wer sie sehen darf.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EditProfileForm profile={profile} />
        </CardContent>
      </Card>
    </div>
  )
}