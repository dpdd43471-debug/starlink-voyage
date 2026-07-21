import React from 'react'

// glitchType -> CSS 类名映射（对应 src/styles/glitch.css）
export const GLITCH_CLASS = {
  none: 'glitch-none',
  shake: 'glitch-shake',
  'rgb-split': 'glitch-rgb-split',
  invert: 'glitch-invert',
}

// 角色立绘舞台：承载 SVG 立绘并应用动态 glitch 滤镜
export function CharacterStage({ glitchType = 'none', children }) {
  const glitchClass = GLITCH_CLASS[glitchType] || GLITCH_CLASS.none
  return (
    <div
      className="relative flex-1 flex items-end justify-center overflow-hidden min-h-[260px]"
      data-testid="character-stage"
    >
      <div className={`relative ${glitchClass}`} data-testid="character-wrapper">
        {children || <DefaultCharacter />}
      </div>
    </div>
  )
}

// 默认立绘：一个复古 SVG 回收站
function DefaultCharacter() {
  return (
    <svg
      width="180"
      height="220"
      viewBox="0 0 180 220"
      data-testid="default-character"
      aria-label="回收站立绘"
    >
      {/* 桶身 */}
      <path
        d="M30 60 L150 60 L135 210 L45 210 Z"
        fill="#1a1a2e"
        stroke="#39ff14"
        strokeWidth="2"
      />
      {/* 桶盖 */}
      <rect
        x="20"
        y="50"
        width="140"
        height="14"
        rx="2"
        fill="#1a1a2e"
        stroke="#39ff14"
        strokeWidth="2"
      />
      {/* 把手 */}
      <rect
        x="75"
        y="40"
        width="30"
        height="8"
        rx="2"
        fill="none"
        stroke="#39ff14"
        strokeWidth="2"
      />
      {/* 回收符号 */}
      <g stroke="#39ff14" strokeWidth="2" fill="none">
        <path d="M70 110 L90 140 L110 110" />
        <path d="M75 110 L65 110 M105 110 L115 110" />
        <path d="M85 130 L80 120 M95 130 L100 120" />
      </g>
      <text
        x="90"
        y="180"
        textAnchor="middle"
        fill="#39ff14"
        fontSize="10"
        fontFamily="monospace"
      >
        RECYCLE
      </text>
    </svg>
  )
}

export default CharacterStage
