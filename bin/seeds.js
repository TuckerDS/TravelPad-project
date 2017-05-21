/*jshint esversion: 6*/
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const country = require('../models/countries');
const pad = require('../models/padModel');
const travel = require('../models/travelModel');
const user = require('../models/user');
const ObjectId  = require('mongoose').Types.ObjectId;

mongoose.connect('mongodb://localhost/travelpad');
const countries = [
     "Spain",
     "Germany",
     "Frace",
     "Japan",
     "Chine",
     "Australia",
     "Mexico",
     "Russia",
     "Italy",
     "Perú",
     "Kenya"
];
const pads = [
{
     title: "Heidelberg",
     description: "My amazing journey to Heidelberg",
    //  location: [8.672434,49.398750],
     country:"Germany",
     pic_name:"001.jpg",
     pic_path:"/uploads/001",
     visible: true,
     travelId  : ObjectId('591434a7b3f2f3440f1628d5')
},
{
     title: "Berlin",
     description: "My amazing journey to Berlin",
    //  location: [13.404954,52.520008],
     country:"Germany",
     pic_name:"005.jpg",
     pic_path:"/uploads/005",
     visible: false,
     travelId  : ObjectId('591434a7b3f2f3440f1628d5')
},
{
     title: "Tokyo",
     description: "My amazing journey to Tokyo",
    //  location: [35.652832,139.839478],
     country:"Japan",
     pic_name:"002.jpg",
     pic_path:"/uploads/002",
     visible: true,
     travelId  : ObjectId('591434a7b3f2f3440f1628d5')
},
{
     title: "Madrid",
     description: "My amazing journey to Madrid",
    //  location  : [-3.703790,40.416775],
     country:"Spain",
     pic_name:"003.jpg",
     pic_path:"/uploads/003",
     visible: true,
     travelId  : ObjectId('5913d6f69252b7395548809b')
},
{
     title: "Nairobi",
     description: "My amazing journey to Nairobi",
    //  location: [-1.2920659,36.82194619999996],
     country:"Kenya",
     pic_name:"004.jpg",
     pic_path:"/uploads/004",
     visible: true,
     travelId  : ObjectId('5913d6f69252b7395548809b')
}
];
const travels = [
{
     title: "Germany",
     description: "2 weeks in this amazing country. I really don't know what to expect!",
     travelDate:"2017-07-11 00:00:00.000Z",
     countries:"Germany",
     _userId  : ObjectId("000000000000000000000001")
},
{
     title: "Japan",
     description: "2 weeks in this amazing country. I really don't know what to expect!",
     travelDate:"2017-09-11 00:00:00.000Z",
     countries:"Japan",
     _userId  : ObjectId("000000000000000000000002")
},
{
     title: "Spain",
     description: "2 weeks in this amazing country. I really don't know what to expect!",
     travelDate:"2017-011-11 00:00:00.000Z",
     countries:"Spain",
     _userId  : ObjectId("000000000000000000000003")
},
{
     title: "Kenya",
     description: "2 weeks in this amazing country. I really don't know what to expect!",
     travelDate:"2017-03-11 00:00:00.000Z",
     countries:"Kenya",
     _userId  : ObjectId("000000000000000000000004")
},
];
const users = [
{
     username   : "Tucker",
     password   : "1234",
     _id  : ObjectId("000000000000000000000001")
},
{
     username   : "Tomas",
     password   : "4321",
     _id  : ObjectId("000000000000000000000002")
},
{
     username   : "Erneso",
     password   : "1234",
     _id  : ObjectId("000000000000000000000003")
},
{
     username   : "Mauro",
     password   : "1234",
     _id  : ObjectId("000000000000000000000004")
},
];
//--------------------------------------
user.create(users, (err, docs) => {
  if (err) {
    throw err;
  }
  docs.forEach((user) => {
    console.log(user.username);
  });

});
//-----------------------------------------
travel.create(travels, (err, docs) => {
  if (err) {
    throw err;
  }
  docs.forEach((travel) => {
    console.log(travel.title);
  });
});
//---------------------------------------
pad.create(pads, (err, docs) => {
  if (err) {
    throw err;
  }
  docs.forEach((pad) => {
    console.log(pad.title);
  });
});
mongoose.connection.close();
