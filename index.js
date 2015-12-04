var koa = require('koa');
var views = require('feather-views');
var path = require('path');
var session = require('koa-generic-session');
var redisStore = require('koa-redis');

module.exports = function(){
	var app = koa();
	var basePath = path.dirname(module.parent.filename);
	app.use(views(basePath + '/views', {
	  map: {
	    html: 'hogan'
	  }
	}));
	
	
	var config = require(basePath + '/package.json');
	var redisConfig = require(basePath + '/redis.json');
	// https://github.com/koajs/koa-redis
	if(config.session && config.session.keys) {
		app.keys = [config.session.keys];
		app.use(session({
		  store: redisStore(redisConfig)
		}));
		// 页面加载后生成sessionid
		app.use(function *(next) {
		  this.session.name = 'koa-redis';
		  yield next;
		});
	}
	
	// https://github.com/alexmingoia/koa-router
	var router = global.router = require('koa-router')();
	app.use(router.routes({
		prefix: config.router && config.router.prefix ? config.router.prefix : '/'
	})).use(router.allowedMethods());
	
	return app;
};
