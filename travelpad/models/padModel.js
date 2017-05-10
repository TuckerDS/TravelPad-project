/*jshint esversion: 6*/
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const COUNTRIES = require('./countries');

const PadSchema = new Schema({
  title:        {type:String, required:true},
  description:  String,
  location:     { type: { type: String, default: "Point" }, coordinates: [Number] },
  country:      { type: String, enum: COUNTRIES, required: true },
  pic_name:     String,
  pic_path:     String,
  //pictureUrl:   { type: String, default: "http://img2.wikia.nocookie.net/__cb20120819040410/naruto/es/images/8/84/Sin_imagen_disponible.jpg" },
  _travelId     : { type: Schema.Types.ObjectId, ref: 'TravelModel', required: true },
});

const PadModel= mongoose.model('pad', PadSchema);
module.exports = PadModel;
