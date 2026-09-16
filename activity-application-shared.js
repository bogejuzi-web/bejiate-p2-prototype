;(function () {
  var source = window.NURSE_PORTAL_SOURCE
  var statusMap = {
    draft: { label: '草稿', tone: 'muted' },
    reviewing: { label: '审核中', nurseLabel: '已提交', tone: 'info' },
    returned: { label: '退回补充', tone: 'warning' },
    approved: { label: '已通过', tone: 'success' },
    rejected: { label: '已驳回', tone: 'danger' },
    withdrawn: { label: '已撤回', tone: 'muted' }
  }

  function get(name) { return source ? source.get(name) : [] }
  function set(name, value) { if (source) source.set(name, value) }
  function now() { return '2026-09-15 ' + new Date().toTimeString().slice(0, 5) }
  function currentApplicant() { return window.ApplicantAccount ? window.ApplicantAccount.current().id : 'nurse-001' }
  function currentAdmin() { return source ? source.getCurrentAdminId() : 'admin-001' }
  function status(status, role) {
    var item = statusMap[status] || { label: status, tone: 'muted' }
    return { label: role === 'applicant' && item.nurseLabel ? item.nurseLabel : item.label, tone: item.tone }
  }
  function formById(id) { return get('activityForms').find(function (item) { return item.id === id }) }
  function appById(id) { return get('activityApplications').find(function (item) { return item.id === id }) }
  function activeForm() { return get('activityForms').find(function (item) { return item.status === 'published' }) }
  function saveApp(next) {
    var rows = get('activityApplications')
    var index = rows.findIndex(function (item) { return item.id === next.id })
    if (index >= 0) rows[index] = next
    else rows.unshift(next)
    set('activityApplications', rows)
    return next
  }
  function createNotice(app, result) {
    var approval = app.approval || {}
    var title = result === 'approved' ? '活动申请已通过' : result === 'returned' ? '活动申请已退回补充' : '活动申请已驳回'
    var notices = get('activityNotifications')
    notices.unshift({ id: 'activity-notice-' + Date.now(), applicationId: app.id, result: result, title: title, content: approval.comment || '请查看申请详情。', createdAt: approval.processedAt || now(), read: false })
    set('activityNotifications', notices)
  }
  function navigate(pageId) { parent.postMessage({ type: 'prototype:navigation-request', pageId: pageId }, '*') }
  function setSelected(id) { try { localStorage.setItem('bjt-nurse-selected-activity-id', id || '') } catch (e) {} }
  function selected() { try { return localStorage.getItem('bjt-nurse-selected-activity-id') || '' } catch (e) { return '' } }

  window.ActivityApplication = { get: get, set: set, now: now, status: status, formById: formById, appById: appById, activeForm: activeForm, saveApp: saveApp, createNotice: createNotice, currentApplicant: currentApplicant, currentAdmin: currentAdmin, navigate: navigate, setSelected: setSelected, selected: selected }
})()
