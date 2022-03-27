# 大事件项目
## ./assets/lib文件夹
1. cropper 图片裁剪插件
2. tinymce 富文本编辑器插件

## layui
导入layui的js和css文件，其提供了表单验证功能，给<form>标签添加'layui-form'类即可标识表单区域，给<input>添加'lay-verify'属性即可添加表单验证规则
1. form对象
```javascript
  //从layui中获取form对象
  const form = layui.form

  //添加表单验证规则
  form.verify({
    pwd: [/^[\S]{6-12}/,'密码必须6到12位，且不能出现空格']
  })
``` 

## api接口文档
1. 地址：`https://www.showdoc.com.cn/escook?page_id=3707158761215217`

## 登录
使用`location.href = '/index.html'`进行页面跳转

## baseApi.js
```javascript
// 每次调用$.get()、$.post() $.ajax()前都会先调用下面这个函数
$.ajaxPrefilter(function (options) {
  // 每次发送请求前拼接url
  options.url = 'http://www.liulongbin.top:3007' + options.url
  console.log(options.url)
})

```

## 提交login分支
提交login分支
`git push -u origin login`
将login分支合并到主分支，先切换到主分支
`git checkout master`
`git merge login`
提交到云端
`git push`

## 创建index分支
`git checkout -b index`


## iframe标签
`<iframe name="fm" src=""></iframe>`
name用来指定iframe标签的名称
src用于指定在iframe中显示的文档的url

使用不同<a>链接让iframe显示不同文档
`<a href="/1.html" target="fm"></a>`

## 登录验证
每次访问有权限接口时要进行身份认证，通过jquery的$.ajaxPrefilter()和ajax配置对象的complete回调实现。

## readonly属性
>如果在readonly输入元素上指定了属性，则由于用户无法编辑输入，因此该元素不参与约束验证。
>该readonly属性由text, search, url, tel, email, password, date, month, week, time,datetime-local和number \<input>types 和\<textarea>表单控件元素支持。如果出现在这些输入类型和元素中的任何一个上，则:read-only伪类将匹配。如果不包含该属性，则:read-write伪类将>匹配。

## 隐藏表单域
不会在页面上显示，但可以用于取值和赋值
`<input type="hidden" name="id" value="">`

## layui表单取值赋值功能
具体查看文档

## 在iframe中调用父窗口方法
`window.parent.getUserInfo()`

## 原生form表单元素的reset方法
```javascript
// 调用原生form表单元素的reset方法
$('.layui-form')[0].reset()
```

## 文件选择框accept属性
指定选择文件类型
```javascript
<!-- 隐藏的文件选择框 -->
<input type="file" class="btnChooseImage" accept="image/png,image/jpeg" />
```

## 创建选择文件对应的URL地址
```javascript
// 获取选择的图片
const file = fileList[0]
// 创建对应URL地址
var newImgURL = URL.createObjectURL(file)
```

## base64格式图片
优点：不需要发起额外请求获取图片
缺点：文件体积会比原来大30%左右
适用于小图片

## 推送新分支到仓库
第一次推送的分支要加-u参数
`git push -u origin user`

## 新插件express 0.05
更改代码后保持在当前页面，浏览器右键按下'f'刷新iframe里的内容

## 在script标签中写html结构


## 通过代理形式为弹出层表单绑定submit事件
绑定在body身上，代理到form表单

## 记得阻止表单默认提交行为

## layui的form.render()方法
当我们动态渲染一些需要js的表单项时，例如下拉表单，需要在渲染完成后调用该方法才能生效
```javascript
// 使用模板引擎渲染数据
let htmlStr = template('tpl-cate', res)
$('[name=cate_id]').html(htmlStr)
// 通知layui重新渲染表单项
form.render()
```

## layui分页功能
jump回调有两种触发方式：
一是调用laypage.render时
二是点击切换分页时
使用jump回调的第二个参数可以判断是哪种触发方式

## 提交FormData注意事项
```javascript
data: fd,
// 注意：如果向服务器提交的是FormData格式数据，必须添加以下两个配置项
contentType: false,
processData: false,
```
