import { ReactNode } from 'react'
import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

export const metadata: Metadata = {
  title: 'My Blog',
  description: '개발과 성장을 기록하는 블로그입니다.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='ko'>
      <body className='min-h-screen bg-white antialiased'>
        <div className='flex flex-col min-h-screen'>
          <Header />
          <main className='flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl'>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
