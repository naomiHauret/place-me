Template.contentOffers.onRendered(function(){
  OffersIndex.getComponentMethods().removeProps('accommodationFilter');
  OffersIndex.getComponentMethods().removeProps('carFilter');
  OffersIndex.getComponentMethods().removeProps('hostOrganizationId');
  OffersIndex.getComponentMethods().removeProps('sortBy');
  OffersIndex.getComponentMethods().addProps('sortBy', 'newest');

});

Template.contentOffers.onDestroyed(function(){
  OffersIndex.getComponentMethods().removeProps('accommodationFilter');
  OffersIndex.getComponentMethods().removeProps('carFilter');
  OffersIndex.getComponentMethods().removeProps('hostOrganizationId');
  OffersIndex.getComponentMethods().removeProps('sortBy');
});

Template.contentOffers.events({
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
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'change select[name="dateOrder"]': function(e,template){
    console.log("date change "+$(e.target).val());
    OffersIndex.getComponentMethods().addProps('sortBy', $(e.target).val());
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'change select[name="hostEstablishment"]': function(e, template){
      let hostOrganizationId= $(e.target).val();
      if(hostOrganizationId === "educator" ){
        OffersIndex.getComponentMethods().removeProps('hostOrganizationId');
      }
      else{
        OffersIndex.getComponentMethods().addProps('hostOrganizationId',hostOrganizationId);

      }
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "change select[name='accommodation']": function(e,template){
    let accommodation= $(e.target).val();
    if(accommodation === "all" ){
      OffersIndex.getComponentMethods().removeProps('accommodationFilter');
    }
    else{
      OffersIndex.getComponentMethods().addProps('accommodationFilter', accommodation);

    }
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "change select[name='car']": function(e,template){
    let car= $(e.target).val();
    console.log(car);
    if(car === "all" ){
      OffersIndex.getComponentMethods().removeProps('carFilter');
    }
    else{
      OffersIndex.getComponentMethods().addProps('carFilter',car);

    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});


Template.contentAddOffers.onCreated(function(){
  Template.instance().adding = new ReactiveVar(false);
});

Template.contentAddOffers.events({
  "submit form[name='addOffer']": function(event, template){
    event.preventDefault();
    template.adding.set( true ); //start the spinner

    //get all values
    let host=$('form[name="addOffer"] .hostSelect option:selected').val();
    let studentsNumber = $("form[name='addOffer'] input[name='studentsNumber']").val();
    let additionalInformation= $('form[name="addOffer"] textarea').val();
    let startDate=  $("form[name='addOffer'] input[name='startdate']").val();
    let endDate= $("form[name='addOffer'] input[name='enddate']").val();
    let themetypes= $('form[name="addOffer"] .themetypesCloud').select2("val");
    let carProvided= $("form[name='addOffer'] input[name='accommodationProvided']").is(":checked");
    let accommodationProvided= $("form[name='addOffer']  input[name='carProvided']").is(":checked");

    let offerData= {
      hostOrganizationId: host,
      startDate: startDate,
      endDate: endDate,
      //themeId: faker.random.arrayElement(themesArray) ,
      themeTypesId: themetypes,
      accomodation: accommodationProvided ,
      car: carProvided ,
      number: studentsNumber,
      additionalInformation:  additionalInformation
    };
    console.log(offerData);

    Meteor.call('addOffer', offerData, function(error, result){
      if(error){
        template.adding.set( false ); //stop the spinner
        Bert.alert("This placement offer couldn't be added. Please, try again.", danger);
      }
      else{
        //alert (user feedback: success)
        template.adding.set( false ); //stop the spinner
        swal({
          title: "Placement offer added!",
          type: "success",
          text: "This new placement offer is <b>added</b>.<br> Would you like to <b>add another one</b> ?",
          html: true,
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonColor: "#6E3BD2",
          confirmButtonText: "Yes",
          cancelButtonText: "No, go back to offers list",
          closeOnCancel: true,
          closeOnConfirm: true
        },
        function(isConfirm){
          if (!isConfirm) { //cancel button clicked
            Router.go("offers"); //go to establishments page
          }
          else{ //confirm button (add another organization)
            //empty all inputs
            $('form[name="addOffer"] input').val("");
            $('form[name="addOffer"] input[type="number"]').val("1")
            $('form[name="addOffer"] input[type="checkbox"]').prop("checked", false);
            $('form[name="addOffer"] input[type="checkbox"]').attr("checked", false);
            $('form[name="addOffer"] textarea').val("");
            $('form[name="addOffer"] .hostSelect').select2("val", "");
          }
        });
      }
    });
  }
});
