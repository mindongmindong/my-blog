// frontend/src/components/posts/EditorToolbar.tsx
'use client';

export interface ToolbarAction {
  name: string;
  icon: React.ReactNode | string;
  action: () => void;
  tooltip: string;
}

interface EditorToolbarProps {
  actions: ToolbarAction[];
}

export default function EditorToolbar({ actions }: EditorToolbarProps) {
  return (
    <div className='border-b border-gray-200 py-3 mb-4'>
      <div className='flex items-center gap-1 flex-wrap'>
        {actions.map((action) => (
          <button
            key={action.name}
            type='button'
            onClick={action.action}
            className='p-2 hover:bg-gray-100 rounded-md transition-colors border border-transparent hover:border-gray-300 group relative'
            title={action.tooltip}
          >
            {typeof action.icon === 'string' ? (
              <span className='text-sm font-semibold text-gray-700 group-hover:text-gray-900'>
                {action.icon}
              </span>
            ) : (
              <div className='text-gray-700 group-hover:text-gray-900'>
                {action.icon}
              </div>
            )}

            {/* 툴팁 */}
            <div className='absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10'>
              {action.tooltip}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
