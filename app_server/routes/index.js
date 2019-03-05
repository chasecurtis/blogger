var express = require('express');
var router = express.Router();
var ctrlBlog = require('../controllers/blog');
// Include db config path
var db = require('../models/db');
// Include blogs schema path
var blogs = require('../models/blogs');
// Define blog schema
var blog = new blogs.blogModel();

/* Setup routes to pages */
router.get('/', ctrlBlog.index);
router.get('/list', ctrlBlog.list);
router.get('/add', ctrlBlog.add);
router.get('/login', ctrlBlog.login);
router.get('/edit', ctrlBlog.edit);
router.get('/del', ctrlBlog.del);


module.exports = router;
