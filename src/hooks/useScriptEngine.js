import { useState, useEffect, useRef, useCallback } from 'react'
import { useGameStore } from '../store/useGameStore'
import scriptData from '../data/script.json'

const TYPE_SPEED = 40

export function useScriptEngine() {
  const sceneId = useGameStore((s) => s.sceneId)
  const dialogueIndex = useGameStore((s) => s.dialogueIndex)
  const setScene = useGameStore((s) => s.setScene)
  const setDialogueIndex = useGameStore((s) => s.setDialogueIndex)
  const nextDialogue = useGameStore((s) => s.nextDialogue)
  const setCharacter = useGameStore((s) => s.setCharacter)
  const dispatchActions = useGameStore((s) => s.dispatchActions)
  const recordChoice = useGameStore((s) => s.recordChoice)
  const yandereLock = useGameStore((s) => s.metaFlags.yandereLock)

  const [currentText, setCurrentText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const timerRef = useRef(null)
  const actionsDispatchedRef = useRef('')

  const scene = scriptData.scenes[sceneId]
  const dialogue = scene?.dialogues[dialogueIndex]

  const hasChoices = Array.isArray(dialogue?.choices) && dialogue.choices.length > 0

  useEffect(() => {
    if (!dialogue) return

    setCurrentText('')
    setIsTyping(true)
    actionsDispatchedRef.current = ''

    if (dialogue.character !== undefined) {
      setCharacter(dialogue.character)
    }

    const text = dialogue.text || ''
    let index = 0
    timerRef.current = setInterval(() => {
      if (index < text.length) {
        setCurrentText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(timerRef.current)
        setIsTyping(false)
        if (dialogue.actions && dialogue.actions.length > 0) {
          const key = `${sceneId}:${dialogueIndex}`
          if (actionsDispatchedRef.current !== key) {
            actionsDispatchedRef.current = key
            dispatchActions(dialogue.actions)
          }
        }
      }
    }, TYPE_SPEED)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [sceneId, dialogueIndex, dialogue, setCharacter, dispatchActions])

  const completeTyping = useCallback(() => {
    if (!isTyping) return
    if (timerRef.current) clearInterval(timerRef.current)
    setCurrentText(dialogue?.text || '')
    setIsTyping(false)
    if (dialogue?.actions && dialogue.actions.length > 0) {
      const key = `${sceneId}:${dialogueIndex}`
      if (actionsDispatchedRef.current !== key) {
        actionsDispatchedRef.current = key
        dispatchActions(dialogue.actions)
      }
    }
  }, [isTyping, dialogue, sceneId, dialogueIndex, dispatchActions])

  const nextStep = useCallback(() => {
    if (isTyping) {
      completeTyping()
      return
    }
    if (hasChoices) return
    const scene = scriptData.scenes[sceneId]
    if (!scene) return
    if (dialogueIndex < scene.dialogues.length - 1) {
      nextDialogue()
    }
  }, [isTyping, hasChoices, sceneId, dialogueIndex, nextDialogue, completeTyping])

  const selectChoice = useCallback((choice) => {
    recordChoice(choice)
    setScene(choice.targetSceneId)
  }, [recordChoice, setScene])

  return {
    scene,
    dialogue,
    currentText,
    isTyping,
    hasChoices,
    completeTyping,
    nextStep,
    selectChoice,
    yandereLock,
  }
}
