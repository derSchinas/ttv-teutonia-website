// components/layout/page-header.tsx
'use client'

import Image from 'next/image'

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative py-20 text-white">
      {/* Hintergrundbild */}
      <Image
        src="/home-background.png"
        alt="Hintergrundbild der TTV Teutonia"
        fill
        className="object-cover"
      />
      {/* Abdunkelndes Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Inhalt */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-200">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}