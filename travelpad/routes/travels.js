/*jshint esversion: 6*/
const express   = require('express');
const Travels    = require('../models/travelModel');
const COUNTRIES = require('../models/countries');
const ObjectId  = require('mongoose').Types.ObjectId;
const router    = express.Router();

//const { ensureLoggedIn }  = require('connect-ensure-login');

router.get('/', (req, res, next) => {
  Travels.find({}).exec( (err, travels) => {
    res.render('travels/show', { travels });
  });
});

router.post('/', (req, res, next) => {
  const newTravel = new Travels( {
    title: req.body.title,
    description: req.body.description,
    travelDate: new Date(req.body.travelDate),
    countries: req.body.country,
    _userId : new ObjectId(req.param(1))
  });

  newTravel.save( (err) => {
    if (err) {
      res.render('travels/new', { campaign: newTravel, countries: COUNTRIES });
    } else {
      res.redirect('/travels');
      //res.redirect(`/travel/${newTravel._id}`);
    }
  });
});

router.get('/new', (req, res) => {
  res.render('travels/new', { countries: COUNTRIES });
  //res.render('travels/new');
});

module.exports = router;
