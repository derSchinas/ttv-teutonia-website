// app/news/page.tsx
export default function NewsPage() {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Neuigkeiten</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Semesteranfangsfeier 2025</h2>
            <p className="text-gray-600 mb-4">15. Januar 2025</p>
            <p>Wir laden alle Mitglieder und Interessierte herzlich zu unserer Semesteranfangsfeier ein...</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Neue Website online</h2>
            <p className="text-gray-600 mb-4">6. Januar 2025</p>
            <p>Unsere neue Website ist nun online und bietet viele neue Funktionen für unsere Mitglieder...</p>
          </div>
        </div>
      </div>
    )
  }