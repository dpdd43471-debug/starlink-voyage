import { useEffect, useState } from 'react'
import { useGameStore } from './store/useGameStore'
import { useScriptEngine } from './hooks/useScriptEngine'
import { useMetaListeners } from './hooks/useMetaListeners'
import { useAudioManager } from './hooks/useAudioManager'
import { initAudio, getAudioContextState } from './utils/audioSynthesizer'
import CharacterStage from './components/CharacterStage'
import DialogueBox from './components/DialogueBox'
import ChoiceOverlay from './components/ChoiceOverlay'
import SystemAlertModal from './components/SystemAlertModal'
import TerminalModal from './components/TerminalModal'
import EndingOverlay from './components/EndingOverlay'

export default function App() {
  const sceneId = useGameStore((s) => s.sceneId)
  const metaFlags = useGameStore((s) => s.metaFlags)
  const playthroughCount = useGameStore((s) => s.persistentMemory.playthroughCount)
  const worldVersion = useGameStore((s) => s.persistentMemory.worldVersion)
  const isHijacked = useGameStore((s) => s.persistentMemory.isHijacked)
  const openTerminal = useGameStore((s) => s.openTerminal)
  const unlockedEnding = useGameStore((s) => s.persistentMemory.unlockedEnding)
  const showAlert = useGameStore((s) => s.showAlert)
  const resetGame = useGameStore((s) => s.resetGame)

  const [audioReady, setAudioReady] = useState(false)
  const [restartConfirmOpen, setRestartConfirmOpen] = useState(false)

  useMetaListeners()
  useAudioManager()
  const { scene } = useScriptEngine()

  const handleFirstInteraction = () => {
    if (!audioReady) {
      const ok = initAudio()
      setAudioReady(ok || getAudioContextState() === 'running')
    }
  }

  const handleRestart = (e) => {
    e.stopPropagation()
    setRestartConfirmOpen(true)
  }

  const confirmRestart = () => {
    resetGame()
    setRestartConfirmOpen(false)
  }

  useEffect(() => {
    const titles = {
      scene_p1_convenience_store: '便利店 · 夏茉',
      scene_p1_library_rin: '图书室 · 阴天',
      scene_p1_server_room: '旧机房 · 雨',
      scene_p1_rain_care: '暴雨 · 感冒药',
      scene_p1_rooftop_confession: '天台 · 告白',
      scene_p2_yandere_break: '二周目 · ??',
      scene_p2_yandere_lock: '不许去。',
      scene_p2_stay_xiamo: '永远在一起',
      scene_p1_end: '—— Act 1 结束 ——',
    }
    document.title = titles[sceneId] || '回收站里的告白'
  }, [sceneId])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '`' && e.ctrlKey) {
        e.preventDefault()
        openTerminal()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [openTerminal])

  const bgImage = scene?.bgImage || 'default.png'
  const bgm = scene?.bgm || ''

  return (
    <div
      className="min-h-screen bg-crt-bg flex flex-col relative overflow-hidden"
      onClick={handleFirstInteraction}
      onKeyDown={handleFirstInteraction}
    >
      <div className="crt-scanlines absolute inset-0 pointer-events-none opacity-10" />

      <header className="border-b-2 border-crt-border bg-[#050508] px-4 py-2 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <span className="text-crt-green font-bold text-lg">RECYCLE BIN</span>
          <span className="text-crt-gray text-xs">v{worldVersion} · P{playthroughCount}</span>
        </div>

        <div className="flex items-center gap-4 text-xs text-crt-gray">
          <span
            className={audioReady ? 'text-crt-green' : 'text-crt-gray/60'}
            title={audioReady ? 'Audio active' : 'Click to enable audio'}
          >
            {audioReady ? '♪ Audio' : '♪ Click to enable'}
          </span>
          <span>Tab: {metaFlags.tabSwitchCount}</span>
          {isHijacked && (
            <span className="text-crt-danger animate-pulse">LOCKED</span>
          )}
          {metaFlags.devToolsOpened && (
            <span className="text-crt-amber">DEV TOOLS</span>
          )}
          <button
            onClick={handleRestart}
            className="text-crt-amber hover:text-crt-danger transition-colors border border-crt-border px-2 py-0.5 rounded"
            title="重新开始游戏（清空所有进度）"
          >
            ↻ Restart
          </button>
          <button
            onClick={openTerminal}
            className="text-crt-green hover:text-crt-amber transition-colors border border-crt-border px-2 py-0.5 rounded"
            title="Ctrl+` to open"
          >
            Terminal
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full relative">
        <div className="flex-1 p-4 relative">
          <CharacterStage />
          <ChoiceOverlay />
        </div>

        <div className="text-crt-gray text-xs px-4 py-1 border-t border-crt-gray">
          [BG: {bgImage}] [BGM: {bgm}] [Scene: {sceneId}]
        </div>

        <DialogueBox />
      </main>

      {restartConfirmOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#0a0a0f] border-2 border-crt-border p-6 max-w-md mx-4">
            <h3 className="text-crt-danger text-lg font-bold mb-3">⚠ 确认重新开始？</h3>
            <p className="text-crt-gray text-sm mb-4">
              所有进度、选择历史和 Meta 标记将被清空。<br />
              此操作无法撤销。
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={(e) => { e.stopPropagation(); setRestartConfirmOpen(false) }}
                className="px-4 py-1.5 border border-crt-border text-crt-green hover:border-crt-amber hover:text-crt-amber transition-colors"
              >
                取消
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); confirmRestart() }}
                className="px-4 py-1.5 border border-crt-danger text-crt-danger hover:bg-crt-danger/10 transition-colors"
              >
                确认重置
              </button>
            </div>
          </div>
        </div>
      )}

      <SystemAlertModal />
      <TerminalModal />
      {unlockedEnding && <EndingOverlay />}
    </div>
  )
}
