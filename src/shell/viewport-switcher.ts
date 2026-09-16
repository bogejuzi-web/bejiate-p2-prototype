export type Viewport = 'desktop' | 'tablet' | 'mobile'

export class ViewportSwitcher {
  readonly element = document.createElement('div')
  private onChange: (viewport: Viewport) => void = () => undefined

  constructor() {
    this.element.className = 'segmented'
    ;(['desktop', 'tablet', 'mobile'] as Viewport[]).forEach((viewport) => {
      const button = document.createElement('button')
      button.type = 'button'
      button.textContent = { desktop: '电脑', tablet: '平板', mobile: '手机' }[viewport]
      button.dataset.viewport = viewport
      button.addEventListener('click', () => this.onChange(viewport))
      this.element.append(button)
    })
  }

  set(value: Viewport, onChange: (viewport: Viewport) => void) {
    this.onChange = onChange
    this.element.querySelectorAll('button').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.viewport === value))
    })
  }
}
