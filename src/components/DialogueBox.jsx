import { useScriptEngine } from '../hooks/useScriptEngine'
import { useGameStore } from '../store/useGameStore'

export default function DialogueBox() {
  const { dialogue, currentText, isTyping, nextStep } = useScriptEngine()
  const sceneId = useGameStore((s) => s.sceneId)
  const dialogueIndex = useGameStore((s) => s.dialogueIndex)
  const yandereLock = useGameStore((s) => s.metaFlags.yandereLock)
  const isHijacked = useGameStore((s) => s.persistentMemory.isHijacked)
  const showAlert = useGameStore((s) => s.showAlert)

  const shouldHijack = yandereLock || isHijacked

  const handleSaveClick = () => {
    if (shouldHijack) {
      showAlert('警告', '夏茉：不需要存盘哦，因为我会一直陪着你。')
    }
  }

  return (
    <div className="w-full bg-crt-bg border-t-2 border-crt-border p-4">
      {shouldHijack && (
        <div className="mb-2 flex items-center gap-2 text-crt-danger">
          <span className="animate-pulse">!</span>
          <span className="text-sm">SYSTEM LOCKED - YANDERE MODE ACTIVE</span>
        </div>
      )}

      <div className="flex items-start gap-3 mb-2">
        <span className="text-crt-amber font-bold min-w-[80px]">
          {dialogue?.speaker || '——'}
        </span>
        <div className="flex-1" />
      </div>

      <div
        className="text-crt-green text-base leading-relaxed cursor-pointer min-h-[60px]"
        onClick={() => nextStep()}
      >
        {currentText}
        {isTyping && <span className="animate-pulse">_</span>}
      </div>

      <div className="flex justify-between items-center mt-3 pt-2 border-t border-crt-gray">
        <div className="flex gap-4">
          {shouldHijack ? (
            <>
              <button
                onClick={handleSaveClick}
                className="text-crt-danger hover:text-red-500 transition-colors text-sm font-bold"
              >
                XiaMo
              </button>
              <button
                onClick={handleSaveClick}
                className="text-crt-danger hover:text-red-500 transition-colors text-sm font-bold"
              >
                XiaMo
              </button>
            </>
          ) : (
            <>
              <button className="text-crt-amber hover:text-crt-green transition-colors text-sm">
                Save
              </button>
              <button className="text-crt-amber hover:text-crt-green transition-colors text-sm">
                Load
              </button>
            </>
          )}
          <button className="text-crt-amber hover:text-crt-green transition-colors text-sm">
            Auto
          </button>
        </div>

        <div className="text-crt-gray text-xs">
          {sceneId} - {dialogueIndex + 1}
        </div>
      </div>
    </div>
  )
}
