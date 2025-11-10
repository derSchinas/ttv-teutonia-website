// components/layout/navbar.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/auth-provider'
import { usePermissions } from '@/lib/hooks/usePermissions'
import { Button } from '@/components/ui/button'
import { Skeleton } from "@/components/ui/skeleton"
import { Menu, X, User, LogOut, Settings, Edit, Newspaper, CalendarDays } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import React from 'react'

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, signOut } = useAuth()
  const { permissions, loading: permissionsLoading } = usePermissions()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and public nav */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image src="/logo.png" alt="TTV Teutonia Wappen" width={40} height={40} className="mr-3" />
              <span className="text-xl font-bold text-gray-800">TTV Teutonia</span>
            </Link>
            <div className="hidden md:flex">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref><NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink></Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/about" legacyBehavior passHref><NavigationMenuLink className={navigationMenuTriggerStyle()}>Über uns</NavigationMenuLink></Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Aktuelles</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        <Link href="/news" legacyBehavior passHref><ListItem title="News & Ankündigungen">Die neuesten Beiträge und wichtigen Informationen aus dem Verbindungsleben.</ListItem></Link>
                        <Link href="/semesterprogramm" legacyBehavior passHref><ListItem title="Semesterprogramm">Alle Termine und Veranstaltungen des aktuellen Semesters im Überblick.</ListItem></Link>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/rooms" legacyBehavior passHref><NavigationMenuLink className={navigationMenuTriggerStyle()}>Zimmer</NavigationMenuLink></Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/contact" legacyBehavior passHref><NavigationMenuLink className={navigationMenuTriggerStyle()}>Kontakt</NavigationMenuLink></Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* User Interactions */}
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard"><Button variant="outline" size="sm"><User className="w-4 h-4 mr-2" />Dashboard</Button></Link>
                
                {permissionsLoading ? (
                  <Skeleton className="h-9 w-32 rounded-md" />
                ) : (
                  <>
                    {permissions.canCreateEvents && (
                      <Link href="/ahv">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          AHV-Bereich
                        </Button>
                      </Link>
                    )}
                  </>
                )}
                
                <Button variant="ghost" size="sm" onClick={handleSignOut}><LogOut className="w-4 h-4 mr-2" />Abmelden</Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth/login"><Button variant="outline" size="sm">Anmelden</Button></Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Über uns</Link>
            <div className="pl-4 border-l-2 border-gray-200">
              <Link href="/news" className="flex items-center text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}><Newspaper className="mr-2 h-5 w-5" />News</Link>
              <Link href="/semesterprogramm" className="flex items-center text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}><CalendarDays className="mr-2 h-5 w-5" />Semesterprogramm</Link>
            </div>
            <Link href="/rooms" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Zimmer</Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Kontakt</Link>
            
            {user ? (
              <>
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Dashboard</Link>
                {permissions.canCreateEvents && (<Link href="/ahv" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>AHV-Bereich</Link>)}
                <button onClick={handleSignOut} className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium w-full text-left">Abmelden</button>
              </>
            ) : (
              <Link href="/auth/login" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Anmelden</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}