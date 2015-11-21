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
	// https://github.com/alexmingoia/koa-router
	var router = global.router = require('koa-router')();
	app.use(router.routes()).use(router.allowedMethods());
	
	var config = require(basePath + '/package.json');
	var redisConfig = require(basePath + '/redis.json');
	
	if(config.session && config.session.keys) {
		app.keys = [config.session.keys];
		app.use(session({
		  store: redisStore(redisConfig)
		}));
	}
	return app;
};
