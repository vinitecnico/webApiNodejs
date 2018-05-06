var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var statusSchema = new Schema({
    name: { type: String, required: true },
    userId: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('status', statusSchema)