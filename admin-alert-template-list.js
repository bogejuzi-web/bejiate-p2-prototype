;(function () {
  var api = window.FollowupAlert, main = document.querySelector('.main')
  var requested = new URLSearchParams(location.search).get('template')
  var style = document.createElement('style'); style.textContent = '#create{display:none!important}'; document.head.append(style)
  if (requested !== null) { document.querySelector('#batch-open').click(); var picker = document.querySelector('#batch-template'); picker.value = requested; picker.dispatchEvent(new Event('change')); return }
  main.innerHTML = '<header class="top"><div><h2>预警规则</h2><p>按随访模板查看和维护预警规则。</p></div><button class="primary" id="configure">按模板批量配置</button></header><section class="toolbar"><input id="keyword" placeholder="搜索模板名称"><select id="state"><option value="">全部配置状态</option><option value="active">含启用规则</option><option value="disabled">仅停用规则</option></select></section><p id="count" style="color:#656b75"></p><section id="list" class="list"></section><div class="modal" id="confirm"><section class="modal-panel"><h2 style="margin-top:0">删除模板规则</h2><p>将清空该模板全部预警规则；已生成预警的历史快照不会删除。</p><div class="form-actions"><button class="secondary" id="cancel">取消</button><button class="primary" id="ok">确认删除</button></div></section></div>'
  var deleting = ''
  function openBatch(id) { location.href = 'admin-alert-rules.html?template=' + encodeURIComponent(id || '') }
  function render() {
    var keyword = document.querySelector('#keyword').value.trim(), state = document.querySelector('#state').value
    var groups = api.get('templates').map(function (template) { var rules = api.get('alertRules').filter(function (rule) { return rule.templateId === template.id }); return { template: template, rules: rules, active: rules.filter(function (rule) { return rule.status === 'active' }).length, updatedAt: rules.map(function (rule) { return rule.updatedAt }).sort().pop() || '' } }).filter(function (item) { return item.rules.length && (!keyword || item.template.name.includes(keyword)) && (!state || (state === 'active' ? item.active > 0 : item.active === 0)) })
    document.querySelector('#count').textContent = '共 ' + groups.length + ' 个已配置模板'
    var list = document.querySelector('#list'); list.replaceChildren()
    if (!groups.length) { list.innerHTML = '<div class="empty">暂无已配置规则的随访模板。</div>'; return }
    groups.forEach(function (item) { var row = document.createElement('article'); row.className = 'row'; row.innerHTML = '<div><h3>' + item.template.name + '</h3><p>规则总数：' + item.rules.length + ' · 已启用：' + item.active + ' · 最近更新：' + item.updatedAt + '</p></div>'; var ops = document.createElement('div'); ops.className = 'ops'; var edit = document.createElement('button'); edit.className = 'secondary'; edit.textContent = '编辑'; edit.onclick = function () { openBatch(item.template.id) }; var remove = document.createElement('button'); remove.className = 'secondary'; remove.textContent = '删除'; remove.onclick = function () { deleting = item.template.id; document.querySelector('#confirm').classList.add('open') }; ops.append(edit, remove); row.append(ops); list.append(row) })
  }
  document.querySelector('#configure').onclick = function () { openBatch('') }
  document.querySelector('#keyword').oninput = render; document.querySelector('#state').onchange = render
  document.querySelector('#cancel').onclick = function () { document.querySelector('#confirm').classList.remove('open') }
  document.querySelector('#ok').onclick = function () { api.deleteTemplateRules(deleting); document.querySelector('#confirm').classList.remove('open'); render() }
  render()
})()
