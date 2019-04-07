var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var moment = require('moment');
var request = require('request');
// Include Mongoose DB
var db = require('../../app_api/models/db');
// Include Blogs Model
var blogs = require('../../app_api/models/blogs');
var apiOptions = {
	server: "http://localhost"
	};

/* GET home page */
module.exports.index = function(req, res) {
	res.render('index', { title: 'Chase Curtis Blog Site'});
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

/* Render the blogs list page */
var renderListPage = function(req, res, responseBody){
    	console.log("Inside view controller " + responseBody);
	res.render('list', {
        title: 'Blog List',
        pageHeader: {
            title: 'Blog List'
        },
        blogs: responseBody
    });
};          
    
/* GET add page */
module.exports.addGetBlog = function(req, res) {
 	res.render('add', { title: 'Blog Add'});
};

/* Blog Add Post */
module.exports.addPostBlog = function(req, res){
    var requestOptions, path, postdata;
    path = '/api/blogs/';

    postdata = {
        title: req.body.title,
        author: req.body.author,
	created: Date.now(),
	content: req.body.content 
    }; 

    requestOptions = {
      url : apiOptions.server + path,
      method : "POST",
      json : postdata
    };
    
    request(
      requestOptions,
      function(err, response, body) {
         if (response.statusCode === 201) {
              res.redirect('/list');
         } else {
              _showError(req, res, response.statusCode);
         } 
      }
    ); 
};                    


/* Blog Edit */
module.exports.editGetBlog = function(req, res) {
    var requestOptions, path;
    console.log("Getting edit page with id: " + req.params.id);
    path = "/api/blogs/" + req.params.id;
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {}
    };
    request(
        requestOptions,
        function(err, response, body) {
	  if(err) {
	     console.log(err);
	  } else {
	     console.log(response.statusCode);
                renderEditPage(req, res, body);
	}
      }	
    );
};
module.exports.editPutBlog = function (req, res){
	console.log("Updating blog " + req.params.id);
	var requestOptions, path, postdata;
	path = "/api/blogs/" + req.params.id;

	postdata = {
		title: req.body.title,
		author: req.body.author,
		content: req.body.content
	};

	requestOptions = {
		url: apiOptions.server + path,
		method: "PUT",
		json: postdata
	};
	
	request (
		requestOptions,
		function(err, response, body) {
			if(!err && response.statusCode === 201) {
				res.redirect('/list');
			} else {
				_showError (req, res, response.statusCode);
			}
		}
	);
};	              

var renderEditPage = function(req, res, blogEditRes){
    res.render('edit', {
        pageHeader: {
            title: 'Blog List'
	},
	blogEditRes: blogEditRes,
	title: blogEditRes.title,
	created: blogEditRes.created,
	author: blogEditRes.author,
	content: blogEditRes.content,
	id: blogEditRes._id
    });
}; 

/* Blog Edit Post */
module.exports.editPutBlog = function(req, res){
    var requestOptions, path, postdata;
    var blogid = req.params.id;
    path = '/api/blogs/' + blogid;

    postdata = {
        title: req.body.title,
        author: req.body.author,
	content: req.body.content
    };

    requestOptions = {
        url : apiOptions.server + path,
        method : "PUT",
        json : postdata
    };

    request(
	requestOptions,
        function(err, response, body) {
            if (response.statusCode === 201) {
                res.redirect('/list');
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

/* Blog Delete Post */
module.exports.deleteGetBlog = function(req, res) {
   var requestOptions, path;
   path = "/api/blogs/" + req.params.id;
    requestOptions = {       
        url : apiOptions.server + path,
        method : "GET",
        json : {}
    };
        request(
	requestOptions,
        function(err, response, body) {
	  if(err) {
	    console.log(err);
	  }
	  else if (response.statusCode === 200) {
	    console.log(body)
            renderDeleteBlog(req, res, body);
          }
	  else {
	    console.log(response.statusCode);
	  }	
   });
};

/* Render the blogs delete page */
var renderDeleteBlog = function(req, res, destructBlog){
        res.render('del', {
        pageHeader: {
                title: 'Delete Blog'
        },
        destructBlog: destructBlog,
	id: destructBlog._id,
	title: destructBlog.title,
	created: destructBlog.created,
	author: destructBlog.author,
	content: destructBlog.content
    });
};


/* blogDelete method  DELETE  */
module.exports.deleteBlog = function(req, res){
    var requestOptions, path, postdata;
    var blogid = req.params.id;
    path = '/api/blogs/' + blogid;

    requestOptions = {
	url : apiOptions.server + path,
        method : "DELETE",
        json : {}
    };

	request(
        requestOptions,
        function(err, response, body) {
            if (response.statusCode === 204) {
                res.redirect('/list');
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};               
/* GET login page */
module.exports.login = function(req, res) {
    res.render('login', { title: 'Login'});
};

