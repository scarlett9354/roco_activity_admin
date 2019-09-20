export default {
  path: '/',
  title: '首页',
  name: 'Home',
  isSingle: true,
  icon: 'fa fa-tachometer',
  meta: {
    access: true
  },
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    title: '首页',
    name: 'HomeDashboard',
    icon: 'fa fa-tachometer fa-2',
    meta: {
      access: true
    },
    parent: 'Home',
    component: () => import('@/views/home/Dashboard.vue')
  }]
}
