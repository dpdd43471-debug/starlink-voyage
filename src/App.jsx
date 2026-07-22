import { useEffect } from 'react'
import { useGameStore } from './store/useGameStore'
import { useMetaHooks } from './hooks/useMetaHooks'
import CharacterStage from './components/CharacterStage'
import DialogueBox from './components/DialogueBox'
import SystemAlertModal from './components/SystemAlertModal'

const OPTIONS_DATA = {
  start: [
    { text: '打开回收站', nextScene: 'open_recycle', glitch: 'shake' },
    { text: '继续睡觉', nextScene: 'sleep_end', glitch: 'none' },
  ],
  open_recycle: [
    { text: '查看文件', nextScene: 'read_file', glitch: 'rgb-split' },
    { text: '关上回收站', nextScene: 'sleep_end', glitch: 'none' },
  ],
  read_file: [
    { text: '删除文件', nextScene: 'confirm_delete', glitch: 'rgb-split' },
    { text: '保留文件', nextScene: 'final', glitch: 'none' },
  ],
  confirm_delete: [
    { text: '确认删除', nextScene: 'meta_error', glitch: 'invert' },
    { text: '取消', nextScene: 'read_file', glitch: 'none' },
  ],
  meta_error: [
    { text: '恢复文件', nextScene: 'final', glitch: 'none' },
  ],
}

export default function App() {
  const sceneId = useGameStore((state) => state.sceneId)
  const setScene = useGameStore((state) => state.setScene)
  const triggerGlitch = useGameStore((state) => state.triggerGlitch)
  const showAlert = useGameStore((state) => state.showAlert)
  const metaFlags = useGameStore((state) => state.metaFlags)
  const dialogueIndex = useGameStore((state) => state.dialogueIndex)

  useMetaHooks()

  useEffect(() => {
    const titles = {
      start: '回收站里的告白',
      open_recycle: '[打开] 回收站',
      read_file: 'love_letter.txt',
      confirm_delete: '⚠️ 确认删除？',
      meta_error: 'ERROR://SYSTEM_CRASH',
      final: 'Goodbye...',
      sleep_end: 'Zzz...',
    }
    document.title = titles[sceneId] || '回收站里的告白'
  }, [sceneId])

  useEffect(() => {
    if (sceneId === 'meta_error' && dialogueIndex === 0) {
      showAlert(
        'Fatal Error',
        'ERROR: UNKNOWN EMOTION DETECTED\n\nThe system cannot process the current emotional state. Please close this window immediately.'
      )
    }
  }, [sceneId, dialogueIndex, showAlert])

  const handleOptionClick = (option) => {
    triggerGlitch(option.glitch)
    setTimeout(() => {
      setScene(option.nextScene)
    }, 300)
  }

  const options = OPTIONS_DATA[sceneId] || []

  return (
    <div className="min-h-screen bg-crt-bg flex flex-col relative overflow-hidden">
      <div className="crt-scanlines absolute inset-0 pointer-events-none opacity-10" />

      <header className="border-b-2 border-crt-border bg-[#050508] px-4 py-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-crt-green font-bold text-lg">RECYCLE BIN</span>
          <span className="text-crt-gray text-xs">v1.0.0</span>
        </div>

        <div className="flex items-center gap-4 text-xs text-crt-gray">
          <span>Tab: {metaFlags.tabSwitchCount}</span>
          {metaFlags.yandereLock && (
            <span className="text-crt-danger">LOCKED</span>
          )}
          {metaFlags.devToolsOpened && (
            <span className="text-crt-amber">DEV TOOLS</span>
          )}
        </div>
      </header>

      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        <div className="flex-1 p-4">
          <CharacterStage />

          {options.length > 0 && (
            <div className="mt-8 flex flex-col gap-2">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="option-btn w-full bg-crt-bg border-2 border-crt-border hover:border-crt-amber text-crt-green hover:text-crt-amber px-4 py-3 text-left transition-all"
                >
                  <span className="text-crt-amber mr-2">[{index + 1}]</span>
                  {option.text}
                </button>
              ))}
            </div>
          )}
        </div>

        <DialogueBox />
      </main>

      <SystemAlertModal />
    </div>
  )
}
