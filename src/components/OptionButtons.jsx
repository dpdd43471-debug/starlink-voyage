import React from 'react'

// 选项按钮列表。
// props:
//   options: [{ text, next }] 选项数组
//   onSelect: (option) => void  选择回调
export function OptionButtons({ options = [], onSelect }) {
  return (
    <div className="flex flex-col gap-2" data-testid="option-buttons">
      {options.map((opt, i) => (
        <button
          key={i}
          type="button"
          className="option-btn"
          onClick={() => onSelect(opt)}
          data-testid={`option-${i}`}
        >
          {opt.text}
        </button>
      ))}
    </div>
  )
}

export default OptionButtons
