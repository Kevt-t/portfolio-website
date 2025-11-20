'use client'

import { useEffect } from 'react'
import Desktop from '@/components/Desktop'
import Taskbar from '@/components/Taskbar'
import StartMenu from '@/components/StartMenu'
import WindowManager from '@/components/WindowManager'
import BootSequence from '@/components/BootSequence'
import UrlHandler from '@/components/UrlHandler'
import { useThemeStore } from '@/store/useThemeStore'
import { useUIStore } from '@/store/useUIStore'

export default function Home() {
  const { theme, setTheme } = useThemeStore()
  const { setStartMenuOpen } = useUIStore()

  useEffect(() => {
    // Initialize theme on mount
    const savedTheme = localStorage.getItem('theme-storage')
    if (savedTheme) {
      try {
        const parsed = JSON.parse(savedTheme)
        if (parsed.state?.theme) {
          setTheme(parsed.state.theme)
        }
      } catch (e) {
        // Ignore parsing errors
      }
    }

    // Apply theme class to document
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme, setTheme])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Windows key / Cmd key for Start Menu
      if (e.key === 'Meta' || e.key === 'OS') {
        e.preventDefault()
        setStartMenuOpen(true)
      }
      // Escape to close Start Menu
      if (e.key === 'Escape') {
        setStartMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setStartMenuOpen])

  // Prevent default context menu on desktop
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }
    document.addEventListener('contextmenu', handleContextMenu)
    return () => document.removeEventListener('contextmenu', handleContextMenu)
  }, [])

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-win11-bg-light dark:bg-win11-bg-dark">
      <UrlHandler />
      <BootSequence />
      <Desktop />
      <WindowManager />
      <StartMenu />
      <Taskbar />
    </main>
  )
}
