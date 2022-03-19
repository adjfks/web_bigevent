// 每次调用$.get()、$.post() $.ajax()前都会先调用下面这个函数
$.ajaxPrefilter(function (options) {
  // 每次发送请求前拼接url
  options.url = 'http://www.liulongbin.top:3007' + options.url
  console.log(options.url)
})
