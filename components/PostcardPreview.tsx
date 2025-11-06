'use client'

interface PostcardPreviewProps {
  templateId: string | null
  imageUrl: string | null
  message: string
  handwritingFont: string
}

export default function PostcardPreview({
  templateId,
  imageUrl,
  message,
  handwritingFont,
}: PostcardPreviewProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Preview</h3>

      {/* Front Preview */}
      <div>
        <p className="text-sm text-gray-600 mb-2">Front</p>
        <div className="aspect-[3/2] rounded-lg overflow-hidden border-2 border-gray-200 bg-white shadow-md">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Postcard front"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <p className="text-gray-400">No image uploaded</p>
            </div>
          )}
        </div>
      </div>

      {/* Back Preview */}
      <div>
        <p className="text-sm text-gray-600 mb-2">Back</p>
        <div className="aspect-[3/2] rounded-lg overflow-hidden border-2 border-gray-200 bg-white shadow-md">
          <div className="w-full h-full p-6 flex">
            {/* Left side: Message */}
            <div className="flex-1 pr-4 border-r-2 border-dashed border-gray-300">
              <div
                className="text-lg leading-relaxed"
                style={{ fontFamily: handwritingFont }}
              >
                {message || (
                  <span className="text-gray-400 italic">
                    Your message will appear here...
                  </span>
                )}
              </div>
            </div>

            {/* Right side: Address area */}
            <div className="w-1/3 pl-4 flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-gray-400 text-xs">
                  <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded mx-auto mb-2 flex items-center justify-center">
                    STAMP
                  </div>
                </div>
              </div>
              <div className="space-y-1 text-xs text-gray-400">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 text-center">
        This is a preview. Actual print quality may vary.
      </p>
    </div>
  )
}
