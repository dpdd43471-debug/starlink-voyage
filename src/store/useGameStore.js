import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useGameStore = create(
  persist(
    (set, get) => ({
      sceneId: 'start',
      dialogueIndex: 0,
      isAutoPlaying: false,

      character: {
        id: 'recycle-bin',
        expression: 'neutral',
        position: { x: 0, y: 0 },
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

      modals: {
        systemAlert: {
          open: false,
          title: '',
          content: '',
        },
        terminalOpen: false,
      },

      nextDialogue: () => {
        const { dialogueIndex, sceneId } = get()
        const dialogueCount = getDialogueCount(sceneId)
        if (dialogueIndex < dialogueCount - 1) {
          set({ dialogueIndex: dialogueIndex + 1 })
        }
      },

      setScene: (newSceneId) => {
        set({ sceneId: newSceneId, dialogueIndex: 0 })
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
    }),
    {
      name: 'recycle-bin-confession-storage',
    }
  )
)

function getDialogueCount(sceneId) {
  const sceneDialogues = {
    start: 3,
    open_recycle: 4,
    read_file: 5,
    confirm_delete: 2,
    meta_error: 3,
    final: 4,
    sleep_end: 2,
  }
  return sceneDialogues[sceneId] || 1
}
