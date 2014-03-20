// 项目数据库
var Schema = require('mongoose').Schema,
	postSchema = new Schema({
		"title": String,
		"content": String
	});
	module.exports = db.model('post', postSchema);

