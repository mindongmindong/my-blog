// frontend/src/components/posts/SearchFilter.tsx

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { type Post } from '@/data/posts'
import { devDelay } from '@/utils/delay'
import PostsListSkeleton from '@/components/PostsListSkeleton'

interface SearchFilterProps {
  posts: Post[]
}

export default function SearchFilter({ posts }: SearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState<string>('')

  // 검색 필터링
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.tags &&
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ))
  )

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      algorithm: 'bg-blue-100 text-blue-800',
      cs: 'bg-green-100 text-green-800',
      frontend: 'bg-purple-100 text-purple-800',
      backend: 'bg-orange-100 text-orange-800',
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className='space-y-6'>
      {/* 검색창 */}
      <div className='bg-white rounded-xl border border-gray-200 p-6 shadow-sm'>
        <div className='relative'>
          <svg
            className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
          <input
            type='text'
            placeholder='제목, 내용, 태그로 검색...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* 검색 결과 통계 */}
      {searchTerm && (
        <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 text-center'>
          <p className='text-blue-800'>
            "<span className='font-medium'>{searchTerm}</span>"로 검색한 결과:
            <span className='font-bold ml-1'>{filteredPosts.length}개</span>의
            게시글을 찾았습니다.
          </p>
        </div>
      )}

      {/* 게시글 목록 */}
      <div className='space-y-6'>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              searchTerm={searchTerm}
              getCategoryColor={getCategoryColor}
            />
          ))
        ) : searchTerm ? (
          <SearchEmptyState searchTerm={searchTerm} />
        ) : (
          <div className='text-center py-8'>
            <div className='text-4xl mb-4'>📚</div>
            <p className='text-gray-600'>
              검색어를 입력하여 게시글을 찾아보세요.
            </p>
          </div>
        )}
      </div>

      {/* 총 게시글 수 */}
      <div className='bg-gray-50 rounded-xl p-6 text-center'>
        <p className='text-gray-600'>
          {searchTerm ? (
            <>
              검색 결과{' '}
              <span className='font-bold text-gray-900'>
                {filteredPosts.length}
              </span>
              개
            </>
          ) : (
            <>
              총 <span className='font-bold text-gray-900'>{posts.length}</span>
              개의 게시글
            </>
          )}
        </p>
      </div>
    </div>
  )
}

// 게시글 카드 컴포넌트 (검색어 하이라이트 기능 포함)
function PostCard({
  post,
  searchTerm,
  getCategoryColor,
}: {
  post: Post
  searchTerm: string
  getCategoryColor: (category: string) => string
}) {
  // 검색어 하이라이트 함수
  const highlightSearchTerm = (text: string, term: string) => {
    if (!term) return text

    const regex = new RegExp(`(${term})`, 'gi')
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className='bg-yellow-200 px-1 rounded'>
          {part}
        </mark>
      ) : (
        part
      )
    )
  }

  return (
    <article className='bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow'>
      <div className='flex flex-col md:flex-row md:items-center justify-between mb-4'>
        <div className='flex items-center gap-3 mb-2 md:mb-0'>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}
          >
            {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
          </span>
          <span className='text-sm text-gray-500'>{post.readTime}</span>

          {/* 태그 표시 */}
          {post.tags &&
            post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className={`px-2 py-1 text-xs rounded ${
                  searchTerm &&
                  tag.toLowerCase().includes(searchTerm.toLowerCase())
                    ? 'bg-yellow-100 border border-yellow-300'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                #{highlightSearchTerm(tag, searchTerm)}
              </span>
            ))}
        </div>
        <time className='text-sm text-gray-500' dateTime={post.date}>
          {new Date(post.date).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </div>

      <h2 className='text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors'>
        <Link href={`/frontend/src/app/(main)/posts/${post.id}`}>
          {highlightSearchTerm(post.title, searchTerm)}
        </Link>
      </h2>

      <p className='text-gray-600 mb-4 leading-relaxed'>
        {highlightSearchTerm(post.excerpt, searchTerm)}
      </p>

      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center'>
            <span className='text-white text-sm font-medium'>
              {post.author.charAt(0)}
            </span>
          </div>
          <span className='text-sm text-gray-700 font-medium'>
            {post.author}
          </span>
        </div>

        <Link
          href={`/frontend/src/app/(main)/posts/${post.id}`}
          className='inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group'
        >
          자세히 보기
          <svg
            className='ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 5l7 7-7 7'
            />
          </svg>
        </Link>
      </div>
    </article>
  )
}

// 검색 결과 없음 상태
function SearchEmptyState({ searchTerm }: { searchTerm: string }) {
  return (
    <div className='text-center py-12'>
      <div className='text-6xl mb-4'>🔍</div>
      <h3 className='text-xl font-medium text-gray-900 mb-2'>
        검색 결과가 없습니다
      </h3>
      <p className='text-gray-600 mb-6'>
        "<span className='font-medium'>{searchTerm}</span>"에 대한 결과를 찾을
        수 없습니다.
        <br />
        다른 키워드로 검색해보시거나 카테고리를 변경해보세요.
      </p>
      <div className='flex flex-col sm:flex-row gap-4 justify-center'>
        <Link
          href='/posts'
          className='px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors'
        >
          모든 게시글 보기
        </Link>
        <Link
          href='/frontend/src/app/(main)/posts/categories'
          className='px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors'
        >
          카테고리 둘러보기
        </Link>
      </div>
    </div>
  )
}
