;(function () {
  var source = window.NURSE_PORTAL_SOURCE
  var api = window.FollowupAlert
  var modal
  function esc(value) { return String(value || '').replace(/[&<>"']/g, function (char) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] }) }
  function mount() {
    if (modal) return modal
    modal = document.createElement('div')
    modal.className = 'modal immediate-followup-modal'
    modal.innerHTML = '<section class="modal-panel" style="width:min(620px,100%);max-height:calc(100vh - 40px);overflow:auto"><div id="immediate-content"></div></section>'
    document.body.append(modal)
    return modal
  }
  function open(alert, onSubmitted) {
    mount(); var content = modal.querySelector('#immediate-content')
    var patient = source.get('patients').find(function (item) { return item.id === alert.patientId })
    var templates = source.get('templates').filter(function (item) { return item.status === 'active' })
    var selectedTemplate
    function close() { modal.classList.remove('open') }
    function renderStart() {
      content.innerHTML = '<h2 style="margin:0 0 14px">随时填写随访</h2><p style="margin:0 0 24px;color:#41454d;font-size:16px">选择随访模板和患者后填写内容，本次记录不关联既有任务。</p><label class="field"><span>随访模板</span><select id="immediate-template"><option value="">请选择随访模板</option>' + templates.map(function (item) { return '<option value="' + esc(item.id) + '">' + esc(item.name) + '</option>' }).join('') + '</select></label><label class="field" style="margin-top:22px"><span>患者</span><select disabled><option>' + esc(patient ? patient.name + ' · ' + patient.phone : '未知患者') + '</option></select></label><p class="error" id="immediate-error"></p><div class="form-actions"><button type="button" class="secondary" id="immediate-cancel">取消</button><button type="button" class="primary" id="immediate-start">开始填写</button></div>'
      content.querySelector('#immediate-cancel').onclick = close
      content.querySelector('#immediate-start').onclick = function () { selectedTemplate = templates.find(function (item) { return item.id === content.querySelector('#immediate-template').value }); if (!selectedTemplate) { content.querySelector('#immediate-error').textContent = '请选择随访模板。'; return } renderForm() }
    }
    function renderForm() {
      content.innerHTML = '<h2 style="margin:0 0 8px">填写随访内容</h2><p style="margin:0 0 18px;color:#656b75">患者：' + esc(patient ? patient.name + ' · ' + patient.phone : '未知患者') + '；模板：' + esc(selectedTemplate.name) + '</p><form id="immediate-form"><div id="immediate-fields"></div><p class="error" id="immediate-error"></p><div class="form-actions"><button type="button" class="secondary" id="immediate-back">返回</button><button type="submit" class="primary">提交随访</button></div></form>'
      window.FollowupForm.renderFields(content.querySelector('#immediate-fields'), selectedTemplate.fields, { fieldClass: 'field' })
      content.querySelector('#immediate-back').onclick = renderStart
      content.querySelector('#immediate-form').onsubmit = function (event) {
        event.preventDefault(); var result = window.FollowupForm.collectValues(content.querySelector('#immediate-fields'))
        if (result.missing) { content.querySelector('#immediate-error').textContent = '请完整填写必填项。'; return }
        var records = source.get('records'), record = { id: 'record-' + Date.now(), taskId: '', planId: '', patientId: alert.patientId, nurseId: alert.nurseId, templateId: selectedTemplate.id, templateName: selectedTemplate.name, templateFields: selectedTemplate.fields, values: result.values, followupMethod: 'immediate', submittedAt: api.now(), submittedAtSort: new Date().toISOString(), createdBy: '管理员' }
        records.push(record); source.set('records', records); api.createForRecord(selectedTemplate.id, record)
        close(); if (onSubmitted) onSubmitted(record)
      }
    }
    renderStart(); modal.classList.add('open')
  }
  window.AdminImmediateFollowup = { open: open }
})()
