$(function () {
  // 引入layer
  const layer = layui.layer

  // 获取并渲染用户信息
  getUserInfo()

  // 退出按钮
  exit()
})

// 获取用户基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    success: function (res) {
      if (res.status !== 0) return layer.msg('获取用户信息失败！')
      // 渲染用户信息
      rederUserInfo(res.data)
    }
  })
}

// 渲染用户信息
function rederUserInfo(data) {
  const name = data.nickname || data.username
  const img = data.user_pic
  $('.user-avatar .welcome').html('欢迎&nbsp;&nbsp;' + name)
  if (img) {
    $('.user-avatar img').attr('src', img).show()
    $('.text-avatar').hide()
  } else {
    $('.user-avatar img').hide()
    const first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}

// 退出功能
function exit() {
  $('.exit').on('click', function () {
    layer.confirm('确认退出?', { icon: 3, title: '提示' }, function (index) {
      // 清除本地token
      localStorage.removeItem('token')
      // 退回到登录页面
      location.href = '/login.html'

      layer.close(index)
    })
  })
}
