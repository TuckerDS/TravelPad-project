/*jshint esversion: 6*/
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = new Schema({
  email      : {type:String, required:false},
  username   : {type:String, required:false},
  password   : {type:String, required:false},
  description: String,
  avatar     : { type: String, default: "http://2.bp.blogspot.com/-9UO2xj663Sk/Tnfn6eLTccI/AAAAAAAAAHM/eBoV-Iw3eVo/s1600/facebook%2Bsin%2Bfoto%2B3-701734.jpg" }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
