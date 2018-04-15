var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({ 
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
  created_at: Date,
  updated_at: Date
});

module.exports = mongoose.model('users', userSchema)