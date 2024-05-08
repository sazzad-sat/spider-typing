import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'
import { IBM_Plex_Sans } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

const fontSans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

export const metadata: Metadata = {
  title: 'SPIDY Typing | Learn Touch Typing Fast',
  description: 'SPIDY Typing | Learn Touch Typing Fast',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={fontSans.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
