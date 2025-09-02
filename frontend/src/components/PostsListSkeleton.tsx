// frontend/src/components/posts/PostsListSkeleton.tsx

export default function PostsListSkeleton() {
  return (
    <div className="space-y-8">
      {/* 검색 및 필터 스켈레톤 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* 게시글 카드 스켈레톤 */}
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="h-8 bg-gray-200 rounded mb-3 animate-pulse"></div>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
