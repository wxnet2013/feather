var koa = require('koa');
var views = require('koa-views');
var path = require('path');

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
	return app;
};
