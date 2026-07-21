import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { DialogBox } from '../components/DialogBox'

describe('DialogBox 打字机', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: false })
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('渲染 speaker 与空文本占位', () => {
    render(<DialogBox speaker="系统" text="你好" />)
    expect(screen.getByTestId('dialog-speaker')).toHaveTextContent('系统')
    expect(screen.getByTestId('dialog-text')).toBeInTheDocument()
  })

  it('逐字显示文本并在完成时调用 onDone', () => {
    const onDone = vi.fn()
    render(<DialogBox text="ab" speed={100} onDone={onDone} />)
    // 初始为空
    expect(screen.getByTestId('dialog-text').textContent.replace(/▋/g, '')).toBe('')
    // 第一帧
    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(screen.getByTestId('dialog-text').textContent).toContain('a')
    // 第二帧完成
    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(screen.getByTestId('dialog-text').textContent).toContain('ab')
    expect(onDone).toHaveBeenCalledTimes(1)
  })

  it('点击跳过立即显示完整文本并调用 onDone', () => {
    const onDone = vi.fn()
    render(<DialogBox text="hello" speed={100} onDone={onDone} />)
    fireEvent.click(screen.getByTestId('dialog-box'))
    expect(screen.getByTestId('dialog-text').textContent).toContain('hello')
    expect(onDone).toHaveBeenCalledTimes(1)
  })

  it('空文本直接完成', () => {
    const onDone = vi.fn()
    render(<DialogBox text="" onDone={onDone} />)
    expect(onDone).toHaveBeenCalledTimes(1)
  })
})
