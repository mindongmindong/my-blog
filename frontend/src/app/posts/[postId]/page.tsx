// frontend/src/app/posts/[postId]/page.tsx

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostById, dummyPosts, getRecentPosts } from '@/data/posts';
import { getCategoryByValue, getCategoryColor } from '@/data/categories';

interface PostPageProps {
  params: Promise<{ postId: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  // params를 await로 처리 (Next.js 15의 새로운 방식)
  const { postId } = await params;

  // 문자열 ID를 숫자로 변환
  const postIdNumber = parseInt(postId, 10);

  // ID가 유효하지 않은 경우
  if (isNaN(postIdNumber)) {
    notFound();
  }

  // 게시글 데이터 조회
  const post = getPostById(postIdNumber);

  // 게시글이 존재하지 않는 경우
  if (!post) {
    notFound();
  }

  // 카테고리 정보 조회
  const categoryInfo = getCategoryByValue(post.category);

  // 관련 게시글 (같은 카테고리의 다른 글들, 현재 글 제외)
  const relatedPosts = dummyPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  // 최근 게시글 (현재 글 제외)
  const recentPosts = getRecentPosts(4).filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto">
      {/* 브레드크럼 네비게이션 */}
      <nav className="mb-8 text-sm text-gray-600">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-blue-600">Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/posts" className="hover:text-blue-600">Posts</Link>
          </li>
          <li>/</li>
          <li>
            <Link href={`/posts/${post.category}`} className="hover:text-blue-600">
              {categoryInfo?.label}
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-400 truncate">{post.title}</li>
        </ol>
      </nav>

      {/* 게시글 헤더 */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
            {categoryInfo?.label || post.category}
          </span>
          <span className="text-gray-500 text-sm">{post.readTime}</span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">
                  {post.author.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{post.author}</p>
                <p className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* 공유 버튼들 */}
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </button>
            <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="p-2 text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* 게시글 내용 */}
      <article className="prose prose-lg max-w-none mb-12">
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          {/* 게시글 요약 */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
            <p className="text-blue-800 font-medium">📝 요약</p>
            <p className="text-blue-700 mt-1">{post.excerpt}</p>
          </div>

          {/* 실제 게시글 내용 (현재는 더미 콘텐츠) */}
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              {post.content || `${post.title}에 대한 자세한 내용입니다. 여기에는 실제 게시글의 본문 내용이 들어갈 예정입니다.`}
            </p>

            <p>
              이 게시글은 {categoryInfo?.description}와 관련된 내용을 다루고 있으며,
              개발자들에게 유용한 정보를 제공하고자 합니다.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">주요 내용</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>핵심 개념 설명</li>
              <li>실무에서 활용할 수 있는 예제</li>
              <li>모범 사례와 주의사항</li>
              <li>추가 학습 자료</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">마무리</h2>
            <p>
              이 글이 여러분의 학습에 도움이 되었기를 바랍니다.
              궁금한 점이나 피드백이 있으시면 언제든지 댓글로 남겨주세요.
            </p>
          </div>

          {/* 태그 */}
          {post.tags && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* 네비게이션 (이전/다음 글) */}
      <div className="flex justify-between items-center mb-12 p-6 bg-gray-50 rounded-xl">
        <div className="flex-1">
          {postIdNumber > 1 && (
            <Link href={`/posts/${postIdNumber - 1}`} className="group">
              <div className="flex items-center text-gray-600 hover:text-blue-600">
                <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <div>
                  <p className="text-sm">이전 글</p>
                  <p className="font-medium">이전 게시글 제목</p>
                </div>
              </div>
            </Link>
          )}
        </div>

        <Link href="/posts" className="mx-4 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          목록으로
        </Link>

        <div className="flex-1 text-right">
          {postIdNumber < dummyPosts.length && (
            <Link href={`/posts/${postIdNumber + 1}`} className="group">
              <div className="flex items-center justify-end text-gray-600 hover:text-blue-600">
                <div className="text-right">
                  <p className="text-sm">다음 글</p>
                  <p className="font-medium">다음 게시글 제목</p>
                </div>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* 관련 게시글 */}
      {relatedPosts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            관련 게시글
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <RelatedPostCard key={relatedPost.id} post={relatedPost} />
            ))}
          </div>
        </section>
      )}

      {/* 최근 게시글 */}
      {recentPosts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            최근 게시글
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recentPosts.map((recentPost) => (
              <RelatedPostCard key={recentPost.id} post={recentPost} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// 관련 게시글 카드 컴포넌트
function RelatedPostCard({ post }: { post: any }) {
  return (
    <article className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-2 mb-3">
        <span className={`px-2 py-1 text-xs font-medium rounded ${getCategoryColor(post.category)}`}>
          {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
        </span>
        <span className="text-xs text-gray-500">{post.readTime}</span>
      </div>

      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
        <Link href={`/posts/${post.id}`} className="hover:text-blue-600 transition-colors">
          {post.title}
        </Link>
      </h3>

      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
        {post.excerpt}
      </p>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString('ko-KR')}
        </time>
        <Link
          href={`/posts/${post.id}`}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          읽어보기 →
        </Link>
      </div>
    </article>
  );
}

// 메타데이터 생성 (SEO 최적화)
export async function generateMetadata({ params }: PostPageProps) {
  const { postId } = await params;
  const postIdNumber = parseInt(postId, 10);
  const post = getPostById(postIdNumber);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Dev Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

// 정적 파라미터 생성 (빌드 시점에 모든 게시글 페이지 생성)
export function generateStaticParams() {
  return dummyPosts.map((post) => ({
    postId: post.id.toString(),
  }));
}
