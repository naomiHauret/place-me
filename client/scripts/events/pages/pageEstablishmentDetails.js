Template.contentEstablishmentDetails.onRendered(function() {
  GoogleMaps.load({ v: '3', key: 'AIzaSyBszHTpXtymnaol8G_ggrM82IL4ISAfYpE', libraries: 'geometry,places' }); //API key from Google Maps api (devlopers)
});

Template.contentEstablishmentDetails.onCreated(function() {
   // We can use the `ready` callback to interact with the map API once the map is ready.
   GoogleMaps.ready('establishmentPositionMap', function(map) {
     // Add a marker to the map once it's ready
     var marker = new google.maps.Marker({
       position: map.options.center,
       map: map.instance
     });
   });

   Bert.alert({
     title: 'Loading data...',
     message: 'Please, wait few seconds, data are being fetched and displayed.',
     type: 'info',
     style: 'growl-bottom-right',
     icon: 'fa-spinner fa-spin'
   });
 });


 Template.contentEstablishmentDetails.events({
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   "click .delete" : function(event, template){
     event.preventDefault();
     let chosenEstablishmentId=  $(event.target).val();
     let establishment=Establishments.findOne({_id: chosenEstablishmentId});
     let name= establishment.name;

     swal({
       title: "Are you sure you want to delete "+name+"?",
       text: "All the data related to him/her will be deleted too!",
       type: "warning",
       showCancelButton: true,
       confirmButtonColor: "#6E3BD2",
       confirmButtonText: "Yes, delete this establishment!",
       showLoaderOnConfirm: true,
       closeOnConfirm: false
     },
     function(isConfirm){
       let establishmentId= $(event.target).val(); //_id of the establishment we have to delete
       if(isConfirm){
         Meteor.call("removeEstablishment", establishmentId, function(error, result){
           if(error){ //establishment not deleted
             swal({
               title: "An error occured",
               text: "We're sorry but this establishment <b>couldn't be deleted</b>. Please, <b>try again</b>.",
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
                 Bert.alert("To delete this establishment you will have to reload the page.", "info");
               }
             });
           }
           else{ //success (establishment deleted)
             swal.close();
             Router.go("establishments");
             Bert.alert("Establishment successfully deleted!", "success");
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
