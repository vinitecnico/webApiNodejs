var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
  name: String,
  birthday: Date,
  cpf: { type: String, required: true, unique: true },
  phone: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  zipCode: String,
  adress: String,
  adressNumber: String,
  neighborhood: String,
  city: String,
  state: String,
  complement: String,
  subscribeNews: Boolean,
  token: String,
  userId: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('customers', customerSchema)