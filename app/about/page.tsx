// app/about/page.tsx
export default function AboutPage() {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Über TTV Teutonia</h1>
        <div className="prose max-w-4xl">
          <p className="text-lg mb-6">
            TTV Teutonia ist eine traditionsreiche Studentenverbindung mit über 100 Jahren Geschichte.
            Wir verbinden Tradition mit Moderne und bieten unseren Mitgliedern eine starke Gemeinschaft.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Unsere Werte</h2>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>Freundschaft und Kameradschaft</li>
            <li>Bildung und persönliche Entwicklung</li>
            <li>Tradition und Zukunft</li>
            <li>Gemeinschaft und gegenseitige Unterstützung</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mb-4">Unser Verbindungshaus</h2>
          <p className="mb-6">
            Unser Verbindungshaus bietet nicht nur Wohnraum für Mitglieder, sondern auch 
            Räume für Veranstaltungen, Meetings und das gesellschaftliche Leben unserer Verbindung.
          </p>
        </div>
      </div>
    )
  }