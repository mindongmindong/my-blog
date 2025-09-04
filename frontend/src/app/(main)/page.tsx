// frontend/src/app/page.tsx

import Link from 'next/link';
import { getRecentPosts, getCategoryCount } from '@/data/posts';
import { categories, getCategoryColor } from '@/data/categories';

export default function HomePage() {
  const recentPosts = getRecentPosts(3);

  const categoriesWithCount = categories.map(category => ({
    ...category,
    count: getCategoryCount(category.value)
  }));

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-2xl">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            민동현의 성장 기록
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            알고리즘, CS 지식, 그리고 실무 경험을 통해 얻은 인사이트를 공유합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/posts"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              모든 글 보기
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              About Me
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">카테고리</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categoriesWithCount.map((category) => (
            <Link
              key={category.value}
              href={`/posts?category=${category.value}`}
              className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${category.color}`}>
                  {category.label}
                </span>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-gray-900">{category.count}개</p>
              <p className="text-sm text-gray-500 mt-1">게시글</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Posts Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">최근 게시글</h2>
          <Link
            href="/posts"
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
          >
            전체 보기
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${getCategoryColor(post.category)}`}>
                    {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                  </span>
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  <Link href={`/frontend/src/app/(main)/posts/${post.id}`} className="hover:text-blue-600 transition-colors">
                    {post.title}
                  </Link>
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <time dateTime={post.date}>{post.date}</time>
                  <Link
                    href={`/frontend/src/app/(main)/posts/${post.id}`}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    읽어보기 →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">함께 성장해요!</h2>
        <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
          개발과 학습에 대한 이야기를 나누고 싶다면 언제든 연락해 주세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="https://github.com/mindongmindong"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
            GitHub
          </Link>
          <a
            href="mailto:dcmin123@ajou.ac.kr"
            className="inline-flex items-center px-6 py-3 border border-gray-600 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email
          </a>
        </div>
      </section>
    </div>
  );
}
