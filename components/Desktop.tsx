'use client'

import { useState } from 'react'
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
  const { addWindow } = useWindowStore()
  const { closeContextMenu, contextMenu } = useUIStore()

  const handleDesktopClick = (e: React.MouseEvent) => {
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

    if (item.type === 'folder') {
      // Open folder in File Explorer
      addWindow({
        id: `file-explorer-${item.id}`,
        title: item.name,
        icon: '📁',
        appType: 'file-explorer',
        isMaximized: false,
        isMinimized: false,
        position: { x: 100, y: 50 },
        size: { width: 900, height: 600 },
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
        position: { x: 120, y: 70 },
        size: { width: 800, height: 600 },
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
          position: { x: 100, y: 50 },
          size: { width: 900, height: 600 },
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
      onContextMenu={handleDesktopContextMenu}
    >
      {/* Overlay for better text readability if needed, or just the raw image */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      {/* Desktop Icons Grid */}
      <div className="relative z-0 p-4 w-full h-full grid grid-cols-12 grid-rows-[repeat(10,100px)] gap-2">
        {desktopItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            style={
              item.gridPosition
                ? {
                    gridColumn: item.gridPosition.col,
                    gridRow: item.gridPosition.row,
                  }
                : undefined
            }
            className={!item.gridPosition ? 'col-span-1 row-span-1' : ''}
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
