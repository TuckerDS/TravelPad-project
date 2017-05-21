//
// function deleteOneRegister (id) {
//     $.ajax({
//       url: "http://ih-api.herokuapp.com/characters/"+id,
//       method: "delete",
//       success: function (response) {
//       },
//       error: function (err) {
//         alert("request fail");
//       },
//     });
//     this.getFullList ();


$('.btnDelete').click(function(e) {
  e.preventDefault();
  id = e.target.name;
  $.ajax({
      url: '/travels/'+id,
      type: 'DELETE',
      success: function(result){window.location.reload();},
      error: function(result){alert("error");}
  });

  function success(result) {

  }
});
