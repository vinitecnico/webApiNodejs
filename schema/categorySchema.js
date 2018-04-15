var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    categoryName: { type: String, required: true },
    img: { type: String, required: true },
    status: Boolean,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('categories', categorySchema)