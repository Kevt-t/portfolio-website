'use client'

import { useState } from 'react'
import { FileSystemItem } from '@/types'
import { ExternalLink, Github, Tag, Link as LinkIcon, Check } from 'lucide-react'

interface ProjectViewerProps {
  project?: FileSystemItem
}

export default function ProjectViewer({ project }: ProjectViewerProps) {
  const [copied, setCopied] = useState(false)

  if (!project) {
    return (
      <div className="flex items-center justify-center h-full bg-white dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400">No project data</p>
      </div>
    )
  }

  const metadata = project.metadata

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 p-8 text-white">
        <h1 className="text-4xl font-bold mb-3">
          {project.name.replace('.exe', '')}
        </h1>
        {metadata?.description && (
          <p className="text-lg text-blue-100 dark:text-blue-200 max-w-3xl">
            {metadata.description}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          {metadata?.projectUrl && (
            <a
              href={metadata.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-win11-sm hover:bg-blue-50 smooth-transition font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
          {metadata?.githubUrl && (
            <a
              href={metadata.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-win11-sm hover:bg-white/20 smooth-transition font-medium"
            >
              <Github className="w-4 h-4" />
              View Code
            </a>
          )}
          <button
            onClick={() => {
              const url = `${window.location.origin}?project=${project.id}`
              navigator.clipboard.writeText(url)
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-win11-sm hover:bg-white/20 smooth-transition font-medium"
          >
            {copied ? <Check className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8">
        {/* Technologies */}
        {metadata?.technologies && metadata.technologies.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5" />
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {metadata.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {metadata?.tags && metadata.tags.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Project Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {metadata.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Project Details Card */}
        <div className="bg-white dark:bg-gray-800 rounded-win11 p-6 win11-shadow">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Project Details
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500 dark:text-gray-400">Created:</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium">
                {new Date(project.dateCreated).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Last Updated:</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium">
                {new Date(project.dateModified).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Placeholder for screenshots/demo */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-win11 p-8 win11-shadow">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Project Preview
          </h2>
          <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-win11 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Project Screenshot / Demo
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
