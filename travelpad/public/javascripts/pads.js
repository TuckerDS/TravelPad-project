      window.onload = eventLoad;
function upload(){
  document.getElementById("camera").click();
 }
function change() {
  alert(document.getElementById("camera").value);
  document.getElementById("filename").value = document.getElementById("camera").value ;
}
function geolocation (){
  var position;
  function onPositionReceived(position){
    document.getElementById('lat').value = position.coords.latitude;
    document.getElementById('lng').value = position.coords.longitude;
    document.getElementById('map').src = "https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d7228.459081745952!2d"+
                                          position.coords.longitude +
                                          "!3d" +
                                          position.coords.latitude +
                                          "!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ses!4v1494451012470";
  }
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(onPositionReceived);
  }
}
function eventLoad(){
  geolocation();
}
