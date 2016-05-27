var koa = require('koa');
var views = require('feather-views');
var path = require('path');
var session = require('koa-generic-session');
var redisStore = require('koa-redis');
var conditional = require('koa-conditional-get');
var etag = require('koa-etag');
var compress = require('koa-compress')

module.exports = function(){
	var app = koa();
  
  // compress
  app.use(compress({
    filter: function (content_type) {
    	return /text/i.test(content_type)
    },
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
  }));
  
  // etag start
  app.use(conditional());
  app.use(etag());
  
	var basePath = path.dirname(module.parent.filename);
	app.use(views(basePath + '/views', {
	  map: {
	    html: 'hogan'
	  }
	}));
	
	
	var config = require(basePath + '/package.json');
	// https://github.com/koajs/koa-redis
	if(config.session && config.session.keys) {
    var redisConfig = require(basePath + '/redis.json');
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
	app.use(router.routes()).use(router.allowedMethods());
	
	return app;
};
