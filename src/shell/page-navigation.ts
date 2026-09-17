import type { PrototypePage } from '../types/prototype-data'

export class PageNavigation {
  readonly element = document.createElement('nav')
  private onSelect: (page: PrototypePage) => void = () => undefined

  constructor() {
    this.element.className = 'page-navigation'
    this.element.setAttribute('aria-label', '原型页面')
  }

  render(pages: PrototypePage[], currentId: string, onSelect: (page: PrototypePage) => void) {
    this.onSelect = onSelect
    this.element.replaceChildren()
    const visible = pages.filter((page) => !page.hiddenInNavigation)
    const renderGroups = (items: Array<{ title: string, pages: PrototypePage[] }>) => items.forEach((group) => {
      if (!group.pages.length) return
      const title = document.createElement('strong')
      title.className = 'page-group-title'
      title.textContent = group.title
      this.element.append(title)
      group.pages.forEach((page) => {
        const button = document.createElement('button')
        button.className = 'page-link'
        button.type = 'button'
        button.textContent = `${page.id} · ${page.title}`
        button.setAttribute('aria-current', page.id === currentId ? 'page' : 'false')
        button.addEventListener('click', () => this.onSelect(page))
        this.element.append(button)
      })
    })

    const frontendOrder = ['N01', 'NM01', 'N12', 'N10', 'NM13', 'NM11']
    const backendOrder = ['A01', 'A10', 'A11', 'A13', 'A12']
    const orderPages = (ids: string[]) => ids.map((id) => visible.find((page) => page.id === id)).filter((page): page is PrototypePage => Boolean(page))
    renderGroups([
      { title: '前端', pages: orderPages(frontendOrder) },
      { title: '后台', pages: orderPages(backendOrder) }
    ])
  }
}
