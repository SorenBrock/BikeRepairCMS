var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var contentSchema = new Schema({
    name: String,
    text: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    isActive: {
        type: Boolean,
        default: false
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

var Content = mongoose.model('Content', contentSchema, 'Content');

module.exports = Content;