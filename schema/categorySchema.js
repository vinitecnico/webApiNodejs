var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    categoryName: { type: String, required: true },
    img: { type: String, required: true },
    status: Boolean,
    created_at: Date,
    updated_at: Date
});

module.exports = mongoose.model('categories', categorySchema)