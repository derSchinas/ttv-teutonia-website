// app/(auth)/admin/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function AdminPage() {
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin-Panel</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>AHV-Funktionen</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Als Admin haben Sie Zugriff auf alle AHV-Funktionen.
            </p>
            <Link href="/ahv" className="text-blue-600 hover:underline">
              Zum AHV-Bereich →
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Rollenverwaltung</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Mitgliederrollen verwalten und Berechtigungen zuweisen.
            </p>
            <Link href="/admin/roles" className="text-blue-600 hover:underline">
              Rollen verwalten →
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System-Einstellungen</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Globale Einstellungen und Konfiguration.
            </p>
            <Link href="/admin/settings" className="text-blue-600 hover:underline">
              Einstellungen →
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Schnellzugriff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link 
                href="/ahv/events/create" 
                className="block text-blue-600 hover:underline"
              >
                Neues Event erstellen
              </Link>
              <Link 
                href="/ahv/news/create" 
                className="block text-blue-600 hover:underline"
              >
                Neue News erstellen
              </Link>
              <Link 
                href="/ahv/members/create" 
                className="block text-blue-600 hover:underline"
              >
                Neues Mitglied anlegen
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Statistiken</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Gesamtmitglieder: <span className="font-medium">45</span>
              </p>
              <p className="text-sm text-gray-600">
                Events diese Woche: <span className="font-medium">3</span>
              </p>
              <p className="text-sm text-gray-600">
                Aktive Buchungen: <span className="font-medium">8</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}