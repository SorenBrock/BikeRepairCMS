var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name: String,
    description: String,
    isActive: {
        type: Boolean,
        default: false
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

var Category = mongoose.model('Category', categorySchema, 'Categories');

module.exports = Category;