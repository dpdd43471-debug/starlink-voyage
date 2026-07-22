import { useGameStore } from '../store/useGameStore'

const GLITCH_CLASS = {
  none: '',
  shake: 'animate-glitch-shake',
  'rgb-split': 'animate-glitch-rgb',
  invert: 'filter invert contrast-[1.5] saturate-[2] animate-glitch-shake',
}

export default function CharacterStage() {
  const character = useGameStore((state) => state.character)
  const stageEffects = useGameStore((state) => state.stageEffects)

  const glitchClass = GLITCH_CLASS[character.glitchFilter] || ''

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center transition-all duration-200 ${
        stageEffects.screenShake ? 'animate-screen-shake' : ''
      }`}
    >
      {stageEffects.screenFlash && (
        <div className="absolute inset-0 bg-white animate-screen-flash pointer-events-none z-50" />
      )}
      {stageEffects.vignetteDarkness > 0 && (
        <div
          className="absolute inset-0 pointer-events-none z-40"
          style={{
            background: `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,${stageEffects.vignetteDarkness}) 100%)`,
          }}
        />
      )}

      <div className={`relative ${glitchClass}`}>
        <svg
          width="180"
          height="220"
          viewBox="0 0 180 220"
          className="drop-shadow-lg"
        >
          <rect
            x="20"
            y="40"
            width="140"
            height="160"
            rx="8"
            fill="#1a1a2e"
            stroke="#00ff41"
            strokeWidth="2"
          />
          <rect
            x="30"
            y="50"
            width="120"
            height="30"
            rx="4"
            fill="#0a0a0f"
            stroke="#008822"
            strokeWidth="1"
          />
          <path
            d="M 50 80 Q 90 120 130 80"
            fill="none"
            stroke="#00ff41"
            strokeWidth="3"
          />
          <path
            d="M 55 95 Q 90 135 125 95"
            fill="none"
            stroke="#008822"
            strokeWidth="2"
          />
          <circle cx="65" cy="115" r="6" fill="#00ff41" />
          <circle cx="115" cy="115" r="6" fill="#00ff41" />
          <path
            d="M 70 140 Q 90 155 110 140"
            fill="none"
            stroke="#00ff41"
            strokeWidth="2"
          />
          <rect
            x="55"
            y="160"
            width="70"
            height="15"
            rx="3"
            fill="#008822"
            opacity="0.5"
          />
        </svg>
      </div>
    </div>
  )
}
