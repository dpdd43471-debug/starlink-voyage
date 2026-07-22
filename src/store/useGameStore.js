import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import scriptData from '../data/script.json'

export const useGameStore = create(
  persist(
    (set, get) => ({
      sceneId: 'scene_p1_convenience_store',
      dialogueIndex: 0,
      isAutoPlaying: false,

      character: {
        id: null,
        expression: 'neutral',
        position: 'center',
        glitchFilter: 'none',
      },

      stageEffects: {
        screenShake: false,
        screenFlash: false,
        screenRedFlash: false,
        vignetteDarkness: 0,
      },

      metaFlags: {
        tabSwitchCount: 0,
        yandereLock: false,
        devToolsOpened: false,
      },

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
        systemAlert: {
          open: false,
          title: '',
          content: '',
        },
        terminalOpen: false,
      },

      openTerminal: () => {
        set({ modals: { ...get().modals, terminalOpen: true } })
      },

      closeTerminal: () => {
        set({ modals: { ...get().modals, terminalOpen: false } })
      },

      setScene: (newSceneId) => {
        const { persistentMemory } = get()
        const visited = persistentMemory.visitedScenes.includes(newSceneId)
          ? persistentMemory.visitedScenes
          : [...persistentMemory.visitedScenes, newSceneId]
        set({
          sceneId: newSceneId,
          dialogueIndex: 0,
          persistentMemory: { ...persistentMemory, visitedScenes: visited },
        })
      },

      setDialogueIndex: (index) => {
        set({ dialogueIndex: index })
      },

      nextDialogue: () => {
        const { dialogueIndex, sceneId } = get()
        const scene = scriptData.scenes[sceneId]
        if (!scene) return
        const total = scene.dialogues.length
        if (dialogueIndex < total - 1) {
          set({ dialogueIndex: dialogueIndex + 1 })
        }
      },

      setCharacter: (character) => {
        if (character === null) {
          set({ character: { id: null, expression: 'neutral', position: 'center', glitchFilter: get().character.glitchFilter } })
        } else {
          set({ character: { ...get().character, ...character } })
        }
      },

      triggerGlitch: (filterType) => {
        set({ character: { ...get().character, glitchFilter: filterType } })
      },

      shakeScreen: () => {
        set({ stageEffects: { ...get().stageEffects, screenShake: true } })
        setTimeout(() => {
          set({ stageEffects: { ...get().stageEffects, screenShake: false } })
        }, 200)
      },

      flashScreen: () => {
        set({ stageEffects: { ...get().stageEffects, screenFlash: true } })
        setTimeout(() => {
          set({ stageEffects: { ...get().stageEffects, screenFlash: false } })
        }, 300)
      },

      redFlashReset: () => {
        set({ stageEffects: { ...get().stageEffects, screenRedFlash: true } })
        setTimeout(() => {
          set({ stageEffects: { ...get().stageEffects, screenRedFlash: false } })
        }, 800)
      },

      setVignette: (darkness) => {
        set({ stageEffects: { ...get().stageEffects, vignetteDarkness: darkness } })
      },

      enableYandereLock: () => {
        set({
          metaFlags: { ...get().metaFlags, yandereLock: true },
          persistentMemory: { ...get().persistentMemory, isHijacked: true },
        })
      },

      setHijacked: (value) => {
        set({ persistentMemory: { ...get().persistentMemory, isHijacked: value } })
      },

      unlockEnding: (endingId) => {
        set({ persistentMemory: { ...get().persistentMemory, unlockedEnding: endingId } })
      },

      setWorldVersion: (version) => {
        set({ persistentMemory: { ...get().persistentMemory, worldVersion: version } })
      },

      purgeLock: () => {
        set({
          metaFlags: { ...get().metaFlags, yandereLock: false },
          persistentMemory: { ...get().persistentMemory, isHijacked: false },
        })
      },

      setBetrayedXiaMo: (value) => {
        set({ persistentMemory: { ...get().persistentMemory, betrayedXiaMo: value } })
      },

      completeXiaMoRoute: () => {
        set({
          persistentMemory: {
            ...get().persistentMemory,
            hasCompletedXiaMoRoute: true,
            playthroughCount: get().persistentMemory.playthroughCount + 1,
          },
        })
      },

      incrementPlaythrough: () => {
        set({
          persistentMemory: {
            ...get().persistentMemory,
            playthroughCount: get().persistentMemory.playthroughCount + 1,
            visitedScenes: [],
            choiceHistory: [],
          },
        })
      },

      startNewPlaythrough: () => {
        set({
          sceneId: 'scene_p1_convenience_store',
          dialogueIndex: 0,
          character: { id: null, expression: 'neutral', position: 'center', glitchFilter: 'none' },
          stageEffects: { screenShake: false, screenFlash: false, screenRedFlash: false, vignetteDarkness: 0 },
          metaFlags: { tabSwitchCount: get().metaFlags.tabSwitchCount, yandereLock: false, devToolsOpened: get().metaFlags.devToolsOpened },
          persistentMemory: {
            ...get().persistentMemory,
            playthroughCount: get().persistentMemory.playthroughCount + 1,
            visitedScenes: [],
            choiceHistory: [],
          },
        })
      },

      resetGame: () => {
        set({
          sceneId: 'scene_p1_convenience_store',
          dialogueIndex: 0,
          isAutoPlaying: false,
          character: { id: null, expression: 'neutral', position: 'center', glitchFilter: 'none' },
          stageEffects: { screenShake: false, screenFlash: false, screenRedFlash: false, vignetteDarkness: 0 },
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
        })
      },

      showAlert: (title, content) => {
        set({ modals: { ...get().modals, systemAlert: { open: true, title, content } } })
      },

      closeAlert: () => {
        set({ modals: { ...get().modals, systemAlert: { open: false, title: '', content: '' } } })
      },

      incrementTabSwitch: () => {
        set({ metaFlags: { ...get().metaFlags, tabSwitchCount: get().metaFlags.tabSwitchCount + 1 } })
      },

      setDevToolsOpened: (opened) => {
        set({ metaFlags: { ...get().metaFlags, devToolsOpened: opened } })
      },

      recordChoice: (choice) => {
        const { persistentMemory } = get()
        set({
          persistentMemory: {
            ...persistentMemory,
            choiceHistory: [...persistentMemory.choiceHistory, choice],
          },
        })
      },

      incrementRefresh: () => {
        const { persistentMemory } = get()
        set({
          persistentMemory: {
            ...persistentMemory,
            refreshCount: persistentMemory.refreshCount + 1,
          },
        })
      },

      dispatchActions: (actions) => {
        if (!actions || !Array.isArray(actions)) return
        actions.forEach((action) => {
          switch (action.type) {
            case 'SHAKE':
              get().shakeScreen()
              break
            case 'GLITCH':
              get().triggerGlitch(action.filter || 'none')
              break
            case 'FLASH':
              get().flashScreen()
              break
            case 'RED_FLASH_RESET':
              get().redFlashReset()
              break
            case 'SHOW_ALERT':
              get().showAlert(action.title || '系统提示', action.content || '')
              break
            case 'YANDERE_LOCK':
              get().enableYandereLock()
              break
            case 'VIGNETTE':
              get().setVignette(action.darkness || 0.5)
              break
            case 'SET_CHARACTER':
              get().setCharacter(action.character || null)
              break
            case 'BETRAY_XIAMO':
              get().setBetrayedXiaMo(true)
              break
            case 'COMPLETE_XIAMO':
              get().completeXiaMoRoute()
              break
            case 'NEW_PLAYTHROUGH':
              get().incrementPlaythrough()
              break
            default:
              break
          }
        })
      },
    }),
    {
      name: 'recycle-bin-confession-storage',
      version: 4,
      migrate: (persistedState) => {
        const base = persistedState || {}
        return {
          ...base,
          sceneId: base.sceneId || 'scene_p1_convenience_store',
          dialogueIndex: 0,
          character: { id: null, expression: 'neutral', position: 'center', glitchFilter: 'none' },
          stageEffects: { screenShake: false, screenFlash: false, screenRedFlash: false, vignetteDarkness: 0 },
          metaFlags: {
            tabSwitchCount: base.metaFlags?.tabSwitchCount || 0,
            yandereLock: false,
            devToolsOpened: base.metaFlags?.devToolsOpened || false,
          },
          persistentMemory: {
            visitedScenes: [],
            choiceHistory: [],
            refreshCount: base.persistentMemory?.refreshCount || 0,
            playthroughCount: base.persistentMemory?.playthroughCount || 1,
            hasCompletedXiaMoRoute: base.persistentMemory?.hasCompletedXiaMoRoute || false,
            betrayedXiaMo: base.persistentMemory?.betrayedXiaMo || false,
            isHijacked: false,
            unlockedEnding: null,
            worldVersion: base.persistentMemory?.worldVersion || '1.0',
          },
        }
      },
    }
  )
)
