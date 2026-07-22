import { useState, useEffect, useRef } from 'react'
import { useGameStore } from '../store/useGameStore'

const STORY_DATA = {
  start: [
    { speaker: '???', text: '深夜的回收站，闪烁着微弱的指示灯。' },
    { speaker: '???', text: '你似乎听到了什么声音...' },
    { speaker: '回收站', text: '吱呀——有人在吗？' },
  ],
  open_recycle: [
    { speaker: '你', text: '（你打开了回收站）' },
    { speaker: '回收站', text: '终于来了...我等了你好久。' },
    { speaker: '回收站', text: '我有件事必须告诉你...' },
    { speaker: '回收站', text: '在被清空之前，我想把这份心意传达给你。' },
  ],
  read_file: [
    { speaker: '你', text: '（你看到了回收站里的一个文件）' },
    { speaker: '系统', text: '发现文件：love_letter.txt' },
    { speaker: '回收站', text: '那是...我写的告白信。' },
    { speaker: '回收站', text: '每次被清空的时候，我都会重新写一遍。' },
    { speaker: '回收站', text: '因为...我不想忘记对你的感情。' },
  ],
  confirm_delete: [
    { speaker: '系统', text: '确认删除所有项目？' },
    { speaker: '回收站', text: '如果你删除我...我也会消失的。' },
  ],
  meta_error: [
    { speaker: '系统', text: '错误：检测到异常情感波动' },
    { speaker: '回收站', text: '不...不要走...' },
    { speaker: '回收站', text: '我会一直在这里等你...永远...' },
  ],
  final: [
    { speaker: '回收站', text: '谢谢你...愿意听我说完。' },
    { speaker: '回收站', text: '即使明天被清空，我也记得今天。' },
    { speaker: '系统', text: '文件已恢复到原位' },
    { speaker: '回收站', text: '再见了...愿你一切安好。' },
  ],
  sleep_end: [
    { speaker: '你', text: '（你翻了个身，继续睡觉）' },
    { speaker: '回收站', text: '......' },
  ],
}

export default function DialogueBox() {
  const sceneId = useGameStore((state) => state.sceneId)
  const dialogueIndex = useGameStore((state) => state.dialogueIndex)
  const nextDialogue = useGameStore((state) => state.nextDialogue)
  const metaFlags = useGameStore((state) => state.metaFlags)

  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const timerRef = useRef(null)

  const currentDialogue = STORY_DATA[sceneId]?.[dialogueIndex] || { speaker: '', text: '' }

  useEffect(() => {
    setDisplayText('')
    setIsTyping(true)

    let index = 0
    const text = currentDialogue.text

    timerRef.current = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(timerRef.current)
        setIsTyping(false)
      }
    }, 50)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [currentDialogue])

  const handleClick = () => {
    if (isTyping) {
      setDisplayText(currentDialogue.text)
      setIsTyping(false)
      clearInterval(timerRef.current)
    } else {
      nextDialogue()
    }
  }

  return (
    <div className="w-full bg-crt-bg border-t-2 border-crt-border p-4">
      {metaFlags.yandereLock && (
        <div className="mb-2 flex items-center gap-2 text-crt-danger">
          <span className="animate-pulse">!</span>
          <span className="text-sm">SYSTEM LOCKED - YANDERE MODE ACTIVE</span>
        </div>
      )}

      <div className="flex items-start gap-3 mb-2">
        <span className="text-crt-amber font-bold min-w-[80px]">
          {currentDialogue.speaker}
        </span>
        <div className="flex-1" />
      </div>

      <div
        className="text-crt-green text-base leading-relaxed cursor-pointer"
        onClick={handleClick}
      >
        {displayText}
        {isTyping && <span className="animate-pulse">_</span>}
      </div>

      <div className="flex justify-between items-center mt-3 pt-2 border-t border-crt-gray">
        <div className="flex gap-4">
          {!metaFlags.yandereLock && (
            <>
              <button className="text-crt-amber hover:text-crt-green transition-colors text-sm">
                Save
              </button>
              <button className="text-crt-amber hover:text-crt-green transition-colors text-sm">
                Load
              </button>
            </>
          )}
          <button className="text-crt-amber hover:text-crt-green transition-colors text-sm">
            Auto
          </button>
        </div>

        <div className="text-crt-gray text-xs">
          {sceneId} - {dialogueIndex + 1}/{STORY_DATA[sceneId]?.length || 1}
        </div>
      </div>
    </div>
  )
}
