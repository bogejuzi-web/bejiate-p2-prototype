;(function () {
  var source = window.NURSE_PORTAL_SOURCE
  var METHOD_LABELS = { phone: '电话随访', offline: '线下随访', immediate: '随时随访' }
  var NUMERIC_TYPES = ['number', 'percentage']

  function escape(value) { return String(value == null ? '' : value).replace(/[&<>'"]/g, function (char) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char] }) }
  function sortTime(record) { return record.submittedAtSort || (/^\d{4}-\d{2}-\d{2}/.test(record.submittedAt || '') ? record.submittedAt.replace(' ', 'T') : '') }
  function isInRange(record, filters) {
    var stamp = sortTime(record).slice(0, 10)
    return (!filters || !filters.start || stamp >= filters.start) && (!filters || !filters.end || stamp <= filters.end) && (!filters || !filters.templateId || templateId(record) === filters.templateId) && (!filters || !filters.nurseId || record.nurseId === filters.nurseId)
  }
  function planFor(record) { return source.get('plans').find(function (plan) { return plan.id === record.planId }) }
  function templateId(record) { var plan = planFor(record); return record.templateId || (plan && plan.templateId) || '' }
  function fieldsFor(record) {
    if (record.templateFields && record.templateFields.length) return record.templateFields
    var plan = planFor(record)
    if (plan && plan.templateVersionSnapshot && plan.templateVersionSnapshot.fields) return plan.templateVersionSnapshot.fields
    var template = source.get('templates').find(function (item) { return item.id === templateId(record) })
    return template ? template.fields || [] : []
  }
  function number(value) { var n = parseFloat(String(value).replace('%', '')); return isFinite(n) ? n : null }
  function method(record) { return METHOD_LABELS[record.followupMethod] || '未记录' }
  function records(filters) { return source.get('records').filter(function (record) { return isInRange(record, filters) }).slice().sort(function (a, b) { return sortTime(a).localeCompare(sortTime(b)) }) }
  function alertMap() { var result = {}; source.get('followupAlerts').forEach(function (alert) { result[alert.recordId] = alert }); return result }
  function analyze(patientId, filters) {
    var rows = records(filters).filter(function (record) { return record.patientId === patientId })
    var alerts = alertMap(), groups = {}, timeline = []
    rows.forEach(function (record) {
      var fields = fieldsFor(record), template = source.get('templates').find(function (item) { return item.id === templateId(record) })
      var values = Object.keys(record.values || {}).map(function (id) {
        var snapshotField = fields.find(function (item) { return item.id === id }) || { id: id, label: id, type: 'text' }
        var currentTemplate = source.get('templates').find(function (item) { return item.id === templateId(record) })
        var configuredField = currentTemplate && (currentTemplate.fields || []).find(function (item) { return item.id === id })
        var field = Object.assign({}, configuredField || {}, snapshotField)
        var value = record.values[id]
        if (NUMERIC_TYPES.indexOf(field.type) >= 0) {
          var numeric = number(value)
          if (numeric !== null) {
            var key = field.analysisId && field.unit ? field.analysisId + '|' + field.unit : templateId(record) + '|' + field.id
            if (!groups[key]) groups[key] = { key: key, label: field.label, unit: field.unit || (field.type === 'percentage' ? '%' : ''), points: [], fieldType: field.type }
            groups[key].points.push({ value: numeric, date: sortTime(record).slice(0, 10), submittedAt: record.submittedAt, recordId: record.id, alert: alerts[record.id] })
          }
        }
        return { label: field.label, value: value, type: field.type }
      })
      timeline.push({ id: record.id, submittedAt: record.submittedAt, method: method(record), templateName: record.templateName || (template && template.name) || '历史模板', values: values, alert: alerts[record.id] })
    })
    var indicators = Object.keys(groups).map(function (key) {
      var item = groups[key]; item.points.sort(function (a, b) { return a.date.localeCompare(b.date) }); item.latest = item.points[item.points.length - 1]; item.min = Math.min.apply(Math, item.points.map(function (point) { return point.value })); item.max = Math.max.apply(Math, item.points.map(function (point) { return point.value })); return item
    })
    return { records: rows, overview: { total: rows.length, phone: rows.filter(function (row) { return row.followupMethod === 'phone' }).length, offline: rows.filter(function (row) { return row.followupMethod === 'offline' }).length, immediate: rows.filter(function (row) { return row.followupMethod === 'immediate' }).length, unknown: rows.filter(function (row) { return !METHOD_LABELS[row.followupMethod] }).length, latest: rows.length ? rows[rows.length - 1].submittedAt : '' }, indicators: indicators, timeline: timeline.reverse() }
  }
  function chart(indicator) {
    if (!indicator || indicator.points.length < 2) return '<div class="analysis-empty">该指标当前只有一条有效记录，暂无法形成趋势。</div>'
    var points = indicator.points, min = indicator.min, max = indicator.max, range = max - min || 1
    var svg = points.map(function (point, index) { var x = 20 + index * (260 / (points.length - 1)); var y = 106 - ((point.value - min) / range) * 72; return { x: x, y: y, point: point } })
    return '<div class="trend-card"><div class="trend-stats"><span>最近值 <b>' + escape(indicator.latest.value + indicator.unit) + '</b></span><span>最小 <b>' + escape(min + indicator.unit) + '</b></span><span>最大 <b>' + escape(max + indicator.unit) + '</b></span></div><svg viewBox="0 0 300 132" role="img" aria-label="' + escape(indicator.label) + '趋势"><path d="M20 108H280" stroke="#d9dde3"/><polyline fill="none" stroke="#0f766e" stroke-width="3" points="' + svg.map(function (item) { return item.x + ',' + item.y }).join(' ') + '"/>' + svg.map(function (item) { return '<circle cx="' + item.x + '" cy="' + item.y + '" r="5" fill="' + (item.point.alert ? '#d46b08' : '#0f766e') + '"><title>' + escape(item.point.submittedAt + '：' + item.point.value + indicator.unit + (item.point.alert ? '（关联预警）' : '')) + '</title></circle>' }).join('') + '</svg><div class="trend-dates"><span>' + escape(points[0].date) + '</span><span>' + escape(points[points.length - 1].date) + '</span></div></div>'
  }
  function overview(summary) { return '<div class="analysis-summary"><div><span>随访总次数</span><b>' + summary.total + '</b></div><div><span>电话随访</span><b>' + summary.phone + '</b></div><div><span>线下随访</span><b>' + summary.offline + '</b></div><div><span>随时随访</span><b>' + summary.immediate + '</b></div><div><span>最近随访</span><b>' + escape(summary.latest || '暂无') + '</b></div></div>' }
  function timeline(rows) { return rows.length ? '<div class="analysis-timeline">' + rows.map(function (row) { return '<article><header><strong>' + escape(row.submittedAt) + '</strong><span>' + escape(row.method) + ' · ' + escape(row.templateName) + (row.alert ? ' · <i>关联预警</i>' : '') + '</span></header><p>' + row.values.map(function (value) { return '<b>' + escape(value.label) + '：</b>' + escape(Array.isArray(value.value) ? value.value.join('、') : value.value) }).join('　') + '</p></article>' }).join('') + '</div>' : '<div class="analysis-empty">当前筛选范围内暂无随访记录。</div>' }
  function createRecord(data) { return Object.assign({ submittedAtSort: new Date().toISOString(), followupMethod: 'phone', templateId: '' }, data) }
  window.FollowupAnalysis = { analyze: analyze, records: records, fieldsFor: fieldsFor, templateId: templateId, method: method, chart: chart, overview: overview, timeline: timeline, createRecord: createRecord, escape: escape }
})()
