import type { Metadata } from 'next'
import { VT323 } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const pixelFont = VT323({
  weight: '400',
  variable: '--font-pixel',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Sales Dashboard',
  description: 'Pixel sales dashboard built with Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${pixelFont.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
