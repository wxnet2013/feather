var mongoose = require('mongoose'),
	post= require('../models/post');

//save post	
exports.save = function(req, res){  
	var title = req.body.t,
		content = req.body.c;
	var p = new post({
		'title': title,
		'content': content
	});
	p.save(function(){
		res.send('发表成功');
	});
};