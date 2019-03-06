var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var Blog = new Schema({
    id: ObjectId,
    title: {type: String, required: true},
    created: moment('02/05/2019', 'MM/DD/YYYY'),
    author: String,
    content: {type: String, required: true},
});

// Define Models
var blogModel = mongoose.model('Blog', Blog);

module.exports.blogModel = blogModel;

