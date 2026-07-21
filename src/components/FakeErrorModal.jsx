import React from 'react'

// 伪系统报错弹窗：用于打破第四面墙的 Meta 高能瞬间。
// open=false 时不渲染任何内容。
export function FakeErrorModal({ open, title = '错误', message, onClose }) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60"
      data-testid="fake-error-modal"
      role="alertdialog"
      aria-modal="true"
    >
      <div className="bg-crt-bg border-2 border-crt-danger p-6 max-w-md w-[90%]">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-crt-danger text-2xl" aria-hidden="true">
            ⚠
          </span>
          <h2
            className="text-crt-danger font-bold text-lg"
            data-testid="error-title"
          >
            {title}
          </h2>
        </div>
        <p
          className="text-crt-green text-sm mb-6 leading-relaxed"
          data-testid="error-message"
        >
          {message}
        </p>
        <button
          onClick={onClose}
          className="option-btn"
          data-testid="error-close-btn"
        >
          确定
        </button>
      </div>
    </div>
  )
}

export default FakeErrorModal
