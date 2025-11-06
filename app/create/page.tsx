'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import TemplateSelector from '@/components/TemplateSelector'
import ImageUploader from '@/components/ImageUploader'
import MessageEditor from '@/components/MessageEditor'
import PostcardPreview from '@/components/PostcardPreview'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

type Step = 'template' | 'image' | 'message' | 'preview'

export default function CreatePostcard() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>('template')
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [handwritingFont, setHandwritingFont] = useState('Caveat')

  const handleNext = () => {
    if (currentStep === 'template' && selectedTemplate) {
      setCurrentStep('image')
    } else if (currentStep === 'image' && uploadedImage) {
      setCurrentStep('message')
    } else if (currentStep === 'message' && message) {
      setCurrentStep('preview')
    } else if (currentStep === 'preview') {
      router.push('/checkout')
    }
  }

  const handleBack = () => {
    if (currentStep === 'image') {
      setCurrentStep('template')
    } else if (currentStep === 'message') {
      setCurrentStep('image')
    } else if (currentStep === 'preview') {
      setCurrentStep('message')
    }
  }

  const canProceed = () => {
    if (currentStep === 'template') return selectedTemplate !== null
    if (currentStep === 'image') return uploadedImage !== null
    if (currentStep === 'message') return message.trim().length > 0
    if (currentStep === 'preview') return true
    return false
  }

  const stepTitles = {
    template: 'Choose a Template',
    image: 'Upload Your Photo',
    message: 'Write Your Message',
    preview: 'Preview & Confirm',
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
              <div className="text-sm text-gray-600">
                Step {currentStep === 'template' ? 1 : currentStep === 'image' ? 2 : currentStep === 'message' ? 3 : 4} of 4
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex">
            {(['template', 'image', 'message', 'preview'] as Step[]).map((step, index) => (
              <div
                key={step}
                className={`flex-1 py-4 text-center border-b-2 transition-colors ${
                  currentStep === step
                    ? 'border-primary-500 text-primary-500 font-semibold'
                    : index < (['template', 'image', 'message', 'preview'] as Step[]).indexOf(currentStep)
                    ? 'border-primary-300 text-gray-700'
                    : 'border-gray-200 text-gray-400'
                }`}
              >
                {stepTitles[step]}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">{stepTitles[currentStep]}</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Creator */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              {currentStep === 'template' && (
                <TemplateSelector
                  selectedTemplate={selectedTemplate}
                  onSelectTemplate={setSelectedTemplate}
                />
              )}

              {currentStep === 'image' && (
                <ImageUploader
                  uploadedImage={uploadedImage}
                  onImageUpload={setUploadedImage}
                />
              )}

              {currentStep === 'message' && (
                <MessageEditor
                  message={message}
                  onMessageChange={setMessage}
                  handwritingFont={handwritingFont}
                  onFontChange={setHandwritingFont}
                />
              )}

              {currentStep === 'preview' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Your Postcard is Ready!</h3>
                  <p className="text-gray-600">
                    Review your postcard on the right. If everything looks good, proceed to add the recipient's address and payment.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div><strong>Template:</strong> Selected</div>
                    <div><strong>Image:</strong> Uploaded</div>
                    <div><strong>Message:</strong> {message.substring(0, 50)}...</div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Preview */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <PostcardPreview
                templateId={selectedTemplate}
                imageUrl={uploadedImage}
                message={message}
                handwritingFont={handwritingFont}
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentStep === 'template'}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center space-x-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{currentStep === 'preview' ? 'Continue to Checkout' : 'Next'}</span>
              <ArrowRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
