var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
    blogTitle:
    {
	type: String,
	required: true
    },
    author:
    {
	type: String,
	required: true
    },
    createdOn:
    {
	type: Date,
	"default": Date.now
    },
    blogText:
    {
	type: String,
	required: true
    }
});

mongoose.model('blog', blogSchema);
