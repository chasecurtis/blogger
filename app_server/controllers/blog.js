var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var moment = require('moment');
// Include Mongoose DB
//var db = require('../models/db');
// Include Blogs Model
//var blogs = require('../models/blogs');

/* GET home page */
module.exports.index = function(req, res) {
	res.render('index', { title: 'Chase Curtis Blog Site'});
};

/* GET list page */
module.exports.list = function(req, res) {
    res.render('list', {
	title: 'Blog List',
	blogs: [{
	    title: "Lessons from Mongo",
	    created: {type: Date, default: Date.now},
	    author: "Chase",
	    content: "Hello, Mongo is very interesting it is not a relational database. That is all."
	},
	{
	    title: "Lessons from Mongo #2",
	    created: {type: Date, default: Date.now},
	    author: "Chase",
	    content: "Hello. Mongo stores data as documents. Thanks."
	},
	{
	    title: 'Holy cow!',
	    created: {type: Date, default: Date.now},
	    author: 'Chase',
	    content: "I'm sure there's a holy cow somewhere in Lancaster.... hmmm."
	}]

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

