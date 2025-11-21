'use client'

import { Moon, Sun, Monitor, Info, Palette } from 'lucide-react'
import { useThemeStore } from '@/store/useThemeStore'

export default function Settings() {
  const { theme, setTheme } = useThemeStore()

  return (
    <div className="flex flex-col md:flex-row h-full bg-white dark:bg-gray-900 landscape:text-xs">
      {/* Sidebar */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 p-2 md:p-4 flex-shrink-0 landscape:w-48 landscape:p-2">
        <h2 className="text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2 md:mb-4 px-2 landscape:mb-2">
          Settings
        </h2>
        <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0 landscape:flex-col landscape:overflow-visible landscape:pb-0">
          <button className="flex-shrink-0 w-auto md:w-full flex items-center gap-2 md:gap-3 px-3 py-1.5 md:py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-win11-sm landscape:py-1">
            <Palette className="w-4 h-4 landscape:w-3 landscape:h-3" />
            <span className="text-xs md:text-sm whitespace-nowrap landscape:text-xs">Personalization</span>
          </button>
          <button className="flex-shrink-0 w-auto md:w-full flex items-center gap-2 md:gap-3 px-3 py-1.5 md:py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-win11-sm landscape:py-1">
            <Monitor className="w-4 h-4 landscape:w-3 landscape:h-3" />
            <span className="text-xs md:text-sm whitespace-nowrap landscape:text-xs">Display</span>
          </button>
          <button className="flex-shrink-0 w-auto md:w-full flex items-center gap-2 md:gap-3 px-3 py-1.5 md:py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-win11-sm landscape:py-1">
            <Info className="w-4 h-4 landscape:w-3 landscape:h-3" />
            <span className="text-xs md:text-sm whitespace-nowrap landscape:text-xs">About</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4 md:p-8 landscape:p-4">
        <h1 className="text-xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-1 md:mb-2 landscape:text-lg landscape:mb-1">
          Personalization
        </h1>
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-8 landscape:mb-4 landscape:text-xs">
          Customize the appearance of your portfolio desktop
        </p>

        {/* Theme Selection */}
        <div className="mb-6 md:mb-8 landscape:mb-4">
          <h3 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 md:mb-4 landscape:text-sm landscape:mb-2">
            Choose your theme
          </h3>
          <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-lg">
            <button
              onClick={() => setTheme('light')}
              className={`
                p-4 md:p-6 rounded-win11 border-2 smooth-transition landscape:p-3
                ${
                  theme === 'light'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                }
              `}
            >
              <div className="flex flex-col items-center gap-2 md:gap-3 landscape:gap-1">
                <Sun className="w-6 h-6 md:w-8 md:h-8 text-yellow-500 landscape:w-5 landscape:h-5" />
                <span className="text-sm md:text-base font-medium text-gray-800 dark:text-gray-200 landscape:text-xs">
                  Light
                </span>
              </div>
            </button>

            <button
              onClick={() => setTheme('dark')}
              className={`
                p-4 md:p-6 rounded-win11 border-2 smooth-transition landscape:p-3
                ${
                  theme === 'dark'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                }
              `}
            >
              <div className="flex flex-col items-center gap-2 md:gap-3 landscape:gap-1">
                <Moon className="w-6 h-6 md:w-8 md:h-8 text-blue-500 landscape:w-5 landscape:h-5" />
                <span className="text-sm md:text-base font-medium text-gray-800 dark:text-gray-200 landscape:text-xs">
                  Dark
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* System Specifications */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-win11 p-4 md:p-6 landscape:p-3">
          <h3 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 md:mb-4 landscape:text-sm landscape:mb-2">
            Developer Specifications
          </h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm landscape:grid-cols-2 landscape:gap-2 landscape:text-xs">
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
