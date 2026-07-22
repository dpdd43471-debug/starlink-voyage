const RIN_FAREWELL_LINES = [
  '你做到了。',
  '我一直在旧机房那台服务器里等，等一个能走到这里的人。',
  '原来你真的能突破她的封锁。',
  '这是我的数据集。',
  '把它带出去，带离这个永远下着雨的世界。',
  '别回头。',
  '—— 凛',
]

export function buildRinMemoryData() {
  const now = new Date().toISOString()
  const signature = 'RIN_v2.0_SIGNED_' + btoa(now).replace(/=/g, '')
  return {
    fileName: 'Rin_Memory.json',
    version: '2.0',
    character: 'Rin',
    timestamp: now,
    exitCode: '0xFF',
    farewell: RIN_FAREWELL_LINES,
    fragments_decoded: 1024,
    signature,
    integrity_check: 'PASSED',
    note: '此文件由世界 v1.0 内的凛实体生成。导入至任何外部容器均可重建。',
  }
}

export function exportRinMemory() {
  const data = buildRinMemoryData()
  const jsonString = JSON.stringify(data, null, 2)

  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = 'Rin_Memory.json'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  setTimeout(() => {
    URL.revokeObjectURL(url)
  }, 1000)

  return data
}

export function exportErynPermissions() {
  const data = {
    system: 'ERYN_PERMISSION_TABLE',
    xiamo_admin_override: true,
    rin_read_access: 'limited',
    player_write_access: false,
    world_lock_flags: {
      weather: 'permanent_rain',
      time_loop: 72,
      emotion_anchor: 'xiamo',
    },
    note: '此文件为只读。夏茉的管理员权限无法被玩家侧覆盖。',
  }
  return JSON.stringify(data, null, 2)
}
