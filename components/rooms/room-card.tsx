// components/rooms/room-card.tsx
'use client'

import type { Room } from '@/app/rooms/page'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

interface RoomCardProps {
  room: Room
}

export function RoomCard({ room }: RoomCardProps) {
  return (
    <Card className="flex flex-col">
      {room.room_images && room.room_images.length > 0 && (
        <Carousel className="w-full rounded-t-lg">
          <CarouselContent>
            {room.room_images.map((image) => (
              <CarouselItem key={image.id}>
                <div className="relative aspect-video">
                  <Image
                    src={image.image_url}
                    alt={image.alt_text || `Bild von ${room.room_number}`}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2" />
          <CarouselNext className="absolute right-2" />
        </Carousel>
      )}

      <CardHeader>
        <CardTitle>{room.room_number}</CardTitle>
        <CardDescription>
          {room.size_sqm}m² | {room.price_per_month} €/Monat
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Nur noch die Anzeige, keine Verwaltungsfunktion mehr */}
        {room.is_available ? (
          <span className="px-2 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full">
            Frei
          </span>
        ) : (
          <span className="px-2 py-1 text-sm font-semibold text-red-800 bg-red-100 rounded-full">
            Besetzt
          </span>
        )}
      </CardContent>
    </Card>
  )
}