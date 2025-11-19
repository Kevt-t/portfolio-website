'use client'

import { Moon, Sun, Monitor, Info, Palette } from 'lucide-react'
import { useThemeStore } from '@/store/useThemeStore'

export default function Settings() {
  const { theme, setTheme } = useThemeStore()

  return (
    <div className="flex h-full bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 dark:border-gray-700 p-4">
        <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">
          Settings
        </h2>
        <nav className="space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-win11-sm">
            <Palette className="w-4 h-4" />
            <span className="text-sm">Personalization</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-win11-sm">
            <Monitor className="w-4 h-4" />
            <span className="text-sm">Display</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-win11-sm">
            <Info className="w-4 h-4" />
            <span className="text-sm">About</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Personalization
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
          Customize the appearance of your portfolio desktop
        </p>

        {/* Theme Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Choose your theme
          </h3>
          <div className="grid grid-cols-2 gap-4 max-w-lg">
            <button
              onClick={() => setTheme('light')}
              className={`
                p-6 rounded-win11 border-2 smooth-transition
                ${
                  theme === 'light'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                }
              `}
            >
              <div className="flex flex-col items-center gap-3">
                <Sun className="w-8 h-8 text-yellow-500" />
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  Light
                </span>
              </div>
            </button>

            <button
              onClick={() => setTheme('dark')}
              className={`
                p-6 rounded-win11 border-2 smooth-transition
                ${
                  theme === 'dark'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                }
              `}
            >
              <div className="flex flex-col items-center gap-3">
                <Moon className="w-8 h-8 text-blue-500" />
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  Dark
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* System Specifications */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-win11 p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Developer Specifications
          </h3>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-gray-500 dark:text-gray-400">Processor</dt>
              <dd className="text-gray-800 dark:text-gray-200 font-medium">
                Full-Stack Development Core
              </dd>
            </div>
            <div>
              <dt className="text-gray-500 dark:text-gray-400">RAM</dt>
              <dd className="text-gray-800 dark:text-gray-200 font-medium">
                Unlimited Creativity
              </dd>
            </div>
            <div>
              <dt className="text-gray-500 dark:text-gray-400">Storage</dt>
              <dd className="text-gray-800 dark:text-gray-200 font-medium">
                Years of Experience
              </dd>
            </div>
            <div>
              <dt className="text-gray-500 dark:text-gray-400">GPU</dt>
              <dd className="text-gray-800 dark:text-gray-200 font-medium">
                Design & UX Accelerator
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
