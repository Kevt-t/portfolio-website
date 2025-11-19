import { App } from '@/types'

export const installedApps: App[] = [
  {
    id: 'file-explorer',
    name: 'File Explorer',
    icon: '📁',
    type: 'file-explorer',
    isPinned: true,
    category: 'System',
  },
  {
    id: 'browser',
    name: 'Browser',
    icon: '🌐',
    type: 'browser',
    isPinned: true,
    category: 'Internet',
  },
  {
    id: 'notepad',
    name: 'Notepad',
    icon: '📝',
    type: 'notepad',
    isPinned: true,
    category: 'Accessories',
  },
  {
    id: 'calculator',
    name: 'Calculator',
    icon: '🔢',
    type: 'calculator',
    isPinned: true,
    category: 'Accessories',
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: '⚙️',
    type: 'settings',
    isPinned: false,
    category: 'System',
  },
  {
    id: 'about',
    name: 'About Me',
    icon: '👤',
    type: 'about',
    isPinned: true,
    category: 'Personal',
  },
]

// Skills/Tools for Start Menu
export const skillsApps = [
  { name: 'React', icon: '⚛️', category: 'Frontend' },
  { name: 'Next.js', icon: '▲', category: 'Frontend' },
  { name: 'TypeScript', icon: '📘', category: 'Languages' },
  { name: 'Node.js', icon: '🟢', category: 'Backend' },
  { name: 'Python', icon: '🐍', category: 'Languages' },
  { name: 'Docker', icon: '🐳', category: 'DevOps' },
  { name: 'AWS', icon: '☁️', category: 'Cloud' },
  { name: 'Git', icon: '🔀', category: 'Tools' },
  { name: 'MongoDB', icon: '🍃', category: 'Database' },
  { name: 'PostgreSQL', icon: '🐘', category: 'Database' },
  { name: 'Figma', icon: '🎨', category: 'Design' },
  { name: 'VS Code', icon: '💻', category: 'Tools' },
]
