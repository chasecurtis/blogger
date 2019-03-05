var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// Include Mongoose DB
var db = require('../models/db');
// Include Blogs Model
var blogs = require('../models/blogs');

/* GET home page */
module.exports.index = function(req, res) {
	res.render('index', { title: 'Chase Curtis Blog Site'});
};

/* GET list page */
module.exports.list = function(req, res) {
    res.render('list', { title: 'Blog List'});
};


/* GET add page */
module.exports.add = function(req, res) {
 	res.render('add', { title: 'Blog Add'});
};

/* GET login page */
module.exports.login = function(req, res) {
 	res.render('login', { title: 'Login'});
};
