Template.contentOfferDetails.onRendered(function() {
  GoogleMaps.load({ v: '3', key: 'AIzaSyBszHTpXtymnaol8G_ggrM82IL4ISAfYpE', libraries: 'geometry,places' }); //API key from Google Maps api (devlopers)
});

Template.contentOfferDetails.onCreated(function() {
   // We can use the `ready` callback to interact with the map API once the map is ready.
   GoogleMaps.ready('establishmentPositionMap', function(map) {
     // Add a marker to the map once it's ready
     var marker = new google.maps.Marker({
       position: map.options.center,
       map: map.instance
     });
   });
 });


Template.contentOfferDetails.events({
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "click .delete": function(event, template){
    event.preventDefault();
    let chosenOfferId=  $(event.target).val();
    let establishment=Establishments.findOne({_id: chosenOfferId}).hostOrganizationId;
    let name= establishment.name;

    swal({
      title: "Are you sure you want to delete this placement offer at "+name+" ?",
      text: "All the data related to it will be deleted too!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6E3BD2",
      confirmButtonText: "Yes, delete this offer!",
      showLoaderOnConfirm: true,
      closeOnConfirm: false
    },
    function(isConfirm){
      let offerId= $(event.target).val(); //_id of the user we have to delete
      if(isConfirm){
        Meteor.call("removeOffer", offerId, function(error, result){
          if(error){ //user not deleted
            swal({
              title: "An error occured",
              text: "We're sorry but this offer <b>couldn't be deleted</b>. Please, <b>try again</b>.",
              type: "error",
              showCancelButton: true,
              confirmButtonColor: "#6E3BD2",
              confirmButtonText: "Try again",
              cancelButtonText: "Cancel",
              closeOnConfirm: true,
              html:true,
              closeOnCancel: true
            },
            function(isConfirm){ //try again clicked
              if (isConfirm) {
                document.location.reload(true); //reload the page
              }
              else{
                Bert.alert("To delete this offer you will have to reload the page.", "info");
              }
            });
          }
          else{ //success (user deleted)
            swal.close();
            Bert.alert("Offer successfully deleted!", "success");
          }
        });
      }
      else{
        Bert.alert("Delete cancelled.", "info");
      }
    });
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

});
