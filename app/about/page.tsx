// app/about/page.tsx

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import {
  Users,
  Heart,
  Globe,
  Target,
  Home,
  GraduationCap,
  Briefcase,
  PartyPopper,
  ShieldCheck,
  Handshake,
  BookOpen,
} from 'lucide-react'

// Datenstrukturen mit den neuen Verbindungsfarben
const wirSind = [
  { icon: <Users className="h-6 w-6 text-violet-600" />, text: 'eine nichtschlagende, farbentragende Studentenverbindung.' },
  { icon: <Handshake className="h-6 w-6 text-violet-600" />, text: 'eine Gemeinschaft aus aktiven Mitgliedern (Studenten) und “Alten Herren” (Mitglieder nach dem Studium).' },
  { icon: <ShieldCheck className="h-6 w-6 text-violet-600" />, text: 'traditionsbewusst, aber offen für Neues.' },
  { icon: <Globe className="h-6 w-6 text-violet-600" />, text: 'darauf bedacht, dass jemand in unsere Gemeinschaft passt, unabhängig von Herkunft, Religion oder politischer Richtung.' },
]

const wirWollen = [
  { icon: <Home className="h-6 w-6 text-yellow-500" />, text: 'zusammen leben und studieren, Freundschaften erfahren und neue schließen.' },
  { icon: <PartyPopper className="h-6 w-6 text-yellow-500" />, text: 'durch gemeinsame Veranstaltungen das Studium interessanter gestalten.' },
  { icon: <Briefcase className="h-6 w-6 text-yellow-500" />, text: 'Kontakte zu Menschen knüpfen, die sich bereits im Berufsleben bewähren.' },
  { icon: <Target className="h-6 w-6 text-yellow-500" />, text: 'die Bezeichnung “Aktiver” wörtlich nehmen und uns engagieren.' },
]

const wirBieten = [
  { icon: <GraduationCap className="h-6 w-6 text-green-600" />, text: 'Unterstützung von Studienanfängern und Hilfe durch unsere berufserfahrenen “Alten Herren”.' },
  { icon: <Home className="h-6 w-6 text-green-600" />, text: 'preiswerte Zimmer in günstiger Lage (Innenstadt).' },
  { icon: <BookOpen className="h-6 w-6 text-green-600" />, text: 'Betriebsbesichtigungen und Studentenausfahrten (z.B. Frankreich, Belgien, NL etc.).' },
  { icon: <Heart className="h-6 w-6 text-green-600" />, text: 'lebenslange Freundschaften und ein Zuhause in der Gemeinschaft.' },
]

const geschichte = [
  { year: '1901', title: 'Gründung der TTV Teutonia', description: 'Gründung am 8. November als 3. Verbindung an der Fachschule für Textilindustrie. Die Farben: violett-gelb-grün.' },
  { year: '1905', title: 'Gründung des Altherrenverbandes', description: 'Ehemalige Mitglieder schließen sich zum Altherrenverband zusammen.' },
  { year: '1916', title: 'Erste Schließung', description: 'Auf Anordnung des Stuttgarter Ministeriums wird die Aktivitas während des 1. Weltkrieges aufgelöst.' },
  { year: '1919', title: 'Wiedergründung', description: 'Die Aktivitas wird mit 7 Teutonen wiedergegründet und trotzt den Krisen der Weimarer Republik.' },
  { year: '1935', title: 'Zweite Schließung', description: 'Durch die Anordnung zur Auflösung aller Studentenverbindungen im Dritten Reich wird die Teutonia erneut geschlossen.' },
  { year: '1953', title: 'Zweite Wiedergründung', description: 'Nach dem Krieg wird zuerst der Altherrenverband (1949) und dann die Aktivitas mit 6 jungen Studenten wiedergegründet.' },
  { year: 'Heute', title: 'Eine moderne Hochschule', description: 'Aus dem Technikum wurde eine international anerkannte Hochschule. Die TTV Teutonia hat sich behauptet und feierte 2001 ihr 100-jähriges Bestehen.' },
]

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Sektion */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Über die TTV Teutonia
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Eine Gemeinschaft, die auf den Werten Freundschaft, Toleranz, Offenheit und Vertrauen basiert.
          </p>
        </div>
      </section>

      {/* "Wir sind / wollen / bieten" Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Spalte: Wir sind */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Wir sind…</h2>
              {wirSind.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0">{item.icon}</div>
                  <p className="text-gray-700">{item.text}</p>
                </div>
              ))}
            </div>
            {/* Spalte: Wir wollen */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Wir wollen…</h2>
              {wirWollen.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0">{item.icon}</div>
                  <p className="text-gray-700">{item.text}</p>
                </div>
              ))}
            </div>
            {/* Spalte: Wir bieten */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Wir bieten…</h2>
              {wirBieten.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0">{item.icon}</div>
                  <p className="text-gray-700">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Geschichte Sektion mit Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Unsere Geschichte</h2>
            <p className="mt-2 text-gray-600">Ein Blick auf über 100 Jahre Verbindungsleben.</p>
          </div>
          <div className="relative max-w-3xl mx-auto">
            {/* Die vertikale Linie der Timeline */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200" />
            <div className="space-y-12">
              {geschichte.map((item, index) => (
                <div key={index} className="relative pl-12">
                  {/* Der Punkt auf der Timeline, jetzt in Violett */}
                  <div className="absolute left-4 top-1 h-2 w-2 -translate-x-[5px] rounded-full bg-violet-600" />
                  <p className="font-bold text-violet-600">{item.year}</p>
                  <h3 className="text-xl font-semibold text-gray-800 mt-1">{item.title}</h3>
                  <p className="mt-2 text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mitgliedschaft Call-to-Action */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Hintergrund jetzt in Violett */}
          <Card className="bg-violet-700 text-white text-center p-8 md:p-12">
            <CardContent>
              <h2 className="text-3xl font-bold">Interesse an einer Mitgliedschaft?</h2>
              <p className="mt-4 max-w-2xl mx-auto">
                Wenn Du an der Hochschule Reutlingen immatrikuliert bist und eine starke Gemeinschaft suchst,
                melde Dich bei uns. Wir freuen uns darauf, Dich kennenzulernen!
              </p>
              <div className="mt-8">
                <Link href="/contact">
                  {/* Button jetzt in Gelb für den besten Kontrast */}
                  <Button size="lg" className="bg-yellow-400 text-violet-900 hover:bg-yellow-300">
                    Jetzt Kontakt aufnehmen
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}