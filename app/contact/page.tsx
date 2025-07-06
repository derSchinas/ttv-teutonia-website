// app/contact/page.tsx
export default function ContactPage() {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Kontakt</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">TTV Teutonia zu Reutlingen e.V.</h2>
            <div className="space-y-2">
              <p>TTV Teutonia</p>
              <p>Beutterstraße 9</p>
              <p>72764 Reutlingen</p>
              <p>Tel: (07121) 311747</p>
              <p>E-Mail: webmaster@ttv-teutonia.de</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Interesse an einer Mitgliedschaft?</h2>
            <p className="mb-4">
              Wenn Sie Interesse an einer Mitgliedschaft haben, kontaktieren Sie uns gerne.
              Wir laden Sie herzlich zu einem unserer Events ein, um unsere Gemeinschaft kennenzulernen.
            </p>
          </div>
        </div>
      </div>
    )
  }