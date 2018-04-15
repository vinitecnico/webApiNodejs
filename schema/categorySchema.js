var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({ 
    categoryName: { type: String, required: true },
    img: { type: String, required: true }
});

module.exports = mongoose.model('categories', categorySchema)