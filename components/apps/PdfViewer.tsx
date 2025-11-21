'use client'

import { useState, useRef, useEffect } from 'react'
import { FileSystemItem } from '@/types'
import { Download, Save, Printer, ZoomIn, ZoomOut, RotateCw } from 'lucide-react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

// Set worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

interface PdfViewerProps {
  file: FileSystemItem
}

export default function PdfViewer({ file }: PdfViewerProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState<number>(0)
  const [numPages, setNumPages] = useState<number>(0)
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          const contentBoxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize
          setContainerWidth(contentBoxSize.inlineSize)
        } else {
          setContainerWidth(entry.contentRect.width)
        }
      }
    })

    resizeObserver.observe(containerRef.current)
    return () => resizeObserver.disconnect()
  }, [])

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
  }

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

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 2))
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5))
  const handleRotate = () => setRotation(prev => (prev + 90) % 360)

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
              <button 
                className="w-full text-left px-4 py-2 hover:bg-[#e5e5e5] flex items-center gap-2"
                onClick={handleZoomIn}
              >
                <ZoomIn className="w-4 h-4" />
                <span>Zoom In</span>
              </button>
              <button 
                className="w-full text-left px-4 py-2 hover:bg-[#e5e5e5] flex items-center gap-2"
                onClick={handleZoomOut}
              >
                <ZoomOut className="w-4 h-4" />
                <span>Zoom Out</span>
              </button>
              <button 
                className="w-full text-left px-4 py-2 hover:bg-[#e5e5e5] flex items-center gap-2"
                onClick={handleRotate}
              >
                <RotateCw className="w-4 h-4" />
                <span>Rotate</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 w-full h-full overflow-auto relative bg-[#525659] flex justify-center p-4" ref={containerRef}>
        {typeof file.content === 'string' ? (
          <Document
            file={file.content}
            onLoadSuccess={onDocumentLoadSuccess}
            className="flex flex-col gap-4"
            loading={
              <div className="flex items-center justify-center text-white">
                Loading PDF...
              </div>
            }
            error={
              <div className="flex items-center justify-center text-white">
                Failed to load PDF.
              </div>
            }
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={containerWidth ? Math.min(containerWidth - 32, 800) * scale : undefined}
                rotate={rotation}
                className="shadow-lg"
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            ))}
          </Document>
        ) : (
          <div className="flex items-center justify-center h-full text-white">
            Unable to load PDF
          </div>
        )}
      </div>
    </div>
  )
}
