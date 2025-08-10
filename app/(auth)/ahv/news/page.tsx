// app/(auth)/ahv/news/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { NewsCardActions } from '@/components/ahv/news-card-actions'
import type { NewsArticle } from '@/types/database' // <-- HIER IST DIE KORREKTUR

export const dynamic = 'force-dynamic'

async function getNews(): Promise<NewsArticle[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('news')
    .select('*, author:profiles(first_name, last_name)')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching news:', error)
    return []
  }
  return data as NewsArticle[]
}

export default async function ManageNewsPage() {
  const newsArticles = await getNews()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">News verwalten</h1>
          <p className="text-gray-600">Übersicht aller veröffentlichten Artikel.</p>
        </div>
        <Link href="/ahv/news/create">
          <Button>+ Neuer Artikel</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsArticles.map((article) => (
          <Card key={article.id} className="flex flex-col">
            {article.featured_image && (
              <div className="relative aspect-video">
                <Image
                  src={article.featured_image}
                  alt={article.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
              <CardDescription>
                Veröffentlicht am {new Date(article.created_at).toLocaleDateString('de-DE')}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-700 line-clamp-3">
                {article.content}
              </p>
            </CardContent>
            <CardFooter>
              <NewsCardActions articleId={article.id} featuredImage={article.featured_image} />
            </CardFooter>
          </Card>
        ))}
        {newsArticles.length === 0 && (
          <p>Noch keine Artikel vorhanden.</p>
        )}
      </div>
    </div>
  )
}