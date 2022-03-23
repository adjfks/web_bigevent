$(function () {
  // 获取layui相关对象
  const form = layui.form
  const layer = layui.layer

  // 自定义密码校验规则
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须为6-12个字符且不包含空格'],
    samePwd: function (value) {
      if (value === $('[name=oldPwd]').val()) {
        return '新旧密码不能相同！'
      }
    },
    rePwd: function (value) {
      if (value !== $('[name=newPwd]').val()) {
        return '两次密码不一致！'
      }
    }
  })

  // 立即修改按钮
  $('.layui-form').on('submit', function (e) {
    // 阻止表单默认提交行为
    e.preventDefault()
    // 发起ajax请求
    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('修改密码失败！')
        }
        // 调用原生form表单元素的reset方法
        $('.layui-form')[0].reset()

        return layer.msg('修改成功！')
      }
    })
  })
})
