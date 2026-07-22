import { useMemo } from 'react'

function ConvenienceStoreBg() {
  const particles = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 2 + Math.random() * 4,
        duration: 8 + Math.random() * 12,
        delay: Math.random() * 10,
      })),
    []
  )

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #ff7b54 0%, #ffb26b 25%, #ffd56b 45%, #8b5a3c 65%, #4a3228 100%)',
        }}
      />

      <div
        className="absolute inset-0 sunset-glow"
        style={{
          background: 'radial-gradient(ellipse at 70% 30%, rgba(255, 200, 100, 0.4) 0%, transparent 50%)',
        }}
      />

      {/* 夕阳 */}
      <div
        className="absolute rounded-full sunset-glow"
        style={{
          width: '120px',
          height: '120px',
          top: '20%',
          right: '20%',
          background: 'radial-gradient(circle, #fff5c0 0%, #ffb347 40%, rgba(255, 107, 53, 0.3) 70%, transparent 100%)',
          filter: 'blur(2px)',
        }}
      />

      {/* 便利店剪影 */}
      <div className="absolute bottom-0 left-0 right-0 h-2/5">
        {/* 建筑主体 */}
        <div
          className="absolute bottom-0 left-1/4 w-1/2 h-4/5"
          style={{
            background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 100%)',
            borderTop: '3px solid #2a2a4e',
          }}
        >
          {/* 便利店招牌 */}
          <div
            className="absolute -top-10 left-1/2 -translate-x-1/2 px-8 py-2"
            style={{
              background: 'linear-gradient(180deg, #3a2a1a 0%, #2a1a0a 100%)',
              border: '2px solid #5a4a2a',
              borderRadius: '4px',
            }}
          >
            <div
              className="text-center font-bold text-sm"
              style={{
                color: '#ffd700',
                textShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
                letterSpacing: '0.1em',
              }}
            >
              コンビニ
            </div>
          </div>

          {/* 窗户 - 发光 */}
          <div className="absolute top-8 left-4 right-4 flex gap-2 justify-center">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className="w-10 h-16"
                style={{
                  background: 'linear-gradient(180deg, rgba(255, 220, 150, 0.8) 0%, rgba(255, 180, 100, 0.6) 100%)',
                  border: '1px solid rgba(255, 200, 100, 0.3)',
                  borderRadius: '2px',
                }}
              />
            ))}
          </div>

          {/* 门 */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-24"
            style={{
              background: 'linear-gradient(180deg, rgba(100, 80, 60, 0.9) 0%, rgba(60, 40, 30, 0.9) 100%)',
              border: '2px solid #5a4a3a',
              borderRadius: '4px 4px 0 0',
            }}
          >
            <div
              className="absolute top-1/2 right-2 w-2 h-2 rounded-full"
              style={{ background: '#ffd700', boxShadow: '0 0 6px #ffd700' }}
            />
          </div>
        </div>

        {/* 左侧建筑 */}
        <div
          className="absolute bottom-0 left-0 w-1/5 h-3/5"
          style={{ background: 'linear-gradient(180deg, #1e1e35 0%, #0f0f20 100%)' }}
        />
        {/* 右侧建筑 */}
        <div
          className="absolute bottom-0 right-0 w-1/6 h-2/3"
          style={{ background: 'linear-gradient(180deg, #252540 0%, #15152a 100%)' }}
        />
      </div>

      {/* 漂浮粒子 - 夕阳余烬 */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full particle"
          style={{
            left: `${p.left}%`,
            bottom: '30%',
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: 'rgba(255, 180, 100, 0.6)',
            boxShadow: '0 0 6px rgba(255, 180, 100, 0.8)',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

function LibraryRainBg() {
  const drops = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        width: 1 + Math.random() * 1.5,
        height: 15 + Math.random() * 25,
        duration: 0.6 + Math.random() * 0.8,
        delay: Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.4,
      })),
    []
  )

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #3a4a5a 0%, #2a3a4a 30%, #1e2a3a 60%, #151e2a 100%)',
        }}
      />

      {/* 窗户 - 图书室 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4/5 h-3/5 flex gap-6 justify-center">
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              className="w-1/5 h-full relative"
              style={{
                background: 'linear-gradient(180deg, rgba(60, 80, 100, 0.6) 0%, rgba(40, 55, 70, 0.7) 100%)',
                border: '2px solid rgba(100, 130, 160, 0.3)',
                borderRadius: '4px',
              }}
            >
              {/* 窗框 */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-opacity-40" style={{ background: '#6a8aaa' }} />
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-opacity-40" style={{ background: '#6a8aaa' }} />

              {/* 室内微光 - 书架剪影 */}
              <div
                className="absolute inset-2"
                style={{
                  background: 'linear-gradient(180deg, rgba(120, 100, 80, 0.2) 0%, rgba(80, 60, 40, 0.3) 100%)',
                }}
              >
                {/* 书本条纹 */}
                {Array.from({ length: 8 }, (_, j) => (
                  <div
                    key={j}
                    className="absolute"
                    style={{
                      left: `${10 + j * 11}%`,
                      bottom: '30%',
                      width: '3px',
                      height: `${30 + (j % 3) * 10}%`,
                      background: j % 3 === 0 ? 'rgba(180, 120, 80, 0.3)' : j % 3 === 1 ? 'rgba(120, 80, 140, 0.3)' : 'rgba(80, 120, 140, 0.3)',
                      borderRadius: '1px',
                    }}
                  />
                ))}
                {/* 台灯光晕 */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/3"
                  style={{
                    background: 'radial-gradient(ellipse at center top, rgba(255, 200, 120, 0.15) 0%, transparent 70%)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 雨滴 */}
      {drops.map((d) => (
        <div
          key={d.id}
          className="absolute rain-drop"
          style={{
            left: `${d.left}%`,
            top: '-5%',
            width: `${d.width}px`,
            height: `${d.height}px`,
            background: `linear-gradient(180deg, transparent 0%, rgba(150, 200, 220, ${d.opacity}) 50%, transparent 100%)`,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}

      {/* 玻璃雾气 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(100, 130, 160, 0.1) 100%)',
        }}
      />
    </div>
  )
}

function ServerRoomBg() {
  const lights = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        top: 15 + (i % 5) * 17,
        delay: (i % 4) * 0.5,
        duration: 1.5 + (i % 3) * 0.8,
        color: i % 3 === 0 ? '#22d3ee' : i % 3 === 1 ? '#10b981' : '#f59e0b',
      })),
    []
  )

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #0f172a 0%, #0c1222 50%, #0a0f1a 100%)',
        }}
      />

      {/* 服务器机柜 - 左侧 */}
      <div className="absolute left-8 top-10 bottom-16 w-20">
        <div
          className="w-full h-full"
          style={{
            background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 50%, #0c1222 100%)',
            border: '2px solid #334155',
            borderRadius: '4px',
          }}
        >
          {/* 服务器单元 */}
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className="relative"
              style={{
                height: '10%',
                borderBottom: '1px solid #1e293b',
              }}
            >
              <div
                className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full server-light"
                style={{
                  background: lights[i]?.color || '#22d3ee',
                  boxShadow: `0 0 4px ${lights[i]?.color || '#22d3ee'}`,
                  animationDelay: `${lights[i]?.delay || 0}s`,
                  animationDuration: `${lights[i]?.duration || 2}s`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 服务器机柜 - 右侧 */}
      <div className="absolute right-8 top-10 bottom-16 w-20">
        <div
          className="w-full h-full"
          style={{
            background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 50%, #0c1222 100%)',
            border: '2px solid #334155',
            borderRadius: '4px',
          }}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className="relative"
              style={{
                height: '10%',
                borderBottom: '1px solid #1e293b',
              }}
            >
              <div
                className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full server-light"
                style={{
                  background: lights[i + 10]?.color || '#10b981',
                  boxShadow: `0 0 4px ${lights[i + 10]?.color || '#10b981'}`,
                  animationDelay: `${lights[i + 10]?.delay || 0}s`,
                  animationDuration: `${lights[i + 10]?.duration || 2}s`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 后方机柜阵列 */}
      <div className="absolute left-1/3 right-1/3 top-20 bottom-24 flex justify-center gap-1 opacity-60">
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            className="w-16 h-full"
            style={{
              background: 'linear-gradient(180deg, #162032 0%, #0c1525 100%)',
              border: '1px solid #1e293b',
            }}
          />
        ))}
      </div>

      {/* 地面 - 架空地板 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16"
        style={{
          background: 'linear-gradient(180deg, #1a2332 0%, #0f1722 100%)',
          borderTop: '2px solid #2a3a4a',
        }}
      >
        <div className="grid grid-cols-10 gap-px h-full p-1">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              style={{
                background: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: '2px',
              }}
            />
          ))}
        </div>
      </div>

      {/* 风扇粒子 - 循环气流 */}
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={`fan-${i}`}
          className="absolute rounded-full particle"
          style={{
            left: `${20 + i * 8}%`,
            top: '40%',
            width: '3px',
            height: '3px',
            background: 'rgba(34, 211, 238, 0.3)',
            boxShadow: '0 0 4px rgba(34, 211, 238, 0.5)',
            animationDuration: `${4 + i}s`,
            animationDelay: `${i * 0.6}s`,
          }}
        />
      ))}

      {/* 环境蓝光 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 60%, rgba(34, 211, 238, 0.05) 0%, transparent 60%)',
        }}
      />
    </div>
  )
}

function RooftopSunsetBg() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 天空渐变 - 绝美夕阳 */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #4a1942 0%, #7c2d5f 15%, #c44569 30%, #f19066 45%, #ffe066 60%, #ffd93d 70%, #ff7b54 85%, #8b5a3c 100%)',
        }}
      />

      {/* 云层 */}
      <div
        className="absolute inset-0 sunset-glow"
        style={{
          background: `
            radial-gradient(ellipse 80% 15% at 20% 25%, rgba(255, 150, 100, 0.3) 0%, transparent 70%),
            radial-gradient(ellipse 60% 10% at 70% 18%, rgba(255, 180, 120, 0.25) 0%, transparent 70%),
            radial-gradient(ellipse 90% 8% at 50% 35%, rgba(200, 100, 150, 0.2) 0%, transparent 70%)
          `,
        }}
      />

      {/* 太阳 */}
      <div
        className="absolute rounded-full"
        style={{
          width: '150px',
          height: '150px',
          top: '35%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(circle, #fff8dc 0%, #ffe066 25%, #ffb347 50%, rgba(255, 107, 53, 0.5) 75%, transparent 100%)',
          filter: 'blur(3px)',
          boxShadow: '0 0 80px rgba(255, 180, 80, 0.6), 0 0 150px rgba(255, 120, 60, 0.4)',
        }}
      />

      {/* 远处城市剪影 */}
      <div className="absolute bottom-20 left-0 right-0 h-1/4">
        {/* 建筑群 */}
        <svg viewBox="0 0 800 200" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="citySilhouette" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2a1a3a" />
              <stop offset="100%" stopColor="#1a0f2a" />
            </linearGradient>
          </defs>
          <path
            d="M 0 200 L 0 120 L 40 120 L 40 80 L 70 80 L 70 100 L 100 100 L 100 60 L 120 60 L 120 90 L 150 90 L 150 50 L 170 50 L 170 70 L 200 70 L 200 40 L 220 40 L 220 80 L 250 80 L 250 100 L 280 100 L 280 70 L 310 70 L 310 55 L 340 55 L 340 85 L 370 85 L 370 110 L 400 110 L 400 75 L 430 75 L 430 95 L 460 95 L 460 65 L 490 65 L 490 80 L 520 80 L 520 100 L 550 100 L 550 70 L 580 70 L 580 45 L 610 45 L 610 80 L 640 80 L 640 100 L 670 100 L 670 60 L 700 60 L 700 90 L 730 90 L 730 75 L 760 75 L 760 110 L 800 110 L 800 200 Z"
            fill="url(#citySilhouette)"
          />
          {/* 窗户点点灯光 */}
          {Array.from({ length: 30 }, (_, i) => (
            <rect
              key={i}
              x={20 + (i * 27) % 760}
              y={90 + (i * 13) % 80}
              width="2"
              height="3"
              fill={i % 2 === 0 ? '#ffd700' : '#ff9944'}
              opacity={0.4 + (i % 5) * 0.1}
            />
          ))}
        </svg>
      </div>

      {/* 天台地面 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20"
        style={{
          background: 'linear-gradient(180deg, #3a2a2a 0%, #1a1010 100%)',
          borderTop: '3px solid #5a4030',
        }}
      >
        {/* 铁丝网剪影 */}
        <div className="absolute -top-12 left-0 right-0 h-12 flex justify-around">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className="w-1 h-12"
                style={{ background: 'linear-gradient(180deg, #3a3a4a 0%, #2a2a3a 100%)' }}
              />
              <div
                className="absolute top-0 w-full h-0.5"
                style={{ background: '#4a4a5a' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 漂浮金色粒子 */}
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          className="absolute rounded-full particle"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: '25%',
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            background: 'rgba(255, 220, 100, 0.7)',
            boxShadow: '0 0 8px rgba(255, 200, 80, 0.8)',
            animationDuration: `${8 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 8}s`,
          }}
        />
      ))}
    </div>
  )
}

function YandereBreakBg() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #1a0a1a 0%, #2a0f1f 50%, #1a0515 100%)',
        }}
      />
      {/* 扭曲红雾 */}
      <div
        className="absolute inset-0 animate-pulse"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(255, 0, 60, 0.15) 0%, transparent 60%)',
        }}
      />
      {/* 乱码雨 */}
      {Array.from({ length: 15 }, (_, i) => (
        <div
          key={i}
          className="absolute text-crt-danger font-mono text-xs rain-drop opacity-30"
          style={{
            left: `${i * 7}%`,
            top: '-10%',
            animationDuration: `${2 + (i % 5) * 0.5}s`,
            animationDelay: `${i * 0.3}s`,
          }}
        >
          {['0', '1', '乱', 'x', 'X', '死', '愛', '0'][i % 8]}
        </div>
      ))}
    </div>
  )
}

function YandereLockBg() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #3a0010 0%, #5a0020 30%, #2a000a 70%, #1a0005 100%)',
        }}
      />
      <div
        className="absolute inset-0 animate-pulse"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(255, 0, 50, 0.2) 0%, transparent 60%)',
        }}
      />
    </div>
  )
}

function StayXiaMoBg() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #fef3f7 0%, #fff5f8 50%, #ffe4ec 100%)',
        }}
      />
      {/* 樱花飘落 */}
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          className="absolute particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: '10%',
            width: `${8 + Math.random() * 6}px`,
            height: `${8 + Math.random() * 6}px`,
            background: 'radial-gradient(circle, #ffc0cb 0%, #ffb6c1 50%, transparent 70%)',
            borderRadius: '50% 0 50% 50%',
            animationDuration: `${10 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 8}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  )
}

function DefaultBg() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #1a1625 0%, #0f0d14 100%)',
        }}
      />
      {/* 星点 */}
      {Array.from({ length: 30 }, (_, i) => (
        <div
          key={i}
          className="absolute rounded-full pulse-glow"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 60}%`,
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
            background: 'rgba(255, 255, 255, 0.5)',
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  )
}

const SCENE_BACKGROUNDS = {
  scene_p1_convenience_store: ConvenienceStoreBg,
  scene_p1_library_rin: LibraryRainBg,
  scene_p1_server_room: ServerRoomBg,
  scene_p1_rooftop_confession: RooftopSunsetBg,
  scene_p2_yandere_break: YandereBreakBg,
  scene_p2_yandere_lock: YandereLockBg,
  scene_p2_stay_xiamo: StayXiaMoBg,
}

export default function BackgroundStage({ sceneId, stageEffects }) {
  const BgComponent = SCENE_BACKGROUNDS[sceneId] || DefaultBg

  return (
    <div className="absolute inset-0">
      <BgComponent />

      {stageEffects?.screenFlash && (
        <div className="absolute inset-0 bg-white animate-screen-flash pointer-events-none z-50" />
      )}

      {stageEffects?.screenRedFlash && (
        <div className="absolute inset-0 bg-red-600/40 animate-screen-flash pointer-events-none z-50" />
      )}

      {stageEffects?.vignetteDarkness > 0 && (
        <div
          className="absolute inset-0 pointer-events-none z-40"
          style={{
            background: `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,${stageEffects.vignetteDarkness}) 100%)`,
          }}
        />
      )}
    </div>
  )
}
