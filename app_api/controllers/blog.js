var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var moment = require('moment');
// Include Mongoose DB
var db = require('../models/db');
// Include Blogs Model
var blogs = require('../models/blogs');

var sendJSONresponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.blogCreate = function (req, res) {
	sendJSONresponse(res, 200, {"status" : "success"});
};


module.exports.blogReadOne = function (req, res) {
	if(req.params && req.params.blogid) {
	blogs
		.findById(req.params.blogid)
		.exec(function(err, blog) {
			if(!blog){
			sendJSONresponse(res, 404, {"message" : "blogid not found"});
			return;
			} else if (err) {
			console.log(err);
			sendJSONresponse(res, 404, err);
			return;
			}
			console.log(blog);
			sendJSONresponse(res, 200, blog);
			});		
	}else {
	console.log('No blogid specified');
	sendJSONresponse(res, 404, {"message" : "No blogid in request"}
	);
	}
};
/* GET add page */
module.exports.add = function(req, res) {
 	res.render('add', { title: 'Blog Add'});
};

/* GET edit page */
module.exports.edit = function(req, res) {
    res.render('edit', {title: 'Edit Blog'});
};

/* GET delete page */
module.exports.del = function(req, res) {
    res.render('del', {title: 'Delete Blog'});
};

/* GET login page */
module.exports.login = function(req, res) {
    res.render('login', { title: 'Login'});
};

