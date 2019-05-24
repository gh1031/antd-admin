const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var subscribe = new Schema({
  username: String,
  password: String,
  phoneNumber: Number,
  date: { default: Date.now, type: Date }
})

module.exports = mongoose.model('subscribe', subscribe);