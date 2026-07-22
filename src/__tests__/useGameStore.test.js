import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { useGameStore } from '../store/useGameStore'

describe('useGameStore', () => {
  beforeEach(() => {
    useGameStore.getState().sceneId = 'start'
    useGameStore.getState().dialogueIndex = 0
    useGameStore.getState().character.glitchFilter = 'none'
    useGameStore.getState().metaFlags.yandereLock = false
    useGameStore.getState().modals.systemAlert.open = false
  })

  afterEach(() => {
    useGameStore.persist.clearStorage()
  })

  it('should initialize with default values', () => {
    const state = useGameStore.getState()
    expect(state.sceneId).toBe('start')
    expect(state.dialogueIndex).toBe(0)
    expect(state.isAutoPlaying).toBe(false)
    expect(state.character.glitchFilter).toBe('none')
    expect(state.metaFlags.yandereLock).toBe(false)
    expect(state.modals.systemAlert.open).toBe(false)
  })

  it('triggerGlitch should update character.glitchFilter', () => {
    const triggerGlitch = useGameStore.getState().triggerGlitch

    triggerGlitch('shake')
    expect(useGameStore.getState().character.glitchFilter).toBe('shake')

    triggerGlitch('rgb-split')
    expect(useGameStore.getState().character.glitchFilter).toBe('rgb-split')

    triggerGlitch('invert')
    expect(useGameStore.getState().character.glitchFilter).toBe('invert')

    triggerGlitch('none')
    expect(useGameStore.getState().character.glitchFilter).toBe('none')
  })

  it('enableYandereLock should set metaFlags.yandereLock to true', () => {
    const enableYandereLock = useGameStore.getState().enableYandereLock

    expect(useGameStore.getState().metaFlags.yandereLock).toBe(false)

    enableYandereLock()
    expect(useGameStore.getState().metaFlags.yandereLock).toBe(true)
  })

  it('setScene should update sceneId and reset dialogueIndex', () => {
    const setScene = useGameStore.getState().setScene

    setScene('open_recycle')
    expect(useGameStore.getState().sceneId).toBe('open_recycle')
    expect(useGameStore.getState().dialogueIndex).toBe(0)

    useGameStore.getState().dialogueIndex = 2
    setScene('read_file')
    expect(useGameStore.getState().sceneId).toBe('read_file')
    expect(useGameStore.getState().dialogueIndex).toBe(0)
  })

  it('nextDialogue should increment dialogueIndex', () => {
    const nextDialogue = useGameStore.getState().nextDialogue

    expect(useGameStore.getState().dialogueIndex).toBe(0)

    nextDialogue()
    expect(useGameStore.getState().dialogueIndex).toBe(1)

    nextDialogue()
    expect(useGameStore.getState().dialogueIndex).toBe(2)
  })

  it('showAlert should open systemAlert with title and content', () => {
    const showAlert = useGameStore.getState().showAlert

    showAlert('Test Title', 'Test Content')

    const alert = useGameStore.getState().modals.systemAlert
    expect(alert.open).toBe(true)
    expect(alert.title).toBe('Test Title')
    expect(alert.content).toBe('Test Content')
  })

  it('closeAlert should close systemAlert', () => {
    const showAlert = useGameStore.getState().showAlert
    const closeAlert = useGameStore.getState().closeAlert

    showAlert('Test Title', 'Test Content')
    expect(useGameStore.getState().modals.systemAlert.open).toBe(true)

    closeAlert()
    const alert = useGameStore.getState().modals.systemAlert
    expect(alert.open).toBe(false)
    expect(alert.title).toBe('')
    expect(alert.content).toBe('')
  })

  it('incrementTabSwitch should increment tabSwitchCount', () => {
    const incrementTabSwitch = useGameStore.getState().incrementTabSwitch

    expect(useGameStore.getState().metaFlags.tabSwitchCount).toBe(0)

    incrementTabSwitch()
    expect(useGameStore.getState().metaFlags.tabSwitchCount).toBe(1)

    incrementTabSwitch()
    expect(useGameStore.getState().metaFlags.tabSwitchCount).toBe(2)
  })
})
