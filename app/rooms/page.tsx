// app/rooms/page.tsx

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { RoomCard } from '@/components/rooms/room-card'

// === TYPEN-ÄNDERUNG ===
// Wir definieren einen Typ für ein einzelnes Bild
export type RoomImage = {
  id: string
  image_url: string
  alt_text: string | null
}

// Der Room-Typ enthält jetzt ein Array von Bildern
export type Room = {
  id: string
  room_number: string
  is_available: boolean
  size_sqm: number | null
  price_per_month: number | null
  room_images: RoomImage[] // Hinzugefügt
}

async function getRooms(): Promise<Room[]> {
  const supabase = await createServerSupabaseClient()
  
  // === QUERY-ÄNDERUNG ===
  // Wir sagen Supabase, es soll die Zimmer UND die zugehörigen Bilder laden.
  // Die Magie `room_images(*)` erstellt ein verschachteltes Array.
  const { data, error } = await supabase
    .from('rooms')
    .select('*, room_images(*)')
    .order('room_number')

  if (error) {
    console.error('Error fetching rooms:', error)
    return []
  }
  return data as Room[]
}

export default async function RoomsPage() {
  const rooms = await getRooms()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Unsere Zimmer</h1>
        <p className="text-lg text-gray-600 mt-2">
          Verfügbare Zimmer in unserem Verbindungshaus.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  )
}