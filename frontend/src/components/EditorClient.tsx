// frontend/src/components/posts/EditorClient.tsx
'use client'

import { useRef, useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'
import EditorToolbar from './EditorToolbar'
import { createToolbarActions } from '@/utils/toolbarActions'

const categories = [
  { value: 'algorithm', label: 'Algorithm' },
  { value: 'cs', label: 'CS' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
]

export default function EditorClient() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState('')
  const [content, setContent] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const typingTimer = useRef<number | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const onChangeWithTyping =
    (setter: (v: string) => void) =>
      (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      ) => {
        setter(e.target.value)
        setIsTyping(true)
        if (typingTimer.current) window.clearTimeout(typingTimer.current)
        typingTimer.current = window.setTimeout(() => setIsTyping(false), 400)
      }

  // 텍스트 삽입 함수
  const insertText = (before: string, after: string = '', placeholder: string = '') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    const textToInsert = selectedText || placeholder

    const newContent =
      content.substring(0, start) +
      before + textToInsert + after +
      content.substring(end)

    setContent(newContent)

    // 커서 위치 조정
    setTimeout(() => {
      const newCursorPos = start + before.length + textToInsert.length + after.length
      textarea.focus()
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  // 도구바 액션들 생성
  const toolbarActions = createToolbarActions(insertText)

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 w-full h-full'>
      {/* 왼쪽: 기본 정보 + 마크다운 에디터 */}
      <div className='flex flex-col h-full'>
        {/* 기본 정보 섹션 */}
        <div className='bg-white px-6 pt-12 pb-6 flex-shrink-0'>
          <div className='space-y-6'>
            <div>
              <input
                id='title'
                name='title'
                type='text'
                value={title}
                onChange={onChangeWithTyping(setTitle)}
                placeholder='흥미로운 제목을 입력해주세요'
                maxLength={120}
                required
                className='w-full py-3 text-xl font-bold rounded-lg focus:outline-none'
              />
              <hr />
            </div>
            <div className='grid grid-cols-2 gap-6'>
              <div>
                <label
                  htmlFor='category'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  카테고리 <span className='text-red-500'>*</span>
                </label>
                <select
                  id='category'
                  name='category'
                  value={category}
                  onChange={onChangeWithTyping(setCategory)}
                  className='w-full py-3 bg-white focus:outline-none text-gray-700 invalid:text-gray-400'
                  required
                >
                  <option value='' disabled>
                    카테고리 선택
                  </option>
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor='tags'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  태그
                </label>
                <input
                  id='tags'
                  name='tags'
                  value={tags}
                  onChange={onChangeWithTyping(setTags)}
                  placeholder='Next.js, TypeScript'
                  className='w-full py-3 focus:outline-none'
                />
              </div>
            </div>
          </div>
        </div>

        {/* 본문 에디터 섹션 */}
        <div className='bg-white px-6 relative flex-1 flex flex-col'>
          {/* 도구바 */}
          <EditorToolbar actions={toolbarActions} />

          <textarea
            ref={textareaRef}
            id='content'
            name='content'
            value={content}
            onChange={onChangeWithTyping(setContent)}
            placeholder={`# 제목을 입력하세요

**굵은 글씨**로 강조하거나 *기울임*을 사용해보세요.

- 리스트도 만들 수 있어요
- 마크다운 문법을 활용해보세요

\`코드\`도 삽입할 수 있습니다.`}
            required
            className='w-full flex-1 resize-none rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 font-mono text-sm leading-7 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all mb-20'
          />

          <div className='absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 shadow-lg'>
            <div className='flex items-center justify-end gap-3'>
              <Link
                href='/posts'
                className='px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 transition-colors'
              >
                돌아가기
              </Link>
              <button
                type='submit'
                className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
              >
                게시하기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽: 실시간 미리보기 영역 */}
      <div className='bg-gray-50 p-6'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-lg font-semibold text-gray-900'>실시간 미리보기</h3>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            isTyping ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-600'
          }`}>
            {isTyping ? '업데이트 중...' : '최신'}
          </span>
        </div>

        <div className='prose prose-sm max-w-none min-h-[40rem] overflow-y-auto bg-white rounded-lg p-6 border border-gray-200'>
          {content ? (
            <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-center">
                내용을 입력하면<br />미리보기가 여기에 표시됩니다
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
