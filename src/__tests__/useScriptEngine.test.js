import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useScriptEngine } from '../hooks/useScriptEngine'
import { useGameStore } from '../store/useGameStore'

describe('useScriptEngine', () => {
  beforeEach(() => {
    vi.useFakeTimers()
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
    vi.useRealTimers()
    useGameStore.persist.clearStorage()
  })

  it('should load the first dialogue of the initial scene', () => {
    const { result } = renderHook(() => useScriptEngine())
    expect(result.current.dialogue).toBeDefined()
    expect(result.current.dialogue.id).toBe('p1_01_01')
    expect(result.current.dialogue.text).toContain('便利店')
  })

  it('nextStep should advance dialogue index when typing is done', () => {
    const { result } = renderHook(() => useScriptEngine())

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(result.current.isTyping).toBe(false)

    act(() => {
      result.current.nextStep()
    })

    expect(useGameStore.getState().dialogueIndex).toBe(1)
  })

  it('nextStep should complete typing if still typing', () => {
    const { result } = renderHook(() => useScriptEngine())

    expect(result.current.isTyping).toBe(true)

    act(() => {
      result.current.nextStep()
      vi.advanceTimersByTime(100)
    })

    expect(result.current.isTyping).toBe(false)
    expect(result.current.currentText).toBe(result.current.dialogue.text)
  })

  it('actions in dialogue should trigger store state changes after typing completes', () => {
    useGameStore.setState({
      sceneId: 'scene_p1_library_rin',
      dialogueIndex: 3,
    })

    const { result } = renderHook(() => useScriptEngine())

    expect(result.current.dialogue.actions).toContainEqual({ type: 'SHAKE' })

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(useGameStore.getState().stageEffects.screenShake).toBe(false)
  })

  it('GLITCH action should update character.glitchFilter', () => {
    useGameStore.setState({
      sceneId: 'scene_p1_server_room',
      dialogueIndex: 5,
    })

    const { result } = renderHook(() => useScriptEngine())

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(useGameStore.getState().character.glitchFilter).toBe('rgb-split')
  })

  it('selectChoice should change sceneId and reset dialogueIndex', () => {
    useGameStore.setState({
      sceneId: 'scene_p1_convenience_store',
      dialogueIndex: 10,
    })

    const { result } = renderHook(() => useScriptEngine())

    const choice = {
      text: '去图书室',
      targetSceneId: 'scene_p1_library_rin',
      conditionKey: null,
    }

    act(() => {
      result.current.selectChoice(choice)
    })

    expect(useGameStore.getState().sceneId).toBe('scene_p1_library_rin')
    expect(useGameStore.getState().dialogueIndex).toBe(0)
    expect(useGameStore.getState().persistentMemory.choiceHistory).toHaveLength(1)
    expect(useGameStore.getState().persistentMemory.choiceHistory[0].targetSceneId).toBe('scene_p1_library_rin')
  })

  it('hasChoices should be true when dialogue has choices', () => {
    useGameStore.setState({
      sceneId: 'scene_p1_convenience_store',
      dialogueIndex: 10,
    })

    const { result } = renderHook(() => useScriptEngine())

    expect(result.current.hasChoices).toBe(true)
  })

  it('hasChoices should be false when dialogue has no choices', () => {
    useGameStore.setState({
      sceneId: 'scene_p1_convenience_store',
      dialogueIndex: 0,
    })

    const { result } = renderHook(() => useScriptEngine())

    expect(result.current.hasChoices).toBe(false)
  })

  it('should not advance when hasChoices is true and nextStep called', () => {
    useGameStore.setState({
      sceneId: 'scene_p1_convenience_store',
      dialogueIndex: 10,
    })

    const { result } = renderHook(() => useScriptEngine())

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    const beforeIndex = useGameStore.getState().dialogueIndex

    act(() => {
      result.current.nextStep()
    })

    expect(useGameStore.getState().dialogueIndex).toBe(beforeIndex)
  })
})
