// app/page.tsx

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
// === KORREKTUR: Icons importieren ===
import { ArrowUp, Users, BookOpen, Home } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card' // Card-Komponente importieren

export default function HomePage() {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide scroll-smooth">
      
      {/* Hero Section bleibt gleich */}
      <section id="home-hero" className="relative h-screen flex items-center justify-center text-white snap-start">
        <Image
          src="/home-background.png"
          alt="Das Verbindungshaus der TTV Teutonia"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <Image
                src="/logo.png"
                alt="TTV Teutonia Wappen"
                width={120}
                height={120}
                className="drop-shadow-lg"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              TTV Teutonia
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Studentenverbindung mit Tradition und Zukunft - 
              Gemeinschaft, Bildung und Freundschaft seit über 100 Jahren
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/about">
                <Button size="lg" variant="secondary">
                  Mehr erfahren
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="secondary">
                  Jetzt bewerben
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* === HIER IST DIE KORREKTUR: "Was uns ausmacht" Section === */}
      <section className="h-screen w-full flex items-center justify-center bg-gray-50 snap-start">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Was uns ausmacht
            </h2>
            <p className="text-lg text-gray-600">
              Unsere drei Säulen: Gemeinschaft, Bildung und Zuhause.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Karte für Gemeinschaft */}
            <Card className="text-center p-6 shadow-lg">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-violet-600" /> {/* Icon */}
                </div>
                <h3 className="text-xl font-semibold mb-2">Gemeinschaft</h3>
                <p className="text-gray-600">
                  Eine starke Gemeinschaft von Studenten und Alumni, 
                  die sich gegenseitig unterstützen und ein Leben lang verbindet.
                </p>
              </CardContent>
            </Card>

            {/* Karte für Bildung */}
            <Card className="text-center p-6 shadow-lg">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-yellow-600" /> {/* Icon */}
                </div>
                <h3 className="text-xl font-semibold mb-2">Bildung</h3>
                <p className="text-gray-600">
                  Förderung von Bildung und persönlicher Entwicklung 
                  durch Mentoring, Workshops und einen regen Austausch.
                </p>
              </CardContent>
            </Card>

            {/* Karte für Zuhause */}
            <Card className="text-center p-6 shadow-lg">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="h-8 w-8 text-green-600" /> {/* Icon */}
                </div>
                <h3 className="text-xl font-semibold mb-2">Zuhause</h3>
                <p className="text-gray-600">
                  Unser Verbindungshaus bietet ein zweites Zuhause 
                  mit preiswerten Zimmern, Gemeinschaftsräumen und einer familiären Atmosphäre.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tradition Section bleibt gleich */}
      <section className="h-screen w-full flex items-center justify-center snap-start relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Tradition seit 1901
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Die TTV Teutonia blickt auf eine über 100-jährige Geschichte zurück. 
                Gegründet im Jahr 1901, haben wir Generationen von Studenten begleitet 
                und ihnen ein Zuhause geboten.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Unsere Werte und Traditionen werden von Generation zu Generation 
                weitergegeben, während wir uns gleichzeitig den Herausforderungen 
                der modernen Zeit stellen.
              </p>
              <Link href="/about">
                <Button size="lg">
                  Unsere Geschichte
                </Button>
              </Link>
            </div>
            <div className="flex justify-center">
              <Image
                src="/logo.png"
                alt="TTV Teutonia Wappen"
                width={300}
                height={300}
                className="drop-shadow-lg"
              />
            </div>
          </div>
        </div>

        <Link
          href="#home-hero"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full h-12 w-12 shadow-lg transition-transform duration-200 hover:scale-110"
          >
            <ArrowUp className="h-6 w-6" />
            <span className="sr-only">Nach oben scrollen</span>
          </Button>
        </Link>
      </section>
    </div>
  )
}