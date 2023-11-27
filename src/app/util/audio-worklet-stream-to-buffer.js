class AudioWorkletStreamToBuffer extends AudioWorkletProcessor {
  buffer

  constructor() {
    super()
    this.buffer = []
  }

  process(inputs) {
    const inputData = inputs[0][0]
    this.buffer.push(new Float32Array(inputData))

    return true
  }

  flushBuffer() {
    const buffer = this.buffer
    this.buffer = []
    return buffer
  }
}

registerProcessor('audio-worklet-processor', AudioWorkletStreamToBuffer)