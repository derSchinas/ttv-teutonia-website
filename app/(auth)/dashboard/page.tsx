// app/(auth)/dashboard/page.tsx

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { MemberDirectory } from '@/components/dashboard/member-directory'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export type VisibleProfile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  alias: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
}

async function getDirectoryData(): Promise<VisibleProfile[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase.rpc('get_visible_profiles')

  if (error) {
    console.error('Error fetching visible profiles:', error)
    return []
  }
  return data
}

export default async function DashboardPage() {
  const { data: { user } } = await (await createServerSupabaseClient()).auth.getUser()
  if (!user) redirect('/auth/login')

  const profiles = await getDirectoryData()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Mitgliederverzeichnis</h1>
          <p className="text-gray-600">
            Kontaktdaten aller Mitglieder der TTV Teutonia.
          </p>
        </div>
        <Link href="/dashboard/profile/edit">
          <Button variant="outline">Eigenes Profil bearbeiten</Button>
        </Link>
      </div>
      
      <MemberDirectory profiles={profiles} />
    </div>
  )
}