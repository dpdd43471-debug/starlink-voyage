import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CharacterStage, GLITCH_CLASS } from '../components/CharacterStage'

describe('CharacterStage', () => {
  it('渲染默认立绘', () => {
    render(<CharacterStage />)
    expect(screen.getByTestId('default-character')).toBeInTheDocument()
  })

  it('渲染自定义 children 时不再渲染默认立绘', () => {
    render(
      <CharacterStage>
        <div data-testid="custom">CUSTOM</div>
      </CharacterStage>
    )
    expect(screen.getByTestId('custom')).toBeInTheDocument()
    expect(screen.queryByTestId('default-character')).not.toBeInTheDocument()
  })

  it('glitchType=none 应用 glitch-none 类', () => {
    render(<CharacterStage glitchType="none" />)
    expect(screen.getByTestId('character-wrapper').className).toContain(
      'glitch-none'
    )
  })

  it('glitchType=shake 应用 glitch-shake 类', () => {
    render(<CharacterStage glitchType="shake" />)
    expect(screen.getByTestId('character-wrapper').className).toContain(
      'glitch-shake'
    )
  })

  it('glitchType=rgb-split 应用 glitch-rgb-split 类', () => {
    render(<CharacterStage glitchType="rgb-split" />)
    expect(screen.getByTestId('character-wrapper').className).toContain(
      'glitch-rgb-split'
    )
  })

  it('glitchType=invert 应用 glitch-invert 类', () => {
    render(<CharacterStage glitchType="invert" />)
    expect(screen.getByTestId('character-wrapper').className).toContain(
      'glitch-invert'
    )
  })

  it('未知 glitchType 回退到 glitch-none', () => {
    render(<CharacterStage glitchType="unknown-type" />)
    expect(screen.getByTestId('character-wrapper').className).toContain(
      'glitch-none'
    )
  })

  it('GLITCH_CLASS 导出完整映射', () => {
    expect(GLITCH_CLASS).toEqual({
      none: 'glitch-none',
      shake: 'glitch-shake',
      'rgb-split': 'glitch-rgb-split',
      invert: 'glitch-invert',
    })
  })
})
