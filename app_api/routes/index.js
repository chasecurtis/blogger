var express = require('express');
var router = express.Router();
var ctrlBlog = require('../controllers/blog');
// Include db config path
var db = require('../models/db');
// Include blogs schema path
var blogs = require('../models/blogs');

// REST API //
router.get('/blogs', ctrlBlog.blogList);
router.post('/blogs', ctrlBlog.createBlog);
router.get('/blogs/:id', ctrlBlog.loadBlog);
router.put('/blogs/:id', ctrlBlog.updateBlog);
router.delete('/blogs/:id', ctrlBlog.deleteBlog);

module.exports = router;
