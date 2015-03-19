## feather

A lightweight web framework based on koa.

### 路由设置
<https://github.com/alexmingoia/koa-router>

* router.get
* router.post

### 模版引擎
feather-views在koa-views的基础上做了简单的修改，以支持模版layout
<https://github.com/wxnet2013/feather-views>
<https://github.com/queckezz/koa-views>

```
router.get('/u/:id', function* (next) {
	yield this.render('user', {
		'user': this.params.id
	});
});
```
views/user.html
```
<div>{{username}}</div>
```

views/layout.html
```
<body>
{{>yield}}
</body>
```

