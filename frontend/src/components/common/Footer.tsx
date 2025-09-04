import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 블로그 정보 */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Dev Blog</h3>
            <p className="text-gray-400 leading-relaxed">
              개발과 성장을 기록하는 공간입니다.
            </p>
          </div>

          {/* 카테고리 링크 */}
          <div>
            <h4 className="text-white text-md font-medium mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/posts?category=algorithm"
                      className="text-gray-400 hover:text-blue-400 transition-colors">
                  Algorithm
                </Link>
              </li>
              <li>
                <Link href="/posts?category=cs"
                      className="text-gray-400 hover:text-blue-400 transition-colors">
                  CS Knowledge
                </Link>
              </li>
              <li>
                <Link href="/posts"
                      className="text-gray-400 hover:text-blue-400 transition-colors">
                  All Posts
                </Link>
              </li>
            </ul>
          </div>

          {/* 연락처/소셜 링크 */}
          <div>
            <h4 className="text-white text-md font-medium mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com/mindongmindong"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="text-gray-400 hover:text-blue-400 transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="mailto:dcmin123@ajou.ac.kr"
                   className="text-gray-400 hover:text-blue-400 transition-colors">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 저작권 */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; 2025 My Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
