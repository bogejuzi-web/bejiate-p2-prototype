;(function () {
  var STYLE_ID = 'admin-shell-style'
  var NAV_ITEMS = [
    { id: 'A11', label: '活动表单' },
    { id: 'A12', label: '活动审批' }
  ]

  var CSS = '' +
    '.side{display:flex;flex-direction:column;padding:24px 14px;background:#181d26;color:#fff}' +
    '.side .brand{margin:0 10px 32px;font-size:18px;font-weight:500}' +
    '.side .brand small{display:block;margin-top:4px;color:#9297a0;font-size:12px;font-weight:400}' +
    '.side .nav-list{flex:1;display:flex;flex-direction:column;gap:2px}' +
    '.side .nav-section{margin:16px 10px 5px;color:#9297a0;font-size:11px;font-weight:500;letter-spacing:.08em}' +
    '.side .nav{display:block;width:100%;padding:12px;border:0;border-radius:6px;background:transparent;color:#c8cbd2;text-align:left;font:inherit}' +
    '.side .nav:hover{color:#fff}' +
    '.side .nav[aria-current="true"]{background:#0d1218;color:#fff;font-weight:500}' +
    '.side .user-menu{display:flex;align-items:center;gap:10px;margin-top:20px;padding-top:16px;border-top:1px solid rgba(255,255,255,.12)}' +
    '.side .user-avatar{display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:9999px;background:#f8fafc;color:#181d26;font-size:13px;font-weight:500;flex:0 0 auto}' +
    '.side .user-info{flex:1;min-width:0}' +
    '.side .user-name{display:block;font-size:13px;font-weight:500;color:#fff}' +
    '.side .logout-link{padding:0;border:0;background:transparent;color:#9297a0;font-size:12px;text-align:left}' +
    '.side .logout-link:hover{color:#fff}' +
    '@media(max-width:800px){.side{display:none}}'

  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return
    var style = document.createElement('style')
    style.id = STYLE_ID
    style.textContent = CSS
    document.head.appendChild(style)
  }

  function currentAdmin() {
    var source = window.NURSE_PORTAL_SOURCE
    if (!source) return { id: 'admin-001', name: '管理员' }
    var adminId = source.getCurrentAdminId()
    var admins = source.get('admins')
    var found = null
    for (var i = 0; i < admins.length; i += 1) {
      if (admins[i].id === adminId) { found = admins[i]; break }
    }
    return found || { id: adminId, name: '管理员' }
  }

  function navigate(pageId) {
    window.parent.postMessage({ type: 'prototype:navigation-request', pageId: pageId }, '*')
  }

  function logout() {
    if (window.NURSE_PORTAL_SOURCE) window.NURSE_PORTAL_SOURCE.clearSession()
    navigate('A01')
  }

  function mountSidebar(selector, activePageId) {
    var container = typeof selector === 'string' ? document.querySelector(selector) : selector
    if (!container) return
    ensureStyle()
    container.classList.add('side')
    container.replaceChildren()

    var brand = document.createElement('h1')
    brand.className = 'brand'
    brand.innerHTML = '活动申请<small>管理后台</small>'
    container.appendChild(brand)

    var navList = document.createElement('nav')
    navList.className = 'nav-list'
    navList.setAttribute('aria-label', '管理后台导航')
    NAV_ITEMS.forEach(function (item) {
      if (item.section) {
        var section = document.createElement('strong')
        section.className = 'nav-section'
        section.textContent = item.section
        navList.appendChild(section)
        return
      }
      var button = document.createElement('button')
      button.type = 'button'
      button.className = 'nav'
      button.textContent = item.label
      var isActive = item.id === activePageId
      button.setAttribute('aria-current', String(isActive))
      if (!isActive) button.addEventListener('click', function () { navigate(item.id) })
      navList.appendChild(button)
    })
    container.appendChild(navList)

    var admin = currentAdmin()
    var userMenu = document.createElement('div')
    userMenu.className = 'user-menu'
    var avatar = document.createElement('span')
    avatar.className = 'user-avatar'
    avatar.textContent = (admin.name || '管').slice(0, 1)
    var info = document.createElement('div')
    info.className = 'user-info'
    var name = document.createElement('span')
    name.className = 'user-name'
    name.textContent = admin.name || '管理员'
    var logoutButton = document.createElement('button')
    logoutButton.type = 'button'
    logoutButton.className = 'logout-link'
    logoutButton.textContent = '退出登录'
    logoutButton.addEventListener('click', logout)
    info.appendChild(name)
    info.appendChild(logoutButton)
    userMenu.appendChild(avatar)
    userMenu.appendChild(info)
    container.appendChild(userMenu)

    if (activePageId === 'A07') {
      window.setTimeout(function () {
        var months = document.getElementById('stage-months')
        if (!months || months.options.length >= 12) return
        months.replaceChildren()
        for (var month = 1; month <= 12; month += 1) {
          var option = document.createElement('option')
          option.value = String(month)
          option.textContent = month + ' 个月'
          if (month === 3) option.selected = true
          months.appendChild(option)
        }
        months.dispatchEvent(new Event('change'))
      }, 0)
    }
  }

  window.AdminPortalShell = {
    navItems: NAV_ITEMS,
    mountSidebar: mountSidebar,
    navigate: navigate,
    logout: logout,
    currentAdmin: currentAdmin
  }
})()
