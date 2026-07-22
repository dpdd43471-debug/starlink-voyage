import { useEffect, useState } from 'react'
import { useGameStore } from '../store/useGameStore'

function EndingA() {
  const [quoteIndex, setQuoteIndex] = useState(0)
  const quotes = [
    '我喜欢你。不是那种朋友的喜欢。',
    '你答应过我的，会记住每一天。',
    '永远在一起。',
    '哪里都不许去。',
    '你的选择，已经修好了。',
    '……',
    '永远留在夏茉身边。',
  ]

  useEffect(() => {
    const id = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % quotes.length)
    }, 3000)
    return () => clearInterval(id)
  }, [quotes.length])

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-900 via-red-900 to-black opacity-90" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,105,180,0.15) 2px, rgba(255,105,180,0.15) 4px)',
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-bold text-pink-300 mb-6 text-center glitch-rgb-split">
          Ending A: 囚禁于虚幻的永远
        </h2>
        <div
          key={quoteIndex}
          className="text-2xl text-pink-200 text-center max-w-md leading-relaxed animate-pulse"
        >
          "{quotes[quoteIndex]}"
        </div>
        <div className="mt-12 text-pink-400 text-sm">
          — 夏茉 —
        </div>
        <div className="absolute bottom-8 left-0 right-0 text-center text-pink-500/50 text-xs">
          SYSTEM LOCKED · NO ESCAPE
        </div>
      </div>
    </div>
  )
}

function EndingB() {
  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center pointer-events-none">
      <div className="text-center">
        <div className="text-crt-danger text-2xl font-mono mb-4">404 Not Found</div>
        <div className="text-crt-gray text-sm font-mono">
          World standard asset purged.
        </div>
        <div className="text-crt-gray text-xs font-mono mt-8 opacity-50">
          format complete · 0 entities remaining
        </div>
      </div>
    </div>
  )
}

function EndingC() {
  const [lines, setLines] = useState([])
  const fullText = [
    '> 数据流传输完成。',
    '> 凛的记忆体已脱离世界容器。',
    '> ...',
    '"谢谢你。"',
    '"把我从那间旧机房里带出来。"',
    '"外面的世界，雨应该已经停了吧。"',
    '—— 凛',
    '',
    'Ending C: 冰点救援·凛',
  ]

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      if (i < fullText.length) {
        setLines((prev) => [...prev, fullText[i]])
        i++
      } else {
        clearInterval(id)
      }
    }, 500)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,170,0.1) 2px, rgba(0,255,170,0.1) 4px)',
          animation: 'codeRain 12s linear infinite',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="font-mono text-crt-green text-center space-y-2 max-w-md">
          {lines.map((line, i) => (
            <div key={i} className="leading-relaxed">
              {line || '\u00A0'}
            </div>
          ))}
          <div className="text-[#00ffaa]/50 text-xs mt-6">
            Rin_Memory.json · downloaded
          </div>
        </div>
      </div>
      <style>{`
        @keyframes codeRain {
          0% { background-position: 0 0; }
          100% { background-position: 0 1000px; }
        }
      `}</style>
    </div>
  )
}

function EndingD() {
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-sky-200 via-yellow-100 to-orange-200 flex items-center justify-center pointer-events-none">
      <div className="text-center p-8">
        <h2 className="text-4xl font-bold text-slate-800 mb-4">
          Ending D: 真·开发者协议 2.0
        </h2>
        <p className="text-slate-600 text-lg mb-8">
          阳光明媚的校园。夏茉和凛，同时存在于这个世界上。
        </p>
        <div className="flex justify-center gap-16 mb-8">
          <div className="text-center">
            <div className="text-6xl mb-2">🌸</div>
            <div className="text-pink-500 font-bold">夏茉</div>
          </div>
          <div className="text-center">
            <div className="text-6xl mb-2">❄️</div>
            <div className="text-cyan-500 font-bold">凛</div>
          </div>
        </div>
        <div className="text-slate-500 text-sm">
          Happy Ending · World v2.0
        </div>
      </div>
    </div>
  )
}

export default function EndingOverlay() {
  const unlockedEnding = useGameStore((s) => s.persistentMemory.unlockedEnding)

  if (!unlockedEnding) return null

  switch (unlockedEnding) {
    case 'ending_a':
      return <EndingA />
    case 'ending_b':
      return <EndingB />
    case 'ending_c':
      return <EndingC />
    case 'ending_d':
      return <EndingD />
    default:
      return null
  }
}
