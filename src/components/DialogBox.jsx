import { useEffect, useRef, useState } from 'react'

// 打字机对话框。
// props:
//   speaker: 说话人（可选）
//   text:    要逐字显示的文本
//   speed:   每个字符的间隔毫秒（默认 45）
//   onDone:  打字完成时回调
// 点击对话框可立即跳过打字，显示完整文本。
export function DialogBox({ speaker, text, speed = 45, onDone }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const indexRef = useRef(0)
  const timerRef = useRef(null)
  // 用 ref 持有最新的 onDone，避免 effect 依赖它而频繁重建定时器
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    indexRef.current = 0

    if (!text) {
      setDone(true)
      if (typeof onDoneRef.current === 'function') onDoneRef.current()
      return
    }

    const timer = setInterval(() => {
      indexRef.current += 1
      setDisplayed(text.slice(0, indexRef.current))
      if (indexRef.current >= text.length) {
        clearInterval(timer)
        timerRef.current = null
        setDone(true)
        if (typeof onDoneRef.current === 'function') onDoneRef.current()
      }
    }, speed)
    timerRef.current = timer

    return () => clearInterval(timer)
  }, [text, speed])

  function skip() {
    if (done) return
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setDisplayed(text || '')
    setDone(true)
    if (typeof onDoneRef.current === 'function') onDoneRef.current()
  }

  return (
    <div
      className="border border-crt-green/50 bg-black/80 p-4 cursor-pointer"
      onClick={skip}
      data-testid="dialog-box"
    >
      {speaker && (
        <div className="text-crt-amber text-sm mb-2 font-bold" data-testid="dialog-speaker">
          {speaker}
        </div>
      )}
      <p
        className="text-crt-green text-base leading-relaxed whitespace-pre-line min-h-[3em]"
        data-testid="dialog-text"
      >
        {displayed}
        {!done && <span className="animate-pulse">▋</span>}
      </p>
    </div>
  )
}

export default DialogBox
