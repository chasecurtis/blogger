var express = require('express');
var router = express.Router();

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
 res.render('list', { title: 'Blog Add'});
};
