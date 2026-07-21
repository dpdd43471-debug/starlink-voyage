import React from 'react'

// 全屏 Glitch 故障叠加层。
// 当 active=true 时渲染一个固定定位、不可交互的闪烁层，
// 用于 meta_error 等高能节点的视觉冲击。
export function GlitchOverlay({ active, glitchType = 'shake' }) {
  if (!active) return null
  // invert 由 CharacterStage 处理立绘反色；这里统一用抖动营造屏幕颤动
  return (
    <div
      data-testid="glitch-overlay"
      className="pointer-events-none fixed inset-0 z-40 glitch-shake"
      aria-hidden="true"
    />
  )
}

export default GlitchOverlay
