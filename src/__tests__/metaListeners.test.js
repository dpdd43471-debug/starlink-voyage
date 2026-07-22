import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useMetaListeners } from '../hooks/useMetaListeners'
import { useGameStore } from '../store/useGameStore'

describe('useMetaListeners', () => {
  beforeEach(() => {
    useGameStore.setState({
      sceneId: 'scene_p1_convenience_store',
      dialogueIndex: 0,
      metaFlags: { tabSwitchCount: 0, yandereLock: false, devToolsOpened: false },
      persistentMemory: {
        visitedScenes: [],
        choiceHistory: [],
        refreshCount: 0,
        playthroughCount: 1,
        hasCompletedXiaMoRoute: false,
        betrayedXiaMo: false,
        isHijacked: false,
      },
      modals: { systemAlert: { open: false, title: '', content: '' }, terminalOpen: false },
    })
  })

  afterEach(() => {
    useGameStore.persist.clearStorage()
    vi.restoreAllMocks()
  })

  it('should increment tabSwitchCount when document becomes hidden', () => {
    renderHook(() => useMetaListeners())

    expect(useGameStore.getState().metaFlags.tabSwitchCount).toBe(0)

    Object.defineProperty(document, 'hidden', { value: true, configurable: true })
    document.dispatchEvent(new Event('visibilitychange'))

    expect(useGameStore.getState().metaFlags.tabSwitchCount).toBe(1)

    Object.defineProperty(document, 'hidden', { value: false, configurable: true })
    document.dispatchEvent(new Event('visibilitychange'))

    expect(useGameStore.getState().metaFlags.tabSwitchCount).toBe(1)
  })

  it('should not show alert on return when not hijacked', () => {
    renderHook(() => useMetaListeners())

    Object.defineProperty(document, 'hidden', { value: true, configurable: true })
    document.dispatchEvent(new Event('visibilitychange'))

    Object.defineProperty(document, 'hidden', { value: false, configurable: true })
    document.dispatchEvent(new Event('visibilitychange'))

    expect(useGameStore.getState().modals.systemAlert.open).toBe(false)
  })

  it('should show alert on return when hijacked', () => {
    useGameStore.getState().enableYandereLock()
    renderHook(() => useMetaListeners())

    Object.defineProperty(document, 'hidden', { value: true, configurable: true })
    document.dispatchEvent(new Event('visibilitychange'))

    Object.defineProperty(document, 'hidden', { value: false, configurable: true })
    document.dispatchEvent(new Event('visibilitychange'))

    const alert = useGameStore.getState().modals.systemAlert
    expect(alert.open).toBe(true)
    expect(alert.title).toBe('夏茉')
    expect(alert.content).toContain('去哪里了')
  })

  it('should set devToolsOpened when F12 pressed', () => {
    renderHook(() => useMetaListeners())

    expect(useGameStore.getState().metaFlags.devToolsOpened).toBe(false)

    const event = new KeyboardEvent('keydown', { key: 'F12' })
    window.dispatchEvent(event)

    expect(useGameStore.getState().metaFlags.devToolsOpened).toBe(true)
  })

  it('should set devToolsOpened when Ctrl+Shift+I pressed', () => {
    renderHook(() => useMetaListeners())

    const event = new KeyboardEvent('keydown', {
      key: 'I',
      ctrlKey: true,
      shiftKey: true,
    })
    window.dispatchEvent(event)

    expect(useGameStore.getState().metaFlags.devToolsOpened).toBe(true)
  })

  it('enableYandereLock should set both yandereLock and isHijacked', () => {
    expect(useGameStore.getState().metaFlags.yandereLock).toBe(false)
    expect(useGameStore.getState().persistentMemory.isHijacked).toBe(false)

    useGameStore.getState().enableYandereLock()

    expect(useGameStore.getState().metaFlags.yandereLock).toBe(true)
    expect(useGameStore.getState().persistentMemory.isHijacked).toBe(true)
  })

  it('showAlert should be callable and open alert', () => {
    useGameStore.getState().showAlert('Test', 'Content')
    expect(useGameStore.getState().modals.systemAlert.open).toBe(true)
    expect(useGameStore.getState().modals.systemAlert.title).toBe('Test')
  })

  it('should persist isHijacked in localStorage', () => {
    useGameStore.getState().enableYandereLock()

    const stored = JSON.parse(localStorage.getItem('recycle-bin-confession-storage'))
    expect(stored.state.persistentMemory.isHijacked).toBe(true)
    expect(stored.state.metaFlags.yandereLock).toBe(true)
  })
})
