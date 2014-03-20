var mongoose = require('mongoose'),
	post= require('../models/post');
	
exports.index = function(req, res){  
	post.find({},function(err,data){
		if (!data) {
			res.send(500);
			return;
		}
		res.render('index',{list:data});
	});
};