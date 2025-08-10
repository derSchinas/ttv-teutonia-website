// components/ahv/members-list.tsx
'use client'

import type { Profile } from '@/app/(auth)/ahv/members/page'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'

interface MembersListProps {
  members: Profile[]
}

const getRoleBadge = (role: Profile['role']) => {
  switch (role) {
    case 'admin':
      return <span className="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">Admin</span>
    case 'ahv':
      return <span className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">AHV</span>
    case 'member':
      return <span className="px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded-full">Mitglied</span>
    default:
      return <span className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-50 rounded-full">Unbekannt</span>
  }
}

export function MembersList({ members }: MembersListProps) {
  // ===================================================================
  // MASTER-DEBUG-TEIL
  // ===================================================================
  
  // 1. Loggen der empfangenen Daten in der Browser-Konsole (F12)
  console.log('MembersList Component received props:', members);

  return (
    <div>
      

      {/* Original-Tabelle */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>E-Mail</TableHead>
                <TableHead className="text-right">Rolle</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members && members.length > 0 ? (
                members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">
                      {member.first_name} {member.last_name}
                    </TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell className="text-right">
                      {getRoleBadge(member.role)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center h-24">
                    Keine Mitglieder gefunden (oder Daten werden noch geladen).
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}