import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { useGameStore } from '../store/useGameStore'

describe('useGameStore', () => {
  beforeEach(() => {
    useGameStore.setState({
      sceneId: 'scene_p1_convenience_store',
      dialogueIndex: 0,
      isAutoPlaying: false,
      character: { id: null, expression: 'neutral', position: 'center', glitchFilter: 'none' },
      stageEffects: { screenShake: false, screenFlash: false, vignetteDarkness: 0 },
      metaFlags: { tabSwitchCount: 0, yandereLock: false, devToolsOpened: false },
      persistentMemory: { visitedScenes: [], choiceHistory: [], refreshCount: 0 },
      modals: { systemAlert: { open: false, title: '', content: '' }, terminalOpen: false },
    })
  })

  afterEach(() => {
    useGameStore.persist.clearStorage()
  })

  it('should initialize with default values', () => {
    const state = useGameStore.getState()
    expect(state.sceneId).toBe('scene_p1_convenience_store')
    expect(state.dialogueIndex).toBe(0)
    expect(state.isAutoPlaying).toBe(false)
    expect(state.character.glitchFilter).toBe('none')
    expect(state.metaFlags.yandereLock).toBe(false)
    expect(state.modals.systemAlert.open).toBe(false)
  })

  it('triggerGlitch should update character.glitchFilter', () => {
    const { triggerGlitch } = useGameStore.getState()

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
    const { enableYandereLock } = useGameStore.getState()
    expect(useGameStore.getState().metaFlags.yandereLock).toBe(false)
    enableYandereLock()
    expect(useGameStore.getState().metaFlags.yandereLock).toBe(true)
  })

  it('setScene should update sceneId and reset dialogueIndex', () => {
    const { setScene } = useGameStore.getState()
    setScene('scene_p1_library_rin')
    expect(useGameStore.getState().sceneId).toBe('scene_p1_library_rin')
    expect(useGameStore.getState().dialogueIndex).toBe(0)
  })

  it('nextDialogue should increment dialogueIndex', () => {
    const { nextDialogue } = useGameStore.getState()
    expect(useGameStore.getState().dialogueIndex).toBe(0)
    nextDialogue()
    expect(useGameStore.getState().dialogueIndex).toBe(1)
    nextDialogue()
    expect(useGameStore.getState().dialogueIndex).toBe(2)
  })

  it('showAlert should open systemAlert with title and content', () => {
    const { showAlert } = useGameStore.getState()
    showAlert('Test Title', 'Test Content')
    const alert = useGameStore.getState().modals.systemAlert
    expect(alert.open).toBe(true)
    expect(alert.title).toBe('Test Title')
    expect(alert.content).toBe('Test Content')
  })

  it('closeAlert should close systemAlert', () => {
    const { showAlert, closeAlert } = useGameStore.getState()
    showAlert('Test Title', 'Test Content')
    expect(useGameStore.getState().modals.systemAlert.open).toBe(true)
    closeAlert()
    const alert = useGameStore.getState().modals.systemAlert
    expect(alert.open).toBe(false)
  })

  it('incrementTabSwitch should increment tabSwitchCount', () => {
    const { incrementTabSwitch } = useGameStore.getState()
    expect(useGameStore.getState().metaFlags.tabSwitchCount).toBe(0)
    incrementTabSwitch()
    expect(useGameStore.getState().metaFlags.tabSwitchCount).toBe(1)
  })

  it('dispatchActions should trigger SHAKE and GLITCH actions', () => {
    const { dispatchActions } = useGameStore.getState()
    dispatchActions([{ type: 'GLITCH', filter: 'rgb-split' }])
    expect(useGameStore.getState().character.glitchFilter).toBe('rgb-split')
  })

  it('dispatchActions should trigger SHOW_ALERT', () => {
    const { dispatchActions } = useGameStore.getState()
    dispatchActions([{ type: 'SHOW_ALERT', title: 'T', content: 'C' }])
    const alert = useGameStore.getState().modals.systemAlert
    expect(alert.open).toBe(true)
    expect(alert.title).toBe('T')
  })

  it('recordChoice should push to choiceHistory', () => {
    const { recordChoice } = useGameStore.getState()
    recordChoice({ text: 'A', targetSceneId: 'B' })
    expect(useGameStore.getState().persistentMemory.choiceHistory).toHaveLength(1)
    expect(useGameStore.getState().persistentMemory.choiceHistory[0].text).toBe('A')
  })
})
