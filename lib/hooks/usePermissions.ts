// lib/hooks/usePermissions.ts
'use client'

import { useAuth } from '@/components/auth/auth-provider'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export type UserRole = 'member' | 'ahv' | 'admin'

export function usePermissions() {
  const { user, loading: authLoading } = useAuth() // Auch den Lade-Status vom AuthProvider holen
  const [role, setRole] = useState<UserRole | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Warten, bis die Authentifizierung abgeschlossen ist
    if (authLoading) {
      console.log('[Permissions] Waiting for auth to finish...');
      return;
    }

    if (user) {
      console.log('[Permissions] Auth finished, user found. Fetching profile for user:', user.id);
      const supabase = createClient()
      
      const fetchRole = async () => {
        setLoading(true); // Ladevorgang starten
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()

        if (error) {
          console.error('[Permissions] Error fetching profile:', error.message);
        }
        
        console.log('[Permissions] Profile fetched:', profile);
        
        // Setze die Rolle, wenn ein Profil gefunden wurde
        setRole(profile?.role as UserRole | null)
        setLoading(false) // Ladevorgang beenden
      }

      fetchRole()
    } else {
      console.log('[Permissions] No user found. Setting role to null.');
      setRole(null)
      setLoading(false) // Ladevorgang beenden, da kein Benutzer da ist
    }
  }, [user, authLoading]) // Auf Änderungen von user UND authLoading reagieren

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

  // Gib den Ladezustand mit zurück!
  return { role, permissions, loading }
}