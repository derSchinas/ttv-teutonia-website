// components/dashboard/member-directory.tsx
'use client'

import type { VisibleProfile } from '@/app/(auth)/dashboard/page'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, Phone, Home, Lock } from 'lucide-react'

const SensitiveData = ({ value, icon }: { value: string | null, icon: React.ReactNode }) => {
  if (value && value !== 'Verborgen') {
    return <div className="flex items-center gap-2">{icon}{value}</div>
  }
  return <div className="flex items-center gap-2 text-gray-400"><Lock className="h-4 w-4" />Verborgen</div>
}

export function MemberDirectory({ profiles }: { profiles: VisibleProfile[] }) {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name (Alias)</TableHead>
              <TableHead>Kontakt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profiles.map((profile) => (
              <TableRow key={profile.id}>
                <TableCell>
                  <p className="font-medium">{profile.first_name} {profile.last_name}</p>
                  {profile.alias && <p className="text-sm text-gray-500">v/o {profile.alias}</p>}
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <SensitiveData value={profile.email} icon={<Mail className="h-4 w-4" />} />
                    <SensitiveData value={profile.phone} icon={<Phone className="h-4 w-4" />} />
                    <SensitiveData value={profile.address} icon={<Home className="h-4 w-4" />} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}