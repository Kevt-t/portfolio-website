import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Windows 11 Portfolio',
  description: 'A fully functional Windows 11 desktop environment portfolio',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-segoe antialiased">
        {children}
      </body>
    </html>
  )
}
