import { ReactNode } from 'react'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'My Blog',
  description: '개발과 성장을 기록하는 블로그입니다.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
    {/* <body> 태그에 직접 스타일을 적용하지 않는 것이 유연합니다. */}
    <body>{children}</body>
    </html>
  );
}
