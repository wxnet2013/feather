## feather

A lightweight web framework based on koa.

### 路由设置
<https://github.com/alexmingoia/koa-router>

* router.get
* router.post

### 模版引擎
<https://github.com/queckezz/koa-views>
```
router.get('/u/:id', function* (next) {
	yield this.render('user', {
		'user': this.params.id
	});
});
```

