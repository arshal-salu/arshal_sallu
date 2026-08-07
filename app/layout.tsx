import type { Metadata, Viewport } from 'next'
import { Geist, Inter, JetBrains_Mono } from 'next/font/google'
import { SiteShell } from '@/components/layout/site-shell'
import './globals.css'

const geist = Geist({ subsets: ['latin'], display: 'swap', variable: '--font-geist' })
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], display: 'swap', variable: '--font-jetbrains-mono' })

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)',  color: '#000000' },
    { media: '(prefers-color-scheme: light)', color: '#000000' },
  ],
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://muhammedarshal.vercel.app'),
  title: { default: 'Muhammed Arshal V', template: '%s | Muhammed Arshal V' },
  description: 'AI Developer building intelligent applications using Generative AI and modern web technologies.',
  keywords: ['AI Developer', 'Generative AI', 'Machine Learning', 'Next.js', 'React', 'TypeScript', 'Full Stack', 'Portfolio'],
  authors: [{ name: 'Muhammed Arshal V' }],
  creator: 'Muhammed Arshal V',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  openGraph: {
    type: 'website', locale: 'en_US', url: 'https://muhammedarshal.vercel.app', siteName: 'Muhammed Arshal V',
    title: 'Muhammed Arshal V - AI Developer',
    description: 'AI Developer building intelligent applications using Generative AI and modern web technologies.',
  },
  twitter: {
    card: 'summary_large_image', title: 'Muhammed Arshal V - AI Developer',
    description: 'AI Developer building intelligent applications using Generative AI and modern web technologies.',
    creator: '@arshal__salu',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' }
    ],
    apple: [{ url: '/icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },
  alternates: { canonical: 'https://muhammedarshal.vercel.app' },
  formatDetection: { email: false, address: false, telephone: false },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Muhammed Arshal V',
  url: 'https://muhammedarshal.vercel.app',
  jobTitle: 'AI Developer & Full-Stack Engineer',
  description: 'AI Developer building intelligent applications using Generative AI and modern web technologies.',
  sameAs: [
    'https://github.com/arshal-salu',
    'https://instagram.com/arshal_salu',
    'https://x.com/arshal__salu',
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={[geist.variable, inter.variable, jetbrainsMono.variable].join(' ')}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}