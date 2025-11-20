'use client'

import { useState } from 'react'
import { Home, RefreshCw, Lock, Search } from 'lucide-react'

export default function Browser() {
  const [url, setUrl] = useState('browser://inception')

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Browser Controls */}
      <div className="flex items-center gap-2 p-2 border-b border-gray-200 dark:border-gray-700">
        <button
          className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-800 smooth-transition"
          aria-label="Refresh"
        >
          <RefreshCw className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
        <button
          className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-800 smooth-transition"
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
      <div className="flex-1 flex items-center justify-center overflow-auto bg-white dark:bg-gray-900">
        <p className="text-2xl text-gray-600 dark:text-gray-400 text-center px-8">
          A browser within a browser... funny how that works, doesn't it?
        </p>
      </div>
    </div>
  )
}
