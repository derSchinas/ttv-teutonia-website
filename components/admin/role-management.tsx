// components/admin/role-management.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Member {
  id: string
  first_name: string
  last_name: string
  email: string
  role: 'member' | 'ahv' | 'admin'
}

interface RoleManagementProps {
  members: Member[]
}

export function RoleManagement({ members: initialMembers }: RoleManagementProps) {
  const [members, setMembers] = useState(initialMembers)
  const [loading, setLoading] = useState<string | null>(null)
  const supabase = createClient()

  const handleRoleChange = async (memberId: string, newRole: string) => {
    setLoading(memberId)
    
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', memberId)

    if (error) {
      console.error('Error updating role:', error)
    } else {
      setMembers(members.map(member => 
        member.id === memberId 
          ? { ...member, role: newRole as 'member' | 'ahv' | 'admin' }
          : member
      ))
    }
    
    setLoading(null)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800'
      case 'ahv': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrator'
      case 'ahv': return 'AHV (Alter Herr Verband)'
      default: return 'Mitglied'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mitgliederrollen verwalten</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {members.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div>
                  <p className="font-medium">
                    {member.first_name} {member.last_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {member.email}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getRoleColor(member.role)}`}>
                  {getRoleLabel(member.role)}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Select
                  value={member.role}
                  onValueChange={(value) => handleRoleChange(member.id, value)}
                  disabled={loading === member.id}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member">Mitglied</SelectItem>
                    <SelectItem value="ahv">AHV</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
                
                {loading === member.id && (
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}