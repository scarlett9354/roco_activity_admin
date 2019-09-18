export default {
  path: '/',
  name: 'Home',
  meta: {
    title: '首页',
    access: true
  },
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    name: 'HomeDashboard',
    meta: {
      title: '首页',
      access: true
    },
    parent: 'Home',
    component: () => import('@/views/home/Dashboard.vue')
  }]
}
