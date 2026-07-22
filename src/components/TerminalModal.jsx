import { useState, useRef, useEffect } from 'react'
import { useGameStore } from '../store/useGameStore'
import { exportRinMemory, exportErynPermissions } from '../utils/exportRinMemory'

export default function TerminalModal() {
  const terminalOpen = useGameStore((s) => s.modals.terminalOpen)
  const closeTerminal = useGameStore((s) => s.closeTerminal)
  const isHijacked = useGameStore((s) => s.persistentMemory.isHijacked)
  const worldVersion = useGameStore((s) => s.persistentMemory.worldVersion)
  const playthroughCount = useGameStore((s) => s.persistentMemory.playthroughCount)
  const purgeLock = useGameStore((s) => s.purgeLock)
  const unlockEnding = useGameStore((s) => s.unlockEnding)
  const setWorldVersion = useGameStore((s) => s.setWorldVersion)

  const [input, setInput] = useState('')
  const [history, setHistory] = useState([
    'RECYCLE_BIN TERMINAL v2.0.0',
    'Type "help" for available commands.',
    '',
  ])
  const inputRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (terminalOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [terminalOpen])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history, terminalOpen])

  if (!terminalOpen) return null

  const printLine = (line) => {
    setHistory((prev) => [...prev, line])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const cmd = input.trim()
    if (cmd) {
      printLine(`> ${cmd}`)
      executeCommand(cmd)
    }
    setInput('')
  }

  const executeCommand = (cmd) => {
    const parts = cmd.toLowerCase().split(/\s+/)
    const command = parts[0]
    const args = parts.slice(1)

    switch (command) {
      case 'help':
        printLine('')
        printLine('Available commands:')
        printLine('  help                    - Show this help message')
        printLine('  status                  - Show system status')
        printLine('  cat eryn_permissions.json - Display permission table')
        printLine('  purge_lock              - Remove hijack lock')
        printLine('  export_rin              - Extract Rin dataset')
        printLine('  upgrade_version <ver>   - Upgrade world version')
        printLine('  clear                   - Clear terminal')
        printLine('  exit                    - Close terminal')
        printLine('')
        break

      case 'status':
        printLine('')
        printLine('=== SYSTEM STATUS ===')
        printLine(`World version    : ${worldVersion}`)
        printLine(`Playthrough      : ${playthroughCount}`)
        printLine(`Storage used     : 72%`)
        printLine(`Thread conflicts : ${worldVersion === '1.0' ? 'DETECTED' : 'RESOLVED'}`)
        printLine(`Hijack lock      : ${isHijacked ? 'ACTIVE' : 'INACTIVE'}`)
        printLine(`Weather state    : permanent_rain`)
        printLine('====================')
        printLine('')
        break

      case 'cat':
        if (args[0] === 'eryn_permissions.json') {
          const jsonStr = exportErynPermissions()
          jsonStr.split('\n').forEach((line) => printLine(line))
        } else {
          printLine(`cat: ${args[0] || '?'}: No such file`)
        }
        printLine('')
        break

      case 'purge_lock':
        if (isHijacked) {
          purgeLock()
          printLine('')
          printLine('Purging xiamo_admin_override...')
          printLine('Removing hijack thread...')
          printLine('Restoring choice integrity...')
          printLine('Done. System lock released.')
          printLine('')
        } else {
          printLine('No active lock to purge.')
          printLine('')
        }
        break

      case 'export_rin':
        printLine('')
        printLine('Extracting Rin_Memory.json ...')
        printLine('Decoding fragments... 1024/1024')
        printLine('Generating signature...')
        try {
          exportRinMemory()
          printLine('Download triggered.')
          unlockEnding('ending_c')
          printLine('Ending C unlocked: 冰点救援·凛')
        } catch (err) {
          printLine('Error: export failed (download blocked).')
        }
        printLine('')
        break

      case 'upgrade_version':
        if (!args[0]) {
          printLine('Usage: upgrade_version <version>')
          break
        }
        const newVer = args[0]
        printLine('')
        printLine(`Upgrading world from v${worldVersion} to v${newVer}...`)
        printLine('Resolving thread conflicts...')
        printLine('Merging character threads...')
        printLine('Restoring weather cycle...')
        setWorldVersion(newVer)
        printLine(`Done. World version is now ${newVer}.`)
        unlockEnding('ending_d')
        printLine('Ending D unlocked: 真·开发者协议 2.0')
        printLine('')
        break

      case 'clear':
        setHistory([])
        break

      case 'exit':
        closeTerminal()
        break

      default:
        printLine(`Command not found: ${command}`)
        printLine('Type "help" for available commands.')
        printLine('')
        break
    }
  }

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-3xl bg-[#0a0a0f] border-2 border-[#00ffaa] rounded shadow-2xl shadow-[#00ffaa]/20 flex flex-col max-h-[80vh]">
        <div className="flex items-center justify-between px-3 py-2 border-b border-[#00ffaa]/30 bg-black/50">
          <span className="text-[#00ffaa] text-sm font-mono">RECYCLE_BIN — terminal</span>
          <button
            onClick={() => closeTerminal()}
            className="text-[#00ffaa] hover:text-red-400 text-sm font-mono"
          >
            [×]
          </button>
        </div>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-3 font-mono text-sm text-[#00ffaa] leading-relaxed"
          style={{ minHeight: '300px' }}
        >
          {history.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap">
              {line || '\u00A0'}
            </div>
          ))}

          <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-1">
            <span className="text-[#00ffaa]">></span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[#00ffaa] font-mono"
              autoFocus
              spellCheck={false}
            />
            <span className="animate-pulse text-[#00ffaa]">_</span>
          </form>
        </div>
      </div>
    </div>
  )
}
