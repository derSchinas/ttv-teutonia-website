// components/dashboard/recent-events.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function RecentEvents() {
  const events = [
    {
      id: 1,
      title: 'Semesteranfangsfeier',
      date: '2025-01-15',
      time: '19:00',
      participants: 25,
    },
    {
      id: 2,
      title: 'Vorstandssitzung',
      date: '2025-01-20',
      time: '18:00',
      participants: 8,
    },
    {
      id: 3,
      title: 'Bowling-Abend',
      date: '2025-01-25',
      time: '20:00',
      participants: 15,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kommende Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">{event.title}</h4>
                <p className="text-sm text-gray-600">
                  {event.date} um {event.time}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{event.participants} Teilnehmer</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}