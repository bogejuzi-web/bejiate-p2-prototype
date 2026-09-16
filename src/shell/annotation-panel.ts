import type { PrototypePage, PrototypeChange } from '../types/prototype-data'

export class AnnotationPanel {
  readonly element = document.createElement('aside')
  private onLocate: (change: PrototypeChange) => void = () => undefined

  constructor() {
    this.element.className = 'annotation-panel'
    this.element.setAttribute('aria-label', '设计说明')
  }

  render(page: PrototypePage, onLocate: (change: PrototypeChange) => void) {
    this.onLocate = onLocate
    this.element.replaceChildren()
    if (page.illustration) {
      const image = document.createElement('img')
      image.src = page.illustration
      image.alt = `${page.title}示意图`
      image.className = 'illustration'
      this.element.append(image)
    }
    this.section('功能说明', `${page.overview}\n定位：${page.pageRole}${page.scenario ? `\n场景：${page.scenario}` : ''}`)
    this.listSection('业务规则', page.businessRules || [], '本页暂无额外业务规则。')
    this.listSection('状态说明', page.states.map((state) => `${state.title}${state.description ? `：${state.description}` : ''}`), '默认状态：等待患者输入手机号和验证码。')
    if (page.flow?.steps.length) {
      const section = this.sectionElement('整体流程')
      const flow = document.createElement('div')
      flow.className = 'flow-steps'
      page.flow.steps.forEach((step, index) => {
        if (index) flow.append(this.text(' → ', 'flow-arrow'))
        flow.append(this.text(step.title, step.id === page.flow?.current ? 'flow-step current' : 'flow-step'))
      })
      section.append(flow)
      this.element.append(section)
    }
    const changes = this.sectionElement('交互说明')
    if (!page.changes.length) changes.append(this.text('本页没有新增或修改项。', 'muted'))
    page.changes.forEach((change) => {
      const card = document.createElement('button')
      card.type = 'button'
      card.className = 'change-card'
      const id = document.createElement('strong')
      id.textContent = change.id
      const action = document.createElement('span')
      action.textContent = `${change.location} · ${change.action}`
      const result = document.createElement('span')
      result.textContent = change.result
      card.append(id, action, result)
      card.addEventListener('click', () => this.onLocate(change))
      changes.append(card)
    })
    this.element.append(changes)
  }

  private section(title: string, body: string) {
    const section = this.sectionElement(title)
    section.append(this.text(body, 'panel-copy'))
    this.element.append(section)
  }

  private sectionElement(title: string) {
    const section = document.createElement('section')
    const heading = document.createElement('h2')
    heading.textContent = title
    section.append(heading)
    return section
  }

  private listSection(title: string, entries: string[], emptyText: string) {
    const section = this.sectionElement(title)
    if (!entries.length) {
      section.append(this.text(emptyText, 'muted'))
    } else {
      const list = document.createElement('ul')
      list.className = 'panel-list'
      entries.forEach((entry) => {
        const item = document.createElement('li')
        item.textContent = entry
        list.append(item)
      })
      section.append(list)
    }
    this.element.append(section)
  }

  private text(value: string, className: string) {
    const node = document.createElement('span')
    node.className = className
    node.textContent = value
    return node
  }
}
