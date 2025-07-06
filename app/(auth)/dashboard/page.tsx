// app/(auth)/dashboard/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { RecentEvents } from '@/components/dashboard/recent-events'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Willkommen, {profile?.first_name || 'Mitglied'}!
        </h1>
        <p className="text-gray-600 mt-2">
          TTV Teutonia Dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCards />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentEvents />
      </div>
    </div>
  )
}