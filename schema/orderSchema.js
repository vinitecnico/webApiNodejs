var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    orderId: { type: Number, required: true, unique: true },
    status: {
        _id: String,
        name: String,
    },
    userId: { type: String, required: true },
    zipCode: String,
    adress: String,
    adressNumber: String,
    neighborhood: String,
    city: String,
    state: String,
    complement: String,
    payment: {
        _id: { type: String, required: true },
        name: { type: String, required: true },
    },
    description: String,
    //troco
    change: Number,
    products: [
        {
            IdCardapio: { type: String, required: true },
            quantity: { type: Number, required: true }
        }
    ],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('orders', orderSchema)