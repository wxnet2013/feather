## feather

A lightweight web framework based on koa.


### 快速开始
app.js

```
var feather = require('koa-feather');

var app = feather();

router.get('/', function* (next){
	yield this.render('index',{});
});
```

### 路由设置
<https://github.com/alexmingoia/koa-router>

* router.get
* router.post

### 模版引擎
[feather-views](https://github.com/wxnet2013/feather-views)在[koa-views](https://github.com/queckezz/koa-views)的基础上做了简单的修改，以支持模版的layout。

```
router.get('/u/:id', function* (next) {
	yield this.render('user', {
		'user': this.params.id
	});
});
```

views/user.html

```
{{user}}
```

views/layout.html

```
{{>yield}}
```

### Session配置
在项目的package.json中添加配置信息
```
  "session": {
	  "keys": "your secret key"
  }
```

