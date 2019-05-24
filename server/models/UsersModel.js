var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
  avatar: String,
  name: String,
  nickName: String,
  age: Number,
  gender: String,
  phone: Number,
  email: String,
  address: String,
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now }
})

module.exports = mongoose.model('users', user);