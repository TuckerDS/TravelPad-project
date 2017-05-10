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
  }
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(onPositionReceived);
  }
}
function eventLoad(){
  geolocation();
}
