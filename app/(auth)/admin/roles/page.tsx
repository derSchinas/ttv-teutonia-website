// app/(auth)/admin/roles/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { RoleManagement } from '@/components/admin/role-management'
import { redirect } from 'next/navigation'

export default async function RoleManagementPage() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    redirect('/dashboard')
  }

  const { data: members } = await supabase
    .from('profiles')
    .select('id, first_name, last_name, email, role')
    .order('last_name')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Rollenverwaltung</h1>
      <RoleManagement members={members || []} />
    </div>
  )
}