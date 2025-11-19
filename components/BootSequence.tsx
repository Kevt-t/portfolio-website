'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore } from '@/store/useUIStore'

export default function BootSequence() {
  const [progress, setProgress] = useState(0)
  const [bootText, setBootText] = useState('Initializing portfolio...')
  const { isBootSequenceComplete, setBootSequenceComplete } = useUIStore()

  useEffect(() => {
    if (isBootSequenceComplete) return

    const bootSteps = [
      { delay: 0, text: 'Initializing portfolio...', progress: 0 },
      { delay: 500, text: 'Loading file system...', progress: 25 },
      { delay: 1000, text: 'Loading projects...', progress: 50 },
      { delay: 1500, text: 'Loading experiences...', progress: 75 },
      { delay: 2000, text: 'Starting Windows 11...', progress: 95 },
      { delay: 2500, text: 'Ready!', progress: 100 },
    ]

    bootSteps.forEach(({ delay, text, progress: prog }) => {
      setTimeout(() => {
        setBootText(text)
        setProgress(prog)
      }, delay)
    })

    setTimeout(() => {
      setBootSequenceComplete(true)
    }, 3000)
  }, [isBootSequenceComplete, setBootSequenceComplete])

  return (
    <AnimatePresence>
      {!isBootSequenceComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
        >
          {/* Windows Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <svg
              className="w-24 h-24 text-blue-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <rect x="3" y="3" width="7.5" height="7.5" rx="0.5" />
              <rect x="3" y="13.5" width="7.5" height="7.5" rx="0.5" />
              <rect x="13.5" y="3" width="7.5" height="7.5" rx="0.5" />
              <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="0.5" />
            </svg>
          </motion.div>

          {/* Loading Text */}
          <motion.p
            key={bootText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-lg mb-8"
          >
            {bootText}
          </motion.p>

          {/* Progress Bar */}
          <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Loading Dots */}
          <div className="flex gap-2 mt-8">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-blue-500 rounded-full"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
