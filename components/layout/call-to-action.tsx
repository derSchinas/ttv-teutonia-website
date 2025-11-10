// components/layout/call-to-action.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface CallToActionProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

export function CallToActionSection({ title, subtitle, buttonText, buttonLink }: CallToActionProps) {
  return (
    <section className="relative py-20 text-white overflow-hidden">
      <Image
        src="/home-background.png"
        alt="Hintergrundbild der TTV Teutonia"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="mt-4 max-w-2xl mx-auto text-gray-200">
          {subtitle}
        </p>
        <div className="mt-8">
          <Link href={buttonLink}>
            <Button size="lg" className="bg-yellow-400 text-violet-900 hover:bg-yellow-300">
              {buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}