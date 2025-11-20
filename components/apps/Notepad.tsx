'use client'

import { useState, useEffect } from 'react'
import { FileSystemItem } from '@/types'

interface NotepadProps {
  file?: FileSystemItem
}

export default function Notepad({ file }: NotepadProps) {
  const [content, setContent] = useState('')
  const isReadOnly = file?.readOnly || false

  useEffect(() => {
    if (file?.content) {
      if (typeof file.content === 'string') {
        setContent(file.content)
      } else {
        setContent(JSON.stringify(file.content, null, 2))
      }
    }
  }, [file])

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-2 py-1 border-b border-gray-200 dark:border-gray-700 text-xs">
        <button className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
          File
        </button>
        <button className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
          Edit
        </button>
        <button className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
          View
        </button>
      </div>

      {/* Text Area */}
      <textarea
        value={content}
        onChange={(e) => !isReadOnly && setContent(e.target.value)}
        readOnly={isReadOnly}
        className={`
          flex-1 p-4 font-mono text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 
          resize-none focus:outline-none
          ${isReadOnly ? 'cursor-default' : 'cursor-text'}
        `}
        placeholder="Start typing..."
        spellCheck={false}
      />

      {/* Status Bar */}
      <div className="flex items-center justify-between px-3 py-1 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800">
        <span>{file?.name || 'Untitled'}</span>
        <div className="flex gap-4">
          {isReadOnly && <span>Read Only</span>}
          <span>
            {content.split('\n').length} lines | {content.length} characters
          </span>
        </div>
      </div>
    </div>
  )
}
