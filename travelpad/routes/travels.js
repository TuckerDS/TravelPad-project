/*jshint esversion: 6*/
const express   = require('express');
const Travels    = require('../models/travelModel');
const COUNTRIES = require('../models/countries');
const ObjectId  = require('mongoose').Types.ObjectId;
const router    = express.Router();

const { ensureLoggedIn }  = require('connect-ensure-login');

router.get('/', (req, res, next) => {
  Travels.find({}).exec( (err, travels) => {
    res.render('travels/show', { travels });
  });
});

router.post('/', ensureLoggedIn('/login'), (req, res, next) => {
  const newTravel = new Travels( {
    title: req.body.title,
    description: req.body.description,
    travelDate: new Date(req.body.travelDate),
    countries: req.body.country,
    _userId : new ObjectId(req.param(1))
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
  res.render('travels/new', { countries: COUNTRIES });
  //res.render('travels/new');
});

router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  Travels.findByIdAndRemove({_id: id}, (err, product) => {
  if (err){
    return next(err);
  } else {
    //console.log(res);
    //return next(res);
    console.log("llego a ok");
    res.status(200).send();
   //return res.redirect('/travels');
   //return res.render('/travels/show');
  }
  });
  //res.render('travels/new');
});


module.exports = router;
