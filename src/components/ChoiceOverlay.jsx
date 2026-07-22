import { useScriptEngine } from '../hooks/useScriptEngine'
import { useGameStore } from '../store/useGameStore'

const HIJACKED_CHOICE = { text: '永远留在夏茉身边', targetSceneId: 'scene_p2_yandere_lock', conditionKey: null }

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
    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-30">
      <div className="w-full max-w-md mx-4 space-y-2">
        {shouldHijack && (
          <div className="text-crt-danger text-sm text-center mb-2 animate-pulse">
            ⚠ SYSTEM LOCKED - 选择已被收束
          </div>
        )}
        {displayChoices.map((choice, index) => (
          <button
            key={index}
            onClick={() => selectChoice(choice)}
            className={`option-btn w-full border-2 px-4 py-3 text-left transition-all ${
              shouldHijack
                ? 'border-crt-danger text-crt-danger hover:bg-crt-danger/10'
                : 'border-crt-border hover:border-crt-amber text-crt-green hover:text-crt-amber'
            }`}
          >
            <span className={`mr-2 ${shouldHijack ? 'text-crt-danger' : 'text-crt-amber'}`}>
              [{index + 1}]
            </span>
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  )
}
