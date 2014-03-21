var mongoose = require('mongoose'),
	post= require('../models/post');
	
exports.write = function(req,res){
	res.render('write',{title:'发表'});
};

exports.post = function(req,res){
	post.findOne({
		'_id': mongoose.Types.ObjectId(req.params.id)
	},function(err,data){
		if (!data) {
			res.send(500);
			return;
		}
		res.render('post',data);
	});  
};