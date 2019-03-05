var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var Blog = new Schema({
    id: ObjectId,
    title: {type: String, required: true},
    created: {type: Date, default: Date.now},
    author: String,
    content: {type: String, required: true},
});


/*
var BlogListSchema = new Schema({
    id: ObjectId,
    category: {type: String, default: ''},
    blogs : [ {type: mongoose.Schema.ObjectId, ref: 'Blog'} ]
});

BlogSchema.add({
    id: ObjectId,
    title: {type: String, required: true},
    createdOn: {type: Date, default: Date.now},
    author: String,
    content: {type: String, required: true},
    list: [ BlogListSchema ]
});

BlogListSchema.add({
    id: ObjectId,
    category: {type: String, default: ''},
    blogs : [ BlogSchema ]
});
*/

// Define Models
var blogModel = mongoose.model('Blog', Blog);
//var BlogList = mongoose.model('BlogList', BlogListSchema);

exports.blogModel = blogModel;
//exports.BlogList = BlogList;
// Export both schemas
/*module.exports = {
    Blog: mongoose.model('Blog', BlogSchema),
    List: mongoose.model('List', BlogListSchema)
};*/

