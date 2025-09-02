import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고/블로그 제목 */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              Dev Blog
            </Link>
          </div>

          {/* 네비게이션 메뉴 */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/posts" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                  Posts
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </nav>

          {/* 모바일 메뉴 버튼 (선택사항) */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-gray-900">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
