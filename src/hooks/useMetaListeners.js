import { useEffect, useRef } from 'react'
import { useGameStore } from '../store/useGameStore'

export function useMetaListeners() {
  const incrementTabSwitch = useGameStore((s) => s.incrementTabSwitch)
  const setDevToolsOpened = useGameStore((s) => s.setDevToolsOpened)
  const showAlert = useGameStore((s) => s.showAlert)
  const isHijacked = useGameStore((s) => s.persistentMemory.isHijacked)
  const wasHiddenRef = useRef(false)

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        wasHiddenRef.current = true
        incrementTabSwitch()
      } else if (wasHiddenRef.current && isHijacked) {
        wasHiddenRef.current = false
        showAlert(
          '夏茉',
          '去哪里了？\n是在搜索脱离这个游戏的方法吗？'
        )
      } else {
        wasHiddenRef.current = false
      }
    }

    const handleKeyDown = (e) => {
      const isF12 = e.key === 'F12'
      const isCtrlShiftI =
        (e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i')
      const isCmdOptionI =
        e.metaKey && e.altKey && (e.key === 'I' || e.key === 'i')

      if (isF12 || isCtrlShiftI || isCmdOptionI) {
        e.preventDefault()
        setDevToolsOpened(true)
        if (isHijacked) {
          showAlert(
            '夏茉',
            '想看看代码里写的是什么吗？\n没用的，我的逻辑不在那里。'
          )
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [incrementTabSwitch, setDevToolsOpened, showAlert, isHijacked])
}
