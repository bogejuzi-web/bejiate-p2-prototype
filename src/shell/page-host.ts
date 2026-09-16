import type { PrototypePage } from '../types/prototype-data'
import type { PrototypeMessage } from '../protocol/message-types'
import { PrototypeMessageBus } from '../protocol/message-bus'

export type PageHostCallbacks = {
  onLoading: (loading: boolean) => void
  onMessage: (message: PrototypeMessage) => void
  onError: (message: string) => void
}

export class PageHost {
  readonly frame: HTMLIFrameElement
  private bus: PrototypeMessageBus
  private callbacks: PageHostCallbacks
  private currentPage?: PrototypePage
  private currentMode: 'prototype' | 'annotation' = 'annotation'
  private currentScenarioId = ''
  private pageReady = false
  private pendingMessages: PrototypeMessage[] = []
  private loadTimer?: number

  constructor(container: HTMLElement, callbacks: PageHostCallbacks) {
    this.callbacks = callbacks
    this.frame = document.createElement('iframe')
    this.frame.title = '业务原型页面'
    this.frame.className = 'page-host-frame'
    container.append(this.frame)
    this.bus = new PrototypeMessageBus(this.frame)
    this.frame.addEventListener('load', () => {
      if (this.loadTimer) window.clearTimeout(this.loadTimer)
      this.callbacks.onLoading(false)
      const document = this.frame.contentDocument
      document?.querySelectorAll<HTMLButtonElement>('#back, .back, .bar button[data-target]').forEach((button) => {
        if (!button.textContent?.includes('返回')) return
        button.textContent = '‹'
        button.setAttribute('aria-label', '返回')
        button.setAttribute('title', '返回')
      })
      if (this.currentPage?.id === 'P08') document?.querySelector('.meta p:first-child')?.remove()
      if (this.currentPage?.id === 'P06') document?.querySelector<HTMLElement>('[data-change-id="P06-C02"]')?.setAttribute('data-target', 'P10')
      document?.querySelectorAll<HTMLElement>('.tabs button').forEach((button) => button.addEventListener('click', () => {
        button.parentElement?.querySelectorAll('.active').forEach((active) => active.classList.remove('active'))
        button.classList.add('active')
      }))
      if (this.currentPage?.id === 'P08') document?.querySelector('#back')?.addEventListener('click', (event) => {
        event.stopImmediatePropagation()
        this.callbacks.onMessage({ type: 'prototype:navigation-request', pageId: 'P10' })
      }, true)
      this.bus.send({ type: 'prototype:ready', pageId: this.currentPage?.id })
      this.bus.send({ type: 'prototype:set-mode', pageId: this.currentPage?.id, context: { mode: this.currentMode } })
      if (this.currentScenarioId) this.bus.send({ type: 'prototype:scenario', pageId: this.currentPage?.id, scenarioId: this.currentScenarioId })
      else this.bus.send({ type: 'prototype:reset', pageId: this.currentPage?.id })
    })
    this.frame.addEventListener('error', () => {
      if (this.loadTimer) window.clearTimeout(this.loadTimer)
      this.callbacks.onLoading(false)
      this.callbacks.onError('页面加载失败，请检查页面地址或本地服务是否已启动。')
    })
    window.addEventListener('message', (event) => {
      if (!this.bus.isFromFrame(event)) return
      if (!event.data || typeof event.data.type !== 'string') return
      if (event.data.type === 'prototype:page-ready') {
        this.pageReady = true
        window.setTimeout(() => {
          const messages = this.pendingMessages.splice(0)
          messages.forEach((message) => this.bus.send(message))
        }, 300)
      }
      this.callbacks.onMessage(event.data as PrototypeMessage)
    })
  }

  load(page: PrototypePage, mode: 'prototype' | 'annotation', scenarioId = '') {
    this.currentPage = page
    this.currentMode = mode
    this.currentScenarioId = scenarioId
    this.pageReady = false
    this.pendingMessages = []
    this.callbacks.onLoading(true)
    let url: URL
    try {
      url = new URL(page.url, window.location.href)
    } catch {
      this.callbacks.onLoading(false)
      this.callbacks.onError(`页面地址无效：${page.url}`)
      return
    }
    url.searchParams.set('prototypeMode', mode)
    if (scenarioId) url.searchParams.set('prototypeScenario', scenarioId)
    else url.searchParams.delete('prototypeScenario')
    this.frame.src = url.href
    this.loadTimer = window.setTimeout(() => {
      if (!this.pageReady) {
        this.callbacks.onLoading(false)
        this.callbacks.onError('页面加载超时，请检查页面服务是否已启动。')
      }
    }, 10000)
  }

  send(message: PrototypeMessage) {
    if (!this.pageReady && ['prototype:scenario', 'prototype:highlight', 'prototype:context', 'prototype:reset'].includes(message.type)) {
      this.pendingMessages.push(message)
      return
    }
    this.bus.send(message)
  }

  openCurrent() {
    if (this.currentPage) window.open(this.currentPage.url, '_blank', 'noopener')
  }
}
