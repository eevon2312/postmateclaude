import Link from 'next/link'
import { ArrowRightIcon, SparklesIcon, GlobeAltIcon, ClockIcon, HeartIcon } from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-orange-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <HeartIcon className="h-8 w-8 text-primary-500" />
            <span className="text-2xl font-bold text-gray-900">Postmate</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/signin" className="text-gray-700 hover:text-gray-900">
              Sign In
            </Link>
            <Link
              href="/create"
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Create Postcard
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Send Real Postcards
            <br />
            <span className="text-primary-500">From Your Phone</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Design a personal postcard online, type a handwritten-style message,
            and have it printed and shipped to any mailbox worldwide. No post office needed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/create"
              className="px-8 py-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2 text-lg font-semibold"
            >
              <span>Start Creating</span>
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
            <Link
              href="#how-it-works"
              className="px-8 py-4 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors border border-gray-300 text-lg font-semibold"
            >
              How It Works
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Free demo available • From $1.99 per postcard
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <SparklesIcon className="h-6 w-6 text-primary-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Easy Design</h3>
            <p className="text-gray-600">
              Choose from beautiful templates, upload your photos, and add a personal message with handwriting-style fonts.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <GlobeAltIcon className="h-6 w-6 text-primary-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Global Delivery</h3>
            <p className="text-gray-600">
              Send postcards to any country. We handle printing, postage, and delivery through our worldwide network.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <ClockIcon className="h-6 w-6 text-primary-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Fast & Tracked</h3>
            <p className="text-gray-600">
              Real-time tracking from creation to delivery. Most postcards arrive within 3-7 days depending on destination.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto px-4 py-20 bg-white rounded-3xl shadow-xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Choose a Template</h3>
                <p className="text-gray-600">
                  Browse our collection of beautiful postcard designs or start from scratch.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Personalize Your Message</h3>
                <p className="text-gray-600">
                  Upload a photo and type your message. It will appear in a natural handwriting style.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Add Address & Pay</h3>
                <p className="text-gray-600">
                  Enter the recipient's address and complete your secure payment.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">We Handle the Rest</h3>
                <p className="text-gray-600">
                  Your postcard is printed, stamped, and mailed. Track delivery in your dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Send Your First Postcard?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands sending heartfelt messages around the world
          </p>
          <Link
            href="/create"
            className="inline-flex items-center px-8 py-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-lg font-semibold"
          >
            <span>Get Started Free</span>
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-600">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <HeartIcon className="h-6 w-6 text-primary-500" />
            <span className="font-semibold">Postmate</span>
          </div>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-gray-900">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-900">Terms</Link>
            <Link href="/contact" className="hover:text-gray-900">Contact</Link>
          </div>
          <p className="mt-4 md:mt-0">© 2025 Postmate. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
