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
var blogs = require('../models/blogs');

var sendJSONresponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

/* POST a new blog */
module.exports.blogCreate = function (req, res) {
	console.log(req.body);
	blogModel
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
	if(req.params && req.params.blogid) {
	blogModel
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


/* PUT (update) one blog entry given ID */
module.exports.blogUpdateOne = function(req, res) {
    console.log("Updating a blog entry with id of " + req.params.id);
    console.log(req.body);
    blogModel
  	  .findOneAndUpdate(
	     { _id: req.params.id },
 	     { $set: {"Title": req.body.title}},
	     { $set: {"Author": req.body.author}},
	     { $set: {"Content": req.body.content}})
	     ,function(err, response) {
	         if (err) {
	  	         sendJSONresponse(res, 400, err);
	         } else {
		        sendJSONresponse(res, 201, response);
	        }
	    }
    };   

/* DELETE one blog given ID */
module.exports.blogDeleteOne = function(req, res) {
    console.log("Deleting blog entry with id of " + req.params.id);
    console.log(req.body);
    blogModel
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


/* GET blogs lists */      
module.exports.list = function(req, res){
    var requestOptions, path;
    path = '/api/blogs';
    requestOptions = { 
        url : apiOptions.server + path,
        method : "GET",
        json : {},
        qs : {} 
        };
    request(
        requestOptions,
        function(err, response, body) {
            renderListPage(req, res, body);
        }
    );
};

/* Render the blog list page */
var renderListPage = function(req, res, responseBody){
    res.render('blog-list', {
        title: 'Blog List',
        pageHeader: {
            title: 'Book List'
        },
        blogs: responseBody
    });
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

