'use client'

import { useState } from 'react'
import { FileSystemItem } from '@/types'
import { Folder, File, FileText, FileJson, Link, Monitor } from 'lucide-react'

interface DesktopIconProps {
  item: FileSystemItem
  onDoubleClick: (item: FileSystemItem) => void
}

const getIcon = (type: string, name: string) => {
  switch (type) {
    case 'folder':
      return <Folder className="w-12 h-12 text-yellow-400" />
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
      return name === 'This PC' ? (
        <Monitor className="w-12 h-12 text-blue-400" />
      ) : (
        <Link className="w-12 h-12 text-blue-400" />
      )
    default:
      return <File className="w-12 h-12 text-gray-400" />
  }
}

export default function DesktopIcon({ item, onDoubleClick }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false)

  return (
    <div
      className={`
        flex flex-col items-center justify-center w-24 h-24 p-2 rounded cursor-pointer
        ${isSelected ? 'bg-blue-500/30 backdrop-blur-sm' : 'hover:bg-white/10'}
        smooth-transition no-select
      `}
      onClick={() => setIsSelected(true)}
      onDoubleClick={() => onDoubleClick(item)}
    >
      <div className="mb-1">{getIcon(item.type, item.name)}</div>
      <span className="text-xs text-white text-center drop-shadow-lg leading-tight line-clamp-2">
        {item.name}
      </span>
    </div>
  )
}
