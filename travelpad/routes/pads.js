/*jshint esversion: 6*/
const express   = require('express');
const Pads      = require('../models/padModel');
const COUNTRIES = require('../models/countries');
const ObjectId  = require('mongoose').Types.ObjectId;
const router    = express.Router();
const multer    = require('multer');
let upload = multer({ dest: './public/uploads/' });

//const { ensureLoggedIn }  = require('connect-ensure-login');

router.get('/', (req, res, next) => {
  Pads.find({}).exec( (err, pads) => {
    res.render('pads/show', { pads });
  });
});

router.post('/', upload.single('photo'), (req, res, next) => {
  console.log(req.body);
  const newPad = new Pads( {
    title: req.body.title,
    description: req.body.description,
    country: req.body.country,
    location: {type: "Point", coordinates: [req.body.lng, req.body.lat]},
    pic_name: req.file.originalname,
    pic_path: `/uploads/${req.file.filename}`,
    _travelId : req.body.travelId
  });
  console.log(newPad);
  newPad.save( (err) => {
    if (err) {
      console.log(err);
      res.render('pads/new', { pad: newPad, countries: COUNTRIES });
    } else {
      res.redirect('/pads/'+newPad._travelId);
      //res.redirect(`/travel/${newTravel._id}`);
    }
  });
});

router.get('/:id', (req, res) => {
  //let travelId = req.params.id;
  //console.log("TRAVELID " + travelId);
  res.render('pads/index');
});

router.get('/new/:id', (req, res) => {
  let travelId = req.params.id;
  console.log("TRAVELID " + travelId);
  res.render('pads/new', { countries: COUNTRIES, travelId:travelId});
});

router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  Pads.findByIdAndRemove(id, (err, product) => {
  if (err){
    return next(err);
  } else {
    //console.log(res);
    //return next(res);
   return res.redirect('/pads/show');
   //return res.render('/travels/show');
  }
  });
  //res.render('travels/new');
});


module.exports = router;
