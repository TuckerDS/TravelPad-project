/*jshint esversion: 6*/
var express = require('express');
var router = express.Router();

const passport = require ("passport");
const authRoutes = express.Router();
const ensureLogin = require("connect-ensure-login");
// User model
const User       = require("../models/user");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TravelPad', user: req.user });
  //res.render('index', { title: 'Express' });
});

module.exports = router;
