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
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0, windowX: 0, windowY: 0 })

  const {
    setActiveWindow,
    removeWindow,
    toggleMaximize,
    toggleMinimize,
    updateWindowPosition,
    updateWindowSize,
  } = useWindowStore()

  useEffect(() => {
    if (!isDragging && !isResizing) return

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.x
        const newY = Math.max(0, e.clientY - dragOffset.y)
        updateWindowPosition(window.id, { x: newX, y: newY })
      } else if (isResizing && resizeDirection) {
        let newWidth = resizeStart.width
        let newHeight = resizeStart.height
        let newX = resizeStart.windowX
        let newY = resizeStart.windowY
        const deltaX = e.clientX - resizeStart.x
        const deltaY = e.clientY - resizeStart.y

        if (resizeDirection.includes('e')) {
          newWidth = Math.max(300, resizeStart.width + deltaX)
        }
        if (resizeDirection.includes('s')) {
          newHeight = Math.max(200, resizeStart.height + deltaY)
        }
        if (resizeDirection.includes('w')) {
          const proposedWidth = resizeStart.width - deltaX
          if (proposedWidth >= 300) {
            newWidth = proposedWidth
            newX = resizeStart.windowX + deltaX
          }
        }
        if (resizeDirection.includes('n')) {
          const proposedHeight = resizeStart.height - deltaY
          if (proposedHeight >= 200) {
            newHeight = proposedHeight
            newY = resizeStart.windowY + deltaY
          }
        }

        updateWindowSize(window.id, { width: newWidth, height: newHeight })
        if (newX !== resizeStart.windowX || newY !== resizeStart.windowY) {
          updateWindowPosition(window.id, { x: newX, y: newY })
        }
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
      setResizeDirection(null)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, isResizing, resizeDirection, dragOffset, resizeStart, window.id, updateWindowPosition, updateWindowSize])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.window-title')) {
      const rect = windowRef.current?.getBoundingClientRect()
      
      if (window.isMaximized && rect) {
        // If maximized, we need to calculate where the mouse would be relative to the RESTORED window width
        // Windows logic: Mouse stays at the same percentage across the width
        const mouseXRatio = (e.clientX - rect.left) / rect.width
        const newWidth = window.size.width
        const newX = e.clientX - (newWidth * mouseXRatio)
        
        toggleMaximize(window.id)
        // We need to defer the drag start slightly to let the state update
        requestAnimationFrame(() => {
          updateWindowPosition(window.id, { x: newX, y: e.clientY - (e.clientY - rect.top) }) // Keep Y relative to top
          setDragOffset({
            x: newWidth * mouseXRatio, // Offset is based on the new relative position
            y: e.clientY - rect.top,
          })
          setIsDragging(true)
          setActiveWindow(window.id)
        })
      } else if (rect) {
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

  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation()
    e.preventDefault()
    setIsResizing(true)
    setResizeDirection(direction)
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: window.size.width,
      height: window.size.height,
      windowX: window.position.x,
      windowY: window.position.y,
    })
    setActiveWindow(window.id)
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
        className="window-title flex items-center justify-between h-10 pl-3 pr-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 cursor-move no-select"
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{window.icon}</span>
          <span className="text-sm font-normal text-gray-800 dark:text-gray-200">
            {window.title}
          </span>
        </div>
        <div className="flex items-center h-full">
          <button
            onClick={() => toggleMinimize(window.id)}
            onMouseDown={(e) => e.stopPropagation()}
            onDoubleClick={(e) => e.stopPropagation()}
            className="w-12 h-full hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center smooth-transition"
            aria-label="Minimize"
          >
            <Minus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </button>
          <button
            onClick={() => toggleMaximize(window.id)}
            onMouseDown={(e) => e.stopPropagation()}
            onDoubleClick={(e) => e.stopPropagation()}
            className="w-12 h-full hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center smooth-transition"
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
            onMouseDown={(e) => e.stopPropagation()}
            onDoubleClick={(e) => e.stopPropagation()}
            className="w-12 h-full hover:bg-red-500 hover:text-white flex items-center justify-center smooth-transition"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto">{children}</div>

      {/* Resize Handles */}
      {!window.isMaximized && (
        <>
          {/* Corners */}
          <div
            className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize z-50"
            onMouseDown={(e) => handleResizeStart(e, 'nw')}
          />
          <div
            className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize z-50"
            onMouseDown={(e) => handleResizeStart(e, 'ne')}
          />
          <div
            className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize z-50"
            onMouseDown={(e) => handleResizeStart(e, 'sw')}
          />
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-50"
            onMouseDown={(e) => handleResizeStart(e, 'se')}
          />

          {/* Edges */}
          <div
            className="absolute top-0 left-4 right-4 h-2 cursor-n-resize z-40"
            onMouseDown={(e) => handleResizeStart(e, 'n')}
          />
          <div
            className="absolute bottom-0 left-4 right-4 h-2 cursor-s-resize z-40"
            onMouseDown={(e) => handleResizeStart(e, 's')}
          />
          <div
            className="absolute left-0 top-4 bottom-4 w-2 cursor-w-resize z-40"
            onMouseDown={(e) => handleResizeStart(e, 'w')}
          />
          <div
            className="absolute right-0 top-4 bottom-4 w-2 cursor-e-resize z-40"
            onMouseDown={(e) => handleResizeStart(e, 'e')}
          />
        </>
      )}
    </motion.div>
  )
}
