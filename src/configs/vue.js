import Vue from 'vue'
const BASE_URL = process.env.BASE_URL
/**
 * 处理错误信息, 进行错误上报
 * @param err 错误对象
 * @param vm Vue实例
 * @param info 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
 */
Vue.config.errorHandler = function(err, vm, info) {
  console.error(err)
  var msg = '错误信息：' + err.message
  msg += '堆栈信息：' + err.stack
  var img = document.createElement('img')
  img.src = `${BASE_URL}/adm/api/log/js?errorMsg=${encodeURIComponent(msg)}`
}

window.onerror = function(errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
  console.error(errorMessage)
  // 不处理 ResizeObserver 错误
  if (errorMessage.indexOf('ResizeObserver') === -1) {
    var msg = '错误信息：' + errorMessage.toString()
    msg += '出错文件：' + scriptURI.toString()
    msg += '出错行号：' + lineNumber.toString()
    msg += '出错列号：' + columnNumber.toString()
    var img = document.createElement('img')
    img.src = `${BASE_URL}/adm/api/log/js?errorMsg=${encodeURIComponent(msg)}`
  }
}
