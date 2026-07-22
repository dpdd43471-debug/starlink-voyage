import { useEffect, useState } from 'react'
import { useGameStore } from './store/useGameStore'
import { useScriptEngine } from './hooks/useScriptEngine'
import { useMetaListeners } from './hooks/useMetaListeners'
import { useAudioManager } from './hooks/useAudioManager'
import { initAudio, getAudioContextState } from './utils/audioSynthesizer'
import CharacterSprite from './components/assets/CharacterSprite'
import BackgroundStage from './components/assets/BackgroundStage'
import DialogueBox from './components/DialogueBox'
import ChoiceOverlay from './components/ChoiceOverlay'
import SystemAlertModal from './components/SystemAlertModal'
import TerminalModal from './components/TerminalModal'
import EndingOverlay from './components/EndingOverlay'

export default function App() {
  const sceneId = useGameStore((s) => s.sceneId)
  const character = useGameStore((s) => s.character)
  const metaFlags = useGameStore((s) => s.metaFlags)
  const stageEffects = useGameStore((s) => s.stageEffects)
  const playthroughCount = useGameStore((s) => s.persistentMemory.playthroughCount)
  const worldVersion = useGameStore((s) => s.persistentMemory.worldVersion)
  const isHijacked = useGameStore((s) => s.persistentMemory.isHijacked)
  const openTerminal = useGameStore((s) => s.openTerminal)
  const unlockedEnding = useGameStore((s) => s.persistentMemory.unlockedEnding)
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

  const confirmRestart = (e) => {
    e.stopPropagation()
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

  const yandereLock = metaFlags.yandereLock
  const shouldHijack = yandereLock || isHijacked

  return (
    <div
      className={`min-h-screen flex flex-col relative overflow-hidden transition-all duration-1000 ${
        shouldHijack ? 'crt-scanlines' : ''
      }`}
      style={{ backgroundColor: '#0f0d14' }}
      onClick={handleFirstInteraction}
      onKeyDown={handleFirstInteraction}
    >
      <BackgroundStage sceneId={sceneId} stageEffects={stageEffects} />

      <header className="relative z-20 px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span
            className={`font-bold text-lg tracking-wide transition-all duration-500 ${
              shouldHijack
                ? 'text-red-400 rgb-split-text'
                : 'text-white/90'
            }`}
            style={{ textShadow: shouldHijack ? undefined : '0 0 20px rgba(255,158,199,0.3)' }}
          >
            回收站里的告白
          </span>
          <span className={`text-xs ${shouldHijack ? 'text-red-500/60' : 'text-white/30'}`}>
            v{worldVersion} · P{playthroughCount}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span
            className={`transition-colors duration-300 ${
              audioReady
                ? shouldHijack ? 'text-red-400' : 'text-pink-300/80'
                : 'text-white/25'
            }`}
            title={audioReady ? 'Audio active' : 'Click to enable audio'}
          >
            {audioReady ? '♪ Audio' : '♪ Click to enable'}
          </span>

          {metaFlags.tabSwitchCount > 0 && (
            <span className={shouldHijack ? 'text-red-400/70' : 'text-white/40'}>
              Tab: {metaFlags.tabSwitchCount}
            </span>
          )}

          {isHijacked && (
            <span className="text-red-400 animate-pulse font-bold tracking-wider">
              LOCKED
            </span>
          )}

          {metaFlags.devToolsOpened && (
            <span className={shouldHijack ? 'text-red-400' : 'text-amber-400/80'}>
              DEV TOOLS
            </span>
          )}

          <button
            onClick={handleRestart}
            className={`px-2.5 py-1 rounded text-xs transition-all duration-300 border ${
              shouldHijack
                ? 'text-red-400/70 border-red-500/30 hover:text-red-300 hover:border-red-400/50 hover:bg-red-500/10'
                : 'text-white/50 border-white/10 hover:text-pink-300 hover:border-pink-400/30 hover:bg-pink-500/10'
            }`}
            title="重新开始游戏"
          >
            ↻ Restart
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); openTerminal() }}
            className={`px-2.5 py-1 rounded text-xs transition-all duration-300 border ${
              shouldHijack
                ? 'text-red-400/70 border-red-500/30 hover:text-red-300 hover:border-red-400/50'
                : 'text-cyan-300/70 border-cyan-500/20 hover:text-cyan-200 hover:border-cyan-400/40 hover:bg-cyan-500/10'
            }`}
            title="Ctrl+` to open"
          >
            Terminal
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col max-w-5xl mx-auto w-full relative z-10">
        <div className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
            <CharacterSprite character={character} />
          </div>

          {stageEffects.screenShake && (
            <div className="absolute inset-0 animate-screen-shake pointer-events-none" />
          )}

          <ChoiceOverlay />
        </div>

        <DialogueBox />
      </main>

      {restartConfirmOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={(e) => { e.stopPropagation(); setRestartConfirmOpen(false) }}
        >
          <div
            className="gal-glass border border-white/10 rounded-lg p-6 max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-pink-300 text-lg font-bold mb-3">确认重新开始？</h3>
            <p className="text-gray-400 text-sm mb-5 leading-relaxed">
              所有进度、选择历史和 Meta 标记将被清空。<br />
              此操作无法撤销。
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setRestartConfirmOpen(false)}
                className="px-4 py-1.5 border border-white/10 text-gray-300 rounded hover:border-white/30 hover:text-white transition-all text-sm"
              >
                取消
              </button>
              <button
                onClick={confirmRestart}
                className="px-4 py-1.5 border border-pink-500/40 text-pink-300 rounded hover:bg-pink-500/20 hover:border-pink-400/60 transition-all text-sm"
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
