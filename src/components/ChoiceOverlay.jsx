import { useScriptEngine } from '../hooks/useScriptEngine'

export default function ChoiceOverlay() {
  const { dialogue, hasChoices, selectChoice, yandereLock } = useScriptEngine()

  if (!hasChoices) return null

  const choices = dialogue.choices

  const displayChoices = yandereLock
    ? choices.map(() => ({ text: '永远留在夏茉身边', targetSceneId: 'scene_p1_end' }))
    : choices

  return (
    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-30">
      <div className="w-full max-w-md mx-4 space-y-2">
        {yandereLock && (
          <div className="text-crt-danger text-sm text-center mb-2 animate-pulse">
            ⚠ SYSTEM LOCKED - 选择已被收束
          </div>
        )}
        {displayChoices.map((choice, index) => (
          <button
            key={index}
            onClick={() => selectChoice(choice)}
            className="option-btn w-full bg-crt-bg border-2 border-crt-border hover:border-crt-amber text-crt-green hover:text-crt-amber px-4 py-3 text-left transition-all"
          >
            <span className="text-crt-amber mr-2">[{index + 1}]</span>
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  )
}
