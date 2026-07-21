import { useEffect, useState } from 'react'

// 刷新记忆机制：用 localStorage 记录本作被刷新（重新挂载）的次数。
// 每次进入页面计数 +1，用于结局处显示 Meta 痕迹。
// 返回 { refreshCount }。
const STORAGE_KEY = 'rbc_refresh_count'

export function useRefreshMemory() {
  const [refreshCount, setRefreshCount] = useState(0)

  useEffect(() => {
    let count = 0
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      const parsed = parseInt(raw, 10)
      // 防止 NaN（首次或被污染的数据）
      count = isNaN(parsed) ? 0 : parsed
    } catch (e) {
      count = 0
    }
    const next = count + 1
    try {
      window.localStorage.setItem(STORAGE_KEY, String(next))
    } catch (e) {
      // 忽略写入失败（隐私模式等）
    }
    setRefreshCount(next)
  }, [])

  return { refreshCount }
}

export default useRefreshMemory
