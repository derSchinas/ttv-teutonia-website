// app/news/[id]/page.tsx

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { NewsArticle } from '@/types/database' // Wir verwenden unseren zentralen Typ

// Funktion zum Abrufen eines einzelnen, veröffentlichten Artikels
async function getArticle(id: string): Promise<NewsArticle> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('news')
    .select('*, author:profiles(first_name, last_name)')
    .eq('id', id)
    .eq('is_published', true) // Wichtig: Nur veröffentlichte Artikel dürfen öffentlich angezeigt werden
    .single()

  // Wenn kein Artikel gefunden wird, zeige eine 404-Seite an
  if (error || !data) {
    notFound()
  }

  return data as NewsArticle
}

// Metadaten für SEO und Social Media Sharing generieren
export async function generateMetadata({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id)
  return {
    title: `${article.title} | TTV Teutonia News`,
    description: article.content.substring(0, 160),
  }
}

export default async function NewsArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id)

  return (
    <article className="bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">

          <div className="mb-8">
            <Link href="/news" className="text-sm text-blue-600 hover:underline">
              &larr; Zurück zur News-Übersicht
            </Link>
          </div>

          {/* Main Picture */}
          {article.featured_image && (
            <div className="relative aspect-video w-full mb-8 overflow-hidden rounded-lg shadow-lg">
              <Image
                src={article.featured_image}
                alt={`Titelbild für ${article.title}`}
                fill
                className="object-cover"
                priority 
              />
            </div>
          )}

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {article.title}
            </h1>
            <p className="mt-4 text-gray-500">
              Veröffentlicht am {new Date(article.created_at).toLocaleDateString('de-DE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              {article.author && ` von ${article.author.first_name} ${article.author.last_name}`}
            </p>
          </header>

          {/* Text */}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br />') }}
          />
        </div>
      </div>
    </article>
  )
}