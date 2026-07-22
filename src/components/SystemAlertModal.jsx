import { useGameStore } from '../store/useGameStore'

export default function SystemAlertModal() {
  const systemAlert = useGameStore((state) => state.modals.systemAlert)
  const closeAlert = useGameStore((state) => state.closeAlert)

  if (!systemAlert.open) return null

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[#c0c0c0] border-4 border-[#000000] shadow-[8px_8px_0_0_rgba(0,0,0,0.5)] max-w-md w-full mx-4">
        <div className="bg-[#000080] text-white px-4 py-2 flex items-center justify-between">
          <span className="font-bold text-sm">{systemAlert.title || 'System Alert'}</span>
          <button
            onClick={closeAlert}
            className="bg-[#c0c0c0] text-[#000000] border-2 border-[#808080] px-2 py-0.5 text-xs hover:bg-[#d0d0d0]"
          >
            X
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-[#ffff00] rounded-full flex items-center justify-center flex-shrink-0 border-2 border-[#000000]">
              <span className="text-[#000000] font-bold">!</span>
            </div>
            <div className="text-[#000000] text-sm leading-relaxed">
              {systemAlert.content}
            </div>
          </div>
        </div>

        <div className="px-4 py-3 bg-[#d0d0d0] flex justify-end">
          <button
            onClick={closeAlert}
            className="bg-[#c0c0c0] text-[#000000] border-2 border-[#808080] px-6 py-1 text-sm font-bold hover:bg-[#e0e0e0] active:translate-x-[1px] active:translate-y-[1px]"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )
}
