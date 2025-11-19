import { create } from 'zustand'
import { WindowState } from '@/types'

interface WindowStore {
  windows: WindowState[]
  activeWindowId: string | null
  nextZIndex: number

  addWindow: (window: Omit<WindowState, 'zIndex'>) => void
  removeWindow: (id: string) => void
  setActiveWindow: (id: string) => void
  toggleMaximize: (id: string) => void
  toggleMinimize: (id: string) => void
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void
  updateWindowSize: (id: string, size: { width: number; height: number }) => void
  getWindow: (id: string) => WindowState | undefined
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  activeWindowId: null,
  nextZIndex: 1,

  addWindow: (window) => {
    const { windows, nextZIndex } = get()
    const existingWindow = windows.find((w) => w.id === window.id)

    if (existingWindow) {
      // If window exists, just bring it to front and unminimize
      set({
        windows: windows.map((w) =>
          w.id === window.id
            ? { ...w, zIndex: nextZIndex, isMinimized: false }
            : w
        ),
        activeWindowId: window.id,
        nextZIndex: nextZIndex + 1,
      })
    } else {
      // Add new window
      set({
        windows: [...windows, { ...window, zIndex: nextZIndex }],
        activeWindowId: window.id,
        nextZIndex: nextZIndex + 1,
      })
    }
  },

  removeWindow: (id) => {
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    }))
  },

  setActiveWindow: (id) => {
    const { windows, nextZIndex } = get()
    set({
      windows: windows.map((w) =>
        w.id === id ? { ...w, zIndex: nextZIndex } : w
      ),
      activeWindowId: id,
      nextZIndex: nextZIndex + 1,
    })
  },

  toggleMaximize: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      ),
    }))
  },

  toggleMinimize: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
      ),
    }))
  },

  updateWindowPosition: (id, position) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, position } : w
      ),
    }))
  },

  updateWindowSize: (id, size) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, size } : w
      ),
    }))
  },

  getWindow: (id) => {
    return get().windows.find((w) => w.id === id)
  },
}))
