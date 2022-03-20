// 每次调用$.get()、$.post() $.ajax()前都会先调用下面这个函数
$.ajaxPrefilter(function (options) {
  // 每次发送请求前拼接url
  options.url = 'http://www.liulongbin.top:3007' + options.url

  // 统一为有权限的接口设置headers
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }

    // 访问有权限的接口时需要验证登录
    // compelete不管success还是error都会调用
    options.complete = function (res) {
      if (res.responseJSON.status !== 0) {
        // 清除本地token
        localStorage.removeItem('token')
        // 进入登录页面
        location.href = '/login.html'
      }
    }
  }
})
