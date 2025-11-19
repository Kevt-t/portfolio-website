'use client'

import { useState } from 'react'
import { Home, RefreshCw, Lock, Search } from 'lucide-react'

export default function Browser() {
  const [url, setUrl] = useState('portfolio.dev')

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Browser Controls */}
      <div className="flex items-center gap-2 p-2 border-b border-gray-200 dark:border-gray-700">
        <button
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 smooth-transition"
          aria-label="Refresh"
        >
          <RefreshCw className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
        <button
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 smooth-transition"
          aria-label="Home"
        >
          <Home className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>

        {/* Address Bar */}
        <div className="flex-1 flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
          <Lock className="w-4 h-4 text-green-600 dark:text-green-400" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-transparent text-sm text-gray-700 dark:text-gray-300 focus:outline-none"
          />
          <Search className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Browser Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Welcome to My Portfolio
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              This is a simulated browser window. In a real implementation, you could embed
              external content or display additional portfolio information here.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-win11">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Projects
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Check out my projects in the Projects folder on the desktop.
              </p>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-win11">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                About Me
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Learn more about my interests, skills, and philosophy in the About Me folder.
              </p>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-win11">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Contact
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Find my contact information and social links in the Contact folder.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
