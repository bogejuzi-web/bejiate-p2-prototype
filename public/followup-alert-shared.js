;(function () {
  var source = window.NURSE_PORTAL_SOURCE
  var LEVEL_WEIGHT = { low: 1, medium: 2, high: 3 }

  function get(name) { return source ? source.get(name) : [] }
  function set(name, value) { if (source) source.set(name, value) }
  function now() { return '2026-09-15 ' + new Date().toTimeString().slice(0, 5) }
  function byId(rows, id) { return rows.find(function (row) { return row.id === id }) }
  function activeRules(templateId) { return get('alertRules').filter(function (rule) { return rule.templateId === templateId && rule.status === 'active' }) }
  function fieldFor(templateId, fieldId) {
    var template = byId(get('templates'), templateId)
    return template && byId(template.fields || [], fieldId)
  }
  function validateRule(rule) {
    if (!rule || !rule.name || !rule.templateId || !rule.fieldId || !rule.level) return '请完整填写规则名称、模板、字段和预警等级。'
    var field = fieldFor(rule.templateId, rule.fieldId)
    if (!field) return '所选字段已不存在，无法保存或启用规则。'
    if (field.type === 'number' || field.type === 'percentage') {
      if (!['gt', 'lt', 'equals', 'inside', 'outside'].includes(rule.operator)) return '数字和百分数字段仅支持大于、小于、等于、区间内或区间外条件。'
      if (rule.operator === 'inside' || rule.operator === 'outside') {
        if (!Number.isFinite(Number(rule.lowerBound)) || !Number.isFinite(Number(rule.upperBound)) || Number(rule.lowerBound) >= Number(rule.upperBound)) return '请填写有效的区间下限和上限。'
      } else if (!Number.isFinite(Number(rule.threshold))) return '请填写有效的数值阈值。'
    } else if (field.type === 'single-choice') {
      if (rule.operator !== 'equals' || !rule.expectedValue || !(field.options || []).includes(rule.expectedValue)) return '选项字段仅支持等于模板中的指定选项。'
    } else if (field.type === 'multi-choice') {
      var triggerValues = Array.isArray(rule.triggerValues) ? rule.triggerValues : []
      if (!['includes-any', 'includes-all'].includes(rule.operator) || !triggerValues.length || triggerValues.some(function (value) { return !(field.options || []).includes(value) })) return '多选字段请选择模板中的一个或多个触发项，并选择任一项或组合项条件。'
      if (rule.operator === 'includes-all' && triggerValues.length < 2) return '组合项条件至少需要选择两个选项。'
    } else return '仅数字、百分数、单选和多选字段可用于预警规则。'
    return ''
  }
  function saveRule(rule) {
    var error = validateRule(rule)
    if (error) return { error: error }
    var field = fieldFor(rule.templateId, rule.fieldId)
    var rows = get('alertRules')
    var next = Object.assign({}, rule, { fieldLabel: field.label, fieldType: field.type, updatedAt: now() })
    var index = rows.findIndex(function (row) { return row.id === next.id })
    if (index >= 0) rows[index] = next
    else rows.unshift(next)
    set('alertRules', rows)
    return { value: next }
  }
  function toggleRule(id) {
    var rows = get('alertRules'), rule = byId(rows, id)
    if (!rule) return { error: '未找到该预警规则。' }
    if (rule.status !== 'active') {
      var error = validateRule(rule)
      if (error) return { error: error }
    }
    rule.status = rule.status === 'active' ? 'disabled' : 'active'
    rule.updatedAt = now()
    set('alertRules', rows)
    return { value: rule }
  }
  function deleteRule(id) {
    var rows = get('alertRules')
    if (!byId(rows, id)) return { error: '未找到该预警规则。' }
    set('alertRules', rows.filter(function (rule) { return rule.id !== id }))
    return { value: id }
  }
  function deleteTemplateRules(templateId) {
    var rows = get('alertRules'), removed = rows.filter(function (rule) { return rule.templateId === templateId })
    if (!removed.length) return { error: '该模板没有可删除的预警规则。' }
    set('alertRules', rows.filter(function (rule) { return rule.templateId !== templateId }))
    return { value: removed.length }
  }
  function saveTemplateRules(templateId, configs) {
    var template = byId(get('templates'), templateId)
    if (!template) return { error: '请选择有效的随访模板。' }
    var next = []
    for (var i = 0; i < configs.length; i += 1) {
      var config = configs[i]
      var field = byId(template.fields || [], config.fieldId)
      if (!field || !['number', 'percentage', 'single-choice', 'multi-choice'].includes(field.type)) continue
      var isNumeric = field.type === 'number' || field.type === 'percentage'
      var hasCondition = isNumeric
        ? (['inside', 'outside'].includes(config.operator) ? config.lowerBound !== '' || config.upperBound !== '' : config.threshold !== '')
        : field.type === 'multi-choice' ? Array.isArray(config.triggerValues) && config.triggerValues.length > 0 : !!config.expectedValue
      if (!config.enabled && !hasCondition) continue
      var rule = { id: config.id || 'alert-rule-' + Date.now() + '-' + i, name: config.name || (field.label + '预警'), templateId: templateId, fieldId: field.id, fieldLabel: field.label, fieldType: field.type, operator: config.operator, threshold: config.threshold, lowerBound: config.lowerBound, upperBound: config.upperBound, expectedValue: config.expectedValue, triggerValues: config.triggerValues || [], level: config.level || 'low', status: config.enabled ? 'active' : 'disabled', updatedAt: now() }
      if (rule.status === 'active') {
        var error = validateRule(rule)
        if (error) return { error: field.label + '：' + error }
      }
      next.push(rule)
    }
    var rows = get('alertRules').filter(function (rule) { return rule.templateId !== templateId }).concat(next)
    set('alertRules', rows)
    return { value: next }
  }
  function matches(rule, value) {
    if (rule.fieldType === 'number' || rule.fieldType === 'percentage') {
      var number = Number(value)
      if (!Number.isFinite(number)) return false
      if (rule.operator === 'gt') return number > Number(rule.threshold)
      if (rule.operator === 'lt') return number < Number(rule.threshold)
      if (rule.operator === 'equals') return number === Number(rule.threshold)
      if (rule.operator === 'inside') return number >= Number(rule.lowerBound) && number <= Number(rule.upperBound)
      return number < Number(rule.lowerBound) || number > Number(rule.upperBound)
    }
    if (rule.fieldType === 'multi-choice') {
      var selected = Array.isArray(value) ? value : String(value || '').split('、').filter(Boolean)
      var expected = Array.isArray(rule.triggerValues) ? rule.triggerValues : []
      return rule.operator === 'includes-all' ? expected.every(function (item) { return selected.includes(item) }) : expected.some(function (item) { return selected.includes(item) })
    }
    return rule.operator === 'equals' && value === rule.expectedValue
  }
  function createForRecord(templateId, record) {
    var hits = activeRules(templateId).filter(function (rule) { return matches(rule, record.values[rule.fieldId]) }).map(function (rule) {
      return { ruleId: rule.id, ruleName: rule.name, fieldId: rule.fieldId, fieldLabel: rule.fieldLabel, operator: rule.operator, value: Array.isArray(record.values[rule.fieldId]) ? record.values[rule.fieldId].join('、') : String(record.values[rule.fieldId]), level: rule.level, threshold: rule.threshold, lowerBound: rule.lowerBound, upperBound: rule.upperBound, expectedValue: rule.expectedValue, triggerValues: rule.triggerValues || [] }
    })
    if (!hits.length) return null
    var level = hits.reduce(function (highest, hit) { return LEVEL_WEIGHT[hit.level] > LEVEL_WEIGHT[highest] ? hit.level : highest }, 'low')
    var rows = get('followupAlerts')
    var next = { id: 'followup-alert-' + Date.now(), recordId: record.id, patientId: record.patientId, nurseId: record.nurseId, level: level, status: 'pending', createdAt: record.submittedAt || now(), hits: hits }
    rows.unshift(next)
    set('followupAlerts', rows)
    return next
  }
  function updateAlert(id, status, operatorName, closeNote) {
    var rows = get('followupAlerts'), alert = byId(rows, id)
    if (!alert) return { error: '未找到该预警。' }
    if (status === 'in-progress' && alert.status !== 'pending') return { error: '仅待处理预警可开始跟进。' }
    if (status === 'closed' && !String(closeNote || '').trim()) return { error: '关闭预警必须填写处理说明。' }
    if (!['in-progress', 'closed'].includes(status)) return { error: '不支持的预警状态。' }
    var handledAt = now()
    alert.status = status
    alert.lastHandledBy = operatorName || '管理员'
    alert.lastHandledAt = handledAt
    if (status === 'closed') { alert.closeNote = String(closeNote).trim(); alert.closedBy = alert.lastHandledBy; alert.closedAt = handledAt }
    set('followupAlerts', rows)
    return { value: alert }
  }
  function nurseAlerts(nurseId) { return get('followupAlerts').filter(function (alert) { return alert.nurseId === nurseId }) }
  function openCount(nurseId) { return nurseAlerts(nurseId).filter(function (alert) { return alert.status !== 'closed' }).length }
  function statusMeta(status) { return ({ pending: { label: '待处理', tone: 'warning' }, 'in-progress': { label: '跟进中', tone: 'info' }, closed: { label: '已关闭', tone: 'success' } })[status] || { label: status, tone: 'muted' } }
  function levelMeta(level) { return ({ high: { label: '高', tone: 'danger' }, medium: { label: '中', tone: 'warning' }, low: { label: '低', tone: 'info' } })[level] || { label: level, tone: 'muted' } }
  function describeCondition(hit) {
    if (hit.operator === 'gt') return '大于 ' + hit.threshold
    if (hit.operator === 'lt') return '小于 ' + hit.threshold
    if (hit.operator === 'equals') return hit.expectedValue ? '等于「' + hit.expectedValue + '」' : '等于 ' + hit.threshold
    if (hit.operator === 'inside') return '区间内 ' + hit.lowerBound + '–' + hit.upperBound
    if (hit.operator === 'outside') return '区间外 ' + hit.lowerBound + '–' + hit.upperBound
    if (hit.operator === 'includes-any') return '命中任一项：' + (hit.triggerValues || []).join('、')
    if (hit.operator === 'includes-all') return '组合包含：' + (hit.triggerValues || []).join('、')
    return '—'
  }

  window.FollowupAlert = { get: get, set: set, now: now, activeRules: activeRules, validateRule: validateRule, saveRule: saveRule, toggleRule: toggleRule, deleteRule: deleteRule, deleteTemplateRules: deleteTemplateRules, saveTemplateRules: saveTemplateRules, createForRecord: createForRecord, updateAlert: updateAlert, nurseAlerts: nurseAlerts, openCount: openCount, statusMeta: statusMeta, levelMeta: levelMeta, describeCondition: describeCondition, fieldFor: fieldFor }
})()
