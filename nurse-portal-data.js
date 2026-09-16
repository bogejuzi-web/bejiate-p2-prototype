;(function () {
  var pages = [
    {
      id: 'N01', title: '活动申请账户', type: 'html', protocol: 'prototype-v1', url: 'pages/nurse-login.html', viewport: 'PC',
      requirements: ['P2 · 活动申请账户'],
      requirementSources: ['来源：docs/需求确认.md · 功能列表'],
      illustration: 'illustrations/n01-nurse-login.png',
      overview: '申请人可注册、登录或重置密码后进入活动申请。', pageRole: '活动申请端 PC 账户入口。',
      businessRules: ['注册使用手机号验证；同一手机号仅可注册一个账户。', '注册成功自动登录；重置密码仅修改本地演示账户数据。'],
      states: [{ id: 'N01-S01', title: '登录成功', description: '账户和密码正确。' }, { id: 'N01-S02', title: '登录失败', description: '账户或密码错误。' }, { id: 'N01-S03', title: '注册成功', description: '完成验证后自动进入活动申请。' }, { id: 'N01-S04', title: '密码已重置', description: '使用新密码重新登录。' }],
      changes: [{ id: 'N01-C01', location: '账户表单', action: '登录、注册或重置密码', result: '更新前端演示账户状态并进入相应申请页。' }]
    },
    {
      id: 'N02', title: '工作台', type: 'html', protocol: 'prototype-v1', url: 'pages/nurse-dashboard.html', viewport: 'PC',
      requirements: ['P1 · 随访提醒', 'P1 · 申请人评分'],
      requirementSources: ['来源：docs/需求确认.md · 功能列表', '来源：docs/关键流程与状态节点.md · 5.3 随访任务与记录'],
      illustration: 'illustrations/n02-dashboard.png',
      overview: '申请人登录后查看当天任务、补录逾期任务，也可随时记录随访。', pageRole: '申请人端 PC 默认首页。',
      businessRules: ['当天待办由计划按排期生成。', '逾期任务允许补录。', '随时记录仅限已绑定患者，不影响既有任务状态。'],
      states: [{ id: 'N02-S01', title: '有待办任务', description: '展示待执行/逾期任务列表。' }, { id: 'N02-S02', title: '暂无待办', description: '当天任务已全部完成。' }],
      changes: [{ id: 'N02-C01', location: '工作台任务列表', action: '开始、补录或随时记录随访', result: '提交后生成随访记录并更新健康档案；随时记录不改变既有任务状态。' }]
    },
    {
      id: 'N03', title: '患者管理', type: 'html', protocol: 'prototype-v1', url: 'pages/nurse-patients.html', viewport: 'PC',
      requirements: ['P1 · 申请人端患者管理'],
      requirementSources: ['来源：docs/需求确认.md · 功能列表', '来源：docs/关键流程与状态节点.md · 3.2 申请人绑定与解绑'],
      illustration: 'illustrations/n03-patient-management.png',
      overview: '申请人查看患者、搜索患者并按手机号发起绑定申请，管理解绑与重新申请。', pageRole: '申请人端患者管理入口。',
      businessRules: ['申请人新增患者时按手机号识别。', '患者已签署知情同意后才能发起绑定申请。', '患者同意后建立绑定关系；不同意则显示已拒绝。', '已绑定其他申请人的患者不允许操作。'],
      states: [{ id: 'N03-S01', title: '患者列表', description: '展示患者与绑定状态。' }, { id: 'N03-S02', title: '待患者确认', description: '申请人已发起绑定申请。' }],
      changes: [{ id: 'N03-C01', location: '患者列表与新增患者', action: '搜索、发起绑定申请、解绑或重新申请', result: '展示并更新绑定状态。' }]
    },
    {
      id: 'N04', title: '患者详情', type: 'html', protocol: 'prototype-v1', url: 'pages/nurse-patient-detail.html', viewport: 'PC',
      requirements: ['P1 · 申请人端患者管理', 'P1 · 健康档案更新', 'P1 · 随访计划', 'P1 · 知情同意签署'],
      requirementSources: ['来源：docs/需求确认.md · 功能列表'],
      illustration: 'illustrations/n04-patient-detail.png',
      overview: '申请人查看患者健康档案、协议签署详情，并可直达该患者的随访计划。', pageRole: '申请人端患者详情页。',
      businessRules: ['仅已绑定患者可开展随访服务。', '健康档案由患者与申请人共同维护并保留追溯记录。'],
      states: [{ id: 'N04-S01', title: '健康档案', description: '默认页签，展示分组字段。' }],
      changes: [{ id: 'N04-C01', location: '患者详情', action: '编辑健康档案、查看协议或进入随访计划', result: '更新健康档案，查看协议签署状态，或跳转至当前患者的随访计划。' }]
    },
    {
      id: 'N05', title: '随访管理', type: 'html', protocol: 'prototype-v1', url: 'pages/nurse-followups.html', viewport: 'PC',
      requirements: ['P1 · 随访计划', 'P1 · 随访内容填写', 'P1 · 随访提醒'],
      requirementSources: ['来源：docs/需求确认.md · 功能列表', '来源：docs/关键流程与状态节点.md · 5.2 随访计划', '来源：docs/关键流程与状态节点.md · 5.3 随访任务与记录'],
      illustration: 'illustrations/n05-followups.png',
      overview: '申请人查看任务、补录未拜访随访，也可随时发起随访。', pageRole: '申请人端随访管理页。',
      businessRules: ['仅已绑定患者可创建计划和随时随访。', '计划生效时锁定模板版本。', '当天未完成任务标记为未拜访，允许补录。'],
      states: [{ id: 'N05-S01', title: '任务页签', description: '待执行/已完成/未拜访三态列表。' }, { id: 'N05-S02', title: '计划页签', description: '按患者查看和维护随访计划。' }],
      changes: [{ id: 'N05-C01', location: '任务页签', action: '填写、补录、随时发起或查看随访', result: '生成随访记录并更新健康档案；随时发起不改变既有任务状态。' }, { id: 'N05-C02', location: '计划页签', action: '新建、编辑或取消随访计划', result: '保存后生成或停止生成随访任务。' }]
    },
    {
      id: 'N06', title: '随访模板', type: 'html', protocol: 'prototype-v1', url: 'pages/nurse-followup-templates.html', viewport: 'PC',
      requirements: ['P1 · 随访模板'],
      requirementSources: ['来源：docs/关键流程与状态节点.md · 5.1 随访模板'],
      illustration: 'illustrations/n06-templates.png',
      overview: '申请人查看随访模板及已停用模板。', pageRole: '申请人端随访模板管理页。',
      businessRules: ['模板支持可见范围设置。', '已引用模板保留历史记录。', '生效计划锁定模板版本。'],
      states: [{ id: 'N06-S01', title: '模板列表', description: '按随访模板、已停用分类展示。' }],
      changes: [{ id: 'N06-C01', location: '模板列表', action: '查看、编辑、恢复或删除模板', result: '为新建随访计划提供字段配置。' }]
    },
    {
      id: 'N07', title: '万能表单', type: 'html', protocol: 'prototype-v1', url: 'pages/nurse-form-builder.html', viewport: 'PC', hiddenInNavigation: true,
      requirements: ['P1 · 随访模板'],
      requirementSources: ['来源：docs/关键流程与状态节点.md · 5.1 随访模板'],
      illustration: 'illustrations/n07-form-builder.png',
      overview: '配置随访模板字段。', pageRole: '模板编辑器。',
      businessRules: ['字段仅支持单行文本、多行文本、单选、多选、数值、百分数、日期、文件上传。'],
      states: [{ id: 'N07-S01', title: '字段配置', description: '添加、排序和设置字段必填。' }],
      changes: [{ id: 'N07-C01', location: '字段配置区', action: '添加字段并保存', result: '保存后模板字段更新，可用于新建计划。' }]
    },
    {
      id: 'N08', title: '评分', type: 'html', protocol: 'prototype-v1', url: 'pages/nurse-score.html', viewport: 'PC',
      requirements: ['P1 · 申请人评分'], requirementSources: ['来源：用户新增评分入口需求'],
      overview: '申请人在独立评分页查看各评分阶段的随访指标。', pageRole: '申请人端评分页。',
      businessRules: ['评分目标由后台按阶段配置。'], states: [{ id: 'N08-S01', title: '评分阶段' }],
      changes: [{ id: 'N08-C01', location: '评分阶段', action: '展开或收起阶段进度', result: '查看该阶段五项指标。' }]
    },
    {
      id: 'N09', title: '我的', type: 'html', protocol: 'prototype-v1', url: 'pages/nurse-profile.html', viewport: 'PC',
      requirements: ['P1 · 申请人端账号登录', 'P1 · 申请人评分'],
      requirementSources: ['来源：docs/需求确认.md · 功能列表'],
      illustration: 'illustrations/n09-profile.png',
      overview: '申请人查看账户信息、随访指标并退出登录。', pageRole: '申请人端个人中心。',
      businessRules: ['随访覆盖率按已随访人数除以绑定患者总数计算。', '月目标和目标周期由后台配置。', '退出登录仅清除前端演示状态，不涉及真实认证。'],
      states: [{ id: 'N09-S01', title: '账户信息', description: '展示申请人姓名、账号和所属信息。' }, { id: 'N09-S02', title: '指标展开', description: '展示五项随访指标及后台配置的月目标。' }, { id: 'N09-S03', title: '密码已修改', description: '提示下次登录使用新密码。' }],
      changes: [{ id: 'N09-C01', location: '查看随访指标', action: '展开指标区块', result: '展示五项指标、月目标和目标周期。' }, { id: 'N09-C02', location: '退出登录', action: '确认退出', result: '清除演示态数据并返回申请人登录页。' }]
    },
    {
      id: 'NM01', title: '活动申请账户（手机端）', type: 'html', protocol: 'prototype-v1', url: 'pages/nurse-mobile-login.html', viewport: 'H5',
      requirements: ['P2 · 活动申请账户'],
      requirementSources: ['来源：docs/需求确认.md · 功能列表'],
      overview: '申请人在手机端使用同一账户注册、登录和重置密码。', pageRole: '活动申请手机端账户入口。',
      businessRules: ['注册、登录和密码重置与 PC 端共用前端演示账户数据。'],
      states: [{ id: 'NM01-S01', title: '登录成功' }, { id: 'NM01-S02', title: '登录失败' }, { id: 'NM01-S03', title: '注册成功' }, { id: 'NM01-S04', title: '密码已重置' }],
      changes: [{ id: 'NM01-C01', location: '账户表单', action: '登录、注册或重置密码', result: '更新账户状态并进入手机端活动申请。' }]
    },
    {
      id: 'NM02', title: '工作台（手机端）', type: 'html', protocol: 'prototype-v1', url: 'pages/nurse-mobile-dashboard.html', viewport: 'H5',
      requirements: ['P1 · 随访提醒'],
      requirementSources: ['来源：docs/关键流程与状态节点.md · 5.3 随访任务与记录'],
      overview: '申请人在手机端快速查看当天需要处理的随访任务。', pageRole: '申请人手机端默认首页。',
      businessRules: ['当天待办由计划按排期生成。'],
      states: [{ id: 'NM02-S01', title: '有待办任务' }, { id: 'NM02-S02', title: '暂无待办' }],
      changes: [{ id: 'NM02-C01', location: '任务卡片', action: '点击任务卡片', result: '打开随访填写全屏表单。' }]
    },
    {
      id: 'NM03', title: '患者（手机端）', type: 'html', protocol: 'prototype-v1', url: 'pages/nurse-mobile-patients.html', viewport: 'H5',
      requirements: ['P1 · 申请人端患者管理'],
      requirementSources: ['来源：docs/需求确认.md · 功能列表'],
      overview: '申请人在手机端查看已绑定患者列表并快速定位患者。', pageRole: '申请人手机端患者列表页。',
      businessRules: ['新增患者与绑定管理需在申请人 PC 端操作。'],
      states: [{ id: 'NM03-S01', title: '患者列表' }],
      changes: [{ id: 'NM03-C01', location: '患者列表', action: '搜索或点击患者', result: '进入患者只读详情页。' }]
    },
    {
      id: 'NM04', title: '患者详情（手机端）', type: 'html', protocol: 'prototype-v1', url: 'pages/nurse-mobile-patient-detail.html', viewport: 'H5',
      requirements: ['P1 · 健康档案查看', 'P1 · 随访计划', 'P1 · 知情同意签署'],
      requirementSources: ['来源：docs/需求确认.md · 功能列表'],
      overview: '申请人在手机端查看患者健康档案、协议签署详情，并直达该患者的随访计划。', pageRole: '申请人手机端患者详情页。',
      businessRules: ['协议详情仅供查看；随访计划入口默认定位当前患者。'],
      states: [{ id: 'NM04-S01', title: '只读详情' }],
      changes: [{ id: 'NM04-C01', location: '患者详情', action: '查看协议或进入随访计划', result: '弹出可切换协议详情，或跳转至当前患者的随访计划。' }]
    },
    {
      id: 'NM05', title: '随访（手机端）', type: 'html', protocol: 'prototype-v1', url: 'pages/nurse-mobile-followups.html', viewport: 'H5',
      requirements: ['P1 · 随访计划', 'P1 · 随访内容填写', 'P1 · 随访提醒'],
      requirementSources: ['来源：docs/关键流程与状态节点.md · 5.1 随访模板', '来源：docs/关键流程与状态节点.md · 5.2 随访计划', '来源：docs/关键流程与状态节点.md · 5.3 随访任务与记录'],
      overview: '申请人在手机端处理随访任务，并进入计划与模板维护。', pageRole: '申请人手机端随访处理页。',
      businessRules: ['提交随访后自动更新健康档案，与 PC 端共用同一数据源。', '仅已绑定患者可新建计划。'],
      states: [{ id: 'NM05-S01', title: '待执行' }, { id: 'NM05-S02', title: '已完成' }, { id: 'NM05-S03', title: '已逾期' }],
      changes: [{ id: 'NM05-C01', location: '任务列表', action: '填写或补录随访', result: '更新任务状态并生成随访记录。' }]
    },
    {
      id: 'NM07', title: '随访计划（手机端）', type: 'html', protocol: 'prototype-v1', url: 'pages/nurse-mobile-plans.html', viewport: 'H5',
      requirements: ['P1 · 随访计划'], requirementSources: ['来源：docs/关键流程与状态节点.md · 5.2 随访计划'],
      overview: '按已绑定患者创建、编辑和取消随访计划。', pageRole: '申请人手机端随访计划管理页。',
      businessRules: ['草稿不生成任务；生效计划锁定模板版本并生成任务；取消后不再生成新任务。'],
      states: [{ id: 'NM07-S01', title: '草稿' }, { id: 'NM07-S02', title: '生效中' }, { id: 'NM07-S03', title: '已结束' }, { id: 'NM07-S04', title: '已取消' }],
      changes: [{ id: 'NM07-C01', location: '计划表单', action: '保存草稿或保存并生效', result: '保存计划；生效时新增对应随访任务。' }, { id: 'NM07-C02', location: '计划列表', action: '编辑或取消计划', result: '更新计划排期或停止生成后续任务。' }]
    },
    {
      id: 'NM08', title: '随访模板（手机端）', type: 'html', protocol: 'prototype-v1', url: 'pages/nurse-mobile-templates.html', viewport: 'H5',
      requirements: ['P1 · 随访模板'], requirementSources: ['来源：docs/关键流程与状态节点.md · 5.1 随访模板'],
      overview: '查看随访模板及已停用模板。', pageRole: '申请人手机端随访模板列表。',
      businessRules: ['已引用模板保留历史记录；未引用的停用模板可删除。'],
      states: [{ id: 'NM08-S01', title: '启用' }, { id: 'NM08-S02', title: '已停用' }],
      changes: [{ id: 'NM08-C01', location: '模板列表', action: '编辑、恢复或删除模板', result: '更新新建计划可选择的模板。' }]
    },
    {
      id: 'NM09', title: '万能表单（手机端）', type: 'html', protocol: 'prototype-v1', url: 'pages/nurse-mobile-form-builder.html', viewport: 'H5', hiddenInNavigation: true,
      requirements: ['P1 · 随访模板'], requirementSources: ['来源：docs/关键流程与状态节点.md · 5.1 随访模板'],
      overview: '配置随访模板的字段与字段属性。', pageRole: '申请人手机端万能表单编辑器。',
      businessRules: ['模板至少包含一个字段；单选与多选至少保留两个非空选项；生效计划继续使用已锁定版本。'],
      states: [{ id: 'NM09-S01', title: '字段配置' }],
      changes: [{ id: 'NM09-C01', location: '字段设置', action: '添加、删除、设置必填与保存', result: '模板字段保存后可用于新建计划。' }]
    },
    {
      id: 'NM10', title: '评分详情（手机端）', type: 'html', protocol: 'prototype-v1', url: 'pages/nurse-mobile-score.html', viewport: 'H5', hiddenInNavigation: true,
      requirements: ['P1 · 申请人评分'], requirementSources: ['来源：用户新增评分入口需求'],
      overview: '申请人在手机端独立查看评分阶段与指标。', pageRole: '申请人手机端评分详情。',
      businessRules: ['评分目标由后台按阶段配置。'], states: [{ id: 'NM10-S01', title: '评分阶段' }], changes: [{ id: 'NM10-C01', location: '阶段列表', action: '展开阶段', result: '查看五项指标进度。' }]
    },
    {
      id: 'NM06', title: '我的（手机端）', type: 'html', protocol: 'prototype-v1', url: 'pages/nurse-mobile-profile.html', viewport: 'H5',
      requirements: ['P2 · 活动申请账户'],
      requirementSources: ['来源：活动申请账户原型需求'],
      overview: '申请人在手机端查看当前账户手机号，并可退出登录。', pageRole: '活动申请手机端个人中心。',
      businessRules: ['账户信息来自本地演示账户数据。', '退出登录仅清除当前会话，不删除注册账户。'],
      states: [{ id: 'NM06-S01', title: '账户信息' }, { id: 'NM06-S02', title: '已退出登录' }],
      changes: [{ id: 'NM06-C01', location: '账户信息', action: '查看手机号', result: '展示当前登录账户。' }, { id: 'NM06-C02', location: '退出登录', action: '确认退出', result: '清除当前会话并返回申请人手机端登录页。' }]
    },
    {
      id: 'NM11', title: '活动申请（手机端）', type: 'html', protocol: 'prototype-v1', url: 'pages/nurse-mobile-activity-applications.html', viewport: 'H5',
      requirements: ['P2 · 患教会议申请'], requirementSources: ['来源：docs/需求确认.md · 功能列表', '来源：docs/关键流程与状态节点.md · 6 活动申请与审批'],
      overview: '申请人在手机端创建、保存、提交、撤回和追溯本人活动申请，与 PC 端共享同一活动数据。', pageRole: '申请人手机端活动申请闭环入口。',
      businessRules: ['草稿和退回补充可编辑。', '已提交和退回补充可撤回。', '已通过、已驳回和已撤回为终态。'],
      states: [{ id: 'NM11-S01', title: '草稿' }, { id: 'NM11-S02', title: '已提交' }, { id: 'NM11-S03', title: '退回补充' }, { id: 'NM11-S04', title: '终态申请' }],
      changes: [{ id: 'NM11-C01', location: '申请列表', action: '搜索、筛选、查看详情或新建申请', result: '展示本人各状态申请；无可用表单时说明原因。' }, { id: 'NM11-C02', location: '全屏申请表单', action: '保存草稿或提交', result: '草稿保留本地内容；提交经必填校验后进入后台审批。' }, { id: 'NM11-C03', location: '申请详情', action: '补充、重提或撤回', result: '退回补充可修改重提；撤回后仅可追溯。' }, { id: 'NM11-C04', pageId: 'NM12', location: '活动通知', action: '查看处理结果', result: '进入手机端通知并回到对应申请详情。' }]
    },
    {
      id: 'NM12', title: '活动申请通知（手机端）', type: 'html', protocol: 'prototype-v1', url: 'pages/nurse-mobile-activity-notifications.html', viewport: 'H5', hiddenInNavigation: true,
      requirements: ['P2 · 患教会议申请'], requirementSources: ['来源：docs/关键流程与状态节点.md · 6 活动申请与审批'],
      overview: '申请人在手机端查看活动申请审批结果并跳回相应详情。', pageRole: '申请人手机端活动申请站内信。',
      businessRules: ['通知仅模拟本地前端状态，不发送真实消息。'], states: [{ id: 'NM12-S01', title: '审批结果通知' }],
      changes: [{ id: 'NM12-C01', pageId: 'NM11', location: '通知列表', action: '查看申请', result: '标记通知已读并回到对应活动申请详情。' }]
    },
    {
      id: 'NM13', title: 'P2 工作台（手机端）', type: 'html', protocol: 'prototype-v1', url: 'pages/nurse-mobile-p2-dashboard.html', viewport: 'H5',
      requirements: ['P2 · 患教会议申请'], requirementSources: ['来源：用户新增 P2 工作台需求'],
      overview: 'P2 申请人手机端工作台，复用 P1 的随访待办概览并提供活动申请审批通知入口。', pageRole: '申请人手机端 P2 工作台。',
      businessRules: ['随访待办与 P1 工作台共用本地数据。', '活动申请通知仅展示本地前端模拟结果。'], states: [{ id: 'NM13-S01', title: '有待办或通知' }, { id: 'NM13-S02', title: '暂无待办' }],
      changes: [{ id: 'NM13-C01', pageId: 'NM12', location: '活动申请通知', action: '查看通知', result: '进入活动通知列表并可回到对应申请详情。' }, { id: 'NM13-C02', pageId: 'NM05', location: '随访任务', action: '处理任务', result: '进入原有手机端随访页面处理任务。' }]
    },
    {
      id: 'NM14', title: '预警提示（手机端）', type: 'html', protocol: 'prototype-v1', url: 'pages/nurse-mobile-alerts.html', viewport: 'H5', hiddenInNavigation: true,
      requirements: ['P2 · 预警监控提示'], requirementSources: ['来源：docs/需求确认.md · 功能列表', '来源：docs/流程图/补充业务流程图集.html · 预警监控数据流'],
      overview: '申请人在手机端查看本人负责患者的随访预警和后台处理结果。', pageRole: '申请人手机端 P2 预警列表。',
      businessRules: ['申请人仅查看本人预警。', '待处理、跟进中计入未关闭数量；已关闭可追溯但不计数。'], states: [{ id: 'NM14-S01', title: '未关闭预警' }, { id: 'NM14-S02', title: '已关闭预警' }],
      changes: [{ id: 'NM14-C01', location: '预警列表', action: '筛选或查看预警详情', result: '展示触发字段、规则和值，以及后台处理或关闭信息。' }]
    },
    {
      id: 'N12', title: 'P2 工作台', type: 'html', protocol: 'prototype-v1', url: 'pages/nurse-p2-dashboard.html', viewport: 'PC',
      requirements: ['P2 · 患教会议申请'], requirementSources: ['来源：用户新增 P2 工作台需求'],
      overview: 'P2 申请人 PC 工作台，复用 P1 的随访待办概览并提供活动申请审批通知入口。', pageRole: '申请人端 P2 工作台。',
      businessRules: ['随访待办与 P1 工作台共用本地数据。', '活动申请通知仅展示本地前端模拟结果。'], states: [{ id: 'N12-S01', title: '有待办或通知' }, { id: 'N12-S02', title: '暂无待办' }],
      changes: [{ id: 'N12-C01', pageId: 'N11', location: '活动申请通知', action: '查看通知', result: '进入活动通知列表并可回到对应申请详情。' }, { id: 'N12-C02', pageId: 'N05', location: '随访任务', action: '处理任务', result: '进入原有 PC 随访页面处理任务。' }]
    },
    {
      id: 'N13', title: '预警提示', type: 'html', protocol: 'prototype-v1', url: 'pages/nurse-alerts.html', viewport: 'PC',
      requirements: ['P2 · 预警监控提示'], requirementSources: ['来源：docs/需求确认.md · 功能列表', '来源：docs/流程图/补充业务流程图集.html · 预警监控数据流'],
      overview: '申请人查看本人负责患者的随访预警和后台处理结果。', pageRole: '申请人端 P2 预警列表。',
      businessRules: ['申请人仅查看本人预警。', '待处理、跟进中计入未关闭数量；已关闭可追溯但不计数。'], states: [{ id: 'N13-S01', title: '未关闭预警' }, { id: 'N13-S02', title: '已关闭预警' }],
      changes: [{ id: 'N13-C01', location: '预警列表', action: '筛选或查看预警详情', result: '展示触发字段、规则和值，以及后台处理或关闭信息。' }]
    },
    {
      id: 'N10', title: '活动申请', type: 'html', protocol: 'prototype-v1', url: 'pages/nurse-activity-applications.html', viewport: 'PC',
      requirements: ['P2 · 患教会议申请'],
      requirementSources: ['来源：docs/需求确认.md · 功能列表', '来源：docs/关键流程与状态节点.md · 6 活动申请与审批', '来源：docs/流程图/活动审批状态图.html'],
      illustration: 'illustrations/n10-activity-application.png',
      overview: '申请人创建、保存、提交、撤回和追溯本人活动申请；审核中在申请人端显示为“已提交”。', pageRole: '申请人端活动申请闭环入口。',
      businessRules: ['草稿和退回补充可编辑。', '已提交和退回补充可撤回。', '已通过、已驳回和已撤回为终态。'],
      states: [{ id: 'N10-S01', title: '草稿' }, { id: 'N10-S02', title: '已提交' }, { id: 'N10-S03', title: '退回补充' }, { id: 'N10-S04', title: '终态申请' }],
      changes: [{ id: 'N10-C01', location: '申请列表', action: '搜索、筛选、查看详情或新建申请', result: '展示本人各状态申请；无可用表单时说明原因。' }, { id: 'N10-C02', location: '申请填写页', action: '保存草稿或提交', result: '草稿保留本地内容；提交经必填校验后进入后台审批。' }, { id: 'N10-C03', location: '申请详情', action: '补充、重提或撤回', result: '退回补充可修改重提；撤回后仅可追溯。' }, { id: 'N10-C04', pageId: 'N11', location: '审批通知', action: '查看处理结果', result: '进入站内信通知并可回到对应申请详情。' }]
    },
    {
      id: 'N11', title: '活动申请通知', type: 'html', protocol: 'prototype-v1', url: 'pages/nurse-activity-notifications.html', viewport: 'PC', hiddenInNavigation: true,
      requirements: ['P2 · 患教会议申请'], requirementSources: ['来源：docs/关键流程与状态节点.md · 6 活动申请与审批'],
      overview: '申请人查看活动申请的通过、退回补充或驳回通知，并跳转至申请详情。', pageRole: '本地站内信结果通知页。',
      businessRules: ['通知仅模拟本地前端状态，不发送真实消息。'], states: [{ id: 'N11-S01', title: '审批结果通知' }],
      changes: [{ id: 'N11-C01', pageId: 'N10', location: '通知列表', action: '查看申请', result: '标记通知已读并回到对应活动申请。' }]
    }
  ]

  if (window.PROTOTYPE_DATA && window.PROTOTYPE_DATA.pages) {
    window.PROTOTYPE_DATA.pages = window.PROTOTYPE_DATA.pages.concat(pages)
  } else {
    window.PROTOTYPE_DATA = window.PROTOTYPE_DATA || {}
    window.PROTOTYPE_DATA.pages = pages
  }
})()
