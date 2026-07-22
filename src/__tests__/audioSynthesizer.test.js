import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  _resetAudioForTests,
  isAudioSupported,
  getAudioContextState,
  playTypingSound,
  playGlitchNoise,
  playYandereHum,
  stopYandereHum,
  playAlertBeep,
  initAudio,
} from '../utils/audioSynthesizer'

describe('audioSynthesizer', () => {
  let mockCtx
  let mockOsc
  let mockGain
  let mockBufferSource
  let mockBiquadFilter

  beforeEach(() => {
    _resetAudioForTests()
    vi.useFakeTimers()

    mockOsc = {
      type: '',
      frequency: { value: 0 },
      connect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
      disconnect: vi.fn(),
    }
    mockGain = {
      gain: {
        value: 0,
        setValueAtTime: vi.fn(),
        linearRampToValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
        cancelScheduledValues: vi.fn(),
      },
      connect: vi.fn(),
      disconnect: vi.fn(),
    }
    mockBufferSource = {
      buffer: null,
      connect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
    }
    mockBiquadFilter = {
      type: '',
      frequency: { value: 0 },
      Q: { value: 0 },
      connect: vi.fn(),
    }
    mockCtx = {
      state: 'suspended',
      sampleRate: 44100,
      destination: {},
      resume: vi.fn(() => {
        mockCtx.state = 'running'
        return Promise.resolve()
      }),
      createOscillator: vi.fn(() => ({ ...mockOsc })),
      createGain: vi.fn(() => ({ ...mockGain })),
      createBuffer: vi.fn(() => ({
        getChannelData: vi.fn(() => new Float32Array(1024)),
      })),
      createBufferSource: vi.fn(() => ({ ...mockBufferSource })),
      createBiquadFilter: vi.fn(() => ({ ...mockBiquadFilter })),
      currentTime: 0,
    }

    global.window = global.window || {}
    global.window.AudioContext = vi.fn(() => mockCtx)
  })

  afterEach(() => {
    _resetAudioForTests()
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it('isAudioSupported should return true when AudioContext exists', () => {
    expect(isAudioSupported()).toBe(true)
  })

  it('initAudio should create and resume AudioContext', () => {
    const result = initAudio()
    expect(result).toBe(true)
    expect(mockCtx.resume).toHaveBeenCalled()
  })

  it('getAudioContextState should return state', () => {
    initAudio()
    expect(getAudioContextState()).toBe('running')
  })

  it('playTypingSound should create oscillator and gain nodes', () => {
    initAudio()
    playTypingSound()
    expect(mockCtx.createOscillator).toHaveBeenCalled()
    expect(mockCtx.createGain).toHaveBeenCalled()
  })

  it('playGlitchNoise should create noise buffer and filter', () => {
    initAudio()
    playGlitchNoise()
    expect(mockCtx.createBuffer).toHaveBeenCalled()
    expect(mockCtx.createBufferSource).toHaveBeenCalled()
    expect(mockCtx.createBiquadFilter).toHaveBeenCalled()
  })

  it('playYandereHum and stopYandereHum should start and stop oscillators', () => {
    initAudio()
    playYandereHum()
    expect(mockCtx.createOscillator).toHaveBeenCalled()

    stopYandereHum()
    vi.advanceTimersByTime(1200)
  })

  it('playAlertBeep should play two-tone beep', () => {
    initAudio()
    playAlertBeep()
    expect(mockCtx.createOscillator).toHaveBeenCalled()
    expect(mockCtx.createGain).toHaveBeenCalled()
  })

  it('should handle missing AudioContext gracefully', () => {
    delete global.window.AudioContext
    _resetAudioForTests()

    expect(isAudioSupported()).toBe(false)
    expect(() => playTypingSound()).not.toThrow()
    expect(() => playGlitchNoise()).not.toThrow()
    expect(() => playYandereHum()).not.toThrow()
    expect(() => stopYandereHum()).not.toThrow()
    expect(() => playAlertBeep()).not.toThrow()
    expect(getAudioContextState()).toBe('unsupported')
    expect(initAudio()).toBe(false)
  })
})
