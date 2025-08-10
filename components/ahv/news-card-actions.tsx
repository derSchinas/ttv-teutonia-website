// components/ahv/news-card-actions.tsx
'use client'

import { useTransition } from 'react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { deleteNewsArticle } from '@/lib/actions/news-actions'
import { Button } from '@/components/ui/button'
import { Edit, Trash2 } from 'lucide-react'

interface NewsCardActionsProps {
  articleId: string
  featuredImage: string | null
}

export function NewsCardActions({ articleId, featuredImage }: NewsCardActionsProps) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (confirm('Möchten Sie diesen Artikel wirklich endgültig löschen?')) {
      startTransition(async () => {
        try {
          // Der Pfad ist der Teil der URL nach dem Bucket-Namen
          const imagePath = featuredImage ? featuredImage.split('/news-images/')[1] : null
          await deleteNewsArticle(articleId, imagePath)
          toast.success('Artikel erfolgreich gelöscht.')
        } catch (error) {
          toast.error(error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten.')
        }
      })
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Link href={`/ahv/news/${articleId}/edit`}>
        <Button variant="outline" size="sm">
          <Edit className="mr-2 h-4 w-4" />
          Bearbeiten
        </Button>
      </Link>
      <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isPending}>
        <Trash2 className="mr-2 h-4 w-4" />
        {isPending ? 'Löschen...' : 'Löschen'}
      </Button>
    </div>
  )
}