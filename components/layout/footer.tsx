// components/layout/footer.tsx
import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Image
                src="/logo.png"
                alt="TTV Teutonia Wappen"
                width={50}
                height={50}
                className="mr-3"
              />
              <h3 className="text-lg font-semibold">TTV Teutonia</h3>
            </div>
            <p className="text-gray-300 max-w-md">
              Studentenverbindung mit Tradition und Zukunft. 
              Seit über 100 Jahren verbinden wir Studenten in einer 
              starken Gemeinschaft von Freundschaft und Bildung.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <div className="text-gray-300 space-y-2">
              <p>Verbindungshaus</p>
              <p>Beutterstraße 9</p>
              <p>72764 Reutlingen</p>
              <p>Tel: +49 (0) 7121311747</p>
              <p>webmaster@ttv-teutonia.de</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <div className="text-gray-300 space-y-2">
              <Link href="/about" className="block hover:text-white">
                Über uns
              </Link>
              <Link href="/news" className="block hover:text-white">
                News
              </Link>
              <Link href="/semesterprogramm" className="block hover:text-white">
                Semesterprogramm
              </Link>
              <Link href="/rooms" className="block hover:text-white">
                Zimmer
              </Link>
              <Link href="/contact" className="block hover:text-white">
                Kontakt
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2025 TTV Teutonia. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  )
}