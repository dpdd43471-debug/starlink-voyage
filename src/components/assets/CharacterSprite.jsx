const EXPRESSION_MAP = {
  xiamo: {
    sweet_smile: {
      eyeShape: 'happy',
      mouth: 'smile',
      blush: true,
    },
    blush: {
      eyeShape: 'shy',
      mouth: 'small',
      blush: true,
    },
    confused: {
      eyeShape: 'wide',
      mouth: 'open',
      blush: false,
    },
    yandere_dark: {
      eyeShape: 'dead',
      mouth: 'twisted',
      blush: false,
    },
    neutral: {
      eyeShape: 'normal',
      mouth: 'neutral',
      blush: false,
    },
    smiling: {
      eyeShape: 'happy',
      mouth: 'smile',
      blush: false,
    },
    yandere: {
      eyeShape: 'dead',
      mouth: 'twisted',
      blush: false,
    },
  },
  rin: {
    cool_flat: {
      eyeShape: 'half',
      mouth: 'flat',
      blush: false,
    },
    disdain: {
      eyeShape: 'narrow',
      mouth: 'smirk',
      blush: false,
    },
    subtle_smile: {
      eyeShape: 'soft',
      mouth: 'tiny_smile',
      blush: true,
    },
    glitch_data: {
      eyeShape: 'glitch',
      mouth: 'glitch',
      blush: false,
    },
    neutral: {
      eyeShape: 'half',
      mouth: 'flat',
      blush: false,
    },
  },
}

function Eyes({ shape, color, eyeY = 175 }) {
  const eyeSpacing = 35
  const leftEyeX = 150 - eyeSpacing
  const rightEyeX = 150 + eyeSpacing

  if (shape === 'happy') {
    return (
      <g>
        <path d={`M ${leftEyeX - 12} ${eyeY} Q ${leftEyeX} ${eyeY - 10} ${leftEyeX + 12} ${eyeY}`} fill="none" stroke="#2a1a2e" strokeWidth="3" strokeLinecap="round" />
        <path d={`M ${rightEyeX - 12} ${eyeY} Q ${rightEyeX} ${eyeY - 10} ${rightEyeX + 12} ${eyeY}`} fill="none" stroke="#2a1a2e" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  }

  if (shape === 'dead') {
    return (
      <g>
        <ellipse cx={leftEyeX} cy={eyeY} rx="14" ry="16" fill="#1a0f1a" stroke="#ff3355" strokeWidth="1.5" />
        <circle cx={leftEyeX} cy={eyeY} r="4" fill="#ff3355" />
        <path d={`M ${leftEyeX - 8} ${eyeY - 3} L ${leftEyeX + 8} ${eyeY - 3}`} stroke="#ff3355" strokeWidth="0.8" opacity="0.7" />
        <ellipse cx={rightEyeX} cy={eyeY} rx="14" ry="16" fill="#1a0f1a" stroke="#ff3355" strokeWidth="1.5" />
        <circle cx={rightEyeX} cy={eyeY} r="4" fill="#ff3355" />
        <path d={`M ${rightEyeX - 8} ${eyeY - 3} L ${rightEyeX + 8} ${eyeY - 3}`} stroke="#ff3355" strokeWidth="0.8" opacity="0.7" />
      </g>
    )
  }

  if (shape === 'wide') {
    return (
      <g>
        <ellipse cx={leftEyeX} cy={eyeY} rx="12" ry="15" fill="#fff" stroke="#2a1a2e" strokeWidth="2" />
        <circle cx={leftEyeX} cy={eyeY + 2} r="7" fill={color} />
        <circle cx={leftEyeX - 2} cy={eyeY - 2} r="3" fill="#fff" />
        <ellipse cx={rightEyeX} cy={eyeY} rx="12" ry="15" fill="#fff" stroke="#2a1a2e" strokeWidth="2" />
        <circle cx={rightEyeX} cy={eyeY + 2} r="7" fill={color} />
        <circle cx={rightEyeX - 2} cy={eyeY - 2} r="3" fill="#fff" />
      </g>
    )
  }

  if (shape === 'shy') {
    return (
      <g>
        <path d={`M ${leftEyeX - 10} ${eyeY} Q ${leftEyeX} ${eyeY - 6} ${leftEyeX + 10} ${eyeY}`} fill="none" stroke="#2a1a2e" strokeWidth="2.5" strokeLinecap="round" />
        <path d={`M ${rightEyeX - 10} ${eyeY} Q ${rightEyeX} ${eyeY - 6} ${rightEyeX + 10} ${eyeY}`} fill="none" stroke="#2a1a2e" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  }

  if (shape === 'normal') {
    return (
      <g>
        <ellipse cx={leftEyeX} cy={eyeY} rx="11" ry="14" fill="#fff" stroke="#2a1a2e" strokeWidth="2" />
        <circle cx={leftEyeX} cy={eyeY + 1} r="6" fill={color} />
        <circle cx={leftEyeX - 2} cy={eyeY - 3} r="2.5" fill="#fff" />
        <ellipse cx={rightEyeX} cy={eyeY} rx="11" ry="14" fill="#fff" stroke="#2a1a2e" strokeWidth="2" />
        <circle cx={rightEyeX} cy={eyeY + 1} r="6" fill={color} />
        <circle cx={rightEyeX - 2} cy={eyeY - 3} r="2.5" fill="#fff" />
      </g>
    )
  }

  if (shape === 'half') {
    return (
      <g>
        <path d={`M ${leftEyeX - 11} ${eyeY} L ${leftEyeX + 11} ${eyeY}`} stroke="#2a3a4e" strokeWidth="2.5" strokeLinecap="round" />
        <path d={`M ${leftEyeX - 8} ${eyeY - 4} Q ${leftEyeX} ${eyeY - 7} ${leftEyeX + 8} ${eyeY - 4}`} fill="none" stroke="#2a3a4e" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <path d={`M ${rightEyeX - 11} ${eyeY} L ${rightEyeX + 11} ${eyeY}`} stroke="#2a3a4e" strokeWidth="2.5" strokeLinecap="round" />
        <path d={`M ${rightEyeX - 8} ${eyeY - 4} Q ${rightEyeX} ${eyeY - 7} ${rightEyeX + 8} ${eyeY - 4}`} fill="none" stroke="#2a3a4e" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      </g>
    )
  }

  if (shape === 'narrow') {
    return (
      <g>
        <path d={`M ${leftEyeX - 10} ${eyeY + 2} Q ${leftEyeX} ${eyeY - 2} ${leftEyeX + 10} ${eyeY + 2}`} fill="none" stroke="#2a3a4e" strokeWidth="2.5" strokeLinecap="round" />
        <path d={`M ${rightEyeX - 10} ${eyeY + 2} Q ${rightEyeX} ${eyeY - 2} ${rightEyeX + 10} ${eyeY + 2}`} fill="none" stroke="#2a3a4e" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  }

  if (shape === 'soft') {
    return (
      <g>
        <path d={`M ${leftEyeX - 10} ${eyeY + 1} Q ${leftEyeX} ${eyeY - 5} ${leftEyeX + 10} ${eyeY + 1}`} fill="none" stroke="#2a3a4e" strokeWidth="2.5" strokeLinecap="round" />
        <path d={`M ${rightEyeX - 10} ${eyeY + 1} Q ${rightEyeX} ${eyeY - 5} ${rightEyeX + 10} ${eyeY + 1}`} fill="none" stroke="#2a3a4e" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  }

  if (shape === 'glitch') {
    return (
      <g>
        <ellipse cx={leftEyeX} cy={eyeY} rx="12" ry="15" fill="#0a1628" stroke="#00ffaa" strokeWidth="1.5" />
        <path d={`M ${leftEyeX - 10} ${eyeY - 5} L ${leftEyeX + 10} ${eyeY - 5}`} stroke="#00ffaa" strokeWidth="1" />
        <path d={`M ${leftEyeX - 8} ${eyeY} L ${leftEyeX + 8} ${eyeY}`} stroke="#00ffaa" strokeWidth="0.8" opacity="0.7" />
        <ellipse cx={rightEyeX} cy={eyeY} rx="12" ry="15" fill="#0a1628" stroke="#00ffaa" strokeWidth="1.5" />
        <path d={`M ${rightEyeX - 10} ${eyeY + 3} L ${rightEyeX + 10} ${eyeY + 3}`} stroke="#00ffaa" strokeWidth="1" />
        <path d={`M ${rightEyeX - 8} ${eyeY - 2} L ${rightEyeX + 8} ${eyeY - 2}`} stroke="#00ffaa" strokeWidth="0.8" opacity="0.7" />
      </g>
    )
  }

  return null
}

function Mouth({ shape, mouthY = 210 }) {
  if (shape === 'smile') {
    return <path d={`M 138 ${mouthY} Q 150 ${mouthY + 8} 162 ${mouthY}`} fill="none" stroke="#c86b8a" strokeWidth="2" strokeLinecap="round" />
  }
  if (shape === 'neutral') {
    return <path d={`M 142 ${mouthY + 2} L 158 ${mouthY + 2}`} stroke="#c86b8a" strokeWidth="2" strokeLinecap="round" />
  }
  if (shape === 'small') {
    return <ellipse cx="150" cy={mouthY + 2} rx="5" ry="3" fill="#e88aab" />
  }
  if (shape === 'open') {
    return <ellipse cx="150" cy={mouthY + 3} rx="6" ry="8" fill="#8a4a5a" />
  }
  if (shape === 'twisted') {
    return (
      <g>
        <path d={`M 135 ${mouthY} Q 150 ${mouthY + 12} 168 ${mouthY - 2}`} fill="none" stroke="#ff3355" strokeWidth="2.5" strokeLinecap="round" />
        <path d={`M 140 ${mouthY + 5} L 160 ${mouthY + 3}`} stroke="#ff3355" strokeWidth="0.8" opacity="0.5" />
      </g>
    )
  }
  if (shape === 'flat') {
    return <path d={`M 140 ${mouthY + 2} L 160 ${mouthY + 2}`} stroke="#5a6a8a" strokeWidth="2" strokeLinecap="round" />
  }
  if (shape === 'smirk') {
    return <path d={`M 140 ${mouthY + 3} Q 152 ${mouthY - 2} 165 ${mouthY + 1}`} fill="none" stroke="#5a6a8a" strokeWidth="2" strokeLinecap="round" />
  }
  if (shape === 'tiny_smile') {
    return <path d={`M 142 ${mouthY + 2} Q 150 ${mouthY + 5} 158 ${mouthY + 2}`} fill="none" stroke="#6a7a9a" strokeWidth="2" strokeLinecap="round" />
  }
  if (shape === 'glitch') {
    return (
      <g>
        <path d={`M 138 ${mouthY + 1} L 162 ${mouthY + 1}`} stroke="#00ffaa" strokeWidth="1.5" />
        <path d={`M 142 ${mouthY + 5} L 158 ${mouthY + 5}`} stroke="#00ffaa" strokeWidth="1" opacity="0.6" />
      </g>
    )
  }
  return null
}

function Blush({ show, blushY = 198 }) {
  if (!show) return null
  return (
    <g>
      <ellipse cx="115" cy={blushY} rx="12" ry="6" fill="rgba(255, 150, 180, 0.35)" />
      <ellipse cx="185" cy={blushY} rx="12" ry="6" fill="rgba(255, 150, 180, 0.35)" />
    </g>
  )
}

function XiaMoSprite({ expression = 'neutral', yandere = false }) {
  const exp = EXPRESSION_MAP.xiamo[expression] || EXPRESSION_MAP.xiamo.neutral
  const eyeColor = yandere ? '#ff3355' : '#a855f7'
  const hairColor = yandere ? '#8a2a4a' : '#ffb3d1'
  const hairShadow = yandere ? '#5a1a2a' : '#e88ab0'
  const skinColor = '#ffe4ec'
  const skinShadow = '#f0c8d8'

  return (
    <svg viewBox="0 0 300 450" className="w-full h-full">
      <defs>
        <linearGradient id="xiamoHair" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={hairColor} />
          <stop offset="100%" stopColor={hairShadow} />
        </linearGradient>
        <linearGradient id="xiamoSkin" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={skinColor} />
          <stop offset="100%" stopColor={skinShadow} />
        </linearGradient>
        <radialGradient id="xiamoHairShine" cx="30%" cy="20%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        {yandere && (
          <filter id="yandereShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="15" />
            <feOffset dx="0" dy="10" result="offsetblur" />
            <feFlood floodColor="#ff0040" floodOpacity="0.4" />
            <feComposite in2="offsetblur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>

      <g filter={yandere ? 'url(#yandereShadow)' : ''}>
        {/* 身体/肩膀 */}
        <path
          d="M 80 450 Q 80 380 120 350 L 180 350 Q 220 380 220 450 Z"
          fill={yandere ? '#2a0f1a' : '#fff0f5'}
          stroke={yandere ? '#ff3355' : '#ffc8dc'}
          strokeWidth="1"
        />
        {/* 衣领 */}
        <path
          d="M 120 350 L 150 380 L 180 350"
          fill="none"
          stroke={yandere ? '#ff3355' : '#ffaacc'}
          strokeWidth="1.5"
        />

        {/* 脖子 */}
        <rect x="138" y="310" width="24" height="45" fill="url(#xiamoSkin)" />

        {/* 脸 */}
        <ellipse cx="150" cy="200" rx="65" ry="80" fill="url(#xiamoSkin)" />

        {/* 头发 - 后部 */}
        <path
          d="M 85 200 Q 70 120 120 80 Q 150 55 180 80 Q 230 120 215 200 L 210 260 Q 190 280 170 275 L 165 220 Q 150 230 135 220 L 130 275 Q 110 280 90 260 Z"
          fill="url(#xiamoHair)"
        />

        {/* 刘海 */}
        <path
          d="M 95 160 Q 110 110 150 100 Q 190 110 205 160 Q 195 150 180 155 Q 165 135 150 145 Q 135 135 120 155 Q 105 150 95 160 Z"
          fill="url(#xiamoHair)"
        />

        {/* 双马尾 - 左 */}
        <path
          d="M 85 180 Q 60 230 55 300 Q 58 340 70 360 Q 80 340 78 300 Q 82 240 100 200 Z"
          fill="url(#xiamoHair)"
          opacity="0.9"
        />
        {/* 双马尾 - 右 */}
        <path
          d="M 215 180 Q 240 230 245 300 Q 242 340 230 360 Q 220 340 222 300 Q 218 240 200 200 Z"
          fill="url(#xiamoHair)"
          opacity="0.9"
        />

        {/* 发带 - 左 */}
        <ellipse cx="70" cy="210" rx="10" ry="5" fill={yandere ? '#ff3355' : '#ff6b9d'} opacity="0.8" />
        {/* 发带 - 右 */}
        <ellipse cx="230" cy="210" rx="10" ry="5" fill={yandere ? '#ff3355' : '#ff6b9d'} opacity="0.8" />

        {/* 头发光泽 */}
        <ellipse cx="120" cy="115" rx="25" ry="15" fill="url(#xiamoHairShine)" />

        {/* 眉毛 */}
        <path d="M 118 158 Q 130 155 140 158" fill="none" stroke={yandere ? '#5a1a2a' : '#8a4a5a'} strokeWidth="2" strokeLinecap="round" />
        <path d="M 160 158 Q 170 155 182 158" fill="none" stroke={yandere ? '#5a1a2a' : '#8a4a5a'} strokeWidth="2" strokeLinecap="round" />

        {/* 眼睛 */}
        <Eyes shape={exp.eyeShape} color={eyeColor} />

        {/* 腮红 */}
        <Blush show={exp.blush && !yandere} />

        {/* 嘴 */}
        <Mouth shape={exp.mouth} />

        {/* 黑化装饰 - 阴影裂痕 */}
        {yandere && (
          <g opacity="0.6">
            <path d="M 100 180 L 110 210 L 105 240" stroke="#ff0040" strokeWidth="1" fill="none" />
            <path d="M 200 190 L 195 220 L 200 250" stroke="#ff0040" strokeWidth="1" fill="none" />
          </g>
        )}
      </g>
    </svg>
  )
}

function RinSprite({ expression = 'neutral' }) {
  const exp = EXPRESSION_MAP.rin[expression] || EXPRESSION_MAP.rin.neutral
  const eyeColor = '#38bdf8'
  const hairColor = '#a78bfa'
  const hairShadow = '#7c3aed'
  const skinColor = '#e8eef8'
  const skinShadow = '#c8d0e8'

  return (
    <svg viewBox="0 0 300 450" className="w-full h-full">
      <defs>
        <linearGradient id="rinHair" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={hairColor} />
          <stop offset="100%" stopColor={hairShadow} />
        </linearGradient>
        <linearGradient id="rinSkin" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={skinColor} />
          <stop offset="100%" stopColor={skinShadow} />
        </linearGradient>
        <radialGradient id="rinHairShine" cx="30%" cy="20%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g>
        {/* 身体/肩膀 */}
        <path
          d="M 80 450 Q 80 380 120 350 L 180 350 Q 220 380 220 450 Z"
          fill="#1e293b"
          stroke="#475569"
          strokeWidth="1"
        />
        {/* 连帽衫领口 */}
        <path
          d="M 115 350 Q 150 365 185 350"
          fill="none"
          stroke="#64748b"
          strokeWidth="2"
        />

        {/* 脖子 */}
        <rect x="138" y="310" width="24" height="45" fill="url(#rinSkin)" />

        {/* 脸 */}
        <ellipse cx="150" cy="200" rx="62" ry="78" fill="url(#rinSkin)" />

        {/* 头发 - 后 */}
        <path
          d="M 88 195 Q 75 115 125 75 Q 150 50 175 75 Q 225 115 212 195 L 210 250 Q 195 265 175 260 L 172 200 Q 160 210 150 205 Q 140 210 128 200 L 125 260 Q 105 265 90 250 Z"
          fill="url(#rinHair)"
        />

        {/* 刘海 */}
        <path
          d="M 95 155 Q 105 100 150 90 Q 195 100 205 155 Q 195 145 180 150 Q 168 125 150 135 Q 132 125 120 150 Q 105 145 95 155 Z"
          fill="url(#rinHair)"
        />

        {/* 头发光泽 */}
        <ellipse cx="118" cy="110" rx="22" ry="12" fill="url(#rinHairShine)" />

        {/* 耳机 - 头带 */}
        <path
          d="M 85 140 Q 90 60 150 50 Q 210 60 215 140"
          fill="none"
          stroke="#1e293b"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* 耳机 - 左耳罩 */}
        <ellipse cx="82" cy="160" rx="15" ry="22" fill="#334155" stroke="#475569" strokeWidth="1.5" />
        <ellipse cx="82" cy="160" rx="9" ry="14" fill="#1e293b" />
        {/* 耳机 - 右耳罩 */}
        <ellipse cx="218" cy="160" rx="15" ry="22" fill="#334155" stroke="#475569" strokeWidth="1.5" />
        <ellipse cx="218" cy="160" rx="9" ry="14" fill="#1e293b" />
        {/* 耳机指示灯 */}
        <circle cx="218" cy="148" r="2" fill="#22d3ee" className="server-light" />

        {/* 眉毛 */}
        <path d="M 118 160 Q 130 157 140 160" fill="none" stroke="#4c1d95" strokeWidth="2" strokeLinecap="round" />
        <path d="M 160 160 Q 170 157 182 160" fill="none" stroke="#4c1d95" strokeWidth="2" strokeLinecap="round" />

        {/* 眼睛 */}
        <Eyes shape={exp.eyeShape} color={eyeColor} />

        {/* 腮红 */}
        <Blush show={exp.blush} blushY={196} />

        {/* 嘴 */}
        <Mouth shape={exp.mouth} />
      </g>
    </svg>
  )
}

const CHAR_ID_MAP = {
  xiamo: 'xiamo',
  xiamo_yandere: 'xiamo',
  rin: 'rin',
}

export default function CharacterSprite({ character }) {
  if (!character || !character.id) return null

  const charType = CHAR_ID_MAP[character.id]
  if (!charType) return null

  const isYandere = character.id === 'xiamo_yandere' || character.expression === 'yandere' || character.expression === 'yandere_dark'

  let expression = character.expression || 'neutral'

  if (charType === 'xiamo') {
    if (isYandere) expression = 'yandere_dark'
    return (
      <div className={`w-full h-full flex items-end justify-center float-slow ${isYandere ? 'animate-screen-shake' : ''}`}>
        <div className="w-[280px] h-[420px]">
          <XiaMoSprite expression={expression} yandere={isYandere} />
        </div>
      </div>
    )
  }

  if (charType === 'rin') {
    if (expression === 'glitch' || expression === 'glitch_data') expression = 'glitch_data'
    return (
      <div className="w-full h-full flex items-end justify-center float-slow">
        <div className="w-[280px] h-[420px]">
          <RinSprite expression={expression} />
        </div>
      </div>
    )
  }

  return null
}
