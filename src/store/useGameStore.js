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
      },

      modals: {
        systemAlert: {
          open: false,
          title: '',
          content: '',
        },
        terminalOpen: false,
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

      setVignette: (darkness) => {
        set({ stageEffects: { ...get().stageEffects, vignetteDarkness: darkness } })
      },

      enableYandereLock: () => {
        set({ metaFlags: { ...get().metaFlags, yandereLock: true } })
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
            case 'SHOW_ALERT':
              get().showAlert(action.title || '系统提示', action.content || '')
              break
            case 'YANDERE_LOCK':
              get().enableYandereLock()
              break
            case 'VIGNETTE':
              get().setVignette(action.darkness || 0.5)
              break
            default:
              break
          }
        })
      },
    }),
    {
      name: 'recycle-bin-confession-storage',
      version: 2,
      migrate: (persistedState) => {
        return {
          ...persistedState,
          sceneId: 'scene_p1_convenience_store',
          dialogueIndex: 0,
          character: { id: null, expression: 'neutral', position: 'center', glitchFilter: 'none' },
          persistentMemory: { visitedScenes: [], choiceHistory: [], refreshCount: 0 },
        }
      },
    }
  )
)
