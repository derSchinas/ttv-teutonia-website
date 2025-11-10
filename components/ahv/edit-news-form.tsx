// components/ahv/edit-news-form.tsx
'use client'

import { useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import Image from 'next/image'
import { updateNewsArticle } from '@/lib/actions/news-actions'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { NewsArticle } from '@/types/database'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Wird gespeichert...' : 'Änderungen speichern'}
    </Button>
  )
}

export function EditNewsForm({ article }: { article: NewsArticle }) {
  const initialState = { message: null, errors: {} }
  const [state, dispatch] = useActionState(updateNewsArticle, initialState)

  useEffect(() => {
    if (state.message) {
      toast.error(state.message)
    }
  }, [state])

  const oldImagePath = article.featured_image ? article.featured_image.split('/news-images/')[1] : ''

  return (
    <form action={dispatch} className="space-y-6">
      <input type="hidden" name="articleId" value={article.id} />
      <input type="hidden" name="oldImagePath" value={oldImagePath} />
      
      <div>
        <Label htmlFor="title">Titel</Label>
        <Input id="title" name="title" defaultValue={article.title} required />
        {state.errors?.title && <p className="text-sm text-red-500 mt-1">{state.errors.title[0]}</p>}
      </div>
      <div>
        <Label htmlFor="content">Inhalt / Beschreibung</Label>
        <Textarea id="content" name="content" defaultValue={article.content} rows={10} required />
        {state.errors?.content && <p className="text-sm text-red-500 mt-1">{state.errors.content[0]}</p>}
      </div>

      {/* Picture update */}
      <div>
        <Label>Aktuelles Titelbild</Label>
        {article.featured_image ? (
          <div className="mt-2 relative aspect-video w-full max-w-sm">
            <Image
              src={article.featured_image}
              alt={`Aktuelles Bild für ${article.title}`}
              fill
              className="object-cover rounded-md"
            />
          </div>
        ) : (
          <p className="text-sm text-gray-500 mt-2">Kein Titelbild vorhanden.</p>
        )}
      </div>
      <div>
        <Label htmlFor="image">Neues Titelbild hochladen (Optional)</Label>
        <Input id="image" name="image" type="file" accept="image/png, image/jpeg, image/webp" />
        <p className="text-xs text-gray-500 mt-1">
          Lassen Sie das Feld leer, um das aktuelle Bild beizubehalten.
        </p>
        {state.errors?.image && <p className="text-sm text-red-500 mt-1">{state.errors.image[0]}</p>}
      </div>

      <SubmitButton />
    </form>
  )
}