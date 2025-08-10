// lib/actions/room-actions.ts
'use server'

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod' // Zod für die Validierung hinzufügen

export async function toggleRoomStatus(roomId: string, currentStatus: boolean) {
  const supabase = await createServerSupabaseClient()

  // Prüfen, ob der Benutzer die nötigen Rechte hat (zusätzliche Sicherheit)
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

  // Den Status in der Datenbank auf das Gegenteil des aktuellen Status setzen
  const { error } = await supabase
    .from('rooms')
    .update({ is_available: !currentStatus })
    .eq('id', roomId)

  if (error) {
    console.error('Error updating room status:', error)
    return { error: 'Fehler beim Aktualisieren des Zimmers.' }
  }

  // Cache für die Zimmer-Seite invalidieren, damit die Änderung sofort sichtbar wird
  revalidatePath('/rooms')
  
  return { success: true }

  
}

export async function uploadRoomImage(roomId: string, formData: FormData) {
    const supabase = await createServerSupabaseClient()
  
    // 1. Berechtigungsprüfung
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Nicht authentifiziert.' }
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    if (!profile || !['admin', 'ahv'].includes(profile.role!)) return { error: 'Keine Berechtigung.' }
  
    // 2. Datei validieren
    const file = formData.get('image') as File
    const altText = formData.get('altText') as string
    if (!file || file.size === 0) return { error: 'Bitte wählen Sie eine Bilddatei aus.' }
  
    // 3. Datei in Supabase Storage hochladen
    const filePath = `${roomId}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`
    const { error: uploadError } = await supabase.storage
      .from('room-images')
      .upload(filePath, file)
  
    // === VERBESSERTE FEHLERBEHANDLUNG ===
    // Wenn der Upload fehlschlägt, brechen wir hier SOFORT ab.
    if (uploadError) {
      console.error('Storage Upload Error:', uploadError)
      return { error: `Fehler beim Hochladen des Bildes: ${uploadError.message}` }
    }
  
    // 4. Öffentliche URL abrufen
    const { data: urlData } = supabase.storage
      .from('room-images')
      .getPublicUrl(filePath)
  
    // 5. Datenbankeintrag erstellen
    const { error: dbError } = await supabase
      .from('room_images')
      .insert({
        room_id: roomId,
        image_url: urlData.publicUrl,
        alt_text: altText,
      })
  
    if (dbError) {
      // Optional: Wenn der DB-Eintrag fehlschlägt, das gerade hochgeladene Bild wieder löschen
      await supabase.storage.from('room-images').remove([filePath])
      console.error('Database Insert Error:', dbError)
      return { error: 'Fehler beim Speichern des Bild-Verweises.' }
    }
  
    // 6. Cache invalidieren
    revalidatePath('/rooms')
    revalidatePath('/ahv/rooms/manage')
  
    return { success: true }
  }


// --- NEUE FUNKTION: BILD LÖSCHEN ---
export async function deleteRoomImage(imageId: string, imageUrl: string) {
  const supabase = await createServerSupabaseClient()

  // 1. Berechtigungsprüfung (wie oben)
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Nicht authentifiziert.' }
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (!profile || !['admin', 'ahv'].includes(profile.role!)) return { error: 'Keine Berechtigung.' }

  // 2. Dateipfad aus der URL extrahieren
  // Die URL sieht so aus: .../storage/v1/object/public/room-images/path/to/file.jpg
  // Wir brauchen nur den Teil "path/to/file.jpg"
  const filePath = imageUrl.split('/room-images/')[1]

  // 3. Datei aus Supabase Storage löschen
  const { error: storageError } = await supabase.storage
    .from('room-images')
    .remove([filePath])

  if (storageError) {
    console.error('Storage Delete Error:', storageError)
    return { error: 'Fehler beim Löschen der Bilddatei.' }
  }

  // 4. Eintrag aus der 'room_images'-Datenbanktabelle löschen
  const { error: dbError } = await supabase
    .from('room_images')
    .delete()
    .eq('id', imageId)

  if (dbError) {
    console.error('Database Delete Error:', dbError)
    return { error: 'Fehler beim Löschen des Bild-Verweises.' }
  }

  // 5. Cache invalidieren
  revalidatePath('/rooms')
  revalidatePath('/ahv/rooms/manage')

  return { success: true }
}