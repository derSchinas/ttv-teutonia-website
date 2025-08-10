// app/(auth)/ahv/members/page.tsx

import { MembersList } from '@/components/ahv/members-list'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// DIESE ZEILE IST DER "MASTER-FIX" FÜR CACHING-PROBLEME
export const dynamic = 'force-dynamic'

// Wir definieren den Typ für ein Profil, um ihn wiederzuverwenden
export type Profile = {
  id: string
  first_name: string | null
  last_name: string | null
  email: string | null
  role: 'member' | 'ahv' | 'admin' | null
}

async function getMembers(): Promise<Profile[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('id, first_name, last_name, email, role')
    .order('last_name', { ascending: true })

  if (error) {
    console.error('Error fetching members:', error)
    return []
  }
  return data as Profile[]
}

export default async function MembersPage() {
  const members = await getMembers()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Mitgliederverwaltung</h1>
          <p className="text-gray-600">
            Übersicht aller Mitglieder der TTV Teutonia.
          </p>
        </div>
        <Link href="/ahv/members/create">
          <Button>+ Neues Mitglied anlegen</Button>
        </Link>
      </div>
      
      <MembersList members={members} />
    </div>
  )
}