var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tagSchema = new Schema({
    name: String,
    isActive: {
        type: Boolean,
        default: false
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

var Tag = mongoose.model('Tag', tagSchema, 'Tags');

module.exports = Tag;