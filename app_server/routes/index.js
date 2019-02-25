var express = require('express');
var router = express.Router();
var ctrlBlog = require('../controllers/blog');

/* Setup routes to pages */
router.get('/', ctrlBlog.index);
router.get('/list', ctrlBlog.list);
router.get('/add', ctrlBlog.add);

module.exports = router;
