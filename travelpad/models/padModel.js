/*jshint esversion: 6*/
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PadSchema = new Schema({
  type     : {type:String, required:true},
  location : {type:String},
  countries : {type:Array},
  description: String,
  pictureUrl     : { type: String, default: "http://img2.wikia.nocookie.net/__cb20120819040410/naruto/es/images/8/84/Sin_imagen_disponible.jpg" }
});

const Pad= mongoose.model('Pad', PadSchema);
module.exports = Pad;
