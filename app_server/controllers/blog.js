var express = require('express');
var router = express.Router();

/* GET home page */
module.exports.index = function(req, res) {
 res.render('index', { title: 'Chase Curtis Blog Site'});
};

/* GET list page */
module.exports.list = function(req, res) {
    res.render('list', { title: 'Blog List',
    blogs: [
	{
	    blogTitle: 'Hello, this is a test',
	    author: 'Chase',
	    createdOn:
	    {
		type: Date,
		"default": Date.now
	    },
	    blogText: 'Congratulations on reading this blog post. Well done.'
	},
	{
	    blogTitle: 'Second entry... nothing extraordinary!',
	    author: 'Chase',
	    createdOn:
	    {
		type: Date,
		"default": Date.now,
	    },
	    blogText: 'Told ya nothing exciting I wont lie to you!'
	},
	{
	    blogTitle: 'Holy cow!',
	    author: 'Chase',
	    createdOn:
	    {
		type: Date,
		"default": Date.now,
	    },
	    blogText: "I'm sure there's a holy cow somewhere in Lancaster.... hmmm."
	}]
		    });
};

/* GET add page */
module.exports.add = function(req, res) {
 res.render('list', { title: 'Blog Add'});
};
