// frontend/src/app/posts/page.tsx

import Link from 'next/link';
import { Suspense } from 'react';
import { dummyPosts, getCategoryCount } from '@/data/posts';
import SearchFilter from '@/components/SearchFilter';
import PostsListSkeleton from '@/components/PostsListSkeleton';

interface PostsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  // 서버에서 카테고리 필터링 처리
  const params = await searchParams;
  const selectedCategory = params.category || 'all';

  const filteredByCategory = selectedCategory === 'all'
    ? dummyPosts
    : dummyPosts.filter(post => post.category === selectedCategory);

  const categories = [
    { value: 'all', label: 'All Posts', href: '/posts', count: getCategoryCount('all') },
    { value: 'algorithm', label: 'Algorithm', href: '/posts?category=algorithm', count: getCategoryCount('algorithm') },
    { value: 'cs', label: 'CS', href: '/posts?category=cs', count: getCategoryCount('cs') },
    { value: 'frontend', label: 'Frontend', href: '/posts?category=frontend', count: getCategoryCount('frontend') },
    { value: 'backend', label: 'Backend', href: '/posts?category=backend', count: getCategoryCount('backend') }
  ];

  return (
    <div className="space-y-8">
      {/* 정적 헤더 - SSR로 빠르게 렌더링 */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          All Posts
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          개발과 학습 과정에서 얻은 인사이트와 지식을 공유합니다.
        </p>

        {/* 카테고리 필터 상태 표시 */}
        {selectedCategory !== 'all' && (
          <div className="mt-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {categories.find(cat => cat.value === selectedCategory)?.label} 카테고리
            </span>
          </div>
        )}
      </div>

      {/* 카테고리 탭 - 서버에서 렌더링 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <Link
              key={category.value}
              href={category.href}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label} ({category.count})
            </Link>
          ))}
        </div>
      </div>

      {/* 검색 및 게시글 목록 - 클라이언트에서 렌더링 */}
      <Suspense fallback={<PostsListSkeleton />}>
        <SearchFilter posts={filteredByCategory} />
      </Suspense>
    </div>
  );
}

// 메타데이터
export const metadata = {
  title: 'All Posts | Dev Blog',
  description: '개발과 학습 과정에서 얻은 인사이트와 지식을 공유하는 블로그의 모든 게시글을 확인해보세요.',
};
