import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import { ReactNode } from 'react'

export default function MainLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className='flex flex-col min-h-screen bg-gray-50'>
      <Header />
      <main className='flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {children}
      </main>
      <Footer />
    </div>
  )
}
