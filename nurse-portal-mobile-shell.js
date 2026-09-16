;(function () {
  var STYLE_ID = 'nurse-mobile-shell-style'
  var NAV_ITEMS = [
    { id: 'NM11', label: '活动' },
    { id: 'NM06', label: '我的' }
  ]

  var CSS = '' +
    '.m-app{display:flex;flex-direction:column;min-height:100vh;background:#f8fafc}' +
    '.m-topbar{position:sticky;top:0;z-index:5;display:flex;align-items:center;gap:8px;min-height:44px;padding:0 12px;background:#fff;border-bottom:1px solid #dddddd}' +
    '.m-topbar .m-back{border:0;background:transparent;color:#1b61c9;font-size:15px;padding:8px 4px}' +
    '.m-topbar h1{flex:1;margin:0;font-size:16px;font-weight:500;text-align:center}' +
    '.m-topbar .m-back-spacer{width:44px}' +
    '.m-content{flex:1;padding:16px;padding-bottom:76px;overflow-y:auto}' +
    '.m-bottom-nav{position:fixed;left:0;right:0;bottom:0;z-index:5;display:grid;grid-template-columns:repeat(2,1fr);background:#fff;border-top:1px solid #dddddd}' +
    '.m-bottom-nav button{display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px 0;border:0;background:transparent;color:#41454d;font-size:12px}' +
    '.m-bottom-nav button .dot{width:6px;height:6px;border-radius:9999px;background:transparent}' +
    '.m-bottom-nav button[aria-current="true"]{color:#181d26;font-weight:500}' +
    '.m-bottom-nav button[aria-current="true"] .dot{background:#181d26}'

  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return
    var style = document.createElement('style')
    style.id = STYLE_ID
    style.textContent = CSS
    document.head.appendChild(style)
  }

  function navigate(pageId) {
    window.parent.postMessage({ type: 'prototype:navigation-request', pageId: pageId }, '*')
  }

  function logout() {
    if (window.NURSE_PORTAL_SOURCE) window.NURSE_PORTAL_SOURCE.clearSession()
    navigate('NM01')
  }

  // mountShell({ title, activeTab, showBack, onBack, content: HTMLElement }) -> content 容器 (m-content)
  function mountShell(options) {
    ensureStyle()
    options = options || {}
    var appRoot = document.body
    appRoot.replaceChildren()
    var app = document.createElement('div')
    app.className = 'm-app'

    var topbar = document.createElement('header')
    topbar.className = 'm-topbar'
    if (options.showBack) {
      var back = document.createElement('button')
      back.type = 'button'
      back.className = 'm-back'
      back.textContent = '‹ 返回'
      back.addEventListener('click', function () {
        if (options.onBack) options.onBack()
      })
      topbar.appendChild(back)
    } else {
      var spacer = document.createElement('span')
      spacer.className = 'm-back-spacer'
      topbar.appendChild(spacer)
    }
    var titleEl = document.createElement('h1')
    titleEl.textContent = options.title || ''
    topbar.appendChild(titleEl)
    var trailingSpacer = document.createElement('span')
    trailingSpacer.className = 'm-back-spacer'
    topbar.appendChild(trailingSpacer)
    app.appendChild(topbar)

    var content = document.createElement('main')
    content.className = 'm-content'
    app.appendChild(content)

    if (options.activeTab) {
      var nav = document.createElement('nav')
      nav.className = 'm-bottom-nav'
      nav.setAttribute('aria-label', '申请人手机端导航')
      NAV_ITEMS.forEach(function (item) {
        var button = document.createElement('button')
        button.type = 'button'
        var isActive = item.id === options.activeTab
        button.setAttribute('aria-current', String(isActive))
        var dot = document.createElement('span')
        dot.className = 'dot'
        var label = document.createElement('span')
        label.textContent = item.label
        button.appendChild(dot)
        button.appendChild(label)
        button.addEventListener('click', function () { navigate(item.id) })
        nav.appendChild(button)
      })
      app.appendChild(nav)
    }

    appRoot.appendChild(app)
    return content
  }

  window.NursePortalMobileShell = {
    navItems: NAV_ITEMS,
    mountShell: mountShell,
    navigate: navigate,
    logout: logout
  }
})()
