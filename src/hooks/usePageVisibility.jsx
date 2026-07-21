import { useEffect, useRef, useState } from 'react'

// 监听 Tab/窗口可见性变化。
// 当页面从「隐藏」变回「可见」时，调用 onReturn 回调（用于 Meta 旁白）。
// 返回 { isVisible, wasHidden }：当前是否可见 / 本次是否曾隐藏过。
export function usePageVisibility(onReturn) {
  const [isVisible, setIsVisible] = useState(
    typeof document !== 'undefined' ? !document.hidden : true
  )
  // 用 ref 记录"曾隐藏过"，避免回调依赖导致 effect 重建
  const wasHiddenRef = useRef(false)
  const callbackRef = useRef(onReturn)
  callbackRef.current = onReturn

  useEffect(() => {
    function handler() {
      const visible = !document.hidden
      if (!visible) {
        // 进入隐藏态
        wasHiddenRef.current = true
      } else if (wasHiddenRef.current) {
        // 从隐藏变回可见：触发 Meta 回调
        wasHiddenRef.current = false
        if (typeof callbackRef.current === 'function') {
          callbackRef.current()
        }
      }
      setIsVisible(visible)
    }
    document.addEventListener('visibilitychange', handler)
    return () => document.removeEventListener('visibilitychange', handler)
  }, [])

  return { isVisible, wasHidden: wasHiddenRef.current }
}

export default usePageVisibility
