var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    categoryId: { type: String, required: true },
    productName: { type: String, required: true },
    description: String,
    img: { type: String, required: true },
    status: Boolean,
    price: { type: String, required: true },
    hasSlide: Boolean,
    hasHighlight: Boolean,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('products', productSchema)