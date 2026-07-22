import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { useGameStore } from '../store/useGameStore'
import { buildRinMemoryData } from '../utils/exportRinMemory'

describe('Endings & Terminal System', () => {
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
        unlockedEnding: null,
        worldVersion: '1.0',
      },
      modals: {
        systemAlert: { open: false, title: '', content: '' },
        terminalOpen: false,
      },
    })
  })

  afterEach(() => {
    useGameStore.persist.clearStorage()
    vi.restoreAllMocks()
  })

  it('purge_lock should set isHijacked to false and yandereLock to false', () => {
    useGameStore.getState().enableYandereLock()
    expect(useGameStore.getState().persistentMemory.isHijacked).toBe(true)
    expect(useGameStore.getState().metaFlags.yandereLock).toBe(true)

    useGameStore.getState().purgeLock()
    expect(useGameStore.getState().persistentMemory.isHijacked).toBe(false)
    expect(useGameStore.getState().metaFlags.yandereLock).toBe(false)
  })

  it('unlockEnding should set unlockedEnding in persistentMemory', () => {
    expect(useGameStore.getState().persistentMemory.unlockedEnding).toBe(null)

    useGameStore.getState().unlockEnding('ending_c')
    expect(useGameStore.getState().persistentMemory.unlockedEnding).toBe('ending_c')
  })

  it('export_rin should build valid Rin memory data', () => {
    const data = buildRinMemoryData()

    expect(data.fileName).toBe('Rin_Memory.json')
    expect(data.character).toBe('Rin')
    expect(data.version).toBe('2.0')
    expect(data.farewell).toBeInstanceOf(Array)
    expect(data.farewell.length).toBeGreaterThan(0)
    expect(data.timestamp).toBeDefined()
    expect(data.signature).toContain('RIN_v2.0_SIGNED_')
    expect(data.integrity_check).toBe('PASSED')
  })

  it('exportRinMemory should create a download trigger', () => {
    const createElementSpy = vi.spyOn(document, 'createElement')
    const appendChildSpy = vi.spyOn(document.body, 'appendChild')
    const removeChildSpy = vi.spyOn(document.body, 'removeChild')

    const mockLink = {
      href: '',
      download: '',
      click: vi.fn(),
    }
    createElementSpy.mockReturnValue(mockLink)
    appendChildSpy.mockImplementation((el) => el)
    removeChildSpy.mockImplementation(() => {})

    const mockCreateObjectURL = vi.fn(() => 'blob:mock-url')
    const mockRevokeObjectURL = vi.fn()
    vi.stubGlobal('URL', {
      createObjectURL: mockCreateObjectURL,
      revokeObjectURL: mockRevokeObjectURL,
    })
    vi.stubGlobal('Blob', class MockBlob {
      constructor(content) {
        this.content = content
      }
    })

    const { exportRinMemory } = require('../utils/exportRinMemory')
    const data = exportRinMemory()

    expect(createElementSpy).toHaveBeenCalledWith('a')
    expect(mockLink.download).toBe('Rin_Memory.json')
    expect(mockLink.click).toHaveBeenCalled()
    expect(mockCreateObjectURL).toHaveBeenCalled()
    expect(data.character).toBe('Rin')

    createElementSpy.mockRestore()
    appendChildSpy.mockRestore()
    removeChildSpy.mockRestore()
    vi.unstubAllGlobals()
  })

  it('setWorldVersion should update worldVersion', () => {
    expect(useGameStore.getState().persistentMemory.worldVersion).toBe('1.0')

    useGameStore.getState().setWorldVersion('2.0')
    expect(useGameStore.getState().persistentMemory.worldVersion).toBe('2.0')
  })

  it('upgrade to version 2.0 should unlock ending D', () => {
    useGameStore.getState().setWorldVersion('2.0')
    useGameStore.getState().unlockEnding('ending_d')

    expect(useGameStore.getState().persistentMemory.worldVersion).toBe('2.0')
    expect(useGameStore.getState().persistentMemory.unlockedEnding).toBe('ending_d')
  })

  it('openTerminal and closeTerminal should toggle terminalOpen', () => {
    expect(useGameStore.getState().modals.terminalOpen).toBe(false)

    useGameStore.getState().openTerminal()
    expect(useGameStore.getState().modals.terminalOpen).toBe(true)

    useGameStore.getState().closeTerminal()
    expect(useGameStore.getState().modals.terminalOpen).toBe(false)
  })

  it('endings persist in localStorage', () => {
    useGameStore.getState().unlockEnding('ending_c')
    useGameStore.getState().setWorldVersion('2.0')

    const stored = JSON.parse(localStorage.getItem('recycle-bin-confession-storage'))
    expect(stored.state.persistentMemory.unlockedEnding).toBe('ending_c')
    expect(stored.state.persistentMemory.worldVersion).toBe('2.0')
  })

  it('all four endings can be set', () => {
    const endings = ['ending_a', 'ending_b', 'ending_c', 'ending_d']

    endings.forEach((ending) => {
      useGameStore.getState().unlockEnding(ending)
      expect(useGameStore.getState().persistentMemory.unlockedEnding).toBe(ending)
    })
  })
})
