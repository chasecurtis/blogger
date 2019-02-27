var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
	blog-title: String,
	author: String,
	created-on: {
		type: Date,
		"default": Date.now
	}
	blog-text: String
});
