import { X } from 'lucide-react'

export default function Lightbox({ src, alt, onClose }) {
  if (!src) return null
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-olive/80 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        className="absolute right-4 top-4 rounded-full bg-ivory/90 p-2 text-olive"
        onClick={onClose}
        aria-label="Close"
      >
        <X size={20} />
      </button>
      <img
        src={src}
        alt={alt || 'Gallery image'}
        className="max-h-[85vh] max-w-full rounded-sm object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}
