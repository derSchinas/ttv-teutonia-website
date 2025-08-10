// app/layout.tsx
import { Inter } from 'next/font/google'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { AuthProvider } from '@/components/auth/auth-provider'
import { Toaster } from 'react-hot-toast' // 1. Importieren
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TTV Teutonia - Studentenverbindung',
  description: 'Studentenverbindung TTV Teutonia - Tradition und Zukunft seit 1920',
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Toaster position="top-center" /> {/* 2. Toaster hinzufügen */}
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}