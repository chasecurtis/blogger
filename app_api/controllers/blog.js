var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var moment = require('moment');
var request = require('request');
var apiOptions = {
	server: "http://localhost:3000"
	};
// Include Mongoose DB
var db = require('../models/db');
// Include Blogs Model
var Blog = mongoose.model('Blog');

var sendJSONresponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.blogList = function (req, res) {
	Blog.find().exec(function (err, results) {
		if (!results) {
			sendJSONresponse (res, 404, {
				"message" : "No blogs found"
		});
		} else if (err) {
			sendJSONresponse (res, 404, err);
			return;
		}
		sendJSONresponse (res, 200, buildBlogList (req, res, results));
	});
};

var buildBlogList = function (req, res, results) {
	var blogs = [];
	results.forEach(function (obj) {
		blogs.push({
			title: obj.title,
			created: obj.created,
			author: obj.author,
			content: obj.content,
			id: obj.id
		});
	});
	return blogs;
};

/* POST a new blog */
module.exports.blogCreate = function (req, res) {
	console.log(req.body);
	Blog
		.create({
	title: req.body.title,
	created: req.body.created,
	author: req.body.author,
	content: req.body.content
	}, function(err, blog) {
	if (err) {
		console.log(err);
		sendJSONresponse(res, 400, err);
		} else {
		console.log(blog)	
		sendJSONresponse(res, 201, blog);
		}
	}
);
};

/* GET a single blog given ID */
module.exports.blogReadOne = function (req, res) {
	if(req.params && req.params.id) {
	Blog	
		.findById(req.params.id)
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


/* PUT (update) one blog entry given ID */
module.exports.blogUpdateOne = function(req, res) {
    console.log("Updating a blog entry with id of " + req.params.id);
    console.log(req.body);
    Blog
	.findOneAndUpdate(
	     { _id: req.params.id },
 	     { $set: {"title": req.body.title, "author": req.body.author, "content": req.body.content}}
	     ,function(err, response) {
	         if (err) {
	  	         sendJSONresponse(res, 400, err);
	         } else {
		        sendJSONresponse(res, 201, response);
	        }
	    }
	);    
};   

/* DELETE one blog given ID */
module.exports.blogDeleteOne = function(req, res) {
    console.log("Deleting blog entry with id of " + req.params.id);
    console.log(req.body);
	Blog 
        .findByIdAndRemove(req.params.id)
        .exec (
            function(err, response) {
                if (err) {
                            sendJSONresponse(res, 404, err);
                } else {
                            sendJSONresponse(res, 204, null);
                }
            }
        );
};                      


