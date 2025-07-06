// components/dashboard/stats-cards.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function StatsCards() {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Aktive Mitglieder
          </CardTitle>
          <span className="text-2xl">👥</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">45</div>
          <p className="text-xs text-muted-foreground">
            +2 seit letztem Monat
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Nächste Events
          </CardTitle>
          <span className="text-2xl">📅</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs text-muted-foreground">
            In den nächsten 7 Tagen
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Zimmer verfügbar
          </CardTitle>
          <span className="text-2xl">🏠</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">7</div>
          <p className="text-xs text-muted-foreground">
            Von 12 Zimmern
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Neue Nachrichten
          </CardTitle>
          <span className="text-2xl">📰</span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">
            Diese Woche
          </p>
        </CardContent>
      </Card>
    </>
  )
}