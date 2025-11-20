'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { WindowState } from '@/types'
import { useWindowStore } from '@/store/useWindowStore'
import FileExplorer from './apps/FileExplorer'
import Notepad from './apps/Notepad'
import Calculator from './apps/Calculator'
import Browser from './apps/Browser'
import Settings from './apps/Settings'
import ProjectViewer from './apps/ProjectViewer'

interface WindowPreviewProps {
  windows: WindowState[]
  position: { x: number; y: number }
}

export default function WindowPreview({ windows, position }: WindowPreviewProps) {
  const { setActiveWindow, toggleMinimize, removeWindow, activeWindowId } = useWindowStore()

  const handleWindowClick = (window: WindowState) => {
    if (window.isMinimized) {
      toggleMinimize(window.id)
    }
    setActiveWindow(window.id)
  }

  const handleClose = (e: React.MouseEvent, windowId: string) => {
    e.stopPropagation()
    removeWindow(windowId)
  }

  const renderPreviewContent = (window: WindowState) => {
    switch (window.appType) {
      case 'file-explorer':
        return <FileExplorer initialPath={window.path} />
      case 'notepad':
        return <Notepad file={window.content} />
      case 'calculator':
        return <Calculator />
      case 'browser':
        return <Browser />
      case 'settings':
        return <Settings />
      case 'project-viewer':
        return <ProjectViewer project={window.content} />
      case 'about':
        return (
          <div className="p-8 bg-white dark:bg-gray-900 h-full">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              About This Portfolio
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This portfolio is designed as a fully functional Windows 11 desktop environment.
            </p>
          </div>
        )
      default:
        return (
          <div className="flex items-center justify-center h-full bg-white dark:bg-gray-900">
            <span className="text-4xl">{window.icon}</span>
          </div>
        )
    }
  }

  // Calculate position to center above the taskbar button
  const previewWidth = Math.min(windows.length * 180 + (windows.length - 1) * 8, 600)
  const adjustedX = position.x - previewWidth / 2

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className="fixed z-[10000] pointer-events-auto"
      style={{
        left: Math.max(8, Math.min(adjustedX, window.innerWidth - previewWidth - 8)),
        bottom: 52, // Closer to taskbar to reduce gap
      }}
    >
      <div className="bg-win11-taskbar-light dark:bg-win11-taskbar-dark backdrop-blur-win11 rounded-win11 win11-shadow border border-gray-200/50 dark:border-gray-700/50 p-3">
        <div className="flex gap-2">
          {windows.map((window) => {
            const isActive = activeWindowId === window.id && !window.isMinimized

            return (
              <motion.div
                key={window.id}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`
                  relative flex flex-col w-44 rounded-win11-sm overflow-hidden cursor-pointer group
                  ${isActive ? 'ring-2 ring-blue-500' : 'hover:ring-2 hover:ring-blue-300 dark:hover:ring-blue-600'}
                  smooth-transition
                `}
                onClick={() => handleWindowClick(window)}
              >
                {/* Window Preview/Thumbnail */}
                <div className={`
                  relative h-28 bg-white dark:bg-gray-900
                  overflow-hidden
                  ${window.isMinimized ? 'opacity-60' : ''}
                `}>
                  {/* Scaled Content */}
                  <div 
                    className="absolute top-0 left-0 origin-top-left pointer-events-none"
                    style={{ 
                      width: '500%', 
                      height: '500%', 
                      transform: 'scale(0.2)' 
                    }}
                  >
                    {renderPreviewContent(window)}
                  </div>

                  {/* Minimized overlay */}
                  {window.isMinimized && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10" />
                  )}

                  {/* Close button */}
                  <div
                    onClick={(e) => handleClose(e, window.id)}
                    className="absolute top-1 right-1 w-6 h-6 bg-red-500/80 hover:bg-red-600 rounded-sm flex items-center justify-center opacity-0 group-hover:opacity-100 smooth-transition cursor-pointer z-20"
                    role="button"
                    aria-label="Close"
                  >
                    <X className="w-3 h-3 text-white" />
                  </div>
                </div>

                {/* Window Title */}
                <div className="bg-white dark:bg-gray-800 px-2 py-1.5 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-800 dark:text-gray-200 font-medium truncate text-center">
                    {window.title}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
