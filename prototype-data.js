window.PROTOTYPE_DATA = {
  project: '活动申请原型',
  version: 'P1 · 患者端',
  generatedAt: '2026-09-09T00:00:00.000Z',
  pages: [
    {
      id: 'P01', title: '患者登录 / 注册', type: 'html', protocol: 'prototype-v1',
      url: 'pages/patient-account.html', viewport: 'H5',
      requirements: ['P1 · 患者端登录', 'P1 · 知情同意签署'],
      requirementSources: ['来源：docs/需求确认.md · 功能列表', '来源：docs/关键流程与状态节点.md · 3.1 患者注册与知情同意', '来源：docs/流程图/知情同意版本与重签完整图.html'],
      illustration: 'illustrations/p01-account-entry.png',
      overview: '输入手机号和验证码后，已注册直接登录；未注册建户并进入知情同意。验证码仅作原型演示。',
      pageRole: '患者端统一账户入口。', scenario: '手机端提交后进入知情同意。',
      businessRules: ['患者可注册；申请人账号不支持自助注册。', '系统自动识别手机号状态，无需切换登录或注册。', '注册后为“待签署”，仅可进入知情同意页。', '签署后可使用服务、档案和个人中心。'],
      states: [{ id: 'P01-S01', title: '账户入口', description: '输入手机号和验证码。' }, { id: 'P01-S02', title: '已注册', description: '系统识别后直接登录。' }, { id: 'P01-S03', title: '未注册 / 待签署', description: '系统自动创建账户后，直接进入知情同意。' }],
      changes: [{ id: 'P01-C01', location: '手机号输入', action: '输入手机号', result: '系统用于识别已注册或未注册患者。' }, { id: 'P01-C02', location: '验证码输入与获取', action: '获取验证码', result: '按钮开始 60 秒倒计时并禁用；结束后显示“重新获取”。' }, { id: 'P01-C03', location: '登录按钮', action: '提交手机号与验证码', result: '完成识别后直接跳转至知情同意页；该页将在下一步制作。' }, { id: 'P01-C04', pageId: 'P02', location: '平台服务协议', action: '阅读协议', result: '跳转至协议阅读页。' }]
    },
    {
      id: 'P02', title: '平台服务协议', type: 'html', protocol: 'prototype-v1',
      url: 'pages/platform-service-agreement.html', viewport: 'H5',
      requirements: ['P1 · 患者端个人中心 / 平台协议'],
      requirementSources: ['来源：docs/需求确认.md · 功能列表'],
      illustration: 'illustrations/p02-platform-agreement.png',
      overview: '展示平台服务协议，内容仅供原型评审。',
      pageRole: '登录前的协议阅读页。', scenario: '由账户页协议链接进入。',
      businessRules: ['患者可阅读平台协议。', '本页不替代知情同意签署。'],
      states: [{ id: 'P02-S01', title: '协议阅读', description: '默认展示虚拟协议正文。' }],
      changes: [{ id: 'P02-C01', pageId: 'P01', location: '返回', action: '返回账户页', result: '回到患者登录/注册入口。' }]
    },
    {
      id: 'P03', title: '知情同意签署', type: 'html', protocol: 'prototype-v1',
      url: 'pages/informed-consent.html', viewport: 'H5',
      requirements: ['P1 · 知情同意签署'],
      requirementSources: ['来源：docs/需求确认.md · 功能列表', '来源：docs/关键流程与状态节点.md · 3.1 患者注册与知情同意', '来源：docs/流程图/知情同意版本与重签完整图.html'],
      illustration: 'illustrations/p03-informed-consent.png',
      overview: '待签署患者阅读并确认知情同意；签署仅模拟前端状态。',
      pageRole: '注册或登录后的强制签署页。', scenario: '未签署仅可停留本页；签署后可使用服务。',
      businessRules: ['注册后必须签署知情同意。', '未签署不能进入服务、档案和个人中心。', '签署保存协议版本、时间和结果。', '签署后跳转患者端服务页。'],
      states: [{ id: 'P03-S01', title: '待签署', description: '患者阅读内容并勾选确认。' }, { id: 'P03-S02', title: '已签署', description: '签署结果保存后进入患者端服务。' }],
      changes: [{ id: 'P03-C01', location: '知情同意正文', action: '阅读协议内容', result: '展示版本号、生效日期与虚拟正文。' }, { id: 'P03-C02', location: '确认勾选', action: '确认已阅读并理解', result: '签署按钮由禁用变为可用。' }, { id: 'P03-C03', stateId: 'P03-S02', location: '确认签署', action: '提交签署', result: '记录签署结果并直接跳转患者端服务页。' }]
    },
    {
      id: 'P04', title: '患者服务', type: 'html', protocol: 'prototype-v1',
      url: 'pages/patient-services.html', viewport: 'H5',
      requirements: ['P1 · 患者账号与知情同意', 'P1 · 健康档案查看'],
      requirementSources: ['来源：docs/关键流程与状态节点.md · 1 总体业务闭环', '来源：docs/关键流程与状态节点.md · 3.2 申请人绑定与解绑', '来源：product/shell/spec.md · 患者端导航'],
      illustration: 'illustrations/p04-patient-services.png',
      overview: '知情同意后进入服务，可确认申请人绑定并查看今日或日历随访。',
      pageRole: '签署后的患者端首页。', scenario: '模拟申请人添加，患者确认绑定；可查看全部随访。',
      businessRules: ['签署知情同意后可使用患者服务。', '申请人发起绑定后由患者确认。', '同意即绑定；不同意保持待绑定。', '同一患者仅可绑定一名申请人。'],
      states: [{ id: 'P04-S01', title: '等待申请人绑定', description: '已完成知情同意，尚未收到申请人添加请求。' }, { id: 'P04-S02', title: '待患者确认', description: '申请人已添加患者，等待患者同意或不同意。' }, { id: 'P04-S03', title: '已绑定', description: '患者同意后，展示当前负责申请人和随访服务信息。' }],
      changes: [{ id: 'P04-C01', location: '服务申请人状态', action: '模拟申请人添加患者，并由患者同意或不同意', result: '待绑定后进入待确认；同意后展示当前服务申请人，不同意后返回待绑定。' }, { id: 'P04-C02', location: '随访横向切换与月历', action: '切换今日/全部随访、切换年月或选择日期', result: '全部页展示完整月历；点击日期后以下方卡片呈现该日随访详细内容。' }, { id: 'P04-C03', location: '底部导航', action: '切换患者端模块', result: '可前往健康档案或个人中心。' }]
    },
    {
      id: 'P05', title: '健康档案', type: 'html', protocol: 'prototype-v1',
      url: 'pages/patient-health-record.html', viewport: 'H5',
      requirements: ['P1 · 患者端健康档案查看', 'P1 · 申请人端健康档案更新'],
      requirementSources: ['来源：docs/需求确认.md · 功能列表', '来源：docs/关键流程与状态节点.md · 4 健康档案', '来源：docs/流程图/健康档案编辑与追溯完整图.html'],
      illustration: 'illustrations/p05-health-record.png',
      overview: '患者通过移动表单查看和维护健康档案，字段按权限显示。',
      pageRole: '健康档案查看与允许字段编辑入口。', scenario: '使用本地示例档案数据。',
      businessRules: ['档案展示当前内容，无额外状态流转。', '患者和负责申请人可查看完整档案。', '可编辑字段由万能表单决定。', '随访提交自动更新档案并保留记录。'],
      states: [{ id: 'P05-S01', title: '当前健康档案', description: '展示最后一次保存的字段值及更新时间。' }],
      changes: [{ id: 'P05-C01', location: '健康档案表单', action: '查看或填写允许编辑的字段', result: '按字段配置展示只读、输入、选择和自动计算内容。' }, { id: 'P05-C02', location: '保存', action: '保存健康档案修改', result: '模拟保存当前可编辑字段。' }]
    },
    {
      id: 'P06', title: '个人中心', type: 'html', protocol: 'prototype-v1',
      url: 'pages/patient-profile.html', viewport: 'H5',
      requirements: ['P1 · 患者端个人中心'],
      requirementSources: ['来源：docs/需求确认.md · 功能列表'],
      illustration: 'illustrations/p06-profile.png',
      overview: '患者查看平台协议、已签署知情同意内容并退出登录的入口。', pageRole: '患者端个人中心。', scenario: '已签署患者从底部“我的”进入。',
      businessRules: ['患者可查看平台协议与已签署的知情同意内容。', '退出登录仅清除当前前端演示状态，不涉及真实认证。'],
      states: [{ id: 'P06-S01', title: '个人中心', description: '展示个人信息和设置入口。' }, { id: 'P06-S02', title: '退出确认', description: '用户确认后返回账户登录页。' }],
      changes: [{ id: 'P06-C01', pageId: 'P09', location: '平台服务协议', action: '查看协议', result: '进入平台协议阅读页。' }, { id: 'P06-C02', pageId: 'P10', location: '已签署知情同意', action: '查看签署列表', result: '进入知情同意列表，可查看当前与历史签署记录。' }, { id: 'P06-C03', stateId: 'P06-S02', location: '退出登录', action: '确认退出', result: '返回患者账户登录页。' }]
    },
    {
      id: 'P08', title: '已签署知情同意', type: 'html', protocol: 'prototype-v1',
      url: 'pages/signed-informed-consent.html', viewport: 'H5',
      requirements: ['P1 · 知情同意签署', 'P1 · 患者端个人中心'],
      requirementSources: ['来源：docs/关键流程与状态节点.md · 3.1 患者注册与知情同意', '来源：docs/需求确认.md · 功能列表'],
      illustration: 'illustrations/p08-signed-consent.png',
      overview: '患者以只读方式查看已签署知情同意的签署时间和签署结果。', pageRole: '个人中心内的已签署知情同意查看页。',
      businessRules: ['每次签署保存签署时间和签署结果。', '撤回知情同意后既有数据保留，患者仍可查看历史内容。'],
      states: [{ id: 'P08-S01', title: '已签署', description: '展示当前已签署记录。' }],
      changes: [{ id: 'P08-C01', location: '签署信息与正文', action: '查看已签署内容', result: '展示签署结果、时间和只读正文。' }]
    },
    {
      id: 'P10', title: '知情同意列表', type: 'html', protocol: 'prototype-v1',
      url: 'pages/informed-consent-list.html', viewport: 'H5',
      requirements: ['P1 · 知情同意签署', 'P1 · 患者端个人中心'],
      requirementSources: ['来源：docs/关键流程与状态节点.md · 3.1 患者注册与知情同意', '来源：docs/流程图/知情同意版本与重签完整图.html'],
      illustration: 'illustrations/p10-consent-list.png',
      overview: '患者查看当前有效及历史已签署的知情同意记录。', pageRole: '个人中心内的知情同意记录列表页。',
      businessRules: ['知情同意更新后，患者需要重新签署新内容。', '每一次已签署记录均保留，当前有效记录与历史记录同时可查。'],
      states: [{ id: 'P10-S01', title: '签署记录列表', description: '展示当前有效与历史已签署记录。' }],
      changes: [{ id: 'P10-C01', pageId: 'P08', location: '知情同意记录', action: '查看某一条签署记录', result: '进入已签署知情同意详情。' }]
    },
    {
      id: 'P09', title: '平台服务协议', type: 'html', protocol: 'prototype-v1',
      url: 'pages/profile-service-agreement.html', viewport: 'H5',
      requirements: ['P1 · 患者端个人中心'],
      requirementSources: ['来源：docs/需求确认.md · 功能列表'],
      illustration: 'illustrations/p09-profile-agreement.png',
      overview: '患者从个人中心阅读平台服务协议。协议正文为原型虚拟内容。', pageRole: '个人中心内的平台协议阅读页。',
      businessRules: ['平台协议可供患者阅读。', '本页不替代知情同意签署。'],
      states: [{ id: 'P09-S01', title: '协议阅读', description: '默认展示虚拟协议正文。' }],
      changes: [{ id: 'P09-C01', pageId: 'P06', location: '返回', action: '返回个人中心', result: '回到个人中心。' }]
    }
  ]
}
