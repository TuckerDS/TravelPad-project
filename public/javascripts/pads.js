window.onload = eventLoad;

function upload(){
  document.getElementById("camera").click();
 }

function change() {
  //alert(document.getElementById("camera").value);
  document.getElementById("filename").value = document.getElementById("camera").value ;
}

function geolocation (){
  var position;
  function onPositionReceived(position){
    document.getElementById('lat').value = position.coords.latitude;
    document.getElementById('lng').value = position.coords.longitude;
    console.log("hola");
    startMap(position);
  }
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(onPositionReceived);
  }
}

function eventLoad(){
  geolocation();

}

function startMap(position) {
var myLocation = {
    lat: position.coords.latitude,
    lng:  position.coords.longitude};
var map = new google.maps.Map(
   document.getElementById('map'),
   {
      zoom: 15,
      center: myLocation
   }
);
var myMarker = new google.maps.Marker({
position: {
      lat: position.coords.latitude ,
      lng:  position.coords.longitude
},
map: map,
title: "I'm here"
});
}
