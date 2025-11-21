'use client'

import { useState, useEffect } from 'react'
import { ChevronRight, Home, ChevronLeft, Folder, File, FileText, FileJson, Link as LinkIcon, Gamepad2 } from 'lucide-react'
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

  // Portrait-aware window sizing
  const getResponsiveWindowSize = () => {
    const vw = globalThis.innerWidth
    const vh = globalThis.innerHeight
    const isPortrait = vh > vw

    if (isPortrait && vw < 768) {
      return {
        width: Math.min(vw - 40, 500),
        height: Math.min(vh - 120, 550),
        x: 20,
        y: 20
      }
    } else if (vw < 768) {
      return {
        width: Math.min(vw - 60, 650),
        height: Math.min(vh - 100, 450),
        x: 30,
        y: 20
      }
    }
    return { width: 700, height: 500, x: 200, y: 150 }
  }

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

  // Touch double-tap support
  const [lastTap, setLastTap] = useState(0)
  const handleItemTouch = (item: FileSystemItem) => {
    const now = Date.now()
    const DOUBLE_TAP_DELAY = 300

    if (now - lastTap < DOUBLE_TAP_DELAY && selectedItem?.id === item.id) {
      handleItemDoubleClick(item)
      setLastTap(0)
    } else {
      setLastTap(now)
      handleItemClick(item)
    }
  }

  const handleItemDoubleClick = (item: FileSystemItem) => {
    if (item.icon === 'game') return

    const windowSize = getResponsiveWindowSize()

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
        position: { x: windowSize.x, y: windowSize.y },
        size: { width: windowSize.width, height: windowSize.height },
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
        position: { x: windowSize.x + 10, y: windowSize.y + 10 },
        size: { width: windowSize.width, height: windowSize.height },
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

  const getFileIcon = (item: FileSystemItem) => {
    if (item.icon === 'game') {
      const getGameIconPath = (name: string) => {
        switch (name) {
          case 'Alien Isolation': return '/gameicons/alien.png'
          case 'Dying Light': return '/gameicons/dyingLight.png'
          case 'Left 4 Dead 2': return '/gameicons/lfd2.png'
          case 'Star Wars Battlefront': return '/gameicons/starwarsbattlefront.png'
          default: return null
        }
      }
      
      const iconPath = getGameIconPath(item.name)
      if (iconPath) {
        return <img src={iconPath} alt={item.name} className="w-4 h-4 object-contain" />
      }
      return <Gamepad2 className="w-4 h-4 text-purple-500" />
    }

    switch (item.type) {
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
      <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={goBack}
          disabled={historyIndex === 0}
          className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed smooth-transition touch-target flex-shrink-0"
          aria-label="Back"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>

        {/* Breadcrumb - Scrollable on mobile */}
        <div className="flex items-center gap-0.5 sm:gap-1 flex-1 px-1.5 sm:px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded overflow-x-auto mobile-hide-scrollbar">
          <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-400 flex-shrink-0" />
          {pathSegments.map((segment, index) => (
            <div key={index} className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
              <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400" />
              <button
                onClick={() => {
                  const path = '/' + pathSegments.slice(0, index + 1).join('/')
                  navigateTo(path)
                }}
                className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 smooth-transition whitespace-nowrap"
              >
                {segment}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-auto p-2 sm:p-4">
        <div className="grid grid-cols-1 gap-0.5 sm:gap-1">
          {currentItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              onDoubleClick={() => handleItemDoubleClick(item)}
              onTouchEnd={() => handleItemTouch(item)}
              className={`
                flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded cursor-pointer smooth-transition touch-target
                ${selectedItem?.id === item.id ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}
              `}
            >
              <div className="flex-shrink-0">{getFileIcon(item)}</div>
              <div className="flex-1 min-w-0">
                <span className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 truncate block">
                  {item.name}
                </span>
              </div>
              <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 w-16 sm:w-24 text-right flex-shrink-0">
                {formatDate(item.dateModified)}
              </div>
              <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 w-12 sm:w-20 text-right flex-shrink-0">
                {item.type === 'folder' ? '--' : formatFileSize(item.size)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Pane - Hidden on mobile */}
      {selectedItem && (
        <div className="hidden sm:block border-t border-gray-200 dark:border-gray-700 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50">
          <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2 truncate">
            {selectedItem.name}
          </h4>
          <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <p>Type: {selectedItem.type.toUpperCase()}</p>
            <p>Modified: {formatDate(selectedItem.dateModified)}</p>
            {selectedItem.size && <p>Size: {formatFileSize(selectedItem.size)}</p>}
            {selectedItem.metadata?.description && (
              <p className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 line-clamp-3">
                {selectedItem.metadata.description}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
