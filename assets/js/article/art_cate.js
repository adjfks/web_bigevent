$(function () {
  // 获取layui相关对象
  const layer = layui.layer
  const form = layui.form

  // 获取分类列表
  getCategory()

  // 为添加类别按钮绑定点击事件
  let addIdx = null
  $('#btnAddCate').on('click', function () {
    addIdx = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html()
    })
  })

  // 通过代理给表单绑定提交事件
  $('body').on('submit', '#form-add', function (e) {
    // 阻止表单默认提交行为
    e.preventDefault()
    // 新增文章分类
    addCategory()
  })

  // 通过代理给修改按钮绑定点击事件
  let editIdx = null
  $('tbody').on('click', '#btn-edit', function () {
    editIdx = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#dialog-edit').html()
    })

    // 得到对应id
    const id = $(this).attr('data-id')

    // 发起ajax请求
    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + id,
      success: function (res) {
        form.val('form-edit', res.data)
      }
    })
  })

  // 通过代理给修改表单绑定提交事件
  $('body').on('submit', '#form-edit', function (e) {
    // 阻止表单默认提交行为
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $('#form-edit').serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('修改失败！')
        }
        // 关闭弹出层
        layer.close(editIdx)
        // 显示提示框
        layer.msg('修改成功~')
        // 更新数据
        getCategory()
      }
    })
  })

  // 通过代理给删除按钮绑定点击事件
  $('tbody').on('click', '#btn-del', function () {
    // 获取id
    const id = $(this).attr('data-id')

    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      //do something
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg('删除失败！')
          }
          // 弹出提示框
          layer.msg('删除成功!')
          layer.close(index)
          // 更新页面
          getCategory()
        }
      })
    })
  })

  // 获取分类列表函数
  function getCategory() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        // console.log(res)
        if (res.status !== 0) {
          return layer.msg('获取文章分类列表失败！')
        }

        // 使用模板引擎
        const htmlStr = template('cate_item', res)
        $('tbody').html(htmlStr)
      }
    })
  }

  // 新增文章分类函数
  function addCategory() {
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $('#form-add').serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('新增分类失败！')
        }
        layer.close(addIdx)
        layer.msg('新增文章分类成功~')
        // 更新页面
        getCategory()
      }
    })
  }
})
