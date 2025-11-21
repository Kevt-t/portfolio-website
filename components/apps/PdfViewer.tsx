'use client'

import { useState, useRef, useEffect } from 'react'
import { FileSystemItem } from '@/types'
import { Download, Save, Printer, ZoomIn, ZoomOut, RotateCw } from 'lucide-react'

interface PdfViewerProps {
  file: FileSystemItem
}

export default function PdfViewer({ file }: PdfViewerProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleDownload = () => {
    if (typeof file.content === 'string') {
      const link = document.createElement('a')
      link.href = file.content
      link.download = file.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
    setActiveMenu(null)
  }

  return (
    <div className="flex flex-col h-full bg-[#525659]">
      {/* Toolbar */}
      <div className="flex items-center px-2 py-1 bg-[#f9f9f9] border-b border-[#e5e5e5] text-sm select-none text-black" ref={menuRef}>
        <div className="relative">
          <button
            className={`px-2 py-1 hover:bg-[#e5e5e5] rounded-sm ${activeMenu === 'file' ? 'bg-[#e5e5e5]' : ''}`}
            onClick={() => setActiveMenu(activeMenu === 'file' ? null : 'file')}
          >
            File
          </button>
          {activeMenu === 'file' && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-[#ccc] shadow-lg rounded-sm z-50 py-1">
              <button
                className="w-full text-left px-4 py-2 hover:bg-[#e5e5e5] flex items-center gap-2"
                onClick={handleDownload}
              >
                <Save className="w-4 h-4" />
                <span>Save as...</span>
              </button>
              <div className="h-px bg-[#e5e5e5] my-1" />
              <button className="w-full text-left px-4 py-2 hover:bg-[#e5e5e5] flex items-center gap-2 text-gray-400 cursor-not-allowed">
                <Printer className="w-4 h-4" />
                <span>Print</span>
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-[#e5e5e5] flex items-center gap-2 text-gray-400 cursor-not-allowed">
                <span>Properties</span>
              </button>
            </div>
          )}
        </div>
        <div className="relative">
          <button
            className={`px-2 py-1 hover:bg-[#e5e5e5] rounded-sm ${activeMenu === 'edit' ? 'bg-[#e5e5e5]' : ''}`}
            onClick={() => setActiveMenu(activeMenu === 'edit' ? null : 'edit')}
          >
            Edit
          </button>
          {activeMenu === 'edit' && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-[#ccc] shadow-lg rounded-sm z-50 py-1">
              <button className="w-full text-left px-4 py-2 hover:bg-[#e5e5e5] text-gray-400 cursor-not-allowed">
                Copy
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-[#e5e5e5] text-gray-400 cursor-not-allowed">
                Select All
              </button>
            </div>
          )}
        </div>
        <div className="relative">
          <button
            className={`px-2 py-1 hover:bg-[#e5e5e5] rounded-sm ${activeMenu === 'view' ? 'bg-[#e5e5e5]' : ''}`}
            onClick={() => setActiveMenu(activeMenu === 'view' ? null : 'view')}
          >
            View
          </button>
          {activeMenu === 'view' && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-[#ccc] shadow-lg rounded-sm z-50 py-1">
              <button className="w-full text-left px-4 py-2 hover:bg-[#e5e5e5] flex items-center gap-2 text-gray-400 cursor-not-allowed">
                <ZoomIn className="w-4 h-4" />
                <span>Zoom In</span>
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-[#e5e5e5] flex items-center gap-2 text-gray-400 cursor-not-allowed">
                <ZoomOut className="w-4 h-4" />
                <span>Zoom Out</span>
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-[#e5e5e5] flex items-center gap-2 text-gray-400 cursor-not-allowed">
                <RotateCw className="w-4 h-4" />
                <span>Rotate</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 w-full h-full overflow-hidden relative">
        {typeof file.content === 'string' ? (
          <>
            {/* Mobile fallback for better viewing experience */}
            <div className="md:hidden absolute inset-0 flex flex-col items-center justify-center bg-gray-100 p-4 text-center">
              <p className="mb-4 text-gray-600">PDF viewing is optimized for larger screens.</p>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
            {/* Desktop/Tablet Viewer */}
            <iframe
              src={`${file.content}#toolbar=0`}
              className="hidden md:block w-full h-full border-none"
              title={file.name}
            />
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-white">
            Unable to load PDF
          </div>
        )}
      </div>
    </div>
  )
}
