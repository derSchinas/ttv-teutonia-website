// app/(auth)/ahv/page.tsx

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default async function AHVPage() {
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

  if (profile?.role !== 'ahv' && profile?.role !== 'admin') {
    redirect('/dashboard')
  }

  const isAdmin = profile?.role === 'admin'

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">AHV-Bereich</h1>
        {isAdmin && (
          <Link 
            href="/admin" 
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Admin-Panel
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <Card>
          <CardHeader>
            <CardTitle>News verwalten</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Erstelle und bearbeite Nachrichten und Ankündigungen.
            </p>
            <Link href="/ahv/news" className="text-blue-600 font-semibold hover:underline">
              Zu den News →
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Mitglieder verwalten</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Verwalte Mitgliederdaten und erstelle neue Mitglieder.
            </p>
            <Link href="/ahv/members" className="text-blue-600 font-semibold hover:underline">
              Zu den Mitgliedern →
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Zimmer verwalten</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Ändere den Zimmerstatus und verwalte die Bildergalerien.
            </p>
            <Link href="/ahv/rooms/manage" className="text-blue-600 font-semibold hover:underline">
              Zimmer verwalten →
            </Link>
          </CardContent>
        </Card>
      </div>

      {isAdmin && (
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h2 className="font-semibold text-yellow-800 mb-2">
            Admin-Hinweis
          </h2>
          <p className="text-yellow-700">
            Als Administrator haben Sie Zugriff auf alle AHV-Funktionen plus zusätzliche 
            Admin-Funktionen wie Rollenverwaltung und System-Einstellungen.
          </p>
        </div>
      )}
    </div>
  )
}