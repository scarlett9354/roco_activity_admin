export default {
  path: '/*',
  name: 'Base',
  redirect(to) {
    if(window._RouterList) {
      // 匹配全局变量是否已经有对应路由对象
      let _temp = to.path.replace(/\//g, '')
      let name = _temp.substring(0, 1).toUpperCase() + _temp.substring(1)
      let targetRouter = window._RouterList[name]
      if(targetRouter) {
        return {
          name: targetRouter.name
        }
      }else {
        return {
          name: 'Error',
          params: {
            statusCode: '404',
            message: '您请求的页面不存在'
          }
        }
      }
    }else {
      return {
        name: 'Error',
        params: {
          statusCode: '404',
          message: '您请求的页面不存在'
        }
      }
    }
  }
}
