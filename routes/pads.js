/*jshint esversion: 6*/
const express   = require('express');
const Pads      = require('../models/padModel');
const COUNTRIES = require('../models/countries');
const ObjectId  = require('mongoose').Types.ObjectId;
const router    = express.Router();
const multer    = require('multer');
let upload = multer({ dest: './public/uploads/' });
const { ensureLoggedIn }  = require('connect-ensure-login');
const fs = require('fs');

router.get('/', (req, res, next) => {
  Pads.find({}).exec( (err, pads) => {
    res.render('pads/show', { pads });
  });
});

router.post('/', upload.single('photo'), ensureLoggedIn('/login'), (req, res, next) => {
  let visibility = req.body.visible;
  const newPad = new Pads( {
    title: req.body.title,
    description: req.body.description,
    country: req.body.country,
    location: {type: "Point", coordinates: [req.body.lng, req.body.lat]},
    visible: visibility,
    pic_name: req.file ? req.file.originalname : "",
    pic_path: req.file ? `/uploads/${req.file.filename}`: "/uploads/empty.png" ,
    _travelId : req.body.travelId
  });
  newPad.save( (err) => {
    if (err) {
      console.log(err);
      res.render('pads/new', { pad: newPad, countries: COUNTRIES });
    } else {
      res.redirect('/travels/'+newPad._travelId);
    }
  });
});

router.get('/:id', (req, res) => {
  res.render('pads/index');
});

router.get('/new/:id', (req, res) => {
  let travelId = req.params.id;
  res.render('pads/new', { countries: COUNTRIES, travelId:travelId});
});

router.get('/delete/:id/:idTravel', (req, res, next) => {
  let id = req.params.id;
  //remove file from filesystem
  Pads.findOne({_id: id}, (err, pad) => {
    if (err) {
      return next(err);
    } else {
      fs.unlink('./public'+pad.pic_path,function(err){
        if (err) return console.log(err);
        console.log('file deleted successfully');
      });
    }
  });
  //remove pad from database
  Pads.findByIdAndRemove(id, (err, product) => {
    if (err){
      return next(err);
    } else {
     return res.redirect('/travels/'+req.params.idTravel);
    }
  });
});

module.exports = router;
