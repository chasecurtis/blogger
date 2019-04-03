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
	server: "http://localhost:3000"
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
    res.render('list', {
        title: 'Blog List',
        pageHeader: {
            title: 'Blog List'
        },
        blogs: responseBody
    });
};          

/* Blog Show */
module.exports.edit = function(req, res) {
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
                renderShowPage(req, res, body);
	}
    );
};

/* Render the blog show page */
var renderShowPage = function(req, res, responseBody){
    res.render('blogShow', {
        title: 'Blog Info',
        pageHeader: {
                title: 'Blog Info'
        },
        blogs: responseBody
    });
};     

              
/* GET add page */
module.exports.add = function(req, res) {
 	res.render('add', { title: 'Blog Add'});
};

/* Blog Add Post */
module.exports.addPost = function(req, res){
    var requestOptions, path, postdata;
    path = '/api/blogs/';

    postdata = {
        bookTitle: req.body.bookTitle,
        bookAuthor: req.body.bookAuthor
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
module.exports.edit = function(req, res) {
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
                renderEditPage(req, res, body);
        }
    );
};


/* Render the book edit page */
var renderEditPage = function(req, res, responseBody){
    res.render('edit', {
        title: 'Edit Blog',
        pageHeader: {
            title: 'Edit Blog'
        },
        blogs: responseBody
    });
};


/* Blog Edit Post */
module.exports.editPost = function(req, res){
    var requestOptions, path, postdata;
    var id = req.params.id;
    path = '/api/blogs/' + id;

    postdata = {
        title: req.body.title,
        author: req.body.author
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
        
/* GET edit page */
module.exports.edit = function(req, res) {
    res.render('edit', {title: 'Edit Blog'});
};

/* Blog Delete */
module.exports.del = function(req, res) {
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
            renderDeletePage(req, res, body);
        }
    );
};

/* Render the blogs delete page */
var renderDeletePage = function(req, res, responseBody){
        res.render('del', {
        title: 'Delete Blog',
        pageHeader: {
                title: 'Delete Blog'
        },
        blogs: responseBody
    });
};

/* Blog Delete Post */
module.exports.deletePost = function(req, res){
    var requestOptions, path, postdata;
    var id = req.params.id;
    path = '/api/blogs/' + id;

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

/* GET delete page */
module.exports.del = function(req, res) {
    res.render('del', {title: 'Delete Blog'});
};

/* GET login page */
module.exports.login = function(req, res) {
    res.render('login', { title: 'Login'});
};

