import { useScriptEngine } from '../hooks/useScriptEngine'
import { useGameStore } from '../store/useGameStore'

const SPEAKER_STYLES = {
  夏茉: {
    bg: 'bg-pink-500/20',
    text: 'text-pink-300',
    border: 'border-pink-500/40',
    glow: 'gal-text-glow-pink',
  },
  凛: {
    bg: 'bg-cyan-500/20',
    text: 'text-cyan-300',
    border: 'border-cyan-500/40',
    glow: 'gal-text-glow-cyan',
  },
}

export default function DialogueBox() {
  const { dialogue, currentText, isTyping, nextStep } = useScriptEngine()
  const sceneId = useGameStore((s) => s.sceneId)
  const dialogueIndex = useGameStore((s) => s.dialogueIndex)
  const yandereLock = useGameStore((s) => s.metaFlags.yandereLock)
  const isHijacked = useGameStore((s) => s.persistentMemory.isHijacked)
  const showAlert = useGameStore((s) => s.showAlert)

  const shouldHijack = yandereLock || isHijacked
  const speaker = dialogue?.speaker
  const speakerStyle = speaker ? SPEAKER_STYLES[speaker] : null

  const handleSaveClick = (e) => {
    e.stopPropagation()
    if (shouldHijack) {
      showAlert('警告', '夏茉：不需要存盘哦，因为我会一直陪着你。')
    }
  }

  return (
    <div
      className={`relative w-full px-6 pb-8 pt-4 transition-all duration-500 ${
        shouldHijack ? '' : ''
      }`}
    >
      <div
        className={`relative gal-glass-strong rounded-lg p-5 transition-all duration-500 ${
          shouldHijack
            ? 'border-red-500/60 danger-border-pulse'
            : 'border-white/10 gal-border-glow-pink'
        }`}
      >
        {shouldHijack && (
          <div className="absolute -top-3 left-6 px-3 py-0.5 bg-red-500/90 text-white text-xs font-bold rounded animate-pulse z-10">
            ⚠ SYSTEM LOCKED
          </div>
        )}

        {speaker && (
          <div
            className={`absolute -top-4 left-6 px-4 py-1 rounded-full text-sm font-medium border transition-all duration-300 ${
              shouldHijack
                ? 'bg-red-500/30 text-red-300 border-red-500/50 rgb-split-text'
                : speakerStyle
                  ? `${speakerStyle.bg} ${speakerStyle.text} border ${speakerStyle.border} ${speakerStyle.glow}`
                  : 'bg-white/10 text-gray-300 border-white/20'
            }`}
          >
            {speaker}
          </div>
        )}

        <div
          className={`text-base leading-relaxed cursor-pointer min-h-[80px] pt-2 transition-all duration-300 ${
            shouldHijack
              ? 'text-red-300 rgb-split-text'
              : 'text-gray-100'
          }`}
          style={{ textShadow: shouldHijack ? undefined : '0 1px 2px rgba(0,0,0,0.5)' }}
          onClick={() => nextStep()}
        >
          {currentText}
          {isTyping && (
            <span className={`inline-block w-2 h-4 ml-1 align-middle ${shouldHijack ? 'bg-red-400' : 'bg-pink-400/70'} blink`} />
          )}
        </div>

        <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/5">
          <div className="flex gap-2">
            {shouldHijack ? (
              <>
                <button
                  onClick={handleSaveClick}
                  className="px-3 py-1 text-xs font-bold text-red-400 border border-red-500/50 rounded hover:bg-red-500/20 transition-all animate-pulse"
                >
                  XiaMo
                </button>
                <button
                  onClick={handleSaveClick}
                  className="px-3 py-1 text-xs font-bold text-red-400 border border-red-500/50 rounded hover:bg-red-500/20 transition-all animate-pulse"
                >
                  XiaMo
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={(e) => { e.stopPropagation() }}
                  className="gal-btn"
                >
                  Save
                </button>
                <button
                  onClick={(e) => { e.stopPropagation() }}
                  className="gal-btn"
                >
                  Load
                </button>
                <button
                  onClick={(e) => { e.stopPropagation() }}
                  className="gal-btn"
                >
                  Auto
                </button>
                <button
                  onClick={(e) => { e.stopPropagation() }}
                  className="gal-btn"
                >
                  Skip
                </button>
                <button
                  onClick={(e) => { e.stopPropagation() }}
                  className="gal-btn"
                >
                  Log
                </button>
              </>
            )}
          </div>

          <div className={`text-xs ${shouldHijack ? 'text-red-500/60' : 'text-gray-500'}`}>
            {sceneId.replace('scene_', '')} · {dialogueIndex + 1}
          </div>
        </div>
      </div>
    </div>
  )
}
