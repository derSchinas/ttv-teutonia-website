// app/(auth)/ahv/rooms/manage/page.tsx

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { RoomImageManager } from '@/components/ahv/room-image-manager'
import { SettingsForm } from '@/components/ahv/settings-form'
import type { Room } from '@/app/rooms/page'
import Link from 'next/link'

// Diese Seite soll immer die frischesten Daten laden, um Änderungen sofort zu sehen
export const dynamic = 'force-dynamic'

async function getRoomsWithImages(): Promise<Room[]> {
  const supabase = await createServerSupabaseClient()
  const { data, error } = await supabase
    .from('rooms')
    .select('*, room_images(*)')
    .order('room_number')

  if (error) {
    console.error('Error fetching rooms for management:', error)
    return []
  }
  return data as Room[]
}

// Neue Funktion zum Holen der E-Mail-Einstellung
async function getApplicationEmail(): Promise<string> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('settings')
    .select('value')
    .eq('key', 'application_email')
    .single();
  
  if (error) {
    console.error("Could not fetch application email setting:", error.message);
    return ''; // Leeren String zurückgeben, wenn ein Fehler auftritt
  }
  return data?.value || '';
}

export default async function ManageRoomsPage() {
  const rooms = await getRoomsWithImages();
  const applicationEmail = await getApplicationEmail();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/ahv" className="text-sm text-blue-600 hover:underline">
          &larr; Zurück zum AHV-Bereich
        </Link>
        <h1 className="text-3xl font-bold mt-2">Zimmer verwalten</h1>
        <p className="text-gray-600">
          Ändern Sie den Zimmerstatus, verwalten Sie Bilder und konfigurieren Sie die Bewerbungs-E-Mails.
        </p>
      </div>

      {/* Formular zum Ändern der E-Mail-Adresse */}
      <div className="mb-12">
        <SettingsForm currentEmail={applicationEmail} />
      </div>

      {/* Titel für den unteren Bereich */}
      <h2 className="text-2xl font-bold mb-4">Bildergalerien & Status</h2>

      {/* Liste der Zimmer-Manager */}
      <div className="space-y-8">
        {rooms.map((room) => (
          <RoomImageManager key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}