// components/ahv/room-image-manager.tsx
'use client'

import type { Room } from '@/app/rooms/page'
import Image from 'next/image'
import { useState, useTransition } from 'react'
import { toast } from 'react-hot-toast'
import { uploadRoomImage, deleteRoomImage, toggleRoomStatus } from '@/lib/actions/room-actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Trash2, Upload } from 'lucide-react'

interface RoomImageManagerProps {
  room: Room
}

export function RoomImageManager({ room }: RoomImageManagerProps) {
  const [isPending, startTransition] = useTransition()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleImageUpload = async (formData: FormData) => {
    startTransition(async () => {
      const result = await uploadRoomImage(room.id, formData)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success('Bild erfolgreich hochgeladen!')
        setIsDialogOpen(false)
      }
    })
  }

  const handleImageDelete = (imageId: string, imageUrl: string) => {
    if (confirm('Möchten Sie dieses Bild wirklich endgültig löschen?')) {
      startTransition(async () => {
        const result = await deleteRoomImage(imageId, imageUrl)
        if (result.error) {
          toast.error(result.error)
        } else {
          toast.success('Bild erfolgreich gelöscht!')
        }
      })
    }
  }

  const handleToggleStatus = () => {
    startTransition(async () => {
      const result = await toggleRoomStatus(room.id, room.is_available)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(`Status für ${room.room_number} geändert.`)
      }
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{room.room_number}</CardTitle>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id={`switch-${room.id}`}
              checked={room.is_available}
              onCheckedChange={handleToggleStatus}
              disabled={isPending}
            />
            <Label htmlFor={`switch-${room.id}`} className="text-sm font-medium">
              {room.is_available ? 'Frei' : 'Besetzt'}
            </Label>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Bild hinzufügen
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Neues Bild für {room.room_number} hochladen</DialogTitle>
              </DialogHeader>
              <form action={handleImageUpload} className="space-y-4">
                <div>
                  <Label htmlFor="image">Bilddatei</Label>
                  <Input id="image" name="image" type="file" required accept="image/png, image/jpeg, image/webp" />
                </div>
                <div>
                  <Label htmlFor="altText">Alternativtext (für SEO)</Label>
                  <Input id="altText" name="altText" placeholder="Blick auf den Schreibtisch..." />
                </div>
                <Button type="submit" disabled={isPending}>
                  {isPending ? 'Wird hochgeladen...' : 'Hochladen'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {room.room_images && room.room_images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {room.room_images.map((image) => (
              // === HIER IST DIE ÄNDERUNG ===
              // Wir verwenden jetzt die robuste "fill"-Methode
              <div key={image.id} className="relative group aspect-video">
                <Image
                  src={image.image_url}
                  alt={image.alt_text || `Bild von ${room.room_number}`}
                  fill // Sagt dem Bild, es soll den Container füllen
                  className="object-cover rounded-md" // Stellt sicher, dass das Bild nicht verzerrt wird
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100"
                    onClick={() => handleImageDelete(image.id, image.image_url)}
                    disabled={isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Für dieses Zimmer wurden noch keine Bilder hochgeladen.</p>
        )}
      </CardContent>
    </Card>
  )
}