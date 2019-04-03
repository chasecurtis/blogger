var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var Blog = new Schema({
    id: ObjectId,
    title: {type: String, required: true},
    created:{type: Date, default: Date.now},
    author: String,
    content: {type: String, required: true},
});

// Define Models
var blogModel = mongoose.model('Blog', Blog);

module.exports.blogModel = blogModel;

