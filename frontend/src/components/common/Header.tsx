import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고/블로그 제목 */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              My Blog
            </Link>
          </div>

          {/* 네비게이션 메뉴 */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
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
              <li>
                <Link
                  href="/posts/new"
                  className="inline-flex items-center px-3 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                  aria-label="새 게시글 작성하기"
                  prefetch
                >
                  {/* 펜 아이콘 */}
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.125 19.588a4.5 4.5 0 01-1.591 1.02l-3.06 1.02 1.02-3.06a4.5 4.5 0 011.02-1.591L16.862 3.487z" />
                  </svg>
                  글쓰기
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
