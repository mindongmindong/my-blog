import Link from 'next/link'
import { type Post } from '@/data/posts';

export default function PostCard({ post }: { post: Post }) {
  const getCategoryColorLocal = (category: string) => {
    const colors: Record<string, string> = {
      algorithm: 'bg-blue-100 text-blue-800',
      cs: 'bg-green-100 text-green-800',
      frontend: 'bg-purple-100 text-purple-800',
      backend: 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <article className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <div className="flex items-center gap-3 mb-2 md:mb-0">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColorLocal(post.category)}`}>
            {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
          </span>
          <span className="text-sm text-gray-500">
            {post.readTime}
          </span>
        </div>
        <time className="text-sm text-gray-500" dateTime={post.date}>
          {new Date(post.date).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </time>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
        <Link href={`/frontend/src/app/(main)/posts/${post.id}`}>
          {post.title}
        </Link>
      </h2>

      <p className="text-gray-600 mb-4 leading-relaxed">
        {post.excerpt}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {post.author.charAt(0)}
            </span>
          </div>
          <span className="text-sm text-gray-700 font-medium">
            {post.author}
          </span>
        </div>

        <Link
          href={`/frontend/src/app/(main)/posts/${post.id}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group"
        >
          Read more
          <svg
            className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}