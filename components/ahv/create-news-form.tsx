// components/ahv/create-news-form.tsx
'use client'

import { useActionState, useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { createNewsArticle } from '@/lib/actions/news-actions'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Wird veröffentlicht...' : 'Artikel veröffentlichen'}
    </Button>
  )
}

export function CreateNewsForm() {
  const initialState = { message: null, errors: {} }
  const [state, dispatch] = useActionState(createNewsArticle, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.message) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <form ref={formRef} action={dispatch} className="space-y-6">
      <div>
        <Label htmlFor="title">Titel</Label>
        <Input id="title" name="title" required />
        {state.errors?.title && <p className="text-sm text-red-500 mt-1">{state.errors.title[0]}</p>}
      </div>
      <div>
        <Label htmlFor="content">Inhalt / Beschreibung</Label>
        <Textarea id="content" name="content" rows={10} required />
        {state.errors?.content && <p className="text-sm text-red-500 mt-1">{state.errors.content[0]}</p>}
      </div>
      <div>
        <Label htmlFor="image">Titelbild</Label>
        <Input id="image" name="image" type="file" required accept="image/png, image/jpeg, image/webp" />
        {state.errors?.image && <p className="text-sm text-red-500 mt-1">{state.errors.image[0]}</p>}
      </div>
      <SubmitButton />
    </form>
  )
}