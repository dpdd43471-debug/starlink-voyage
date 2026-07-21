import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { usePageVisibility } from '../hooks/usePageVisibility'
import { useRefreshMemory } from '../hooks/useRefreshMemory'

const setHidden = (hidden) => {
  Object.defineProperty(document, 'hidden', {
    value: hidden,
    configurable: true,
  })
}

const fireVisibility = () => {
  act(() => {
    document.dispatchEvent(new Event('visibilitychange'))
  })
}

describe('usePageVisibility', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    setHidden(false)
  })

  it('初始状态为可见', () => {
    const { result } = renderHook(() => usePageVisibility())
    expect(result.current.isVisible).toBe(true)
  })

  it('未隐藏过时保持可见不触发回调', () => {
    const onReturn = vi.fn()
    renderHook(() => usePageVisibility(onReturn))
    expect(onReturn).not.toHaveBeenCalled()
  })

  it('隐藏后恢复可见时触发 onReturn 回调', () => {
    const onReturn = vi.fn()
    renderHook(() => usePageVisibility(onReturn))
    // 隐藏
    setHidden(true)
    fireVisibility()
    // 恢复可见
    setHidden(false)
    fireVisibility()
    expect(onReturn).toHaveBeenCalledTimes(1)
  })

  it('多次切换触发对应次数的回调', () => {
    const onReturn = vi.fn()
    renderHook(() => usePageVisibility(onReturn))
    for (let i = 0; i < 3; i++) {
      setHidden(true)
      fireVisibility()
      setHidden(false)
      fireVisibility()
    }
    expect(onReturn).toHaveBeenCalledTimes(3)
  })

  it('仅隐藏不恢复时不会触发回调', () => {
    const onReturn = vi.fn()
    renderHook(() => usePageVisibility(onReturn))
    setHidden(true)
    fireVisibility()
    expect(onReturn).not.toHaveBeenCalled()
  })
})

describe('useRefreshMemory', () => {
  const KEY = 'rbc_refresh_count'

  beforeEach(() => {
    window.localStorage.clear()
  })

  it('首次挂载计数为 1', () => {
    const { result } = renderHook(() => useRefreshMemory())
    expect(result.current.refreshCount).toBe(1)
  })

  it('多次挂载递增计数', () => {
    const { unmount } = renderHook(() => useRefreshMemory())
    unmount()
    const { result } = renderHook(() => useRefreshMemory())
    expect(result.current.refreshCount).toBe(2)
  })

  it('localStorage 为 NaN 时归零后递增为 1', () => {
    window.localStorage.setItem(KEY, 'NaN')
    const { result } = renderHook(() => useRefreshMemory())
    expect(result.current.refreshCount).toBe(1)
  })

  it('localStorage 已有数值时累加', () => {
    window.localStorage.setItem(KEY, '5')
    const { result } = renderHook(() => useRefreshMemory())
    expect(result.current.refreshCount).toBe(6)
  })
})
