// frontend/src/app/posts/new/actions.ts
'use server';

import { redirect } from 'next/navigation';

type NewPostInput = {
  title: string;
  category: string;
  content: string;
  tags: string[];
};

const REQUIRED_MIN = { title: 2, content: 10 };

export async function createPostAction(formData: FormData) {
  // 기본 파싱
  const raw = Object.fromEntries(formData) as Record<string, FormDataEntryValue>;
  const title = String(raw.title || '').trim();
  const category = String(raw.category || '').trim();
  const content = String(raw.content || '').trim();
  const tagsStr = String(raw.tags || '').trim();
  const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(Boolean) : [];

  // 간단 검증
  const errors: Record<string, string> = {};
  if (title.length < REQUIRED_MIN.title) errors.title = `제목은 최소 ${REQUIRED_MIN.title}자 이상이어야 합니다.`;
  if (!category) errors.category = '카테고리를 선택하세요.';
  if (content.length < REQUIRED_MIN.content) errors.content = `본문은 최소 ${REQUIRED_MIN.content}자 이상이어야 합니다.`;

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  // TODO: 실제 DB 저장 로직 (현재는 더미로 ID 999 반환)
  const createdId = 999;

  // 캐시 무효화가 필요하면 revalidatePath('/posts') 등을 사용
  // 완료 후 상세 페이지로 이동
  redirect(`/posts/${createdId}`);
}
