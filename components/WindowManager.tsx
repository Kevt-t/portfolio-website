'use client'

import { AnimatePresence } from 'framer-motion'
import { useWindowStore } from '@/store/useWindowStore'
import Window from './Window'
import FileExplorer from './apps/FileExplorer'
import Notepad from './apps/Notepad'
import Calculator from './apps/Calculator'
import Browser from './apps/Browser'
import Settings from './apps/Settings'
import ProjectViewer from './apps/ProjectViewer'

export default function WindowManager() {
  const { windows } = useWindowStore()

  const renderWindowContent = (window: any) => {
    switch (window.appType) {
      case 'file-explorer':
        return <FileExplorer initialPath={window.path} />
      case 'notepad':
        return <Notepad file={window.content} />
      case 'calculator':
        return <Calculator />
      case 'browser':
        return <Browser />
      case 'settings':
        return <Settings />
      case 'project-viewer':
        return <ProjectViewer project={window.content} />
      case 'about':
        return (
          <div className="p-8 bg-white dark:bg-gray-900 h-full">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              About This Portfolio
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This portfolio is designed as a fully functional Windows 11 desktop environment,
              showcasing my work through an interactive file system experience. It's mobile friendly too.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Feel free to explore the folders on the desktop to learn more about my projects,
              skills, experience, and how to get in touch!
            </p>
          </div>
        )
      default:
        return (
          <div className="flex items-center justify-center h-full bg-white dark:bg-gray-900">
            <p className="text-gray-500 dark:text-gray-400">Content not available</p>
          </div>
        )
    }
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      <AnimatePresence>
        {windows.map((window) => (
          <div key={window.id} className="pointer-events-auto">
            <Window window={window}>{renderWindowContent(window)}</Window>
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}
