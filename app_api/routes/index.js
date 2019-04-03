var express = require('express');
var router = express.Router();
var ctrlBlog = require('../controllers/blog');
// Include db config path
var db = require('../models/db');
// Include blogs schema path
var blogs = require('../models/blogs');
// Define blog schema
var blog = new blogs.blogModel();

// REST API //
router.get('/blogs', ctrlBlog.blogList);
router.post('/blogs', ctrlBlog.blogCreate);
router.get('/blogs/:id', ctrlBlog.blogReadOne);
router.put('/blogs/:id', ctrlBlog.blogUpdateOne);
router.delete('/blogs/:id', ctrlBlog.blogDeleteOne);

module.exports = router;
