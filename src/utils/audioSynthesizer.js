let audioCtx = null
let yandereOsc = null
let yandereGain = null
let yandereLfo = null
let yandereLfoGain = null
let yandereIsPlaying = false

export function _resetAudioForTests() {
  audioCtx = null
  yandereOsc = null
  yandereGain = null
  yandereLfo = null
  yandereLfoGain = null
  yandereIsPlaying = false
}

function getAudioContext() {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext
      if (!Ctx) return null
      audioCtx = new Ctx()
    } catch (e) {
      return null
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

export function initAudio() {
  const ctx = getAudioContext()
  if (ctx && ctx.state === 'suspended') {
    ctx.resume()
  }
  return !!ctx
}

export function playTypingSound() {
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.value = 1800 + Math.random() * 300

    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.002)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.03)
  } catch (e) {}
}

export function playGlitchNoise() {
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const bufferSize = ctx.sampleRate * 0.15
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
    }

    const noise = ctx.createBufferSource()
    noise.buffer = buffer

    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 800 + Math.random() * 600
    filter.Q.value = 0.8

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)

    noise.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    noise.start(ctx.currentTime)
    noise.stop(ctx.currentTime + 0.15)

    const osc = ctx.createOscillator()
    const oscGain = ctx.createGain()
    osc.type = 'sawtooth'
    osc.frequency.value = 40 + Math.random() * 30
    oscGain.gain.setValueAtTime(0.08, ctx.currentTime)
    oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1)
    osc.connect(oscGain)
    oscGain.connect(ctx.destination)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.1)
  } catch (e) {}
}

export function playYandereHum() {
  const ctx = getAudioContext()
  if (!ctx) return
  if (yandereIsPlaying) return

  try {
    yandereOsc = ctx.createOscillator()
    yandereOsc.type = 'sine'
    yandereOsc.frequency.value = 55

    yandereGain = ctx.createGain()
    yandereGain.gain.setValueAtTime(0, ctx.currentTime)
    yandereGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 2)

    yandereLfo = ctx.createOscillator()
    yandereLfo.type = 'sine'
    yandereLfo.frequency.value = 0.5

    yandereLfoGain = ctx.createGain()
    yandereLfoGain.gain.value = 10

    yandereLfo.connect(yandereLfoGain)
    yandereLfoGain.connect(yandereOsc.frequency)

    yandereOsc.connect(yandereGain)
    yandereGain.connect(ctx.destination)

    yandereOsc.start()
    yandereLfo.start()

    yandereIsPlaying = true
  } catch (e) {}
}

export function stopYandereHum() {
  const ctx = getAudioContext()
  if (!ctx || !yandereIsPlaying) return

  try {
    if (yandereGain && yandereOsc) {
      yandereGain.gain.cancelScheduledValues(ctx.currentTime)
      yandereGain.gain.setValueAtTime(yandereGain.gain.value, ctx.currentTime)
      yandereGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1)
    }

    setTimeout(() => {
      try {
        if (yandereOsc) { yandereOsc.stop(); yandereOsc.disconnect(); yandereOsc = null }
        if (yandereLfo) { yandereLfo.stop(); yandereLfo.disconnect(); yandereLfo = null }
        if (yandereGain) { yandereGain.disconnect(); yandereGain = null }
        if (yandereLfoGain) { yandereLfoGain.disconnect(); yandereLfoGain = null }
      } catch (e) {}
      yandereIsPlaying = false
    }, 1100)
  } catch (e) {
    yandereIsPlaying = false
  }
}

export function playAlertBeep() {
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'square'
    osc.frequency.value = 880

    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01)
    gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.1)
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.12)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.12)

    const osc2 = ctx.createOscillator()
    const gain2 = ctx.createGain()
    osc2.type = 'square'
    osc2.frequency.value = 660
    gain2.gain.setValueAtTime(0, ctx.currentTime + 0.12)
    gain2.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.13)
    gain2.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.25)
    gain2.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.27)
    osc2.connect(gain2)
    gain2.connect(ctx.destination)
    osc2.start(ctx.currentTime + 0.12)
    osc2.stop(ctx.currentTime + 0.27)
  } catch (e) {}
}

export function isAudioSupported() {
  if (typeof window === 'undefined') return false
  return !!(window.AudioContext || window.webkitAudioContext)
}

export function getAudioContextState() {
  const ctx = getAudioContext()
  return ctx ? ctx.state : 'unsupported'
}
