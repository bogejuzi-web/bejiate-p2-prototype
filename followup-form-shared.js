;(function () {
  var style = document.createElement('style')
  style.textContent = '.followup-options{display:flex;flex-wrap:wrap;gap:8px;padding:10px;border:1px solid #dddddd;border-radius:6px;background:#fff}.followup-option{display:flex!important;align-items:center;gap:5px;margin:0;font-size:14px;color:#262b33}.followup-option input{width:auto!important;height:auto!important;margin:0}.followup-percent{display:block;margin-top:5px;color:#656b75;font-size:12px}'
  document.head.append(style)
  function renderFields(container, fields, options) {
    options = options || {}
    container.replaceChildren()
    ;(fields || []).forEach(function (field) {
      var label = document.createElement('label')
      label.className = options.fieldClass || 'field'
      label.dataset.followupField = field.id
      label.dataset.fieldType = field.type
      label.dataset.required = String(!!field.required)
      var title = document.createElement('span')
      title.textContent = field.label + (field.required ? '（必填）' : '')
      label.append(title)
      if (field.type === 'multi-choice') {
        var choices = document.createElement('div')
        choices.className = 'followup-options'
        ;(field.options || []).forEach(function (option) {
          var choice = document.createElement('label')
          choice.className = 'followup-option'
          var input = document.createElement('input')
          input.type = 'checkbox'; input.value = option; input.disabled = !!options.readOnly
          if (String(options.values && options.values[field.id] || '').split('、').includes(option)) input.checked = true
          choice.append(input, document.createTextNode(option)); choices.append(choice)
        })
        label.append(choices)
      } else {
        var input
        if (field.type === 'textarea') input = document.createElement('textarea')
        else if (field.type === 'single-choice') {
          input = document.createElement('select')
          input.append(new Option('请选择', ''))
          ;(field.options || []).forEach(function (option) { input.append(new Option(option, option)) })
        } else { input = document.createElement('input'); input.type = ['number', 'percentage'].includes(field.type) ? 'number' : 'text'; if (field.type === 'percentage') { input.min = '0'; input.max = '100'; input.step = '0.1' } }
        input.dataset.followupInput = 'true'; input.value = options.values && options.values[field.id] || ''; input.disabled = !!options.readOnly
        label.append(input)
        if (field.type === 'percentage') { var suffix = document.createElement('small'); suffix.className = 'followup-percent'; suffix.textContent = '输入 0–100 的数值，单位：%'; label.append(suffix) }
      }
      container.append(label)
    })
  }
  function collectValues(container) {
    var values = {}, missing = false
    container.querySelectorAll('[data-followup-field]').forEach(function (field) {
      var value
      if (field.dataset.fieldType === 'multi-choice') value = Array.from(field.querySelectorAll('input:checked')).map(function (input) { return input.value }).join('、')
      else { var input = field.querySelector('[data-followup-input]'); value = input ? input.value.trim() : '' }
      if (field.dataset.required === 'true' && !value) missing = true
      values[field.dataset.followupField] = value
    })
    return { values: values, missing: missing }
  }
  window.FollowupForm = { renderFields: renderFields, collectValues: collectValues }
})()
