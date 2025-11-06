'use client'

interface MessageEditorProps {
  message: string
  onMessageChange: (message: string) => void
  handwritingFont: string
  onFontChange: (font: string) => void
}

const handwritingFonts = [
  { name: 'Caveat', label: 'Casual' },
  { name: 'Dancing Script', label: 'Elegant' },
  { name: 'Indie Flower', label: 'Playful' },
]

export default function MessageEditor({
  message,
  onMessageChange,
  handwritingFont,
  onFontChange,
}: MessageEditorProps) {
  const maxLength = 500

  return (
    <div className="space-y-4">
      <p className="text-gray-600">
        Write your message. It will appear in a handwriting style on the back of your postcard.
      </p>

      {/* Font Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Handwriting Style
        </label>
        <div className="grid grid-cols-3 gap-2">
          {handwritingFonts.map((font) => (
            <button
              key={font.name}
              onClick={() => onFontChange(font.name)}
              className={`px-3 py-2 rounded-lg border-2 transition-colors ${
                handwritingFont === font.name
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              style={{ fontFamily: font.name }}
            >
              {font.label}
            </button>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Message
        </label>
        <textarea
          value={message}
          onChange={(e) => {
            if (e.target.value.length <= maxLength) {
              onMessageChange(e.target.value)
            }
          }}
          placeholder="Dear friend, I'm thinking of you..."
          className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          style={{ fontFamily: handwritingFont }}
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm text-gray-500">
            Use a natural, personal tone
          </p>
          <p className="text-sm text-gray-500">
            {message.length} / {maxLength}
          </p>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Writing Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Keep it personal and heartfelt</li>
          <li>• Mention specific memories or inside jokes</li>
          <li>• Sign your name at the end</li>
        </ul>
      </div>
    </div>
  )
}
