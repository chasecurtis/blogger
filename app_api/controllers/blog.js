var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var moment = require('moment');
var request = require('request');
var apiOptions = {
	server: "http://localhost"
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
	console.log("Getting blogs list");
	Blog.find().exec(function (err, results) {
		if (!results) {
			sendJSONresponse (res, 404, {
				"message" : "No blogs found"
		});
		return;
		} else if (err) {
			console.log(err);
			sendJSONresponse (res, 404, err);
			return;
		}
		console.log(results);
		sendJSONresponse (res, 200, buildBlogList (req, res, results));
	});
};

var buildBlogList = function (req, res, results) {
	var blogs = [];
	results.forEach(function (obj) {
		blogs.push({
			blogTitle: obj.blogTitle,
			created: obj.created,
			blogAuthor: obj.blogAuthor, 
			blogText: obj.blogText,
			id: obj._id
		});
	});
	return blogs;
};

/* POST a new blog */
module.exports.createBlog = function (req, res) {
	console.log(req.body);
	Blog
		.create({
	blogTitle: req.body.blogTitle,
	created: moment().format('L'),
	blogAuthor: req.body.blogAuthor, //-- add/update not working as desired
	blogText: req.body.blogText
	}, function(err, Blog) {
	if (err) {
		console.log(err);
		sendJSONresponse(res, 400, err);
		} else {
		console.log(Blog)	
		sendJSONresponse(res, 201, Blog);
		}
	}
	);
};

/* GET a single blog given ID */
module.exports.loadBlog= function (req, res) {
	if(req.params && req.params.id) {
	Blog	
		.findById(req.params.id)
		.exec(function(err, Blog) {
			if(!Blog){
			sendJSONresponse(res, 404, {"message" : "blogid not found"});
			return;
			} else if (err) {
			console.log(err);
			sendJSONresponse(res, 404, err);
			return;
			}
			console.log(Blog);
			sendJSONresponse(res, 200, Blog);
			});		
	}else {
	console.log('No blogid specified');
	sendJSONresponse(res, 404, {"message" : "No blogid in request"}
	);
	}
};

/* update one blog given ID */
module.exports.updateBlog = function (req, res) {
    console.log("Updating a blog entry with id of " + req.params.id);
    console.log(req.body);
    Blog
        .findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                "blogTitle": req.body.blogTitle,
		"blogText": req.body.blogText,
                "blogAuthor": req.body.blogAuthor
            }
        },function (err, response) {
            if (err) {
                sendJSONresponse(res, 400, err);
            } else {
                sendJSONresponse(res, 201, response);
            }
        });
};

module.exports.deleteBlog= function(req, res) {
    console.log("Deleting blog entry with id of " + req.params.id);
    console.log(req.body);
	Blog.findByIdAndRemove(req.params.id).exec (
            function(err, response) {
                if (err) {
                            sendJSONresponse(res, 404, err);
                } else {
                            sendJSONresponse(res, 204, null);
                }
            }
        );
};                      


