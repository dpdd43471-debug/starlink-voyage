import { useEffect, useRef } from 'react'
import { useGameStore } from '../store/useGameStore'
import { playGlitchNoise, playYandereHum, stopYandereHum } from '../utils/audioSynthesizer'

export function useAudioManager() {
  const screenShake = useGameStore((s) => s.stageEffects.screenShake)
  const glitchFilter = useGameStore((s) => s.character.glitchFilter)
  const isHijacked = useGameStore((s) => s.persistentMemory.isHijacked)
  const systemAlertOpen = useGameStore((s) => s.modals.systemAlert.open)

  const prevGlitchRef = useRef('none')
  const prevShakeRef = useRef(false)
  const prevHijackedRef = useRef(false)
  const prevAlertOpenRef = useRef(false)

  useEffect(() => {
    const glitchChanged = glitchFilter !== prevGlitchRef.current
    const shakeTriggered = screenShake && !prevShakeRef.current

    if (glitchChanged && glitchFilter !== 'none') {
      playGlitchNoise()
    } else if (shakeTriggered) {
      playGlitchNoise()
    }

    prevGlitchRef.current = glitchFilter
    prevShakeRef.current = screenShake
  }, [glitchFilter, screenShake])

  useEffect(() => {
    if (isHijacked !== prevHijackedRef.current) {
      if (isHijacked) {
        playYandereHum()
      } else {
        stopYandereHum()
      }
      prevHijackedRef.current = isHijacked
    }

    return () => {
      if (prevHijackedRef.current) {
        stopYandereHum()
        prevHijackedRef.current = false
      }
    }
  }, [isHijacked])

  useEffect(() => {
    if (systemAlertOpen && !prevAlertOpenRef.current) {
      import('../utils/audioSynthesizer').then((mod) => {
        mod.playAlertBeep()
      })
    }
    prevAlertOpenRef.current = systemAlertOpen
  }, [systemAlertOpen])

  return { isHijacked, screenShake, glitchFilter }
}
