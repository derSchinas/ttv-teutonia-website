// app/semesterprogramm/page.tsx

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, CalendarPlus } from 'lucide-react'

export default function SemesterprogrammPage() {
  // Die ID des öffentlichen Google Kalenders
  const googleCalendarId = "ttv.teutonia.reutlingen@gmail.com"
  
  // URL zum Einbetten des Kalenders
  const embedUrl = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(googleCalendarId)}&ctz=Europe%2FBerlin`
  
  // URL für den ICS-Download
  const icsUrl = `https://calendar.google.com/calendar/ical/${encodeURIComponent(googleCalendarId)}/public/basic.ics`

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Semesterprogramm
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Alle Termine und Veranstaltungen auf einen Blick. Synchronisiere den Kalender mit deinem Gerät.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Kalender herunterladen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-gray-600">
                Lade die Termine als ICS-Datei herunter, um sie in Outlook, Apple Kalender oder andere Apps zu importieren.
              </p>
              <a href={icsUrl} download>
                <Button className="w-full">
                  ICS-Datei herunterladen
                </Button>
              </a>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarPlus className="h-5 w-5" />
                Mit Google Kalender synchronisieren
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-gray-600">
                Klicke unten rechts im Kalender auf das blaue "+"-Symbol, um alle Termine direkt mit deinem Google-Konto zu synchronisieren. Dies ist nur einmal pro Gerät notwendig.
              </p>
              <p className="text-xs text-gray-500">
                (Ein Google-Konto ist für diese Funktion erforderlich.)
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Eingebetteter Google Kalender */}
        <div className="aspect-video w-full bg-white p-2 rounded-lg shadow-lg">
          <iframe
            src={embedUrl}
            style={{ borderWidth: 0 }}
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </div>
      </div>
    </div>
  )
}