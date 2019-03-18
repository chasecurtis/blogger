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
router.post('/api/blogs/:blogid', ctrlBlog.blogCreate);
router.get('/api/blogsList', ctrlBlog.blogsListByCreation);
router.get('/api/blogs/:blogid', ctrlBlog.blogReadOne);
router.put('/api/blogs/:blogid', ctrlBlog.blogUpdateOne);
router.delete('/api/blogs/:blogid', ctrlBlog.blogDeleteOne);


/* Setup routes to pages 
router.get('/', ctrlBlog.index);
router.get('/list', ctrlBlog.list);
router.get('/add', ctrlBlog.add);
router.get('/login', ctrlBlog.login);
router.get('/edit', ctrlBlog.edit);
router.get('/del', ctrlBlog.del);
*/

module.exports = router;
