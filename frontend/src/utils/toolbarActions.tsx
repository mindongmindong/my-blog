// frontend/src/utils/toolbarActions.tsx

import { ToolbarAction } from '@/components/EditorToolbar'

type InsertTextFunction = (before: string, after?: string, placeholder?: string) => void;

export const createToolbarActions = (insertText: InsertTextFunction): ToolbarAction[] => [
  {
    name: 'H1',
    icon: 'H1',
    action: () => insertText('# ', ''),
    tooltip: '제목 1'
  },
  {
    name: 'H2',
    icon: 'H2',
    action: () => insertText('## ', ''),
    tooltip: '제목 2'
  },
  {
    name: 'H3',
    icon: 'H3',
    action: () => insertText('### ', ''),
    tooltip: '제목 3'
  },
  {
    name: 'H4',
    icon: 'H4',
    action: () => insertText('#### ', ''),
    tooltip: '제목 4'
  },
  {
    name: 'Bold',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
      </svg>
    ),
    action: () => insertText('**', '**'),
    tooltip: '굵게'
  },
  {
    name: 'Image',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21,15 16,10 5,21"/>
      </svg>
    ),
    action: () => insertText('![', '](이미지_URL)', '이미지 설명'),
    tooltip: '이미지'
  },
  {
    name: 'Code',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <polyline points="16,18 22,12 16,6"/>
        <polyline points="8,6 2,12 8,18"/>
      </svg>
    ),
    action: () => insertText('`', '`', '코드'),
    tooltip: '인라인 코드'
  },
  {
    name: 'CodeBlock',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m6 8 4 4-4 4"/>
        <path d="m14 12h4"/>
      </svg>
    ),
    action: () => insertText('```\n\n```'),
    tooltip: '코드 블록'
  }
];
