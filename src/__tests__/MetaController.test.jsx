import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'

describe('App Meta 控制器', () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.title = ''
  })

  it('渲染初始节点并设置 document.title', () => {
    render(<App />)
    expect(document.title).toBe('回收站里的告白')
    expect(screen.getByTestId('character-stage')).toBeInTheDocument()
    expect(screen.getByTestId('dialog-box')).toBeInTheDocument()
  })

  it('点击选项切换到下一节点并更新 title', () => {
    render(<App />)
    // 跳过打字
    fireEvent.click(screen.getByTestId('dialog-box'))
    // 选择"双击打开回收站" -> open_recycle
    fireEvent.click(screen.getByTestId('option-0'))
    expect(document.title).toBe('回收站 - 1 个项目')
  })

  it('结局节点显示 ending 标记', () => {
    render(<App />)
    fireEvent.click(screen.getByTestId('dialog-box'))
    // 选择"关掉电脑去睡觉" -> sleep_end (结局)
    fireEvent.click(screen.getByTestId('option-1'))
    expect(screen.getByTestId('ending')).toBeInTheDocument()
  })

  it('glitch 节点激活 GlitchOverlay', () => {
    render(<App />)
    fireEvent.click(screen.getByTestId('dialog-box'))
    // open_recycle 是 shake 节点
    fireEvent.click(screen.getByTestId('option-0'))
    expect(screen.getByTestId('glitch-overlay')).toBeInTheDocument()
  })

  it('进入 meta_error 节点弹出伪报错', () => {
    render(<App />)
    // start -> open_recycle -> confirm_empty -> meta_error
    fireEvent.click(screen.getByTestId('dialog-box'))
    fireEvent.click(screen.getByTestId('option-0')) // open_recycle
    fireEvent.click(screen.getByTestId('dialog-box'))
    fireEvent.click(screen.getByTestId('option-1')) // confirm_empty
    fireEvent.click(screen.getByTestId('dialog-box'))
    fireEvent.click(screen.getByTestId('option-0')) // meta_error
    expect(screen.getByTestId('fake-error-modal')).toBeInTheDocument()
    expect(screen.getByTestId('error-message').textContent).toBeTruthy()
  })

  it('关闭伪报错后 modal 消失', () => {
    render(<App />)
    fireEvent.click(screen.getByTestId('dialog-box'))
    fireEvent.click(screen.getByTestId('option-0'))
    fireEvent.click(screen.getByTestId('dialog-box'))
    fireEvent.click(screen.getByTestId('option-1'))
    fireEvent.click(screen.getByTestId('dialog-box'))
    fireEvent.click(screen.getByTestId('option-0')) // meta_error
    fireEvent.click(screen.getByTestId('error-close-btn'))
    expect(screen.queryByTestId('fake-error-modal')).not.toBeInTheDocument()
  })

  it('结局后展示刷新次数', () => {
    render(<App />)
    fireEvent.click(screen.getByTestId('dialog-box'))
    fireEvent.click(screen.getByTestId('option-1')) // sleep_end
    expect(screen.getByTestId('ending').textContent).toMatch(/刷新次数/)
  })
})
