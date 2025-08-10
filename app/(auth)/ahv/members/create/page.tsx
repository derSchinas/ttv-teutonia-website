// app/(auth)/ahv/members/create/page.tsx
import { CreateMemberForm } from '@/components/ahv/create-member-form'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import Link from 'next/link'

export default function CreateMemberPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-4">
        <Link href="/ahv/members" className="text-sm text-blue-600 hover:underline">
          &larr; Zurück zur Mitgliederliste
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Neues Mitglied anlegen</CardTitle>
          <CardDescription>
            Erstellen Sie hier ein neues Mitgliedskonto. Der Benutzer wird sofort
            aktiviert und kann sich mit dem festgelegten Passwort anmelden.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateMemberForm />
        </CardContent>
      </Card>
    </div>
  )
}