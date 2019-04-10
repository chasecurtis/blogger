var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var Blog = new Schema({
    id: ObjectId,
    blogTitle: {type: String, required: true},
    created:{type: String, required: true},
    blogText: {type: String, required: true},
    blogAuthor: String
});

// Define Models
var blogModel = mongoose.model('Blog', Blog);

module.exports.blogModel = blogModel;

