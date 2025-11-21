export type FileType = 'folder' | 'file' | 'shortcut' | 'exe' | 'txt' | 'md' | 'json' | 'pdf' | 'image'

export interface FileSystemItem {
  id: string
  name: string
  type: FileType
  path: string
  content?: string | Record<string, any>
  icon?: string
  dateCreated: Date
  dateModified: Date
  size?: number
  target?: string // For shortcuts
  children?: FileSystemItem[]
  readOnly?: boolean
  gridPosition?: { col: number; row: number }
  metadata?: {
    description?: string
    tags?: string[]
    company?: string
    role?: string
    duration?: string
    technologies?: string[]
    projectUrl?: string
    githubUrl?: string
    videoUrl?: string
    screenshots?: string[]
    noPreview?: boolean
  }
}

export interface WindowState {
  id: string
  title: string
  icon?: string
  appType: AppType
  isMaximized: boolean
  isMinimized: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
  content?: any
  path?: string
}

export type AppType =
  | 'file-explorer'
  | 'notepad'
  | 'calculator'
  | 'browser'
  | 'settings'
  | 'about'
  | 'project-viewer'
  | 'pdf-viewer'
  | 'pdf-viewer'

export interface App {
  id: string
  name: string
  icon: string
  type: AppType
  isPinned?: boolean
  category?: string
}

export interface TaskbarApp {
  id: string
  name: string
  icon: string
  windowId?: string
  isActive?: boolean
}

export interface ContextMenuItem {
  label: string
  icon?: string
  action: () => void
  divider?: boolean
  disabled?: boolean
  submenu?: ContextMenuItem[]
}

export interface Theme {
  mode: 'light' | 'dark'
}
