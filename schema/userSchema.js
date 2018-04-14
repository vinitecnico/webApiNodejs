// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },  
  location: String,
  token: String,
  created_at: Date,
  updated_at: Date
});

module.exports = mongoose.model('users', userSchema)