var express = require('express');
var router = express.Router();
var ctrlBlog = require('../controllers/blog');

/* Setup routes to pages */
router.get('/', ctrlBlog.index);

router.get('/list', ctrlBlog.list);

router.get('/add', ctrlBlog.addGetBlog);
router.post('/add', ctrlBlog.addPostBlog);

router.get('/login', ctrlBlog.login);

router.get('/edit/:id', ctrlBlog.editGetBlog);
router.post('/edit/:id', ctrlBlog.editPutBlog);

router.get('/del/:id', ctrlBlog.deleteGetBlog);
router.post('/del/:id', ctrlBlog.deleteBlog);

module.exports = router;
