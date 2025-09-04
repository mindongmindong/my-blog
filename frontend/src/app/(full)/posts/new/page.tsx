// frontend/src/app/posts/new/page.tsx

import { createPostAction } from './actions';
import { Metadata } from 'next'
import EditorClient from '@/components/EditorClient'

export const metadata: Metadata = {
  title: '새 게시글 작성 | Dev Blog',
  description: '새로운 게시글을 작성합니다.',
};

export default function NewPostPage() {
  // 서버 컴포넌트: 폼과 서버 액션을 연결
  return (
    <div className="w-full h-screen flex flex-col">
      {/* 폼: action에 서버 액션을 연결 */}
      <form action={createPostAction} className="flex-1">
        {/* 제목/카테고리/태그/본문 입력은 클라이언트 컴포넌트에서 관리 */}
        <EditorClient />
      </form>
    </div>
  );
}
