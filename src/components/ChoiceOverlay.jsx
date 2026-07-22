import { useScriptEngine } from '../hooks/useScriptEngine'
import { useGameStore } from '../store/useGameStore'

const HIJACKED_CHOICE = { text: '永远留在夏茉身边', targetSceneId: 'scene_p2_stay_xiamo', conditionKey: null }

export default function ChoiceOverlay() {
  const { dialogue, hasChoices, selectChoice } = useScriptEngine()
  const yandereLock = useGameStore((s) => s.metaFlags.yandereLock)
  const isHijacked = useGameStore((s) => s.persistentMemory.isHijacked)

  if (!hasChoices) return null

  const shouldHijack = yandereLock || isHijacked
  const displayChoices = shouldHijack
    ? [HIJACKED_CHOICE, HIJACKED_CHOICE]
    : dialogue.choices

  return (
    <div className="absolute inset-0 flex items-center justify-center z-30">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="relative w-full max-w-lg mx-6 space-y-3">
        {shouldHijack && (
          <div className="text-center mb-4">
            <span className="text-red-400 text-sm font-bold tracking-widest animate-pulse rgb-split-text">
              ⚠ SYSTEM LOCKED · 选择已被收束
            </span>
          </div>
        )}

        {displayChoices.map((choice, index) => (
          <button
            key={index}
            onClick={() => selectChoice(choice)}
            className={`option-btn w-full group relative overflow-hidden transition-all duration-300 ${
              shouldHijack
                ? 'border-2 border-red-500/60 bg-red-950/50 hover:bg-red-900/60 danger-border-pulse'
                : 'border border-white/10 gal-glass hover:border-pink-400/50 hover:gal-border-glow-pink'
            }`}
          >
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                shouldHijack
                  ? 'bg-gradient-to-r from-transparent via-red-500/10 to-transparent'
                  : 'bg-gradient-to-r from-pink-500/5 via-pink-400/10 to-cyan-400/5'
              }`}
            />

            <div className="relative px-5 py-3.5 flex items-center gap-4">
              <span
                className={`text-sm font-mono flex-shrink-0 ${
                  shouldHijack
                    ? 'text-red-400'
                    : 'text-pink-400/80 group-hover:text-pink-300 transition-colors'
                }`}
              >
                [{index + 1}]
              </span>
              <span
                className={`text-left transition-all duration-300 ${
                  shouldHijack
                    ? 'text-red-300 font-bold rgb-split-text'
                    : 'text-gray-100 group-hover:text-white group-hover:translate-x-1'
                }`}
              >
                {choice.text}
              </span>
              <span
                className={`ml-auto text-lg transition-all duration-300 ${
                  shouldHijack
                    ? 'text-red-500 opacity-70'
                    : 'text-pink-400/50 opacity-0 group-hover:opacity-100 group-hover:translate-x-1'
                }`}
              >
                ›
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
