'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Power, Settings, Sun, Moon } from 'lucide-react'
import { useUIStore } from '@/store/useUIStore'
import { useWindowStore } from '@/store/useWindowStore'
import { useThemeStore } from '@/store/useThemeStore'
import { installedApps, skillsApps } from '@/data/apps'

export default function StartMenu() {
  const [searchQuery, setSearchQuery] = useState('')
  const menuRef = useRef<HTMLDivElement>(null)
  const { isStartMenuOpen, setStartMenuOpen } = useUIStore()
  const { addWindow } = useWindowStore()
  const { theme, toggleTheme } = useThemeStore()

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
    return { width: 800, height: 600, x: 150, y: 100 }
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        const taskbar = document.querySelector('[aria-label="Start"]')
        if (taskbar && !taskbar.contains(e.target as Node)) {
          setStartMenuOpen(false)
        }
      }
    }

    if (isStartMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isStartMenuOpen, setStartMenuOpen])

  const handleAppClick = (appType: string, appName: string, icon: string) => {
    const windowSize = getResponsiveWindowSize()
    addWindow({
      id: `${appType}-${Date.now()}`,
      title: appName,
      icon: icon,
      appType: appType as any,
      isMaximized: false,
      isMinimized: false,
      position: { x: windowSize.x, y: windowSize.y },
      size: { width: windowSize.width, height: windowSize.height },
    })
    setStartMenuOpen(false)
  }

  const filteredApps = installedApps.filter((app) =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredSkills = skillsApps.filter((skill) =>
    skill.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <AnimatePresence>
      {isStartMenuOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: 20, x: "-50%", scale: 0.95 }}
          animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
          exit={{ opacity: 0, y: 20, x: "-50%", scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="fixed bottom-14 sm:bottom-16 left-1/2 w-[calc(100%-2rem)] sm:w-[480px] md:w-[540px] max-h-[calc(100vh-4rem)] sm:max-h-[min(600px,calc(100vh-5rem))] bg-white/90 dark:bg-gray-900/90 backdrop-blur-win11 rounded-win11 win11-shadow border border-gray-200/50 dark:border-gray-700/50 overflow-y-auto mobile-hide-scrollbar z-40 pb-safe"
        >
          {/* Search Bar */}
          <div className="p-4 sm:p-6 pb-3 sm:pb-4">
            <div className="relative">
              <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search apps, files, settings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-win11-sm text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Pinned Apps */}
          <div className="px-4 sm:px-6 pb-3 sm:pb-4">
            <h3 className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 sm:mb-3">
              Pinned
            </h3>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 sm:gap-3">
              {filteredApps.slice(0, 18).map((app) => (
                <motion.button
                  key={app.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAppClick(app.type, app.name, app.icon)}
                  className="flex flex-col items-center justify-center p-2 sm:p-3 rounded-win11-sm hover:bg-gray-100 dark:hover:bg-gray-800 smooth-transition touch-target"
                >
                  <span className="text-2xl sm:text-3xl mb-0.5 sm:mb-1">{app.icon}</span>
                  <span className="text-[10px] sm:text-xs text-gray-700 dark:text-gray-300 text-center line-clamp-2">
                    {app.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Skills/Tools Section */}
          {filteredSkills.length > 0 && (
            <div className="px-4 sm:px-6 pb-3 sm:pb-4">
              <h3 className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 sm:mb-3">
                Skills & Tools
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 sm:gap-3">
                {filteredSkills.slice(0, 12).map((skill, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center justify-center p-2 sm:p-3 rounded-win11-sm hover:bg-gray-100 dark:hover:bg-gray-800 smooth-transition"
                  >
                    <span className="text-2xl sm:text-3xl mb-0.5 sm:mb-1">{skill.icon}</span>
                    <span className="text-[10px] sm:text-xs text-gray-700 dark:text-gray-300 text-center line-clamp-2">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="sticky bottom-0 left-0 right-0 h-12 sm:h-14 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 flex items-center justify-between px-3 sm:px-6 mt-2">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs sm:text-sm font-semibold flex-shrink-0">
                KT
              </div>
              <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium truncate">
                Kevin Tellez-Torres
              </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="min-w-[44px] min-h-[44px] sm:w-9 sm:h-9 flex items-center justify-center rounded hover:bg-gray-200 dark:hover:bg-gray-700 smooth-transition sm:hidden"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-yellow-400" />
                ) : (
                  <Moon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAppClick('settings', 'Settings', '⚙️')}
                className="min-w-[44px] min-h-[44px] sm:w-9 sm:h-9 flex items-center justify-center rounded hover:bg-gray-200 dark:hover:bg-gray-700 smooth-transition"
                aria-label="Settings"
              >
                <Settings className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="min-w-[44px] min-h-[44px] sm:w-9 sm:h-9 flex items-center justify-center rounded hover:bg-gray-200 dark:hover:bg-gray-700 smooth-transition"
                aria-label="Power"
              >
                <Power className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
