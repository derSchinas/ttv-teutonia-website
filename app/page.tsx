// app/page.tsx
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
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
              <Link href="/rooms">
                <Button size="lg" variant="outline">
                  Zimmer buchen
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Was uns ausmacht
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Gemeinschaft</h3>
              <p className="text-gray-600">
                Eine starke Gemeinschaft von Studenten und Alumni, 
                die sich gegenseitig unterstützen.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Bildung</h3>
              <p className="text-gray-600">
                Förderung von Bildung und persönlicher Entwicklung 
                durch Mentoring und Workshops.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Zuhause</h3>
              <p className="text-gray-600">
                Unser Verbindungshaus bietet ein zweites Zuhause 
                mit Zimmern und Gemeinschaftsräumen.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}