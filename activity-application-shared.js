;(function () {
  var source = window.NURSE_PORTAL_SOURCE
  if (window.location.pathname.endsWith('pages/nurse-activity-applications.html')) {
    var pageStyle = document.createElement('style')
    pageStyle.textContent = '#quota,#lead{display:none!important}'
    document.head.appendChild(pageStyle)
    window.setTimeout(function () {
      var drawer = document.querySelector('#drawer')
      var title = document.querySelector('#drawer-title')
      if (drawer && title && title.textContent === '新建活动申请') drawer.classList.remove('open')
    }, 0)
  }
  if (window.location.pathname.endsWith('pages/nurse-activity-plans.html')) {
    var planDrawerStyle = document.createElement('style')
    planDrawerStyle.textContent = '#overlay{justify-content:flex-end;padding:0}#overlay .dialog{width:min(620px,100%);height:100%;max-height:none;border-radius:0;box-shadow:-8px 0 24px rgba(0,0,0,.12)}#list .row p:first-of-type{display:none}'
    document.head.appendChild(planDrawerStyle)
  }
  var statusMap = { draft: { label: '草稿', tone: 'muted' }, reviewing: { label: '审核中', nurseLabel: '已提交', tone: 'info' }, returned: { label: '退回补充', tone: 'warning' }, approved: { label: '已通过', tone: 'success' }, rejected: { label: '已驳回', tone: 'danger' }, withdrawn: { label: '已撤回', tone: 'muted' } }
  function clone(value) { return JSON.parse(JSON.stringify(value)) }
  function get(name) { return source ? source.get(name) : [] }
  function set(name, value) { if (source) source.set(name, value) }
  function now() { return '2026-09-16 ' + new Date().toTimeString().slice(0, 5) }
  function currentApplicant() { return window.ApplicantAccount ? window.ApplicantAccount.current().id : 'nurse-001' }
  function currentAdmin() { return source ? source.getCurrentAdminId() : 'admin-001' }
  function status(value, role) { var item = statusMap[value] || { label: value, tone: 'muted' }; return { label: role === 'applicant' && item.nurseLabel ? item.nurseLabel : item.label, tone: item.tone } }
  function forms() { return get('activityForms') }
  function plans() { return get('activityPlans') }
  function formById(id) { return forms().find(function (item) { return item.id === id }) }
  function planById(id) { return plans().find(function (item) { return item.id === id }) }
  function appById(id) { return get('activityApplications').find(function (item) { return item.id === id }) }
  function activeForm() { return forms().find(function (item) { return item.status === 'published' }) }
  function formSnapshot(form) { return form ? { id: form.id, name: form.name, version: form.version || 1, fields: clone(form.fields || []) } : null }
  function activeRepresentative(id) { return get('nurses').some(function (item) { return item.id === id && item.status === 'active' }) }
  function appUsesQuota(app) { return ['reviewing', 'returned', 'approved'].indexOf(app.status) >= 0 }
  function planStats(plan, nurseId) {
    var rows = get('activityApplications').filter(function (app) { return app.activityPlanId === plan.id && (!nurseId || app.nurseId === nurseId) })
    var allocation = (plan.allocations || []).find(function (item) { return item.nurseId === nurseId })
    var occupied = rows.filter(appUsesQuota).length
    var reviewing = rows.filter(function (app) { return app.status === 'reviewing' }).length
    var approved = rows.filter(function (app) { return app.status === 'approved' }).length
    var submitted = rows.filter(function (app) { return app.status !== 'draft' }).length
    var allocated = nurseId ? (allocation ? Number(allocation.quota) : 0) : (plan.allocations || []).reduce(function (sum, item) { return sum + Number(item.quota || 0) }, 0)
    var total = Number(plan.totalQuota || 0)
    return { allocated: allocated, occupied: occupied, remaining: plan.quotaMode === 'limited' ? Math.max(0, allocated - occupied) : null, reviewing: reviewing, approved: approved, submitted: submitted, totalQuota: total, unallocated: plan.quotaMode === 'limited' ? Math.max(0, total - (plan.allocations || []).reduce(function (sum, item) { return sum + Number(item.quota || 0) }, 0)) : null }
  }
  function planAvailableFor(plan, nurseId) { if (!plan || plan.status !== 'published' || !activeRepresentative(nurseId)) return false; return plan.quotaMode === 'unlimited' || planStats(plan, nurseId).allocated > 0 }
  function availablePlans(nurseId) { return plans().filter(function (plan) { return planAvailableFor(plan, nurseId) }) }
  function canSubmit(plan, nurseId) { if (!plan) return { ok: false, message: '请从活动计划进入申请。' }; if (!planAvailableFor(plan, nurseId)) return { ok: false, message: '当前活动计划不可申请。' }; if (plan.quotaMode === 'limited' && planStats(plan, nurseId).remaining <= 0) return { ok: false, message: '该活动计划的个人额度已用尽。' }; return { ok: true } }
  function saveApp(next) { var rows = get('activityApplications'); var index = rows.findIndex(function (item) { return item.id === next.id }); if (index >= 0) rows[index] = next; else rows.unshift(next); set('activityApplications', rows); return next }
  function savePlan(next) { var rows = plans(); var index = rows.findIndex(function (item) { return item.id === next.id }); if (index >= 0) rows[index] = next; else rows.unshift(next); set('activityPlans', rows); return next }
  function saveForm(next) { var rows = forms(); var index = rows.findIndex(function (item) { return item.id === next.id }); if (index >= 0) rows[index] = next; else rows.unshift(next); set('activityForms', rows); return next }
  function formReferenceCount(formId) { return plans().filter(function (plan) { return plan.formId === formId }).length }
  function createNotice(app, result) { var approval = app.approval || {}; var title = result === 'approved' ? '活动申请已通过' : result === 'returned' ? '活动申请已退回补充' : '活动申请已驳回'; var notices = get('activityNotifications'); notices.unshift({ id: 'activity-notice-' + Date.now(), applicationId: app.id, result: result, title: title, content: approval.comment || '请查看申请详情。', createdAt: approval.processedAt || now(), read: false }); set('activityNotifications', notices) }
  function navigate(pageId) { parent.postMessage({ type: 'prototype:navigation-request', pageId: pageId }, '*') }
  function local(key, value) { try { if (value === undefined) return localStorage.getItem(key) || ''; localStorage.setItem(key, value || '') } catch (e) { return '' } }
  function setSelected(id) { local('bjt-nurse-selected-activity-id', id) }
  function selected() { return local('bjt-nurse-selected-activity-id') }
  function setSelectedPlan(id) { local('bjt-activity-selected-plan-id', id) }
  function selectedPlan() { return local('bjt-activity-selected-plan-id') }
  function setEditingForm(id) { local('bjt-activity-editing-form-id', id) }
  function editingForm() { return local('bjt-activity-editing-form-id') }
  window.ActivityApplication = { get: get, set: set, now: now, status: status, forms: forms, plans: plans, formById: formById, planById: planById, appById: appById, activeForm: activeForm, formSnapshot: formSnapshot, planStats: planStats, planAvailableFor: planAvailableFor, availablePlans: availablePlans, canSubmit: canSubmit, saveApp: saveApp, savePlan: savePlan, saveForm: saveForm, formReferenceCount: formReferenceCount, createNotice: createNotice, currentApplicant: currentApplicant, currentAdmin: currentAdmin, navigate: navigate, setSelected: setSelected, selected: selected, setSelectedPlan: setSelectedPlan, selectedPlan: selectedPlan, setEditingForm: setEditingForm, editingForm: editingForm }
})()
