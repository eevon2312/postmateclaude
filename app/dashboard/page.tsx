'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ClockIcon,
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'

interface Postcard {
  id: string
  recipientName: string
  recipientCity: string
  recipientCountry: string
  status: string
  createdAt: string
  trackingId: string | null
  imageUrl: string | null
}

const statusIcons: { [key: string]: any } = {
  draft: ClockIcon,
  processing: ClockIcon,
  sent: TruckIcon,
  delivered: CheckCircleIcon,
  failed: XCircleIcon,
}

const statusColors: { [key: string]: string } = {
  draft: 'text-gray-500',
  processing: 'text-yellow-500',
  sent: 'text-blue-500',
  delivered: 'text-green-500',
  failed: 'text-red-500',
}

const statusLabels: { [key: string]: string } = {
  draft: 'Draft',
  processing: 'Processing',
  sent: 'In Transit',
  delivered: 'Delivered',
  failed: 'Failed',
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [postcards, setPostcards] = useState<Postcard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    if (status === 'authenticated') {
      fetchPostcards()
    }
  }, [status, router])

  const fetchPostcards = async () => {
    try {
      const response = await fetch('/api/postcards')
      const data = await response.json()
      setPostcards(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching postcards:', error)
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Postmate
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {session?.user?.name || session?.user?.email}
              </span>
              <Link
                href="/create"
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2"
              >
                <PlusIcon className="h-5 w-5" />
                <span>New Postcard</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Postcards</h1>

          {postcards.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ClockIcon className="h-10 w-10 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold mb-2">No postcards yet</h2>
                <p className="text-gray-600 mb-6">
                  Start creating and sending postcards to your loved ones around the world.
                </p>
                <Link
                  href="/create"
                  className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors space-x-2"
                >
                  <PlusIcon className="h-5 w-5" />
                  <span>Create Your First Postcard</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-6">
              {postcards.map((postcard) => {
                const StatusIcon = statusIcons[postcard.status] || ClockIcon
                const statusColor = statusColors[postcard.status]
                const statusLabel = statusLabels[postcard.status]

                return (
                  <div
                    key={postcard.id}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-start space-x-6">
                      {/* Thumbnail */}
                      <div className="flex-shrink-0">
                        <div className="w-32 h-20 rounded-lg overflow-hidden bg-gray-100">
                          {postcard.imageUrl ? (
                            <img
                              src={postcard.imageUrl}
                              alt="Postcard"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              No image
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">
                              To: {postcard.recipientName}
                            </h3>
                            <p className="text-gray-600">
                              {postcard.recipientCity}, {postcard.recipientCountry}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              Created: {new Date(postcard.createdAt).toLocaleDateString()}
                            </p>
                          </div>

                          {/* Status Badge */}
                          <div
                            className={`flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-50 ${statusColor}`}
                          >
                            <StatusIcon className="h-5 w-5" />
                            <span className="font-medium">{statusLabel}</span>
                          </div>
                        </div>

                        {/* Tracking */}
                        {postcard.trackingId && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <TruckIcon className="h-4 w-4" />
                              <span>Tracking ID: {postcard.trackingId}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
