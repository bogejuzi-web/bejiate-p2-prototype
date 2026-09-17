;(function () {
  var STYLE_ID = 'nurse-shell-style'
  var NAV_ITEMS = [{ id: 'N12', label: '活动计划' }, { id: 'N10', label: '活动申请' }]

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

  function currentApplicant() {
    if (window.ApplicantAccount) return window.ApplicantAccount.current()
    var source = window.NURSE_PORTAL_SOURCE
    if (!source) return { id: 'nurse-001', name: '刘敏' }
    var nurseId = source.getCurrentNurseId()
    var nurses = source.get('nurses')
    var found = null
    for (var i = 0; i < nurses.length; i += 1) {
      if (nurses[i].id === nurseId) { found = nurses[i]; break }
    }
    return found || { id: nurseId, name: '刘敏' }
  }

  function navigate(pageId) {
    window.parent.postMessage({ type: 'prototype:navigation-request', pageId: pageId }, '*')
  }

  function logout() {
    if (window.NURSE_PORTAL_SOURCE) window.NURSE_PORTAL_SOURCE.clearSession()
    navigate('N01')
  }

  function mountSidebar(selector, activePageId) {
    var container = typeof selector === 'string' ? document.querySelector(selector) : selector
    if (!container) return
    ensureStyle()
    container.classList.add('side')
    container.replaceChildren()

    var brand = document.createElement('h1')
    brand.className = 'brand'
    brand.innerHTML = '活动申请<small>申请人端</small>'
    container.appendChild(brand)

    var navList = document.createElement('nav')
    navList.className = 'nav-list'
    navList.setAttribute('aria-label', '申请人端导航')
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

    var nurse = currentApplicant()
    var userMenu = document.createElement('div')
    userMenu.className = 'user-menu'
    var avatar = document.createElement('span')
    avatar.className = 'user-avatar'
    avatar.textContent = (nurse.name || '申').slice(0, 1)
    var info = document.createElement('div')
    info.className = 'user-info'
    var name = document.createElement('span')
    name.className = 'user-name'
    name.textContent = nurse.name || '申请人'
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
  }

  window.NursePortalShell = {
    navItems: NAV_ITEMS,
    mountSidebar: mountSidebar,
    navigate: navigate,
    logout: logout,
    currentApplicant: currentApplicant
  }
})()
