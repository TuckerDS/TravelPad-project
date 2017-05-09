/*jshint esversion: 6*/
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const TravelSchema = new Schema({
  title                : {type:String, required:true},
  location         : {type:String},
  description    : String,
  timestampt    : {type: Date},
  pictureUrl     : { type: String, default: "http://img2.wikia.nocookie.net/__cb20120819040410/naruto/es/images/8/84/Sin_imagen_disponible.jpg" }
});

const Travel = mongoose.model('Travel', TravelSchema);
module.exports = Travel;
