export default {
  path: '/error',
  name: 'Error',
  meta: {
    title: '错误',
    access: true
  },
  component: () => import('@/views/error/Error.vue')
}
