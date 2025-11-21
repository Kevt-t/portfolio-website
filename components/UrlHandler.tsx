'use client'

import { useEffect, Suspense } from 'react'
import { useSearchParams, usePathname } from 'next/navigation'
import { useWindowStore } from '@/store/useWindowStore'
import { findFileById } from '@/data/filesystem'

function UrlHandlerContent() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { addWindow, windows, activeWindowId } = useWindowStore()

  // Handle initial load
  useEffect(() => {
    const projectId = searchParams.get('project')
    const folderId = searchParams.get('folder')

    if (projectId) {
      const project = findFileById(projectId)
      if (project && project.type === 'exe') {
        // Check if already open to avoid duplicates (though addWindow handles this)
        // We need to delay slightly to ensure the store is ready and hydration is done
        setTimeout(() => {
          addWindow({
            id: `project-${project.id}`,
            title: project.name.replace('.exe', ''),
            icon: '💼',
            appType: 'project-viewer',
            isMaximized: false,
            isMinimized: false,
            position: { x: 180, y: 120 },
            size: { width: 850, height: 650 },
            content: project,
          })
        }, 100)
      }
    } else if (folderId) {
      const folder = findFileById(folderId)
      if (folder && folder.type === 'folder') {
        setTimeout(() => {
          addWindow({
            id: `file-explorer-${folder.id}`,
            title: folder.name,
            icon: '📁',
            appType: 'file-explorer',
            isMaximized: false,
            isMinimized: false,
            position: { x: 150, y: 100 },
            size: { width: 900, height: 600 },
            path: folder.path,
          })
        }, 100)
      }
    }
  }, []) // Run once on mount

  // Sync URL with active window
  useEffect(() => {
    const activeWindow = windows.find(w => w.id === activeWindowId)
    const currentParams = new URLSearchParams(window.location.search)
    
    if (activeWindow && activeWindow.appType === 'project-viewer' && activeWindow.content?.id) {
      const projectId = activeWindow.content.id
      if (currentParams.get('project') !== projectId) {
        const newUrl = `${pathname}?project=${projectId}`
        window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl)
      }
    } else if (activeWindow && activeWindow.appType === 'file-explorer') {
      // Extract ID from window ID (format: file-explorer-{id})
      const folderId = activeWindow.id.replace('file-explorer-', '')
      // Only sync for main desktop folders
      const mainFolders = ['desktop-aboutme', 'desktop-projects', 'desktop-experience', 'desktop-contact']
      
      if (mainFolders.includes(folderId)) {
        if (currentParams.get('folder') !== folderId) {
          const newUrl = `${pathname}?folder=${folderId}`
          window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl)
        }
      } else {
        // If it's a file explorer but not one of the main folders, clear params
        if (currentParams.get('project') || currentParams.get('folder')) {
          const newUrl = pathname
          window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl)
        }
      }
    } else {
      // If active window is NOT a project viewer or file explorer, or there is no active window
      // We should check if we need to clear the URL
      if (currentParams.get('project') || currentParams.get('folder')) {
        const newUrl = pathname
        window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl)
      }
    }
  }, [activeWindowId, windows, pathname])

  return null
}

export default function UrlHandler() {
  return (
    <Suspense fallback={null}>
      <UrlHandlerContent />
    </Suspense>
  )
}
