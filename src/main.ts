import './styles.css'
import type { PrototypeData, PrototypePage, PrototypeChange } from './types/prototype-data'
import type { PrototypeMessage } from './protocol/message-types'
import { PageNavigation } from './shell/page-navigation'
import { ViewportSwitcher, type Viewport } from './shell/viewport-switcher'
import { AnnotationPanel } from './shell/annotation-panel'
import { PageHost } from './shell/page-host'

const demoData: PrototypeData = {
  project: 'WEC 跨技术栈原型示例',
  version: '0.1.0',
  generatedAt: new Date().toISOString(),
  pages: [
    {
      id: 'P01', title: '通用服务工单', type: 'url', url: 'http://localhost:81/biz/ticket/commonticket', viewport: 'PC',
      protocol: 'prototype-v1', requirements: ['WEC-DEMO-001'], overview: '使用 WEC Vue 本地预览页面验证跨技术栈承载。', pageRole: '展示真实 Vue 管理后台页面。',
      illustration: '/illustrations/prototype-shell-demo.svg', states: [], changes: [{ id: 'P01-C01', location: '工单列表', action: '查看本地 Mock 工单', result: '显示工单记录并可进入详情。' }]
    },
    {
      id: 'P02', title: 'HTML 兼容示例', type: 'html', url: '/pages/legacy-compatible.html', viewport: 'PC',
      protocol: 'prototype-v1', requirements: ['WEC-DEMO-002'], overview: '验证旧式独立 HTML 原型仍可由新框架承载。', pageRole: '展示兼容协议、状态切换和功能定位。',
      illustration: '/illustrations/prototype-shell-demo.svg', states: [{ id: 'P02-S01', title: '处理中' }, { id: 'P02-S02', title: '已完成' }],
      changes: [{ id: 'P02-C01', stateId: 'P02-S01', location: '状态卡片', action: '点击右侧改动说明', result: '页面滚动并高亮状态卡片。' }]
    }
  ]
}

const data = (window as unknown as { PROTOTYPE_DATA?: PrototypeData }).PROTOTYPE_DATA || demoData
const root = document.querySelector<HTMLDivElement>('#app')!
const nav = new PageNavigation()
const viewport = new ViewportSwitcher()
const annotations = new AnnotationPanel()
const stage = document.createElement('main')
stage.className = 'stage'
const layoutResizer = document.createElement('div')
layoutResizer.className = 'layout-resizer'
layoutResizer.setAttribute('role', 'separator')
layoutResizer.setAttribute('aria-label', '调整说明栏宽度')
layoutResizer.setAttribute('aria-orientation', 'vertical')
layoutResizer.tabIndex = 0
const toolbar = document.createElement('div')
toolbar.className = 'stage-toolbar'
const title = document.createElement('strong')
const status = document.createElement('span')
status.className = 'host-status'
const simulation = document.createElement('div')
simulation.className = 'simulation-controls'
simulation.hidden = true
;[
  { label: '待绑定', bindingState: 'unbound' },
  { label: '有护士申请', bindingState: 'requested' },
  { label: '已绑定', bindingState: 'bound' }
].forEach(({ label, bindingState }) => {
  const button = document.createElement('button')
  button.type = 'button'
  button.textContent = label
  button.addEventListener('click', () => host.send({ type: 'prototype:simulate', pageId: 'P04', context: { bindingState } }))
  simulation.append(button)
})
const viewportShell = document.createElement('div')
viewportShell.className = 'viewport-shell'
const host = new PageHost(viewportShell, {
  onLoading: (loading) => { status.textContent = loading ? '加载中…' : '' },
  onMessage: (message) => handleMessage(message),
  onError: (message) => { status.textContent = message }
})
const requestedPageId = new URLSearchParams(window.location.search).get('page')
const initialPage = data.pages.find((page) => page.id === requestedPageId) || data.pages[0]
const state = { page: initialPage, scenarioId: '', mode: 'annotation' as 'prototype' | 'annotation', viewport: 'desktop' as Viewport, annotationsVisible: true }
let annotationWidth = 360

function setAnnotationWidth(nextWidth: number) {
  const minWidth = 280
  const minStageWidth = 360
  const maxWidth = Math.max(minWidth, window.innerWidth - 234 - 28 - minStageWidth)
  annotationWidth = Math.round(Math.min(Math.max(nextWidth, minWidth), maxWidth))
  root.style.setProperty('--annotation-panel-width', `${annotationWidth}px`)
  layoutResizer.setAttribute('aria-valuenow', String(annotationWidth))
}

function resizeFromPointer(clientX: number) {
  setAnnotationWidth(window.innerWidth - clientX - 12)
}

layoutResizer.addEventListener('pointerdown', (event) => {
  if (window.innerWidth <= 1050) return
  event.preventDefault()
  layoutResizer.setPointerCapture(event.pointerId)
  document.body.classList.add('is-resizing')
  resizeFromPointer(event.clientX)
})

layoutResizer.addEventListener('pointermove', (event) => {
  if (!layoutResizer.hasPointerCapture(event.pointerId)) return
  resizeFromPointer(event.clientX)
})

function stopResize(event: PointerEvent) {
  if (layoutResizer.hasPointerCapture(event.pointerId)) layoutResizer.releasePointerCapture(event.pointerId)
  document.body.classList.remove('is-resizing')
}

layoutResizer.addEventListener('pointerup', stopResize)
layoutResizer.addEventListener('pointercancel', stopResize)
layoutResizer.addEventListener('keydown', (event) => {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
  event.preventDefault()
  setAnnotationWidth(annotationWidth + (event.key === 'ArrowLeft' ? 24 : -24))
})

function handleMessage(message: PrototypeMessage) {
  if (message.type === 'prototype:page-ready') status.textContent = '已连接'
  if (message.type === 'prototype:state-changed') status.textContent = `状态：${message.scenarioId || '默认'}`
  if (message.type === 'prototype:navigation-request') {
    const target = data.pages.find((page) => page.id === message.pageId)
    if (target) setPage(target)
    else status.textContent = '下一页“患者服务”尚未制作'
  }
  if (message.type === 'prototype:highlight-result' && !message.success) status.textContent = message.message || '未找到定位区域'
  if (message.type === 'prototype:error') status.textContent = message.message || '页面报告错误'
}

function setViewport(value: Viewport) {
  state.viewport = value
  viewportShell.dataset.viewport = value
  viewport.set(value, setViewport)
}

function setPage(page: PrototypePage, scenarioId = '') {
  state.page = page
  state.scenarioId = scenarioId
  title.textContent = `${page.id} · ${page.title}`
  simulation.hidden = page.id !== 'P04'
  nav.render(data.pages, page.id, (next) => setPage(next))
  annotations.render(page, locateChange)
  setViewport(page.viewport === 'H5' ? 'mobile' : 'desktop')
  host.load(page, state.mode, state.scenarioId)
}

function locateChange(change: PrototypeChange) {
  const target = data.pages.find((page) => page.id === (change.pageId || state.page.id))
  if (!target) return
  if (target.id !== state.page.id) setPage(target, change.stateId || '')
  else if (change.stateId && change.stateId !== state.scenarioId) {
    state.scenarioId = change.stateId
    host.load(target, state.mode, state.scenarioId)
  }
  window.setTimeout(() => host.send({ type: 'prototype:highlight', pageId: target.id, changeId: change.id }), 250)
}

function build() {
  const header = document.createElement('header')
  header.className = 'header'
  header.innerHTML = `<div><strong>${data.project}</strong><small>${data.version}</small></div>`
  const controls = document.createElement('div')
  controls.className = 'controls'
  const mode = document.createElement('div')
  mode.className = 'segmented'
  ;(['prototype', 'annotation'] as const).forEach((value) => {
    const button = document.createElement('button')
    button.type = 'button'; button.textContent = value === 'prototype' ? '纯原型' : '设计注释'; button.dataset.mode = value
    button.addEventListener('click', () => { state.mode = value; mode.querySelectorAll('button').forEach((item) => item.setAttribute('aria-pressed', String(item.dataset.mode === value))); host.load(state.page, value, state.scenarioId) })
    mode.append(button)
  })
  const toggle = document.createElement('button'); toggle.type = 'button'; toggle.textContent = '隐藏注释'
  toggle.addEventListener('click', () => { state.annotationsVisible = !state.annotationsVisible; annotations.element.hidden = !state.annotationsVisible; toggle.textContent = state.annotationsVisible ? '隐藏注释' : '显示注释' })
  const open = document.createElement('button'); open.type = 'button'; open.textContent = '独立打开'; open.addEventListener('click', () => host.openCurrent())
  controls.append(viewport.element, mode, toggle, open)
  header.append(controls)
  toolbar.append(title, simulation, status)
  stage.append(toolbar, viewportShell)
  root.append(header, nav.element, stage, layoutResizer, annotations.element)
  setAnnotationWidth(annotationWidth)
  setPage(state.page)
  mode.querySelector('[data-mode="annotation"]')?.setAttribute('aria-pressed', 'true')
  mode.querySelector('[data-mode="prototype"]')?.setAttribute('aria-pressed', 'false')
}

build()
