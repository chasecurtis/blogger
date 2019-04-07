var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var Blog = new Schema({
    id: ObjectId,
    title: {type: String, required: true},
    created:{type: String, required: true},
    //author: String, -- add/update not working as desired
    content: {type: String, required: true}
});

// Define Models
var blogModel = mongoose.model('Blog', Blog);

module.exports.blogModel = blogModel;

