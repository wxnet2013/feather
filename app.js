
/**
 * Module dependencies.
 */
var express = require('express');
var mongoose = require('mongoose');
var mongo = require('./mongo.json');

var http = require('http');
var path = require('path');
var app = express();

//share connection
var uri = 'mongodb://' + mongo.ip + ':' + mongo.port + '/post';
global.db = mongoose.createConnection(uri);

var routes = require('./routes');
var post = require('./routes/post');
var api = require('./routes/api');

// all environments
app.set('port', process.env.PORT || 8888);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');
app.set('layout', 'layout');
//app.set('partials', {footer: "footer",header: "header"});
if('production' == app.get('env')){
  app.enable('view cache');
}
app.engine('mustache', require('hogan-express'));

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//pages
//index
app.get('/blog', routes.index);
//detail
app.get('/blog/:id', post.post);
//write
app.get('/blog/post/write', post.write);

//apis
app.post('/blog/api/post/save', api.save);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
