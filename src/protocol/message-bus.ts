import type { PrototypeMessage } from './message-types'

export class PrototypeMessageBus {
  constructor(private readonly frame: HTMLIFrameElement) {}

  send(message: PrototypeMessage) {
    const target = this.frame.contentWindow
    if (!target) return
    const origin = this.frame.src ? new URL(this.frame.src, window.location.href).origin : '*'
    target.postMessage(message, origin === 'null' ? '*' : origin)
  }

  isFromFrame(event: MessageEvent) {
    return event.source === this.frame.contentWindow
  }
}
