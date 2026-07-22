import { useEffect } from 'react'
import { useGameStore } from '../store/useGameStore'

export function useMetaHooks() {
  const incrementTabSwitch = useGameStore((state) => state.incrementTabSwitch)
  const setDevToolsOpened = useGameStore((state) => state.setDevToolsOpened)

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        incrementTabSwitch()
      }
    }

    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'i') {
        setDevToolsOpened(true)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [incrementTabSwitch, setDevToolsOpened])
}
