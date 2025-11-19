'use client'

import { motion } from 'framer-motion'
import { Search, Wifi, Volume2, Battery, Moon, Sun } from 'lucide-react'
import { useWindowStore } from '@/store/useWindowStore'
import { useUIStore } from '@/store/useUIStore'
import { useThemeStore } from '@/store/useThemeStore'
import { installedApps } from '@/data/apps'

export default function Taskbar() {
  const { windows, toggleMinimize, setActiveWindow, activeWindowId } = useWindowStore()
  const { toggleStartMenu, isStartMenuOpen } = useUIStore()
  const { theme, toggleTheme } = useThemeStore()

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
    <div className="fixed bottom-0 left-0 right-0 h-12 flex items-center justify-center z-50">
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
            const window = windows.find((w) => w.appType === app.type)
            const isActive = window && !window.isMinimized && activeWindowId === window.id
            const isRunning = !!window

            return (
              <motion.button
                key={app.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (window) {
                    handleAppClick(window.id)
                  }
                }}
                className={`
                  w-12 h-10 flex items-center justify-center rounded relative
                  ${isActive ? 'bg-blue-100 dark:bg-blue-900' : 'hover:bg-white/10'}
                  smooth-transition
                `}
                aria-label={app.name}
                title={window?.isMinimized ? `${app.name} (Minimized)` : app.name}
              >
                <span className={`text-xl ${window?.isMinimized ? 'opacity-60' : ''}`}>
                  {app.icon}
                </span>
                {/* Active window - full underline */}
                {isActive && (
                  <div className="absolute bottom-0 w-6 h-0.5 bg-blue-500 dark:bg-blue-400 rounded-t" />
                )}
                {/* Minimized window - dotted underline */}
                {isRunning && window.isMinimized && (
                  <div className="absolute bottom-0 w-6 h-0.5 bg-blue-500/50 dark:bg-blue-400/50 rounded-t"
                       style={{ backgroundImage: 'linear-gradient(to right, currentColor 50%, transparent 50%)', backgroundSize: '4px 100%' }} />
                )}
              </motion.button>
            )
          })}

        {/* Running Apps */}
        {windows
          .filter(
            (w) =>
              !installedApps.some(
                (app) => app.isPinned && app.type === w.appType
              )
          )
          .map((window) => {
            const isActive = !window.isMinimized && activeWindowId === window.id

            return (
              <motion.button
                key={window.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAppClick(window.id)}
                className={`
                  w-12 h-10 flex items-center justify-center rounded relative
                  ${isActive ? 'bg-blue-100 dark:bg-blue-900' : 'hover:bg-white/10'}
                  smooth-transition
                `}
                aria-label={window.title}
                title={window.isMinimized ? `${window.title} (Minimized)` : window.title}
              >
                <span className={`text-xl ${window.isMinimized ? 'opacity-60' : ''}`}>
                  {window.icon}
                </span>
                {/* Active window - full underline */}
                {isActive && (
                  <div className="absolute bottom-0 w-6 h-0.5 bg-blue-500 dark:bg-blue-400 rounded-t" />
                )}
                {/* Minimized window - dotted underline */}
                {window.isMinimized && (
                  <div className="absolute bottom-0 w-6 h-0.5 bg-blue-500/50 dark:bg-blue-400/50 rounded-t"
                       style={{ backgroundImage: 'linear-gradient(to right, currentColor 50%, transparent 50%)', backgroundSize: '4px 100%' }} />
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
    </div>
  )
}
