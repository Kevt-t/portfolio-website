'use client'

import { useState, useEffect } from 'react'
import { ChevronRight, Home, ChevronLeft, Folder, File, FileText, FileJson, Link as LinkIcon } from 'lucide-react'
import { FileSystemItem } from '@/types'
import { findFileByPath, getDesktopItems } from '@/data/filesystem'
import { useWindowStore } from '@/store/useWindowStore'

interface FileExplorerProps {
  initialPath?: string
}

export default function FileExplorer({ initialPath = '/Desktop' }: FileExplorerProps) {
  const [currentPath, setCurrentPath] = useState(initialPath)
  const [currentItems, setCurrentItems] = useState<FileSystemItem[]>([])
  const [selectedItem, setSelectedItem] = useState<FileSystemItem | null>(null)
  const [navigationHistory, setNavigationHistory] = useState<string[]>([initialPath])
  const [historyIndex, setHistoryIndex] = useState(0)
  const { addWindow } = useWindowStore()

  useEffect(() => {
    loadPath(currentPath)
  }, [currentPath])

  const loadPath = (path: string) => {
    if (path === '/Desktop') {
      setCurrentItems(getDesktopItems())
    } else {
      const item = findFileByPath(path)
      if (item?.children) {
        setCurrentItems(item.children)
      }
    }
  }

  const navigateTo = (path: string) => {
    const newHistory = navigationHistory.slice(0, historyIndex + 1)
    newHistory.push(path)
    setNavigationHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
    setCurrentPath(path)
    setSelectedItem(null)
  }

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setCurrentPath(navigationHistory[newIndex])
      setSelectedItem(null)
    }
  }

  const handleItemClick = (item: FileSystemItem) => {
    setSelectedItem(item)
  }

  const handleItemDoubleClick = (item: FileSystemItem) => {
    if (item.type === 'folder') {
      navigateTo(item.path)
    } else if (item.type === 'txt' || item.type === 'md' || item.type === 'json') {
      // Open in notepad
      addWindow({
        id: `notepad-${item.id}`,
        title: `${item.name} - Notepad`,
        icon: '📝',
        appType: 'notepad',
        isMaximized: false,
        isMinimized: false,
        position: { x: 200, y: 150 },
        size: { width: 700, height: 500 },
        content: item,
      })
    } else if (item.type === 'exe') {
      // Open project viewer
      addWindow({
        id: `project-${item.id}`,
        title: item.name.replace('.exe', ''),
        icon: '💼',
        appType: 'project-viewer',
        isMaximized: false,
        isMinimized: false,
        position: { x: 180, y: 120 },
        size: { width: 850, height: 650 },
        content: item,
      })
    } else if (item.type === 'shortcut' && item.target) {
      if (item.target.startsWith('http') || item.target.startsWith('mailto:')) {
        window.open(item.target, '_blank')
      } else {
        navigateTo(item.target)
      }
    }
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'folder':
        return <Folder className="w-4 h-4 text-yellow-500" />
      case 'txt':
        return <FileText className="w-4 h-4 text-blue-500" />
      case 'md':
        return <FileText className="w-4 h-4 text-purple-500" />
      case 'json':
        return <FileJson className="w-4 h-4 text-green-500" />
      case 'exe':
        return <span className="text-lg">💼</span>
      case 'shortcut':
        return <LinkIcon className="w-4 h-4 text-blue-500" />
      default:
        return <File className="w-4 h-4 text-gray-500" />
    }
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '--'
    const kb = bytes / 1024
    if (kb < 1024) return `${kb.toFixed(1)} KB`
    return `${(kb / 1024).toFixed(1)} MB`
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const pathSegments = currentPath.split('/').filter(Boolean)

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Navigation Bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={goBack}
          disabled={historyIndex === 0}
          className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed smooth-transition"
          aria-label="Back"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>

        {/* Breadcrumb */}
        <div className="flex items-center gap-1 flex-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
          <Home className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          {pathSegments.map((segment, index) => (
            <div key={index} className="flex items-center gap-1">
              <ChevronRight className="w-3 h-3 text-gray-400" />
              <button
                onClick={() => {
                  const path = '/' + pathSegments.slice(0, index + 1).join('/')
                  navigateTo(path)
                }}
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 smooth-transition"
              >
                {segment}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-1 gap-1">
          {currentItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              onDoubleClick={() => handleItemDoubleClick(item)}
              className={`
                flex items-center gap-3 px-3 py-2 rounded cursor-pointer smooth-transition
                ${selectedItem?.id === item.id ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}
              `}
            >
              <div className="flex-shrink-0">{getFileIcon(item.type)}</div>
              <div className="flex-1 min-w-0">
                <span className="text-sm text-gray-800 dark:text-gray-200">
                  {item.name}
                </span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 w-24 text-right">
                {formatDate(item.dateModified)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 w-20 text-right">
                {item.type === 'folder' ? '--' : formatFileSize(item.size)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Pane */}
      {selectedItem && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50">
          <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
            {selectedItem.name}
          </h4>
          <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <p>Type: {selectedItem.type.toUpperCase()}</p>
            <p>Modified: {formatDate(selectedItem.dateModified)}</p>
            {selectedItem.size && <p>Size: {formatFileSize(selectedItem.size)}</p>}
            {selectedItem.metadata?.description && (
              <p className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                {selectedItem.metadata.description}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
