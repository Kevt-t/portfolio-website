'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Power, Settings } from 'lucide-react'
import { useUIStore } from '@/store/useUIStore'
import { useWindowStore } from '@/store/useWindowStore'
import { installedApps, skillsApps } from '@/data/apps'

export default function StartMenu() {
  const [searchQuery, setSearchQuery] = useState('')
  const menuRef = useRef<HTMLDivElement>(null)
  const { isStartMenuOpen, setStartMenuOpen } = useUIStore()
  const { addWindow } = useWindowStore()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        const taskbar = document.querySelector('[aria-label="Start"]')
        if (taskbar && !taskbar.contains(e.target as Node)) {
          setStartMenuOpen(false)
        }
      }
    }

    if (isStartMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isStartMenuOpen, setStartMenuOpen])

  const handleAppClick = (appType: string, appName: string, icon: string) => {
    addWindow({
      id: `${appType}-${Date.now()}`,
      title: appName,
      icon: icon,
      appType: appType as any,
      isMaximized: false,
      isMinimized: false,
      position: { x: 150, y: 100 },
      size: { width: 800, height: 600 },
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
          className="fixed bottom-16 left-1/2 w-[540px] h-[600px] bg-white/90 dark:bg-gray-900/90 backdrop-blur-win11 rounded-win11 win11-shadow border border-gray-200/50 dark:border-gray-700/50 overflow-hidden z-40"
        >
          {/* Search Bar */}
          <div className="p-6 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search apps, files, settings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-win11-sm text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Pinned Apps */}
          <div className="px-6 pb-4">
            <h3 className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-3">
              Pinned
            </h3>
            <div className="grid grid-cols-6 gap-3">
              {filteredApps.slice(0, 18).map((app) => (
                <motion.button
                  key={app.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAppClick(app.type, app.name, app.icon)}
                  className="flex flex-col items-center justify-center p-3 rounded-win11-sm hover:bg-gray-100 dark:hover:bg-gray-800 smooth-transition"
                >
                  <span className="text-3xl mb-1">{app.icon}</span>
                  <span className="text-xs text-gray-700 dark:text-gray-300 text-center line-clamp-2">
                    {app.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Skills/Tools Section */}
          {filteredSkills.length > 0 && (
            <div className="px-6 pb-4">
              <h3 className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-3">
                Skills & Tools
              </h3>
              <div className="grid grid-cols-6 gap-3">
                {filteredSkills.slice(0, 12).map((skill, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center justify-center p-3 rounded-win11-sm hover:bg-gray-100 dark:hover:bg-gray-800 smooth-transition"
                  >
                    <span className="text-3xl mb-1">{skill.icon}</span>
                    <span className="text-xs text-gray-700 dark:text-gray-300 text-center line-clamp-2">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 h-14 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                KT
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                Kevin Tellez-Torres
              </span>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAppClick('settings', 'Settings', '⚙️')}
                className="w-9 h-9 flex items-center justify-center rounded hover:bg-gray-200 dark:hover:bg-gray-700 smooth-transition"
                aria-label="Settings"
              >
                <Settings className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 flex items-center justify-center rounded hover:bg-gray-200 dark:hover:bg-gray-700 smooth-transition"
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
