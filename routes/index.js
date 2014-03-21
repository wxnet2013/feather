var mongoose = require('mongoose'),
	post= require('../models/post'),
	async = require('async'),
	_ = require('underscore');
	
exports.index = function(req, res) {  
	var curPage = req.query.page || 1,
		listNum = 5;
	
	async.parallel({
		pager: function(callback){
			post.count(function(err,num){
				var pager = {
					curPage: curPage,
					total: num
				};
				pager.maxPage = Math.ceil(num / listNum);
				pager.list = _.range(1,pager.maxPage + 1);
				callback(err,pager);
			});
		},
		list: function(callback){
			post.find({})
				.skip((curPage - 1) * listNum)
				.limit(listNum)
				.sort('-_id')
				.exec(function(err,data){
					callback(err,data);
				});
		}
	},function(err,data){
		if (err) {
			res.send(500);
			return;
		}
		res.render('index',data);
	});
};