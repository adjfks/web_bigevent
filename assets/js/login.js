$(function () {
  // 点击去注册按钮
  $('#sign-up').on('click', function () {
    $('.login-register').removeClass('block').addClass('none')
    $('.login-create').removeClass('none').addClass('block')
  })

  // 点击去登录按钮
  $('#sign-in').on('click', function () {
    $('.login-create').removeClass('block').addClass('none')
    $('.login-register').removeClass('none').addClass('block')
  })

  // 获取form对象
  const form = layui.form
  // 获取layer对象
  const layer = layui.layer
  // 自定义表单验证规则
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: function (value) {
      // value为添加了该校验值的input的值
      const pwd = $('.login-create [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致'
      }
    }
  })

  /* 提交注册表单信息 */
  $('#login-up').on('submit', function (e) {
    e.preventDefault()

    // 发起post请求
    $.post(
      '/api/reguser',
      {
        username: $('#login-up [name=username]').val(),
        password: $('#login-up [name=password]').val()
      },
      function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('注册成功，请登录~')
        // 切换到登录页面
        $('#sign-in').click()
      }
    )
  })

  /* 登录 */
  $('#login-in').on('submit', function (e) {
    // 阻止表单默认提交行为
    e.preventDefault()
    // 发起post请求
    $.ajax({
      url: '/api/login',
      method: 'POST',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败！')
        }

        // 将token存储到localStorage
        localStorage.setItem('token', res.token)
        layer.msg('登录成功！')
        // 跳转到后台主页
        location.href = '/index.html'
      }
    })
  })
})
