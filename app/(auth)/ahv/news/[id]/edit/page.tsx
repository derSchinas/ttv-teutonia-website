// app/(auth)/ahv/news/[id]/edit/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { EditNewsForm } from '@/components/ahv/edit-news-form'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import Link from 'next/link'
import type { NewsArticle } from '@/types/database' // <-- HIER IST DIE KORREKTUR

async function getArticleById(id: string): Promise<NewsArticle> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('news')
    .select('*, author:profiles(first_name, last_name)')
    .eq('id', id)
    .single()
    
  if (error || !data) {
    notFound()
  }
  return data as NewsArticle
}

export default async function EditNewsPage({ params }: { params: { id: string } }) {
  const article = await getArticleById(params.id)

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-4">
        <Link href="/ahv/news" className="text-sm text-blue-600 hover:underline">
          &larr; Zurück zur News-Übersicht
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Artikel bearbeiten</CardTitle>
          <CardDescription>
            Ändern Sie hier den Titel und Inhalt des Artikels. Das Titelbild kann aktuell nicht geändert werden.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EditNewsForm article={article} />
        </CardContent>
      </Card>
    </div>
  )
}