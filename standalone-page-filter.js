(() => {
  const pageIds = new Set(['N01', 'NM01', 'A01', 'A10', 'A11', 'A12', 'A13', 'A14', 'N10', 'N11', 'N12', 'NM06', 'NM11', 'NM12', 'NM13']);
  const data = window.PROTOTYPE_DATA;
  if (!data || !Array.isArray(data.pages)) return;

  data.pages = data.pages.filter((page) => pageIds.has(page.id));
  data.pages.forEach((page) => {
    if (page.id === 'NM06' || page.id === 'N11' || page.id === 'NM12' || page.id === 'A14') page.hiddenInNavigation = true;
  });
  const illustrations = {
    A10: 'illustrations/a10-representative-management.png',
    A11: 'illustrations/a11-activity-form-library.png',
    A12: 'illustrations/a12-activity-approval.png',
    A13: 'illustrations/a13-activity-plans.png',
    A14: 'illustrations/a14-activity-form-editor.png',
    N12: 'illustrations/n12-activity-plans.png',
    N10: 'illustrations/n10-activity-application-list.png',
    N11: 'illustrations/n11-activity-notifications.png',
    NM06: 'illustrations/nm06-mobile-profile.png',
    NM11: 'illustrations/nm11-mobile-activity-applications.png',
    NM12: 'illustrations/nm12-mobile-activity-notifications.png',
    NM13: 'illustrations/nm13-mobile-activity-plans.png'
  };
  const activityAnnotations = {
    A10: { overview: '查看已注册代表，维护其大区、公司与启停状态，并查看活动计划额度。', pageRole: '管理后台代表管理。', businessRules: ['前端注册自动生成代表，后台不新增或删除。', '停用代表保留历史申请和额度，但不能发起新申请。'], states: [{ title: '有效' }, { title: '已停用' }], changes: [{ id: 'A10-C01', location: '代表列表', action: '搜索、查看详情、编辑或启停', result: '更新代表资料或状态；历史记录保留。' }] },
    A11: { overview: '管理可复用的活动申请表单，供活动计划选择。', pageRole: '管理后台活动申请表单库。', businessRules: ['已被活动计划引用的表单不可删除。', '表单编辑不影响已引用计划和申请的表单快照。'], states: [{ title: '已发布' }, { title: '已停用' }], changes: [{ id: 'A11-C01', location: '表单列表', action: '新建、编辑或删除未引用表单', result: '更新后续活动计划可选择的申请表单。' }] },
    A13: { overview: '以弹窗创建、编辑和发布活动计划，并分配代表额度。', pageRole: '管理后台活动计划。', businessRules: ['限额计划分配总和不能超过总场次，发布前至少分配一位代表。', '不限额计划对全部有效代表开放。'], states: [{ title: '草稿' }, { title: '已发布' }, { title: '已结束' }], changes: [{ id: 'A13-C01', location: '活动计划', action: '新建或查看编辑计划', result: '弹窗维护计划、表单快照和代表额度。' }] }
  };
  data.pages.forEach((page) => {
    if (illustrations[page.id]) page.illustration = illustrations[page.id];
    if (activityAnnotations[page.id]) Object.assign(page, activityAnnotations[page.id]);
  });
  data.project = '活动申请原型';
  data.version = 'P2 · 活动申请与审批';
})();
