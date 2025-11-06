'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Template {
  id: string
  name: string
  thumbnailUrl: string
  category: string
}

interface TemplateSelectorProps {
  selectedTemplate: string | null
  onSelectTemplate: (templateId: string) => void
}

export default function TemplateSelector({
  selectedTemplate,
  onSelectTemplate,
}: TemplateSelectorProps) {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch templates from API
    fetch('/api/templates')
      .then((res) => res.json())
      .then((data) => {
        setTemplates(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error loading templates:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading templates...</div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-gray-600">
        Select a design template for your postcard front.
      </p>

      <div className="grid grid-cols-2 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template.id)}
            className={`relative aspect-[3/2] rounded-lg overflow-hidden border-2 transition-all ${
              selectedTemplate === template.id
                ? 'border-primary-500 ring-2 ring-primary-200'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">{template.name}</span>
            </div>
            {selectedTemplate === template.id && (
              <div className="absolute top-2 right-2 bg-primary-500 text-white rounded-full p-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
