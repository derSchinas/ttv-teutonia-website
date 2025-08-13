// lib/actions/news-actions.ts
'use server'

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

// --- SCHEMA FÜR NEUE ARTIKEL ---
const NewsSchema = z.object({
  title: z.string().min(5, 'Der Titel muss mindestens 5 Zeichen lang sein.'),
  content: z.string().min(20, 'Der Inhalt muss mindestens 20 Zeichen lang sein.'),
  image: z
    .instanceof(File, { message: 'Ein Bild ist erforderlich.' })
    .refine((file) => file.size > 0, 'Ein Bild ist erforderlich.')
    .refine((file) => file.size < 4 * 1024 * 1024, 'Das Bild darf maximal 4MB groß sein.'),
})

// --- SCHEMA FÜR DAS BEARBEITEN (jetzt mit optionalem Bild) ---
const UpdateNewsSchema = z.object({
  title: z.string().min(5, 'Der Titel muss mindestens 5 Zeichen lang sein.'),
  content: z.string().min(20, 'Der Inhalt muss mindestens 20 Zeichen lang sein.'),
  articleId: z.string().uuid('Ungültige Artikel-ID.'),
  image: z
    .instanceof(File)
    .refine((file) => file.size < 4 * 1024 * 1024, 'Das Bild darf maximal 4MB groß sein.')
    .optional(),
  oldImagePath: z.string().optional(),
})

// --- GEMEINSAMER STATE-TYP (bleibt gleich) ---
type State = {
  errors?: { [key: string]: string[] | undefined };
  message?: string | null;
};

// --- ACTION: NEUEN ARTIKEL ERSTELLEN  ---
export async function createNewsArticle(prevState: State, formData: FormData): Promise<State> {
  
  const supabase = await createServerSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { message: 'Nicht authentifiziert.' }
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (!profile || !['admin', 'ahv'].includes(profile.role!)) return { message: 'Keine Berechtigung.' }

  const validatedFields = NewsSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    image: formData.get('image'),
  })

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors, message: 'Validierungsfehler.' }
  }
  const { title, content, image } = validatedFields.data

  const filePath = `${Date.now()}-${image.name.replace(/[^a-zA-Z0-9.]/g, '_')}`
  const { error: uploadError } = await supabase.storage.from('news-images').upload(filePath, image)

  if (uploadError) {
    console.error('News Image Upload Error:', uploadError)
    return { message: `Upload-Fehler: ${uploadError.message}` }
  }

  const { data: urlData } = supabase.storage.from('news-images').getPublicUrl(filePath)

  const { error: dbError } = await supabase.from('news').insert({
    title: title,
    content: content,
    author_id: user.id,
    featured_image: urlData.publicUrl,
    is_published: true,
  })

  if (dbError) {
    console.error('News Insert Error:', dbError)
    await supabase.storage.from('news-images').remove([filePath])
    return { message: 'Fehler beim Speichern des Artikels.' }
  }

  revalidatePath('/news')
  revalidatePath('/ahv/news')
  redirect('/ahv/news')
}

// --- ACTION: ARTIKEL LÖSCHEN ---
export async function deleteNewsArticle(articleId: string, imagePath: string | null) {
  const supabase = await createServerSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Nicht authentifiziert.')
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (!profile || !['admin', 'ahv'].includes(profile.role!)) throw new Error('Keine Berechtigung.')

  const { error: dbError } = await supabase.from('news').delete().eq('id', articleId)
  if (dbError) {
    console.error('News Delete Error:', dbError)
    throw new Error('Fehler beim Löschen des Artikels aus der Datenbank.')
  }

  if (imagePath) {
    const { error: storageError } = await supabase.storage.from('news-images').remove([imagePath])
    if (storageError) {
      console.error('News Image Delete Error:', storageError)
    }
  }

  revalidatePath('/news')
  revalidatePath('/ahv/news')
}

// --- ACTION: ARTIKEL BEARBEITEN (komplett überarbeitet) ---
export async function updateNewsArticle(prevState: State, formData: FormData): Promise<State> {
  const supabase = await createServerSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { message: 'Nicht authentifiziert.' }
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (!profile || !['admin', 'ahv'].includes(profile.role!)) return { message: 'Keine Berechtigung.' }

  const validatedFields = UpdateNewsSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    articleId: formData.get('articleId'),
    image: formData.get('image'),
    oldImagePath: formData.get('oldImagePath'),
  })

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors, message: 'Validierungsfehler.' }
  }
  const { title, content, articleId, image, oldImagePath } = validatedFields.data

  let newImageUrl: string | null = null;

  // Schritt 1: Prüfen, ob ein neues Bild hochgeladen wurde
  if (image && image.size > 0) {
    // 1a: Neues Bild hochladen
    const newFilePath = `${Date.now()}-${image.name.replace(/[^a-zA-Z0-9.]/g, '_')}`
    const { error: uploadError } = await supabase.storage.from('news-images').upload(newFilePath, image)
    if (uploadError) return { message: `Upload-Fehler: ${uploadError.message}` }

    // 1b: URL des neuen Bildes holen
    newImageUrl = supabase.storage.from('news-images').getPublicUrl(newFilePath).data.publicUrl

    // 1c: Altes Bild aus dem Storage löschen, falls vorhanden
    if (oldImagePath) {
      const { error: deleteError } = await supabase.storage.from('news-images').remove([oldImagePath])
      if (deleteError) console.error("Konnte altes Bild nicht löschen:", deleteError.message)
    }
  }

  // Schritt 2: Datenbankeintrag aktualisieren
  const updateData: { title: string; content: string; featured_image?: string } = {
    title,
    content,
  }
  if (newImageUrl) {
    updateData.featured_image = newImageUrl
  }

  const { error: dbError } = await supabase
    .from('news')
    .update(updateData)
    .eq('id', articleId)

  if (dbError) {
    console.error('News Update Error:', dbError)
    return { message: 'Fehler beim Aktualisieren des Artikels.' }
  }

  revalidatePath('/news')
  revalidatePath('/ahv/news')
  redirect('/ahv/news')
}