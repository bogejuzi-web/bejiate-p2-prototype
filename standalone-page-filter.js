(() => {
  const pageIds = new Set(['N01', 'NM01', 'A01', 'N10', 'NM06', 'NM11', 'NM12', 'A11', 'A12', 'N11']);
  const data = window.PROTOTYPE_DATA;
  if (!data || !Array.isArray(data.pages)) return;

  data.pages = data.pages.filter((page) => pageIds.has(page.id));
  data.pages.forEach((page) => {
    if (page.id === 'NM06' || page.id === 'N11' || page.id === 'NM12') page.hiddenInNavigation = true;
  });
  data.project = '活动申请原型';
  data.version = 'P2 · 活动申请与审批';
})();
