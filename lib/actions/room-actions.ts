// lib/actions/room-actions.ts
'use server'

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod' 

export async function toggleRoomStatus(roomId: string, currentStatus: boolean) {
  const supabase = await createServerSupabaseClient()

  // policy check
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Nicht authentifiziert.' }
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || !['admin', 'ahv'].includes(profile.role!)) {
    return { error: 'Keine Berechtigung.' }
  }

  const { error } = await supabase
    .from('rooms')
    .update({ is_available: !currentStatus })
    .eq('id', roomId)

  if (error) {
    console.error('Error updating room status:', error)
    return { error: 'Fehler beim Aktualisieren des Zimmers.' }
  }

  revalidatePath('/rooms')
  
  return { success: true }
  
}

export async function uploadRoomImage(roomId: string, formData: FormData) {
    const supabase = await createServerSupabaseClient()
  
    // policy check
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Nicht authentifiziert.' }
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    if (!profile || !['admin', 'ahv'].includes(profile.role!)) return { error: 'Keine Berechtigung.' }
  
    // data validation
    const file = formData.get('image') as File
    const altText = formData.get('altText') as string
    if (!file || file.size === 0) return { error: 'Bitte wählen Sie eine Bilddatei aus.' }
  
    // data upload
    const filePath = `${roomId}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`
    const { error: uploadError } = await supabase.storage
      .from('room-images')
      .upload(filePath, file)
  
    if (uploadError) {
      console.error('Storage Upload Error:', uploadError)
      return { error: `Fehler beim Hochladen des Bildes: ${uploadError.message}` }
    }
  
    const { data: urlData } = supabase.storage
      .from('room-images')
      .getPublicUrl(filePath)
  
    // Data base entry
    const { error: dbError } = await supabase
      .from('room_images')
      .insert({
        room_id: roomId,
        image_url: urlData.publicUrl,
        alt_text: altText,
      })
    // if upload didnt work
    if (dbError) {
      await supabase.storage.from('room-images').remove([filePath])
      console.error('Database Insert Error:', dbError)
      return { error: 'Fehler beim Speichern des Bild-Verweises.' }
    }
  
    revalidatePath('/rooms')
    revalidatePath('/ahv/rooms/manage')
  
    return { success: true }
  }


// delete pic
export async function deleteRoomImage(imageId: string, imageUrl: string) {
  const supabase = await createServerSupabaseClient()

  // policy check
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Nicht authentifiziert.' }
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (!profile || !['admin', 'ahv'].includes(profile.role!)) return { error: 'Keine Berechtigung.' }

  const filePath = imageUrl.split('/room-images/')[1]

  // delete from superbase
  const { error: storageError } = await supabase.storage
    .from('room-images')
    .remove([filePath])

  if (storageError) {
    console.error('Storage Delete Error:', storageError)
    return { error: 'Fehler beim Löschen der Bilddatei.' }
  }

  const { error: dbError } = await supabase
    .from('room_images')
    .delete()
    .eq('id', imageId)

  if (dbError) {
    console.error('Database Delete Error:', dbError)
    return { error: 'Fehler beim Löschen des Bild-Verweises.' }
  }


  revalidatePath('/rooms')
  revalidatePath('/ahv/rooms/manage')

  return { success: true }
}