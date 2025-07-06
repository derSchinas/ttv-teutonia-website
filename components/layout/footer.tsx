// components/layout/footer.tsx
export function Footer() {
    return (
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">TTV Teutonia</h3>
              <p className="text-gray-300">
                Studentenverbindung mit Tradition und Zukunft
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
              <div className="text-gray-300 space-y-2">
                <p>TTV Teutonia zu Reutlingen e.V.</p>
                <p>Beutterstraße 9</p>
                <p>72764 Reutlingen</p>
                <p>Tel: (07121) 311747</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Links</h3>
              <div className="text-gray-300 space-y-2">
                <p>Impressum</p>
                <p>Datenschutz</p>
                <p>Satzung</p>
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