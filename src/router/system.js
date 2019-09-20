export default {
  path: '/system',
  name: 'System',
  title: '系统设置',
  icon: 'fa fa-cogs',
  meta: {
    access: null
  },
  children: [{
    path: '/system/platform',
    name: 'SystemPlatform',
    title: '对接系统平台管理',
    parent: 'System',
    meta: { access: null, title: '对接系统平台管理' },
  }]
}
