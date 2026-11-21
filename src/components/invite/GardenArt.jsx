import gardenScene from '../../assets/illustrations/garden-scene.jpg'

export default function GardenArt({ className = '' }) {
  return (
    <div className={`relative mx-auto w-full max-w-lg ${className}`}>
      <img
        src={gardenScene}
        alt=""
        className="block w-full select-none"
        style={{
          filter: 'contrast(1.02) saturate(0.95)',
        }}
        draggable={false}
      />
      {/* soft fade into cream paper so edges feel printed, not pasted */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-10"
        style={{
          background: 'linear-gradient(180deg, #F7F1E6 0%, transparent 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-8"
        style={{
          background: 'linear-gradient(0deg, #F7F1E6 0%, transparent 100%)',
        }}
      />
    </div>
  )
}
