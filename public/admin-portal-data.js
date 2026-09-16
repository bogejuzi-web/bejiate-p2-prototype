;(function () {
  var pages = [
    {
      id: 'A01', title: '管理后台登录', type: 'html', protocol: 'prototype-v1', url: '/pages/admin-login.html', viewport: 'PC',
      requirements: ['P1 · 管理后台'],
      requirementSources: ['来源：docs/需求确认.md · 功能列表'],
      illustration: '/illustrations/a01-admin-login.png',
      overview: '管理员使用后台分配的账户登录，不提供自助注册。', pageRole: '管理后台登录入口。',
      businessRules: ['管理员账户由平台分配。', '不提供自助注册。'],
      states: [{ id: 'A01-S01', title: '登录成功', description: '账号和密码正确。' }, { id: 'A01-S02', title: '登录失败', description: '账号或密码错误。' }],
      changes: [{ id: 'A01-C01', location: '登录表单', action: '输入账号密码并登录', result: '登录成功跳转申请人账号页，失败原地提示错误。' }]
    },
    {
      id: 'A02', title: '申请人账号', type: 'html', protocol: 'prototype-v1', url: '/pages/admin-nurses.html', viewport: 'PC',
      requirements: ['P1 · 申请人账户分配'],
      requirementSources: ['来源：docs/需求确认.md · 功能列表', '来源：docs/关键流程与状态节点.md · 7 后台管理边界'],
      illustration: '/illustrations/a02-nurse-accounts.png',
      overview: '管理员查看、搜索申请人账号，创建新账号并对账号启用/停用。', pageRole: '管理后台默认首页。',
      businessRules: ['申请人账户由后台创建与分配。', '已绑定患者的申请人账号不能删除，只能停用。'],
      states: [{ id: 'A02-S01', title: '账号列表', description: '展示申请人账号与状态。' }, { id: 'A02-S02', title: '停用', description: '账号被停用，申请人与患者数据保留。' }],
      changes: [{ id: 'A02-C01', location: '申请人账号列表', action: '搜索、查看、新建或启停账号', result: '展示并更新申请人账号状态。' }]
    },
    {
      id: 'A03', title: '角色管理', type: 'html', protocol: 'prototype-v1', url: '/pages/admin-permissions.html', viewport: 'PC',
      requirements: ['P1 · 权限管理'],
      requirementSources: ['来源：docs/需求确认.md · 功能列表', '来源：docs/关键流程与状态节点.md · 7.1 后台管理边界'],
      illustration: '/illustrations/a03-roles.png',
      overview: '管理员维护角色、启停角色并配置菜单权限，本期不配置数据范围权限。', pageRole: '角色管理页。',
      businessRules: ['本期仅配置功能权限，不含数据范围权限。', '系统内置核心权限不可修改。'],
      states: [{ id: 'A03-S01', title: '角色权限', description: '展示选中角色的功能权限开关。' }],
      changes: [{ id: 'A03-C01', location: '角色列表与编辑表单', action: '新增、编辑、启停或删除角色', result: '更新角色及其菜单权限配置。' }]
    },
    {
      id: 'A10', title: '员工管理', type: 'html', protocol: 'prototype-v1', url: '/pages/admin-staff.html', viewport: 'PC',
      requirements: ['P1 · 权限管理'], requirementSources: ['来源：docs/需求确认.md · 功能列表'],
      illustration: '/illustrations/a10-staff.png',
      overview: '管理员维护后台员工账号并分配角色。', pageRole: '员工管理页。',
      businessRules: ['员工账号可分配一个角色；停用后不可登录；删除后从员工列表移除。'],
      states: [{ id: 'A10-S01', title: '启用' }, { id: 'A10-S02', title: '停用' }],
      changes: [{ id: 'A10-C01', location: '员工列表与编辑表单', action: '新增、编辑、启停或删除员工', result: '更新员工账号及其角色分配。' }]
    },
    {
      id: 'A04', title: '知情同意', type: 'html', protocol: 'prototype-v1', url: '/pages/admin-consent.html', viewport: 'PC',
      requirements: ['P1 · 知情同意维护'],
      requirementSources: ['来源：docs/需求确认.md · 功能列表', '来源：docs/关键流程与状态节点.md · 3.1 患者注册与知情同意', '来源：docs/流程图/知情同意版本与重签完整图.html'],
      illustration: '/illustrations/a04-consent.png',
      overview: '管理员维护知情同意内容、发布新版本并选择重签策略。', pageRole: '知情同意模板维护页。',
      businessRules: ['更新模板时可选择要求历史患者补签或仅新患者签署新协议。', '补签期间不暂停患者端服务与申请人随访。'],
      states: [{ id: 'A04-S01', title: '当前生效版本', description: '展示生效模板与内容。' }, { id: 'A04-S02', title: '历史版本', description: '只读查看历史版本内容。' }],
      changes: [{ id: 'A04-C01', location: '知情同意版本', action: '编辑内容、发布新版本并选择重签策略', result: '新版本设为生效，旧版本归档，记录重签策略。' }]
    },
    {
      id: 'A05', title: '患者管理', type: 'html', protocol: 'prototype-v1', url: '/pages/admin-patients.html', viewport: 'PC',
      requirements: ['P1 · 患者端数据同步管理'],
      requirementSources: ['来源：docs/需求确认.md · 功能列表', '来源：docs/关键流程与状态节点.md · 7.2 后台管理边界'],
      illustration: '/illustrations/a05-patients.png',
      overview: '管理员统一查看全量患者的健康档案与知情同意。', pageRole: '患者管理页。',
      businessRules: ['管理人员可查看全量患者健康档案与随访内容。', '数据同步指平台内统一查看，不与外部系统同步。'],
      states: [{ id: 'A05-S01', title: '患者列表', description: '展示全量患者与状态。' }, { id: 'A05-S02', title: '患者详情', description: '只读查看知情同意、健康档案与随访。' }],
      changes: [{ id: 'A05-C01', location: '患者管理列表', action: '搜索、筛选或查看患者详情', result: '只读展示患者健康档案与知情同意。' }]
    },
    {
      id: 'AD01', title: '患者详情', type: 'html', protocol: 'prototype-v1', url: '/pages/admin-patient-detail.html', viewport: 'PC', hiddenInNavigation: true,
      requirements: ['P1 · 患者端数据同步管理'],
      requirementSources: ['来源：docs/关键流程与状态节点.md · 7.2 后台管理边界'],
      overview: '管理员以独立页面查看患者完整健康档案、知情同意和随访计划入口。', pageRole: '后台患者详情页。',
      businessRules: ['后台仅查看患者数据，不编辑健康档案。'],
      states: [{ id: 'AD01-S01', title: '患者详情', description: '展示健康档案与协议签署详情。' }],
      changes: [{ id: 'AD01-C01', location: '患者详情', action: '查看健康档案、协议或进入随访计划', result: '展示对应患者的统一数据。' }]
    },
    {
      id: 'A06', title: '随访管理', type: 'html', protocol: 'prototype-v1', url: '/pages/admin-followups.html', viewport: 'PC',
      requirements: ['P1 · 随访计划与评分管理'],
      requirementSources: ['来源：docs/需求确认.md · 功能列表', '来源：docs/关键流程与状态节点.md · 5.2 随访计划'],
      illustration: '/illustrations/a06-followups.png',
      overview: '后台统一处理全量患者的随访任务、日历与计划，并支持高级筛选。', pageRole: '后台随访任务与计划管理页。',
      businessRules: ['后台与申请人端使用同一套随访任务、计划、模板和记录数据。', '高级筛选仅作用于后台任务查看，可按字段组合并保存为个人场景。', '后台可在任务页执行、补录和查看随访，在计划页新建、编辑或取消计划。'],
      states: [{ id: 'A06-S01', title: '任务', description: '按患者、状态或高级条件查看任务和日历。' }, { id: 'A06-S02', title: '计划', description: '按患者创建、编辑、取消和查看随访计划。' }],
      changes: [{ id: 'A06-C01', location: '后台随访管理', action: '执行任务、维护计划或应用高级筛选', result: '筛选任务列表，或同步更新随访任务、记录、健康档案与计划状态。' }]
    },
    {
      id: 'A07', title: '评分管理', type: 'html', protocol: 'prototype-v1', url: '/pages/admin-score-management.html', viewport: 'PC',
      requirements: ['P1 · 申请人评分'], requirementSources: ['来源：用户新增评分管理需求'],
      illustration: '/illustrations/a07-score-management.png',
      overview: '管理员配置分阶段随访目标，并查看申请人阶段评分。', pageRole: '后台评分管理页。',
      businessRules: ['每个评分阶段设置开始日期和 1–12 个月周期。', '阶段目标包含随访次数、覆盖率、线下跟诊、电话随访和入组人数。', '申请人评分按所选阶段目标计算及格状态。'],
      states: [{ id: 'A07-S01', title: '评分设置', description: '维护评分阶段、周期和指标目标。' }, { id: 'A07-S02', title: '申请人评分查看', description: '按阶段、申请人和及格状态筛选。' }],
      changes: [{ id: 'A07-C01', location: '评分阶段设置', action: '新建或保存阶段目标', result: '申请人端读取当前日期所属阶段的目标。' }, { id: 'A07-C02', location: '申请人评分查看', action: '筛选或导出', result: '展示并导出所选阶段的申请人评分。' }]
    },
    {
      id: 'A08', title: '模板配置', type: 'html', protocol: 'prototype-v1', url: '/pages/admin-templates.html', viewport: 'PC',
      requirements: ['P1 · 模板配置'],
      requirementSources: ['来源：docs/需求确认.md · 功能列表', '来源：docs/关键流程与状态节点.md · 5.1 随访模板'],
      illustration: '/illustrations/a08-templates.png',
      overview: '管理员维护随访模板，创建、编辑、停用、删除与恢复。', pageRole: '后台模板配置列表。',
      businessRules: ['已被计划引用的模板只能停用不能删除。', '后台创建的模板默认对全部申请人可见。'],
      states: [{ id: 'A08-S01', title: '模板列表', description: '按随访模板与已停用分类展示。' }],
      changes: [{ id: 'A08-C01', location: '模板列表', action: '新建、编辑、停用、删除或恢复模板', result: '更新模板状态，与申请人端共用数据源。' }]
    },
    {
      id: 'A09', title: '模板字段配置', type: 'html', protocol: 'prototype-v1', url: '/pages/admin-form-builder.html', viewport: 'PC',
      requirements: ['P1 · 模板配置'],
      requirementSources: ['来源：docs/需求确认.md · 功能列表', '来源：docs/关键流程与状态节点.md · 5.1 随访模板'],
      illustration: '/illustrations/a09-form-builder.png',
      overview: '管理员通过万能表单配置模板字段与字段属性。', pageRole: '后台万能表单编辑器。',
      businessRules: ['字段类型与申请人端一致。', '后台保存的模板可见范围为全部申请人。'],
      states: [{ id: 'A09-S01', title: '字段配置', description: '添加字段并设置字段属性。' }],
      changes: [{ id: 'A09-C01', location: '字段设置', action: '添加、移动、复制、删除字段并保存', result: '模板字段保存后可用于新建计划。' }]
    },
    {
      id: 'A11', title: '活动申请表单', type: 'html', protocol: 'prototype-v1', url: '/pages/admin-activity-forms.html', viewport: 'PC',
      requirements: ['P2 · 活动申请万能表单维护'], requirementSources: ['来源：docs/需求确认.md · 功能列表', '来源：docs/流程图/活动申请表单完整图.html'],
      overview: '管理人员维护平台唯一的活动申请表单字段，并控制该表单的发布或停用。', pageRole: '后台活动申请万能表单配置（三栏字段构建器）。',
      businessRules: ['全平台只维护一份活动申请表单，不提供新建多份表单。', '支持填空、单选、多选、数值、百分数、日期和图片字段。', '停用状态下申请人端无法用该表单新建活动申请。'], states: [{ id: 'A11-S01', title: '已发布' }, { id: 'A11-S02', title: '已停用' }],
      changes: [{ id: 'A11-C01', location: '字段构建区', action: '添加、上移、下移、复制、删除字段', result: '实时更新中间表单预览。' }, { id: 'A11-C02', location: '字段设置面板', action: '编辑标识名、选项内容、设为必填', result: '保存后申请人申请页按字段顺序和规则渲染。' }, { id: 'A11-C03', location: '发布/停用', action: '切换表单可用状态', result: '停用后申请人端新建入口不可用，历史申请不受影响。' }]
    },
    {
      id: 'A13', title: '预警规则', type: 'html', protocol: 'prototype-v1', url: '/pages/admin-alert-rules.html', viewport: 'PC',
      requirements: ['P2 · 随访表单与预警配置'], requirementSources: ['来源：docs/需求确认.md · 功能列表', '来源：docs/流程图/补充业务流程图集.html · 预警监控数据流'],
      overview: '管理员按随访模板字段维护预警规则，并控制规则是否参与后续随访提交的匹配。', pageRole: '后台 P2 预警规则配置页。',
      businessRules: ['仅数值和单选字段可配置预警。', '规则停用不影响历史预警快照。', '规则编辑仅影响后续随访提交。'], states: [{ id: 'A13-S01', title: '启用' }, { id: 'A13-S02', title: '已停用' }],
      changes: [{ id: 'A13-C01', location: '规则列表', action: '搜索、筛选、新建、编辑或启停规则', result: '更新后续随访提交的预警匹配规则。' }, { id: 'A13-C02', location: '规则表单', action: '选择模板和字段并填写条件', result: '按字段类型校验条件，保存有效规则或展示明确原因。' }]
    },
    {
      id: 'A14', title: '预警监控', type: 'html', protocol: 'prototype-v1', url: '/pages/admin-alert-monitoring.html', viewport: 'PC',
      requirements: ['P2 · 预警监控管理'], requirementSources: ['来源：docs/需求确认.md · 功能列表', '来源：docs/流程图/补充业务流程图集.html · 预警监控数据流'],
      overview: '管理员筛选、查看、跟进和关闭随访预警，处理结果同步给负责申请人查看。', pageRole: '后台 P2 预警监控页。',
      businessRules: ['预警状态为待处理、跟进中和已关闭。', '仅待处理预警可开始跟进。', '关闭预警必须填写处理说明。'], states: [{ id: 'A14-S01', title: '待处理' }, { id: 'A14-S02', title: '跟进中' }, { id: 'A14-S03', title: '已关闭' }],
      changes: [{ id: 'A14-C01', location: '预警列表', action: '按等级、状态、时间筛选或查看详情', result: '展示符合条件的预警及其处理状态。' }, { id: 'A14-C02', location: '预警详情', action: '开始跟进或填写说明后关闭', result: '保存处理人、时间和关闭说明；申请人端同步更新未关闭数量。' }]
    },
    {
      id: 'A12', title: '活动审批', type: 'html', protocol: 'prototype-v1', url: '/pages/admin-activity-approvals.html', viewport: 'PC',
      requirements: ['P2 · 患教会议审批'], requirementSources: ['来源：docs/需求确认.md · 功能列表', '来源：docs/关键流程与状态节点.md · 6 活动申请与审批'],
      overview: '管理人员筛选、查看并单级审批活动申请，处理结果同步至申请人申请与站内信。', pageRole: '后台活动申请审批页。',
      businessRules: ['只有审核中申请可通过、驳回或退回补充。', '退回补充和驳回需要处理意见。', '审批结果通过本地站内信展示。'], states: [{ id: 'A12-S01', title: '审批列表' }, { id: 'A12-S02', title: '处理申请' }],
      changes: [{ id: 'A12-C01', location: '审批列表', action: '按状态、时间筛选并查看详情', result: '展示全量申请和当前处理状态。' }, { id: 'A12-C02', location: '审批详情', action: '通过、退回补充或驳回', result: '保存处理人、时间、意见和结果，并通知申请人。' }]
    }
  ]

  if (window.PROTOTYPE_DATA && window.PROTOTYPE_DATA.pages) {
    window.PROTOTYPE_DATA.pages = window.PROTOTYPE_DATA.pages.concat(pages)
  } else {
    window.PROTOTYPE_DATA = window.PROTOTYPE_DATA || {}
    window.PROTOTYPE_DATA.pages = pages
  }
})()
