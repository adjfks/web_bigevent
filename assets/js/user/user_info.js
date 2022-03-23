$(function () {
  const form = layui.form
  const layer = layui.layer

  // 调用获取用户信息函数
  getUserInfo()

  // 添加表单验证功能
  form.verify({
    nickname: function (val) {
      if (val.length > 6) {
        return '昵称必须为1-6个字符！'
      }
    }
  })

  // 发起ajax请求获取用户基本信息
  function getUserInfo() {
    $.ajax({
      type: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取用户基本信息失败！')
        }

        // 为表单赋值
        form.val('userInfoForm', res.data)
      }
    })
  }

  // 重置按钮
  $('#btnReset').on('click', function (e) {
    // 阻止重置按钮默认行为
    e.preventDefault()
    // 重新获取用户信息
    getUserInfo()
  })

  // 提交修改
  $('.layui-form').on('submit', function (e) {
    // 阻止表单默认提交行为
    e.preventDefault()
    // 发起ajax请求
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('修改失败！')
        }
        layer.msg('修改成功！')
        // 更新表单信息
        getUserInfo()
        // 更新导航栏和头部的信息
        window.parent.getUserInfo()
      }
    })
  })
})
