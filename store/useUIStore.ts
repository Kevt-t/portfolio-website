import { create } from 'zustand'

interface UIStore {
  isStartMenuOpen: boolean
  isBootSequenceComplete: boolean
  contextMenu: {
    isOpen: boolean
    x: number
    y: number
    items: any[]
  } | null

  setStartMenuOpen: (open: boolean) => void
  toggleStartMenu: () => void
  setBootSequenceComplete: (complete: boolean) => void
  openContextMenu: (x: number, y: number, items: any[]) => void
  closeContextMenu: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  isStartMenuOpen: false,
  isBootSequenceComplete: false,
  contextMenu: null,

  setStartMenuOpen: (open) => set({ isStartMenuOpen: open }),
  toggleStartMenu: () =>
    set((state) => ({ isStartMenuOpen: !state.isStartMenuOpen })),
  setBootSequenceComplete: (complete) =>
    set({ isBootSequenceComplete: complete }),
  openContextMenu: (x, y, items) =>
    set({ contextMenu: { isOpen: true, x, y, items } }),
  closeContextMenu: () => set({ contextMenu: null }),
}))
