'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileSystemItem } from '@/types'
import { getDesktopItems } from '@/data/filesystem'
import { useWindowStore } from '@/store/useWindowStore'
import { useUIStore } from '@/store/useUIStore'
import DesktopIcon from './DesktopIcon'
import ContextMenu from './ContextMenu'

export default function Desktop() {
  const [desktopItems] = useState<FileSystemItem[]>(getDesktopItems())
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null)
  const [useFixedPositioning, setUseFixedPositioning] = useState(false)
  const { addWindow } = useWindowStore()
  const { closeContextMenu, contextMenu } = useUIStore()

  // Check if screen is large enough for fixed grid positioning
  useEffect(() => {
    const checkScreenSize = () => {
      setUseFixedPositioning(globalThis.innerWidth >= 1024) // lg breakpoint
    }
    checkScreenSize()
    globalThis.addEventListener('resize', checkScreenSize)
    return () => globalThis.removeEventListener('resize', checkScreenSize)
  }, [])

  // Portrait-aware window sizing
  const getResponsiveWindowSize = () => {
    const vw = globalThis.innerWidth
    const vh = globalThis.innerHeight
    const isPortrait = vh > vw

    if (isPortrait && vw < 768) {
      // Portrait mobile: use most of screen with margins
      return {
        width: Math.min(vw - 40, 500),
        height: Math.min(vh - 120, 550),
        x: 20,
        y: 20
      }
    } else if (vw < 768) {
      // Landscape mobile: wider but shorter
      return {
        width: Math.min(vw - 60, 650),
        height: Math.min(vh - 100, 450),
        x: 30,
        y: 20
      }
    }
    // Desktop: original sizes
    return { width: 900, height: 600, x: 100, y: 50 }
  }

  const handleDesktopClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeContextMenu()
      setSelectedIconId(null)
    }
  }

  const handleDesktopTouch = (e: React.TouchEvent) => {
    if (e.target === e.currentTarget) {
      closeContextMenu()
      setSelectedIconId(null)
    }
  }

  const handleDesktopContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    // Desktop context menu implementation
  }

  const handleIconDoubleClick = (item: FileSystemItem) => {
    // Game icons are purely decorative
    if (item.icon === 'game') return

    const windowSize = getResponsiveWindowSize()

    if (item.type === 'folder') {
      // Open folder in File Explorer
      addWindow({
        id: `file-explorer-${item.id}`,
        title: item.name,
        icon: '📁',
        appType: 'file-explorer',
        isMaximized: false,
        isMinimized: false,
        position: { x: windowSize.x, y: windowSize.y },
        size: { width: windowSize.width, height: windowSize.height },
        path: item.path,
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
        position: { x: windowSize.x + 20, y: windowSize.y + 20 },
        size: { width: windowSize.width, height: windowSize.height },
        content: item,
      })
    } else if (item.type === 'shortcut' && item.target) {
      // Handle shortcuts
      if (item.target.startsWith('http')) {
        window.open(item.target, '_blank')
      } else {
        // Open internal path
        addWindow({
          id: `file-explorer-${item.id}`,
          title: item.target,
          icon: '📁',
          appType: 'file-explorer',
          isMaximized: false,
          isMinimized: false,
          position: { x: windowSize.x, y: windowSize.y },
          size: { width: windowSize.width, height: windowSize.height },
          path: item.target,
        })
      }
    }
  }

  return (
    <div
      className="relative w-full h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/wallpapers/eagles.webp')" }}
      onClick={handleDesktopClick}
      onTouchEnd={handleDesktopTouch}
      onContextMenu={handleDesktopContextMenu}
    >
      {/* Overlay for better text readability if needed, or just the raw image */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      {/* Desktop Icons Grid - Responsive with portrait optimization */}
      <div className="relative z-0 p-2 sm:p-4 w-full h-full overflow-y-auto mobile-hide-scrollbar grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 auto-rows-[75px] sm:auto-rows-[85px] md:auto-rows-[100px] gap-1 sm:gap-2 pb-16 justify-items-center md:justify-items-start">
        {desktopItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            style={
              item.gridPosition && useFixedPositioning
                ? {
                    gridColumn: item.gridPosition.col,
                    gridRow: item.gridPosition.row,
                  }
                : undefined
            }
            className="col-span-1 row-span-1"
          >
            <DesktopIcon
              item={item}
              onDoubleClick={handleIconDoubleClick}
              isSelected={selectedIconId === item.id}
              onSelect={() => setSelectedIconId(item.id)}
            />
          </motion.div>
        ))}
      </div>

      {/* Context Menu */}
      {contextMenu && <ContextMenu {...contextMenu} />}
    </div>
  )
}
