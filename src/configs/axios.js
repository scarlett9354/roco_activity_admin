import axios from 'axios'
import token from '@/utils/token'
import eventBus from '@/utils/eventBus'
import {
  ERROR as CODE_ERROR,
  NEED_LOGIN,
  NO_AUTHORITY
} from '@/constants/response-code'
import {
  Notification, Message
} from 'element-ui'
require('promise.prototype.finally').shim()

let promiseMap = {}
let cancel = null
const TOKEN_KEY = process.env.TOKEN_KEY
const CancelToken = axios.CancelToken

axios.defaults.headers.common[TOKEN_KEY] = token()
axios.interceptors.request.use(
  function(config) {
    // 发起请求时，取消掉当前正在进行的相同请求
    if(promiseMap[config.url]) {
      promiseMap[config.url]('操作取消，url：' + config.url)
      promiseMap[config.url] = null
    }else {
      promiseMap[config.url] = cancel
    }

    if(config.method === 'get') {
      if(!config.params) {
        config.params = {}
      }
      config.params._ = new Date().getTime()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function(response) {
    const token = response.headers[TOKEN_KEY]
    if(token) {
      window.localStorage.setItem(TOKEN_KEY, token)
      eventBus.$emit('emittedToken', token)
    }

    if(response.data.code === CODE_ERROR || response.data.code === NO_AUTHORITY) {
      Notification({
        type: 'error',
        title: '错误',
        message: response.data.message
      })
    }else if(response.data.code === NEED_LOGIN) {
      window.location = `login.html?_=${new Date().getTime()}`
    }
    return response
  },
  error => {
    if(axios.isCancel(error)) {
      // cancel 的不处理
    }else {
      if(error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== '-1') {
        Message.error('请求超时')
      }else if(error && error.response) {
        let str = '出现网络错误，请重试'
        switch(error.response.status) {
          case 400:
            str = '请求错误'
            break
          case 401:
            str = '未授权，请登录'
            break
          case 403:
            str = '拒绝访问'
            break
          case 404:
            str = `请求地址出错：${error.response.config.url}`
            break
          case 408:
            str = '请求超时'
            break
          case 500:
            str = '服务器内部错误'
            break
          case 501:
            str = '服务未实现'
            break
          case 502:
            str = '网关错误'
            break
          case 503:
            str = '服务不可用'
            break
          case 504:
            str = '网关超时'
            break
          case 505:
            str = 'HTTP版本不受支持'
            break
          default:
        }
        // 错误跳转
        if(window.location.href.indexOf('login') !== '-1') {
          // 登录页不做跳转处理
        }else {
          window.location.hash = `#/error?statusCode=${encodeURIComponent(error.response.status)}&message=${encodeURIComponent(str)}`
        }
        Message.error(str)
      }else {
        Message.error('出现网络错误，请重试')
      }
    }
    return Promise.reject(error)
  }
)

// 默认导出这个对象
export default {
  get(url, params, type) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params,
        cancelToken: new CancelToken((c) => {
          cancel = c
        })
      }).then((res) => {
        resolve(res)
      })
    })
  },
  post(url, data, type) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data,
        cancelToken: new CancelToken((c) => {
          cancel = c
        })
      }).then((res) => {
        resolve(res)
      })
    })
  }
}
