'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore } from '@/store/useUIStore'
import { ContextMenuItem } from '@/types'

interface ContextMenuProps {
  x: number
  y: number
  items: ContextMenuItem[]
}

export default function ContextMenu({ x, y, items }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const { closeContextMenu } = useUIStore()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeContextMenu()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [closeContextMenu])

  return (
    <AnimatePresence>
      <motion.div
        ref={menuRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.1 }}
        className="fixed bg-white dark:bg-gray-800 rounded-win11 win11-shadow border border-gray-200 dark:border-gray-700 py-1 min-w-[200px] z-[9999]"
        style={{ top: y, left: x }}
      >
        {items.map((item, index) =>
          item.divider ? (
            <div
              key={index}
              className="h-px bg-gray-200 dark:bg-gray-700 my-1"
            />
          ) : (
            <button
              key={index}
              onClick={() => {
                item.action()
                closeContextMenu()
              }}
              disabled={item.disabled}
              className={`
                w-full px-3 py-2 text-left text-sm flex items-center gap-2
                ${
                  item.disabled
                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'text-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                }
                smooth-transition
              `}
            >
              {item.icon && <span>{item.icon}</span>}
              <span>{item.label}</span>
            </button>
          )
        )}
      </motion.div>
    </AnimatePresence>
  )
}
