;(function () {
  var pages = [{
    id: 'I01', title: '需求确认', type: 'html', protocol: 'prototype-v1', url: 'pages/project-requirements.html', viewport: 'PC',
    requirements: ['需求确认'], requirementSources: ['来源：docs/需求确认.md'],
    overview: '原型内嵌的项目需求确认文档，集中说明项目目标、关键流程、功能范围与分期计划。', pageRole: '项目说明与评审基线。',
    businessRules: ['本页用于阅读项目说明，不参与业务数据或状态变更。'], states: [{ id: 'I01-S01', title: '需求确认文档', description: '展示当前项目的确认版本。' }], changes: []
  }, {
    id: 'I02', title: '健康档案流程图', type: 'html', protocol: 'prototype-v1', url: 'pages/health-record-flow.html', viewport: 'PC',
    requirements: ['P1 · 健康档案查看', 'P1 · 健康档案更新'], requirementSources: ['来源：docs/流程图/完整业务流程图集.html'],
    overview: '直接嵌入健康档案编辑与追溯流程图，说明患者、申请人、随访和修改历史之间的流转。', pageRole: '项目流程说明。',
    businessRules: ['本页仅展示原始流程图，不参与业务数据或状态变更。'], states: [{ id: 'I02-S01', title: '健康档案编辑与追溯', description: '展示当前流程图内容。' }], changes: []
  }]
  if (window.PROTOTYPE_DATA && window.PROTOTYPE_DATA.pages) window.PROTOTYPE_DATA.pages = pages.concat(window.PROTOTYPE_DATA.pages)
  else { window.PROTOTYPE_DATA = window.PROTOTYPE_DATA || {}; window.PROTOTYPE_DATA.pages = pages }
})()
