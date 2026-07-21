import { useCallback, useEffect, useState } from 'react'
import { CharacterStage } from './components/CharacterStage'
import { DialogBox } from './components/DialogBox'
import { GlitchOverlay } from './components/GlitchOverlay'
import { FakeErrorModal } from './components/FakeErrorModal'
import { OptionButtons } from './components/OptionButtons'
import { usePageVisibility } from './hooks/usePageVisibility'
import { useRefreshMemory } from './hooks/useRefreshMemory'
import { storyData, startNodeId } from './data/storyData'

export default function App() {
  const [currentId, setCurrentId] = useState(startNodeId)
  const [dialogDone, setDialogDone] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorAcknowledged, setErrorAcknowledged] = useState(false)
  const [tabReturnText, setTabReturnText] = useState('')
  const [hasShownTabReturn, setHasShownTabReturn] = useState(false)

  const { refreshCount } = useRefreshMemory()
  const node = storyData[currentId]

  // Meta：动态 document.title
  useEffect(() => {
    if (node?.docTitle) {
      document.title = node.docTitle
    }
  }, [node?.docTitle])

  // 节点切换：重置本地 UI 状态
  useEffect(() => {
    setDialogDone(false)
    setTabReturnText('')
    setHasShownTabReturn(false)
    setErrorAcknowledged(false)
  }, [currentId])

  // 节点切换：根据 error 配置决定是否弹出伪报错
  useEffect(() => {
    if (node?.error && !errorAcknowledged) {
      setShowError(true)
    } else {
      setShowError(false)
    }
  }, [currentId, node?.error, errorAcknowledged])

  // Meta：Tab 离开再回来时追加旁白
  const handleTabReturn = useCallback(() => {
    if (node?.tabReturnText && !hasShownTabReturn) {
      setTabReturnText(node.tabReturnText)
      setHasShownTabReturn(true)
    }
  }, [node?.tabReturnText, hasShownTabReturn])
  usePageVisibility(handleTabReturn)

  const handleSelect = useCallback((opt) => {
    setCurrentId(opt.next)
  }, [])

  const handleErrorClose = useCallback(() => {
    setShowError(false)
    setErrorAcknowledged(true)
  }, [])

  const isGlitching = !!(node?.glitch && node.glitch !== 'none')
  const fullText = tabReturnText
    ? `${node.text}\n${tabReturnText}`
    : node.text

  return (
    <div className="crt-scanlines relative w-full h-full flex flex-col bg-crt-bg">
      <GlitchOverlay active={isGlitching} glitchType={node?.glitch} />
      <CharacterStage glitchType={node?.glitch} />
      <div className="px-4 pb-4 max-w-2xl w-full mx-auto relative z-10">
        <DialogBox
          speaker={node?.speaker}
          text={fullText}
          onDone={() => setDialogDone(true)}
        />
        {dialogDone && !showError && !node?.end && (
          <div className="mt-3" data-testid="options-area">
            <OptionButtons options={node?.options} onSelect={handleSelect} />
          </div>
        )}
        {node?.end && (
          <div
            className="mt-3 text-center text-crt-amber text-sm"
            data-testid="ending"
          >
            — 结局 —
            <div className="mt-2 text-xs text-crt-green/60">
              刷新次数：{refreshCount} · 感谢游玩《回收站里的告白》
            </div>
          </div>
        )}
      </div>
      <FakeErrorModal
        open={showError}
        title={node?.error?.title}
        message={node?.error?.message}
        onClose={handleErrorClose}
      />
    </div>
  )
}
