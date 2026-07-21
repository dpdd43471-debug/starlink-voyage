import { describe, it, expect } from 'vitest'
import { storyData, startNodeId } from '../data/storyData'

describe('StoryEngine 剧情数据', () => {
  it('存在 start 节点且与 startNodeId 一致', () => {
    expect(storyData[startNodeId]).toBeDefined()
    expect(storyData[startNodeId].id).toBe(startNodeId)
  })

  it('每个节点都有必需字段', () => {
    Object.values(storyData).forEach((node) => {
      expect(node.id).toBeTruthy()
      expect(node.text).toBeTruthy()
      expect(node.glitch).toBeTruthy()
      expect(node.docTitle).toBeTruthy()
    })
  })

  it('所有 options.next 指向已存在的节点', () => {
    Object.values(storyData).forEach((node) => {
      ;(node.options || []).forEach((opt) => {
        expect(storyData[opt.next]).toBeDefined()
      })
    })
  })

  it('存在至少一个结局节点', () => {
    const endings = Object.values(storyData).filter((n) => n.end)
    expect(endings.length).toBeGreaterThan(0)
  })

  it('glitch 取值合法', () => {
    const valid = ['none', 'shake', 'rgb-split', 'invert']
    Object.values(storyData).forEach((node) => {
      expect(valid).toContain(node.glitch)
    })
  })

  it('meta_error 节点配置了 error 报错内容', () => {
    expect(storyData.meta_error.error).toBeDefined()
    expect(storyData.meta_error.error.message).toBeTruthy()
    expect(storyData.meta_error.error.title).toBeTruthy()
  })
})
