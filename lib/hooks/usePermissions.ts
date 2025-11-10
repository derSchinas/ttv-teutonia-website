// lib/hooks/usePermissions.ts
'use client'

import { useAuth } from '@/components/auth/auth-provider'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export type UserRole = 'member' | 'ahv' | 'admin'

export function usePermissions() {
  const { user, loading: authLoading } = useAuth() 
  const [role, setRole] = useState<UserRole | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) {
      console.log('[Permissions] Waiting for auth to finish...');
      return;
    }

    if (user) {
      console.log('[Permissions] Auth finished, user found. Fetching profile for user:', user.id);
      const supabase = createClient()
      
      const fetchRole = async () => {
        setLoading(true); 
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()

        if (error) {
          console.error('[Permissions] Error fetching profile:', error.message);
        }
        
        console.log('[Permissions] Profile fetched:', profile);
        
        setRole(profile?.role as UserRole | null)
        setLoading(false) 
      }

      fetchRole()
    } else {
      console.log('[Permissions] No user found. Setting role to null.');
      setRole(null)
      setLoading(false) 
    }
  }, [user, authLoading]) 

  const permissions = {
    canViewContent: role !== null,
    canCreateEvents: role === 'ahv' || role === 'admin',
    canEditEvents: role === 'ahv' || role === 'admin',
    canCreateNews: role === 'ahv' || role === 'admin',
    canEditNews: role === 'ahv' || role === 'admin',
    canManageRooms: role === 'ahv' || role === 'admin',
    canViewMemberList: role === 'ahv' || role === 'admin',
    canCreateMembers: role === 'ahv' || role === 'admin',
    canAccessAdminPanel: role === 'admin',
    canManageRoles: role === 'admin',
    canDeleteMembers: role === 'admin',
    canViewAllData: role === 'admin',
  }

  return { role, permissions, loading }
}