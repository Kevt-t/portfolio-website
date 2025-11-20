'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Wifi, Volume2, Battery, Moon, Sun } from 'lucide-react'
import { useWindowStore } from '@/store/useWindowStore'
import { useUIStore } from '@/store/useUIStore'
import { useThemeStore } from '@/store/useThemeStore'
import { installedApps } from '@/data/apps'
import WindowPreview from './WindowPreview'
import { AppType } from '@/types'

export default function Taskbar() {
  const { windows, toggleMinimize, setActiveWindow, activeWindowId } = useWindowStore()
  const { toggleStartMenu, isStartMenuOpen } = useUIStore()
  const { theme, toggleTheme } = useThemeStore()

  const [hoveredApp, setHoveredApp] = useState<AppType | null>(null)
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 })
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
      }
    }
  }, [])

  const handleAppClick = (windowId: string) => {
    const window = windows.find((w) => w.id === windowId)
    if (window) {
      // Windows 11 behavior:
      // 1. If minimized → restore and focus
      // 2. If focused (active) → minimize
      // 3. If not focused → focus
      if (window.isMinimized) {
        toggleMinimize(windowId)
        setActiveWindow(windowId)
      } else if (activeWindowId === windowId) {
        toggleMinimize(windowId)
      } else {
        setActiveWindow(windowId)
      }
    }
  }

  const handleAppGroupClick = (appType: AppType) => {
    const appWindows = windows.filter(w => w.appType === appType)

    if (appWindows.length === 1) {
      // Single window - use normal behavior
      handleAppClick(appWindows[0].id)
    } else if (appWindows.length > 1) {
      // Multiple windows - find active or first non-minimized
      const activeWindow = appWindows.find(w => w.id === activeWindowId && !w.isMinimized)
      const firstNonMinimized = appWindows.find(w => !w.isMinimized)

      if (activeWindow) {
        // Active window exists - minimize it
        toggleMinimize(activeWindow.id)
      } else if (firstNonMinimized) {
        // Focus first non-minimized window
        setActiveWindow(firstNonMinimized.id)
      } else {
        // All minimized - restore first one
        toggleMinimize(appWindows[0].id)
        setActiveWindow(appWindows[0].id)
      }
    }
  }

  const handleMouseEnter = (appType: AppType, event: React.MouseEvent<HTMLButtonElement>) => {
    const appWindows = windows.filter(w => w.appType === appType)

    // Only show preview if multiple windows exist
    if (appWindows.length > 1) {
      const rect = event.currentTarget.getBoundingClientRect()

      // Clear any existing timeout
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
        hideTimeoutRef.current = null
      }

      // Delay before showing preview (like Windows 11)
      hoverTimeoutRef.current = setTimeout(() => {
        setPreviewPosition({
          x: rect.left + rect.width / 2,
          y: rect.top
        })
        setHoveredApp(appType)
      }, 500) // 500ms delay
    }
  }

  const handleMouseLeave = () => {
    // Clear timeout if mouse leaves before preview shows
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    
    // Delay hiding to allow moving to preview
    hideTimeoutRef.current = setTimeout(() => {
      setHoveredApp(null)
    }, 200)
  }

  const formatTime = () => {
    const now = new Date()
    return now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  const formatDate = () => {
    const now = new Date()
    return now.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 flex items-center justify-center z-[9999]">
      {/* Taskbar Background */}
      <div className="absolute inset-0 bg-win11-taskbar-light dark:bg-win11-taskbar-dark backdrop-blur-win11" />

      {/* Taskbar Content */}
      <div className="relative flex items-center gap-1 px-2">
        {/* Start Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleStartMenu}
          className={`
            w-12 h-10 flex items-center justify-center rounded
            ${isStartMenuOpen ? 'bg-blue-100 dark:bg-blue-900' : 'hover:bg-white/10'}
            smooth-transition
          `}
          aria-label="Start"
        >
          <svg
            className="w-6 h-6 text-blue-500 dark:text-blue-400"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        </motion.button>

        {/* Search Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-10 flex items-center justify-center rounded hover:bg-white/10 smooth-transition"
          aria-label="Search"
        >
          <Search className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </motion.button>

        {/* Pinned Apps */}
        {installedApps
          .filter((app) => app.isPinned)
          .map((app) => {
            const appWindows = windows.filter((w) => w.appType === app.type)
            const hasMultipleWindows = appWindows.length > 1
            const firstWindow = appWindows[0]
            const isAnyActive = appWindows.some(w => !w.isMinimized && activeWindowId === w.id)
            const isRunning = appWindows.length > 0
            const hasMinimized = appWindows.some(w => w.isMinimized)

            return (
              <motion.button
                key={app.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAppGroupClick(app.type)}
                onMouseEnter={(e) => handleMouseEnter(app.type, e)}
                onMouseLeave={handleMouseLeave}
                className={`
                  w-12 h-10 flex items-center justify-center rounded relative
                  ${isAnyActive ? 'bg-blue-100 dark:bg-blue-900' : 'hover:bg-white/10'}
                  smooth-transition
                `}
                aria-label={app.name}
                title={hasMultipleWindows ? `${app.name} (${appWindows.length} windows)` : (firstWindow?.isMinimized ? `${app.name} (Minimized)` : app.name)}
              >
                <span className={`text-xl ${hasMinimized && !isAnyActive ? 'opacity-60' : ''}`}>
                  {app.icon}
                </span>
                {/* Active window - full underline */}
                {isAnyActive && (
                  <div className="absolute bottom-0 w-6 h-0.5 bg-blue-500 dark:bg-blue-400 rounded-t" />
                )}
                {/* Minimized/running indicator - dotted underline */}
                {isRunning && !isAnyActive && (
                  <div className="absolute bottom-0 w-6 h-0.5 bg-blue-500/50 dark:bg-blue-400/50 rounded-t"
                       style={{ backgroundImage: 'linear-gradient(to right, currentColor 50%, transparent 50%)', backgroundSize: '4px 100%' }} />
                )}
                {/* Multiple windows indicator */}
                {hasMultipleWindows && (
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full" />
                )}
              </motion.button>
            )
          })}

        {/* Running Apps (grouped by type) */}
        {Array.from(new Set(windows
          .filter(w => !installedApps.some(app => app.isPinned && app.type === w.appType))
          .map(w => w.appType)))
          .map((appType) => {
            const appWindows = windows.filter(w => w.appType === appType && !installedApps.some(app => app.isPinned && app.type === appType))
            const hasMultipleWindows = appWindows.length > 1
            const firstWindow = appWindows[0]
            const isAnyActive = appWindows.some(w => !w.isMinimized && activeWindowId === w.id)
            const hasMinimized = appWindows.some(w => w.isMinimized)

            if (!firstWindow) return null

            return (
              <motion.button
                key={appType}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAppGroupClick(appType)}
                onMouseEnter={(e) => handleMouseEnter(appType, e)}
                onMouseLeave={handleMouseLeave}
                className={`
                  w-12 h-10 flex items-center justify-center rounded relative
                  ${isAnyActive ? 'bg-blue-100 dark:bg-blue-900' : 'hover:bg-white/10'}
                  smooth-transition
                `}
                aria-label={firstWindow.title}
                title={hasMultipleWindows ? `${firstWindow.title.split(' - ')[1] || firstWindow.title} (${appWindows.length} windows)` : (firstWindow.isMinimized ? `${firstWindow.title} (Minimized)` : firstWindow.title)}
              >
                <span className={`text-xl ${hasMinimized && !isAnyActive ? 'opacity-60' : ''}`}>
                  {firstWindow.icon}
                </span>
                {/* Active window - full underline */}
                {isAnyActive && (
                  <div className="absolute bottom-0 w-6 h-0.5 bg-blue-500 dark:bg-blue-400 rounded-t" />
                )}
                {/* Minimized/running indicator - dotted underline */}
                {!isAnyActive && (
                  <div className="absolute bottom-0 w-6 h-0.5 bg-blue-500/50 dark:bg-blue-400/50 rounded-t"
                       style={{ backgroundImage: 'linear-gradient(to right, currentColor 50%, transparent 50%)', backgroundSize: '4px 100%' }} />
                )}
                {/* Multiple windows indicator */}
                {hasMultipleWindows && (
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full" />
                )}
              </motion.button>
            )
          })}
      </div>

      {/* System Tray */}
      <div className="absolute right-0 flex items-center gap-2 px-3 h-full">
        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="hover:bg-white/10 rounded p-1 smooth-transition"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-yellow-400" />
          ) : (
            <Moon className="w-4 h-4 text-gray-700" />
          )}
        </motion.button>

        {/* System Icons */}
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <Wifi className="w-4 h-4" />
          <Volume2 className="w-4 h-4" />
          <Battery className="w-4 h-4" />
        </div>

        {/* Date & Time */}
        <div className="text-xs text-gray-700 dark:text-gray-300 ml-2 flex flex-col items-end no-select">
          <span className="font-medium">{formatTime()}</span>
          <span>{formatDate()}</span>
        </div>
      </div>

      {/* Window Preview */}
      <AnimatePresence>
        {hoveredApp && (
          <div
            onMouseEnter={() => {
              if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current)
              }
              if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current)
                hideTimeoutRef.current = null
              }
            }}
            onMouseLeave={handleMouseLeave}
          >
            {/* Invisible bridge to prevent preview from closing when moving mouse */}
            <div
              className="fixed bottom-0 h-14 pointer-events-auto"
              style={{
                left: previewPosition.x - 100,
                width: 200,
                zIndex: 59,
              }}
            />
            <WindowPreview
              windows={windows.filter(w => w.appType === hoveredApp)}
              position={previewPosition}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
