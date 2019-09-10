let proxyDev = {
  '/api/*': {
    target: 'http://localhost:9091'
  }
}
let mockProxy = {
  '/api/*': {
    target: 'http://easymock.rocoinfo.cn/mock/5d5ce42fdc3b4100161bf830/roco_activity_admin'
  }
}
let argv
try {
  argv = JSON.parse(process.env.npm_config_argv).original
} catch(ex) {
  argv = process.argv
}
let proxy = argv[1] === 'mock' ? mockProxy : proxyDev