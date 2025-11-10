// app/about/page.tsx

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { PageHeader } from '@/components/layout/page-header'
import { CallToActionSection } from '@/components/layout/call-to-action'
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
  { year: '1901', title: 'Gründung der TTV Teutonia', description: 'Gründung der TTV Teutonia am 8. November 1901 als 3. Verbindung an der damaligen Fachschule für Textilindustrie. Die erste Aktivitas umfasste 12 Mitglieder. Verbindungsfarben violett-gelb-grün.' },
  { year: '1905', title: 'Gründung des Altherrenverbandes', description: 'Ehemalige Mitglieder schließen sich zum Altherrenverband zusammen.' },
  { year: '1906 - 1914', title: 'Das Ende der Monarchie', description: 'Bis zum Beginn des 1. Weltkrieges erlebte die Teutonengeneration die deutsche Monarchie in ihrer letzten Blütezeit, ehe in Folge des Krieges die damalige Fachschule geschlossen werden musste. Das Verbindungsleben kam dadurch nahezu zum erliegen.' },
  { year: '1916', title: 'Erste Schließung', description: 'Schließung der Aktivitas, nachdem die bislang existierenden 4 Reutlinger Verbindungen von Prof. Johannsen auf Anordnung des Stuttgarter Ministeriums aufgelöst worden waren.' },
  { year: '1919 - 1934', title: 'Wiedergründung', description: 'Wiedergründung der Aktivitas 1919 mit 7 Teutonen und offizielle Zulassung am Technikum für Textilindustrie. Die Teutonia bestand sowohl die wechselvollen Zeiten der Weimarer Republik als auch den Beginn der Naziherrschaft. Den goldenen zwanziger Jahren mit ihren Festen und Kommersen folgten magere Jahre, geprägt durch Weltwirtschaftskrise und Arbeitslosigkeit.' },
  { year: '1935', title: 'Zweite Schließung', description: 'Die Anordnung zur Auflösung aller Studentenverbindungen (durch das NS-Regime) traf auch die Teutonia. Unsere Verbindung wurde im 68. Semester das 2. Mal geschlossen.' },
  { year: '1945 – 1953', title: 'Zweite Wiedergründung', description: 'Unter großen Mühen konnten die verstreuten Teutonen teilweise wiedergefunden werden, was 1949 zur Wiedergründung des Altherrenverbandes führte. Am Technikum für Textilindustrie fanden sich dann die Studenten in großer Zahl wieder ein, so daß im WS 1953/54 auch die Aktivitas mit 6 jungen Studenten wiedergegründet werden konnte.' },
  { year: '1953 – heute', title: 'Eine moderne Hochschule', description: 'Mit Beginn des WS 1971/72 wurde aus dem Technikum für Textilindustrie die Fachhochschule Reutlingen. Inzwischen ist daraus eine international anerkannte, multidisziplinäre Hochschule mit mehreren tausend Studenten gewachsen. Die TTV Teutonia hat sich in all den schweren und ereignisreichen Jahren als Studentenverbindung behauptet und ihr 100jähriges Bestehen mit einem herausragenden Stiftungsfest im Mai 2001 gefeiert.' },
]


export default function AboutPage() {
  return (
    <div className="bg-white">
      <PageHeader
        title="Über die TTV Teutonia"
        subtitle="Eine Gemeinschaft, die auf den Werten Freundschaft, Toleranz, Offenheit und Vertrauen basiert."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* We are*/}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Wir sind…</h2>
              {wirSind.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0">{item.icon}</div>
                  <p className="text-gray-700">{item.text}</p>
                </div>
              ))}
            </div>
            {/* We want */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Wir wollen…</h2>
              {wirWollen.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0">{item.icon}</div>
                  <p className="text-gray-700">{item.text}</p>
                </div>
              ))}
            </div>
            {/* We offer */}
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

      {/* History section */}
      <section className="relative py-16 text-white overflow-hidden">
        <Image
          src="/history-background.png"
          alt="Historischer Hintergrund der TTV Teutonia"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Unsere Geschichte</h2>
            <p className="mt-2 text-gray-300">Ein Blick auf über 100 Jahre Verbindungsleben.</p>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-white/30" />
            <div className="space-y-12">
              {geschichte.map((item, index) => (
                <div key={index} className="relative pl-12">
                  <div className="absolute left-4 top-1 h-2 w-2 -translate-x-[5px] rounded-full bg-violet-400" />
                  <p className="font-bold text-violet-400">{item.year}</p>
                  <h3 className="text-xl font-semibold text-gray-100 mt-1">{item.title}</h3>
                  <p className="mt-2 text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Apply */}
      <CallToActionSection
        title="Interesse an einer Mitgliedschaft?"
        subtitle="Wenn Du an der Hochschule Reutlingen immatrikuliert bist und eine starke Gemeinschaft suchst, melde Dich bei uns. Wir freuen uns darauf, Dich kennenzulernen!"
        buttonText="Jetzt Kontakt aufnehmen"
        buttonLink="/contact"
      />
    </div>
  )
}