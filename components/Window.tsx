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
  const [isPinching, setIsPinching] = useState(false)
  const [resizeDirection, setResizeDirection] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0, windowX: 0, windowY: 0 })
  const [pinchStart, setPinchStart] = useState({ dist: 0, width: 0, height: 0, x: 0, y: 0 })

  const {
    setActiveWindow,
    removeWindow,
    toggleMaximize,
    toggleMinimize,
    updateWindowPosition,
    updateWindowSize,
  } = useWindowStore()

  useEffect(() => {
    if (!isDragging && !isResizing && !isPinching) return

    const minWidth = globalThis.innerWidth < 640 ? 250 : 300 // Smaller min on mobile
    const minHeight = globalThis.innerWidth < 640 ? 150 : 200

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
          newWidth = Math.max(minWidth, resizeStart.width + deltaX)
        }
        if (resizeDirection.includes('s')) {
          newHeight = Math.max(minHeight, resizeStart.height + deltaY)
        }
        if (resizeDirection.includes('w')) {
          const proposedWidth = resizeStart.width - deltaX
          if (proposedWidth >= minWidth) {
            newWidth = proposedWidth
            newX = resizeStart.windowX + deltaX
          }
        }
        if (resizeDirection.includes('n')) {
          const proposedHeight = resizeStart.height - deltaY
          if (proposedHeight >= minHeight) {
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

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging || isResizing || isPinching) {
        e.preventDefault() // Prevent scrolling while dragging/resizing
      }

      if (isPinching && e.touches.length === 2) {
        const touch1 = e.touches[0]
        const touch2 = e.touches[1]
        const dist = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY)
        
        const scale = dist / pinchStart.dist
        const newWidth = Math.max(minWidth, pinchStart.width * scale)
        const newHeight = Math.max(minHeight, pinchStart.height * scale)
        
        // Center resize around the window center
        const deltaW = newWidth - pinchStart.width
        const deltaH = newHeight - pinchStart.height
        const newX = pinchStart.x - deltaW / 2
        const newY = pinchStart.y - deltaH / 2

        updateWindowSize(window.id, { width: newWidth, height: newHeight })
        updateWindowPosition(window.id, { x: newX, y: newY })
        return
      }

      const touch = e.touches[0]
      if (!touch) return

      if (isDragging) {
        const newX = touch.clientX - dragOffset.x
        const newY = Math.max(0, touch.clientY - dragOffset.y)
        updateWindowPosition(window.id, { x: newX, y: newY })
      } else if (isResizing && resizeDirection) {
        let newWidth = resizeStart.width
        let newHeight = resizeStart.height
        let newX = resizeStart.windowX
        let newY = resizeStart.windowY
        const deltaX = touch.clientX - resizeStart.x
        const deltaY = touch.clientY - resizeStart.y

        if (resizeDirection.includes('e')) {
          newWidth = Math.max(minWidth, resizeStart.width + deltaX)
        }
        if (resizeDirection.includes('s')) {
          newHeight = Math.max(minHeight, resizeStart.height + deltaY)
        }
        if (resizeDirection.includes('w')) {
          const proposedWidth = resizeStart.width - deltaX
          if (proposedWidth >= minWidth) {
            newWidth = proposedWidth
            newX = resizeStart.windowX + deltaX
          }
        }
        if (resizeDirection.includes('n')) {
          const proposedHeight = resizeStart.height - deltaY
          if (proposedHeight >= minHeight) {
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

    const handleEnd = () => {
      setIsDragging(false)
      setIsResizing(false)
      setIsPinching(false)
      setResizeDirection(null)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleEnd)
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleEnd)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleEnd)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleEnd)
    }
  }, [isDragging, isResizing, isPinching, resizeDirection, dragOffset, resizeStart, pinchStart, window.id, updateWindowPosition, updateWindowSize])

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

  const handleTouchStart = (e: React.TouchEvent) => {
    // Check for pinch first
    if (e.touches.length === 2) {
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const dist = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY)
      
      setIsPinching(true)
      setIsDragging(false)
      setIsResizing(false)
      
      setPinchStart({
        dist,
        width: window.size.width,
        height: window.size.height,
        x: window.position.x,
        y: window.position.y,
      })
      return
    }

    const touch = e.touches[0]
    if (!touch) return

    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.window-title')) {
      const rect = windowRef.current?.getBoundingClientRect()

      if (window.isMaximized && rect) {
        const touchXRatio = (touch.clientX - rect.left) / rect.width
        const newWidth = window.size.width
        const newX = touch.clientX - (newWidth * touchXRatio)

        toggleMaximize(window.id)
        requestAnimationFrame(() => {
          updateWindowPosition(window.id, { x: newX, y: touch.clientY - (touch.clientY - rect.top) })
          setDragOffset({
            x: newWidth * touchXRatio,
            y: touch.clientY - rect.top,
          })
          setIsDragging(true)
          setActiveWindow(window.id)
        })
      } else if (rect) {
        setDragOffset({
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
        })
        setIsDragging(true)
        setActiveWindow(window.id)
      }
    }
  }

  const handleContentTouchStart = (e: React.TouchEvent) => {
    setActiveWindow(window.id)
    if (e.touches.length === 2) {
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const dist = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY)
      
      setIsPinching(true)
      setIsDragging(false)
      setIsResizing(false)
      
      setPinchStart({
        dist,
        width: window.size.width,
        height: window.size.height,
        x: window.position.x,
        y: window.position.y,
      })
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

  const handleResizeTouchStart = (e: React.TouchEvent, direction: string) => {
    e.stopPropagation()
    e.preventDefault()
    const touch = e.touches[0]
    if (!touch) return

    setIsResizing(true)
    setResizeDirection(direction)
    setResizeStart({
      x: touch.clientX,
      y: touch.clientY,
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
      onTouchStart={handleContentTouchStart}
    >
      {/* Title Bar */}
      <div
        className="window-title flex items-center justify-between min-h-[44px] sm:h-10 pl-2 sm:pl-3 pr-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 cursor-move no-select"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onDoubleClick={handleDoubleClick}
      >
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
          <span className="text-base sm:text-lg flex-shrink-0">{window.icon}</span>
          <span className="text-xs sm:text-sm font-normal text-gray-800 dark:text-gray-200 truncate">
            {window.title}
          </span>
        </div>
        <div className="flex items-center h-full flex-shrink-0 relative z-[60]">
          <button
            onClick={() => toggleMinimize(window.id)}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onDoubleClick={(e) => e.stopPropagation()}
            className="min-w-[44px] sm:w-12 h-full hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center smooth-transition"
            aria-label="Minimize"
          >
            <Minus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </button>
          <button
            onClick={() => toggleMaximize(window.id)}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onDoubleClick={(e) => e.stopPropagation()}
            className="min-w-[44px] sm:w-12 h-full hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center smooth-transition"
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
            onTouchStart={(e) => e.stopPropagation()}
            onDoubleClick={(e) => e.stopPropagation()}
            className="min-w-[44px] sm:w-12 h-full hover:bg-red-500 flex items-center justify-center smooth-transition"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-gray-700 dark:text-gray-100 group-hover:text-white" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto">{children}</div>

      {/* Resize Handles - Larger hit areas on mobile */}
      {!window.isMaximized && (
        <>
          {/* Corners - 6px on mobile, 4px on desktop */}
          <div
            className="absolute top-0 left-0 w-6 h-6 sm:w-4 sm:h-4 cursor-nw-resize z-50 touch-none"
            onMouseDown={(e) => handleResizeStart(e, 'nw')}
            onTouchStart={(e) => handleResizeTouchStart(e, 'nw')}
          />
          <div
            className="absolute top-0 right-0 w-6 h-6 sm:w-4 sm:h-4 cursor-ne-resize z-50 touch-none"
            onMouseDown={(e) => handleResizeStart(e, 'ne')}
            onTouchStart={(e) => handleResizeTouchStart(e, 'ne')}
          />
          <div
            className="absolute bottom-0 left-0 w-6 h-6 sm:w-4 sm:h-4 cursor-sw-resize z-50 touch-none"
            onMouseDown={(e) => handleResizeStart(e, 'sw')}
            onTouchStart={(e) => handleResizeTouchStart(e, 'sw')}
          />
          <div
            className="absolute bottom-0 right-0 w-6 h-6 sm:w-4 sm:h-4 cursor-se-resize z-50 touch-none"
            onMouseDown={(e) => handleResizeStart(e, 'se')}
            onTouchStart={(e) => handleResizeTouchStart(e, 'se')}
          />

          {/* Edges - 3px on mobile, 2px on desktop */}
          <div
            className="absolute top-0 left-6 right-6 sm:left-4 sm:right-4 h-3 sm:h-2 cursor-n-resize z-40 touch-none"
            onMouseDown={(e) => handleResizeStart(e, 'n')}
            onTouchStart={(e) => handleResizeTouchStart(e, 'n')}
          />
          <div
            className="absolute bottom-0 left-6 right-6 sm:left-4 sm:right-4 h-3 sm:h-2 cursor-s-resize z-40 touch-none"
            onMouseDown={(e) => handleResizeStart(e, 's')}
            onTouchStart={(e) => handleResizeTouchStart(e, 's')}
          />
          <div
            className="absolute left-0 top-6 bottom-6 sm:top-4 sm:bottom-4 w-3 sm:w-2 cursor-w-resize z-40 touch-none"
            onMouseDown={(e) => handleResizeStart(e, 'w')}
            onTouchStart={(e) => handleResizeTouchStart(e, 'w')}
          />
          <div
            className="absolute right-0 top-6 bottom-6 sm:top-4 sm:bottom-4 w-3 sm:w-2 cursor-e-resize z-40 touch-none"
            onMouseDown={(e) => handleResizeStart(e, 'e')}
            onTouchStart={(e) => handleResizeTouchStart(e, 'e')}
          />
        </>
      )}
    </motion.div>
  )
}
