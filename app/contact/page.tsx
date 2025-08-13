// app/contact/page.tsx

import { ApplicationForm } from '@/components/contact/application-form'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { PageHeader } from '@/components/layout/page-header' // 1. Neue Komponente importieren
import { Mail, MapPin, Phone, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const hausAdresse = "Alteburgstraße 150, 72762 Reutlingen"
  const googleMapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(hausAdresse)}&output=embed`

  return (
    <div className="bg-gray-50">
      {/* 2. Der alte Header wird durch die neue PageHeader-Komponente ersetzt */}
      <PageHeader
        title="Werde Teil unserer Gemeinschaft"
        subtitle="Wir freuen uns darauf, von dir zu hören. Nimm Kontakt auf oder bewirb dich direkt für ein Zimmer."
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Kontakt & Prozess über dem Formular */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            {/* Linke Spalte: Kontaktinfos */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Direkter Draht zu uns</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-violet-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">TTV Teutonia</p>
                    <p className="text-gray-600">{hausAdresse}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-violet-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Telefon</p>
                    <p className="text-gray-600">+49 (0) 123 456789</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-violet-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">E-Mail</p>
                    <p className="text-gray-600">webmaster@ttv-teutonia.de</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rechte Spalte: Bewerbungsprozess */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Der Bewerbungsprozess</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">1. Bewerbung senden</p>
                    <p className="text-gray-600 text-sm">Fülle das Formular aus und schicke es ab.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">2. Wir melden uns</p>
                    <p className="text-gray-600 text-sm">Wir prüfen deine Bewerbung und kontaktieren dich.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">3. Persönliches Kennenlernen</p>
                    <p className="text-gray-600 text-sm">Wir laden dich zu uns ein, damit wir uns gegenseitig kennenlernen können.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bewerbungsformular */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Bewirb dich für ein Zimmer</CardTitle>
              <CardDescription>
                Fülle das Formular aus, um dich bei uns zu bewerben. Wir melden uns so schnell wie möglich bei dir.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ApplicationForm />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Karten-Sektion */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Hier findest du uns</h2>
            <div className="aspect-video overflow-hidden rounded-lg shadow-lg">
              <iframe
                src={googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}