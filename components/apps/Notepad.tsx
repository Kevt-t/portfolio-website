'use client'

import { useState, useEffect, useRef } from 'react'
import { FileSystemItem } from '@/types'

interface NotepadProps {
  file?: FileSystemItem
}

export default function Notepad({ file }: NotepadProps) {
  const [content, setContent] = useState('')
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false)
  const fileMenuRef = useRef<HTMLDivElement>(null)
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

  // Handle click/touch outside to close menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (fileMenuRef.current && !fileMenuRef.current.contains(event.target as Node)) {
        setIsFileMenuOpen(false)
      }
    }

    if (isFileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('touchstart', handleClickOutside)
      }
    }
  }, [isFileMenuOpen])

  const handleSaveAs = () => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = file?.name || 'untitled.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setIsFileMenuOpen(false)
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-2 py-1 border-b border-gray-200 dark:border-gray-700 text-xs text-gray-800 dark:text-gray-200">
        <div ref={fileMenuRef} className="relative">
          <button
            onClick={() => setIsFileMenuOpen(!isFileMenuOpen)}
            className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-800 dark:text-gray-200 touch-target"
          >
            File
          </button>

          {/* File Menu Dropdown */}
          {isFileMenuOpen && (
            <div className="absolute left-0 top-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg min-w-[150px] z-50">
              <button
                onClick={handleSaveAs}
                className="w-full text-left px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 min-h-[44px] flex items-center"
              >
                Save as...
              </button>
            </div>
          )}
        </div>
        <button className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-800 dark:text-gray-200">
          Edit
        </button>
        <button className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-800 dark:text-gray-200">
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
