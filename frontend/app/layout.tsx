import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@recipes/theme-provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tail',
  description: 'A cocktail recipe app for saving and viewing cocktail recipes.',
  icons: [
    {
      rel: 'shortcut icon',
      url: '/favicon.ico',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <main className='flex grow flex-col min-h-screen'>{children}</main>
        </ThemeProvider>
        </body>
    </html>
  )
}
