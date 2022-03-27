$(function () {
  // 导入layui相应对象
  var layer = layui.layer
  var form = layui.form
  var laypage = layui.laypage

  // 定义格式化时间的过滤器
  template.defaults.imports.dataFormat = function (date) {
    const dt = new Date(date)

    const y = padZero(dt.getFullYear())
    const m = padZero(dt.getMonth() + 1)
    const d = padZero(dt.getDate())

    const hh = padZero(dt.getHours())
    const mm = padZero(dt.getMinutes())
    const ss = padZero(dt.getSeconds())

    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
  }

  // 定义补0函数
  function padZero(n) {
    return n > 9 ? n : '0' + n
  }

  // 定义查询参数
  var q = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: ''
  }

  initTable()
  initCate()

  // 为筛选表单绑定submit事件
  $('#form-filter').on('submit', function (e) {
    e.preventDefault()

    // 获取cate_id和state
    let cate_id = $('[name=cate_id]').val()
    let state = $('[name=state]').val()

    // 更新查询参数对象
    q.cate_id = cate_id
    q.state = state

    // 重新获取文章列表
    initTable()
  })

  // 发起请求获取文章列表数据
  function initTable() {
    $.ajax({
      method: 'GET',
      url: '/my/article/list',
      data: q,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取文章列表失败')
        }

        // 使用模板引擎渲染数据
        console.log(res)
        var htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)

        // 渲染分页
        renderPage(res.total)
      }
    })
  }

  // 删除文章
  $('tbody').on('click', '.btn-del', function () {
    // 获取删除按钮个数
    let len = $('.btn-del').length
    let id = $(this).attr('data-id')
    console.log(id)
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      //do something

      $.ajax({
        method: 'GET',
        url: '/my/article/delete/' + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg('删除文章失败~')
          }

          layer.msg('删除文章成功~')
          // 数据删除完成后判断当前页是否还有剩余数据，没有则页码值减一，再渲染数据
          if (len === 1) {
            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
          }
          initTable()
        }
      })

      layer.close(index)
    })
  })

  // 定义渲染分页的函数
  function renderPage(total) {
    //执行一个laypage实例
    laypage.render({
      elem: 'page',
      count: total,
      limit: q.pagesize,
      curr: q.pagenum,
      layout: ['count', 'limit', 'prev', 'page', 'skip', 'next'],
      limits: [2, 4, 6, 8, 10],
      jump: function (obj, first) {
        console.log(obj.curr)
        // 更新查询参数对象
        q.pagenum = obj.curr
        q.pagesize = obj.limit

        if (!first) {
          initTable()
        }
      }
    })
  }

  // 定义初始化分类的函数
  function initCate() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取文章分类失败~')
        }

        // 使用模板引擎渲染数据
        let htmlStr = template('tpl-cate', res)
        $('[name=cate_id]').html(htmlStr)
        // 通知layui重新渲染表单项
        form.render()
      }
    })
  }
})
