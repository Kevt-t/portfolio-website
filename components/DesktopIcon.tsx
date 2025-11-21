'use client'

import { useState, useRef } from 'react'
import { FileSystemItem } from '@/types'
import { Folder, File, FileText, FileJson, Link, Monitor, Star } from 'lucide-react'

interface DesktopIconProps {
  item: FileSystemItem
  onDoubleClick: (item: FileSystemItem) => void
  isSelected: boolean
  onSelect: () => void
}

const getIcon = (item: FileSystemItem) => {
  // Star Icon
  if (item.icon === 'star') {
    return <Star className="w-12 h-12 text-yellow-400 fill-yellow-400" />
  }

  // Game Icons
  if (item.icon === 'game') {
    const getGameIcon = (name: string) => {
      switch (name) {
        case 'Alien Isolation': return '/gameicons/alien.png'
        case 'Dying Light': return '/gameicons/dyingLight.png'
        case 'Left 4 Dead 2': return '/gameicons/lfd2.png'
        case 'Star Wars Battlefront': return '/gameicons/starwarsbattlefront.png'
        default: return null
      }
    }
    const iconPath = getGameIcon(item.name)
    if (iconPath) {
      return (
        <div className="w-12 h-12 relative">
          <img src={iconPath} alt={item.name} className="w-full h-full object-contain drop-shadow-md" draggable={false} />
        </div>
      )
    }
  }

  switch (item.type) {
    case 'folder':
      return (
        <div className="relative w-12 h-12">
          {/* Papers inside folder */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 h-8 bg-gray-100 border border-gray-300 rounded-sm rotate-6" />
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-white border border-gray-300 rounded-sm -rotate-3" />
          <Folder className="relative z-10 w-12 h-12 text-yellow-400 fill-yellow-400" />
        </div>
      )
    case 'exe':
      return <div className="text-4xl">💼</div>
    case 'txt':
      return <FileText className="w-12 h-12 text-blue-400" />
    case 'json':
      return <FileJson className="w-12 h-12 text-green-400" />
    case 'md':
      return <FileText className="w-12 h-12 text-purple-400" />
    case 'pdf':
      return <File className="w-12 h-12 text-red-400" />
    case 'shortcut':
      return item.name === 'This PC' ? (
        <div className="relative w-12 h-12">
          <div className="absolute left-1 top-1.5 w-10 h-7 bg-white rounded-[2px]" />
          <Monitor className="relative z-10 w-12 h-12 text-blue-400" />
        </div>
      ) : (
        <Link className="w-12 h-12 text-blue-400" />
      )
    default:
      return <File className="w-12 h-12 text-gray-400" />
  }
}

export default function DesktopIcon({ item, onDoubleClick, isSelected, onSelect }: DesktopIconProps) {
  const [lastTap, setLastTap] = useState(0)
  const touchTimerRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const handleTouch = (e: React.TouchEvent) => {
    const now = Date.now()
    const DOUBLE_TAP_DELAY = 300

    if (now - lastTap < DOUBLE_TAP_DELAY) {
      // Double tap detected
      e.preventDefault()
      onDoubleClick(item)
      setLastTap(0)
    } else {
      // Single tap - select
      setLastTap(now)
      onSelect()

      // Clear double tap timer after delay
      if (touchTimerRef.current) clearTimeout(touchTimerRef.current)
      touchTimerRef.current = setTimeout(() => setLastTap(0), DOUBLE_TAP_DELAY)
    }
  }

  return (
    <div
      className={`
        flex flex-col items-center justify-center w-20 sm:w-24 h-20 sm:h-24 p-1 sm:p-2 rounded cursor-pointer
        ${isSelected ? 'bg-blue-500/30 backdrop-blur-sm' : 'hover:bg-white/10'}
        smooth-transition no-select touch-target
      `}
      onClick={onSelect}
      onDoubleClick={() => onDoubleClick(item)}
      onTouchEnd={handleTouch}
    >
      <div className="mb-1 scale-90 sm:scale-100">{getIcon(item)}</div>
      <span className="text-[10px] sm:text-xs text-white text-center drop-shadow-lg leading-tight line-clamp-2">
        {item.name}
      </span>
    </div>
  )
}
