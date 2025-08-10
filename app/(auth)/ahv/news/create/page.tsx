// app/(auth)/ahv/news/create/page.tsx
import { CreateNewsForm } from '@/components/ahv/create-news-form'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import Link from 'next/link'

export default function CreateNewsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-4">
        <Link href="/ahv/news" className="text-sm text-blue-600 hover:underline">
          &larr; Zurück zur News-Übersicht
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Neuen News-Artikel erstellen</CardTitle>
          <CardDescription>
            Fülle die Felder aus, um einen neuen Artikel zu veröffentlichen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateNewsForm />
        </CardContent>
      </Card>
    </div>
  )
}