var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
		secret: process.env.JWT_SECRET,
		userProperty: 'payload'
		});
var ctrlBlog = require('../controllers/blog');
var ctrlAuth = require('../controllers/auth');
// Include db config path
var db = require('../models/db');
// Include blogs schema path
var blogs = require('../models/blogs');
var users = require('../models/users');
// REST API //
router.get('/blogs', ctrlBlog.blogList);
router.post('/blogs', auth, ctrlBlog.createBlog);
router.get('/blogs/:id', ctrlBlog.loadBlog);
router.put('/blogs/:id', auth, ctrlBlog.updateBlog);
router.delete('/blogs/:id', auth, ctrlBlog.deleteBlog);
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
