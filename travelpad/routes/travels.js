/*jshint esversion: 6*/
const express   = require('express');
const Travels    = require('../models/travelModel');
const Pads    = require('../models/padModel');
const COUNTRIES = require('../models/countries');
const ObjectId  = require('mongoose').Types.ObjectId;
const router    = express.Router();

const { ensureLoggedIn }  = require('connect-ensure-login');

router.get('/', ensureLoggedIn('/login'), (req, res, next) => {
  const user = req.user;
  console.log(user);
  Travels.find({})
  .populate('_userId')
  .exec( (err, travels) => {
    res.render('travels/show', { travels });
  });
});

router.get('/mytravels', ensureLoggedIn('/login'), (req, res, next) => {
  const user = req.user;
  console.log(user);
  Travels.find({_userId: req.user._id})
  .populate('_userId')
  .exec( (err, travels) => {
    res.render('travels/show', { travels });
  });
});


router.post('/', ensureLoggedIn('/login'), (req, res, next) => {
  const newTravel = new Travels( {
    title: req.body.title,
    description: req.body.description,
    travelDate: new Date(req.body.travelDate),
    countries: req.body.country,
    _userId : req.user._id
  });

  newTravel.save( (err) => {
    if (err) {
      res.render('travels/new', { travel: newTravel, countries: COUNTRIES });
    } else {
      res.redirect('/travels');
      //res.redirect(`/travel/${newTravel._id}`);
    }
  });
});

router.get('/new', ensureLoggedIn('/login'), (req, res) => {
  console.log("User ID: "+req.user);
  res.render('travels/new', { countries: COUNTRIES });
  //res.render('travels/new');
});
router.get('/:id', ensureLoggedIn('/login'), (req, res, next) => {
  let id = req.params.id;
  let tra;
  Travels.find({_id: id})
  .populate('_userId')
  .exec( (err, travels) => {
    if (travels[0]._userId._id+"" == req.user._id+""){
      Pads.find({'_travelId': id})
      .exec( (err, pads) => {
        res.render('travels/detail', { travels: travels, pads: pads});
      });
    }else{
      Pads.find({'_travelId': id, visible: true})
      .exec( (err, pads) => {
        res.render('travels/detail', { travels: travels, pads: pads});
      });
    }

  });
});

router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  Travels.findByIdAndRemove({_id: id}, (err, product) => {
  if (err){
    return next(err);
  } else {
    Pads.remove({'_travelId': id}).exec();

    //return next(res);

    res.status(200).send();
   //return res.redirect('/travels');
   //return res.render('/travels/show');
  }
  });
  //res.render('travels/new');
});


module.exports = router;
