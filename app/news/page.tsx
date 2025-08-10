// app/news/page.tsx

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import type { NewsArticle } from '@/types/database' // Importieren des zentralen Typs

export const dynamic = 'force-dynamic'

async function getPublishedNews(): Promise<NewsArticle[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('news')
    .select('*, author:profiles(first_name, last_name)') // Autor mitladen
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching published news:', error)
    return []
  }
  return data as NewsArticle[]
}

export default async function NewsPage() {
  const articles = await getPublishedNews()

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Neuigkeiten & Ankündigungen
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Bleiben Sie auf dem Laufenden über das Leben und die Veranstaltungen in unserer Verbindung.
          </p>
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              // === HIER IST DIE ÄNDERUNG ===
              // Die gesamte Karte ist jetzt ein Link zur Detailseite
              <Link key={article.id} href={`/news/${article.id}`} className="flex">
                <Card className="flex flex-col w-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  {article.featured_image && (
                    <div className="relative aspect-video">
                      <Image
                        src={article.featured_image}
                        alt={`Titelbild für ${article.title}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl">{article.title}</CardTitle>
                    <CardDescription>
                      Veröffentlicht am {new Date(article.created_at).toLocaleDateString('de-DE')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-700 line-clamp-4">
                      {article.content}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Zurzeit gibt es keine neuen Artikel.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}