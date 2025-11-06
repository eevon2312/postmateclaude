'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { HeartIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export default function ReplyPage() {
  const params = useParams()
  const postcardId = params.postcardId as string
  const [senderName, setSenderName] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/replies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postcardId,
          senderName,
          message,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send reply')
      }

      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircleIcon className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Reply Sent!</h1>
          <p className="text-gray-600">
            Your message has been sent digitally to the sender. Thank you for using Postmate!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-center mb-6">
          <HeartIcon className="h-12 w-12 text-primary-500" />
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">Reply to Postcard</h1>
        <p className="text-gray-600 text-center mb-6">
          Send a quick digital thank you back to the sender
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name (optional)
            </label>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Message *
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="Thank you so much for the lovely postcard! It made my day..."
            />
            <p className="text-sm text-gray-500 mt-1">
              {message.length} / 500 characters
            </p>
          </div>

          <button
            type="submit"
            disabled={!message || loading}
            className="w-full px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {loading ? 'Sending...' : 'Send Reply'}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
          This is a digital reply feature powered by Postmate
        </p>
      </div>
    </div>
  )
}
