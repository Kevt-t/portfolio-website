'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Minus, Square, X, Maximize2 } from 'lucide-react'
import { useWindowStore } from '@/store/useWindowStore'
import { WindowState } from '@/types'

interface WindowProps {
  window: WindowState
  children: React.ReactNode
}

export default function Window({ window, children }: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  const {
    setActiveWindow,
    removeWindow,
    toggleMaximize,
    toggleMinimize,
    updateWindowPosition,
    updateWindowSize,
  } = useWindowStore()

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - dragOffset.x
      const newY = Math.max(0, e.clientY - dragOffset.y)
      updateWindowPosition(window.id, { x: newX, y: newY })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragOffset, window.id, updateWindowPosition])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.window-title')) {
      const rect = windowRef.current?.getBoundingClientRect()
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
        setIsDragging(true)
        setActiveWindow(window.id)
      }
    }
  }

  const handleDoubleClick = () => {
    toggleMaximize(window.id)
  }

  if (window.isMinimized) {
    return null
  }

  const windowStyle = window.isMaximized
    ? { top: 0, left: 0, width: '100vw', height: 'calc(100vh - 48px)' }
    : {
        top: window.position.y,
        left: window.position.x,
        width: window.size.width,
        height: window.size.height,
      }

  return (
    <motion.div
      ref={windowRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className="absolute flex flex-col bg-white dark:bg-gray-800 rounded-win11 win11-shadow overflow-hidden"
      style={{
        ...windowStyle,
        zIndex: window.zIndex,
      }}
      onMouseDown={() => setActiveWindow(window.id)}
    >
      {/* Title Bar */}
      <div
        className="window-title flex items-center justify-between h-10 px-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 cursor-move no-select"
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{window.icon}</span>
          <span className="text-sm font-normal text-gray-800 dark:text-gray-200">
            {window.title}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => toggleMinimize(window.id)}
            className="w-11 h-8 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center justify-center smooth-transition"
            aria-label="Minimize"
          >
            <Minus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </button>
          <button
            onClick={() => toggleMaximize(window.id)}
            className="w-11 h-8 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center justify-center smooth-transition"
            aria-label={window.isMaximized ? 'Restore' : 'Maximize'}
          >
            {window.isMaximized ? (
              <Square className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300" />
            )}
          </button>
          <button
            onClick={() => removeWindow(window.id)}
            className="w-11 h-8 hover:bg-red-500 hover:text-white rounded flex items-center justify-center smooth-transition"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto">{children}</div>
    </motion.div>
  )
}
