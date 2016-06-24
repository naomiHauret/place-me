Template.contentPlacements.onCreated(function(){
  Bert.alert({
    title: 'Loading data...',
    message: 'Please, wait few seconds, data are being fetched and displayed.',
    type: 'info',
    style: 'growl-bottom-right',
    icon: 'fa-spinner fa-spin'
  });
});
Template.contentPlacements.onDestroyed(function(){
  PlacementsIndex.getComponentMethods().removeProps('themeId');
  PlacementsIndex.getComponentMethods().removeProps('programmeFilter');
  PlacementsIndex.getComponentMethods().removeProps('hostOrganizationFilter');
  PlacementsIndex.getComponentMethods().removeProps('cohortFilter');
  PlacementsIndex.getComponentMethods().removeProps('isFinishedFilter');
});
Template.contentPlacements.events({
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'change select[name="placementFinishedFilter"]': function(e,template){
    let isFinished= $(e.target).val();
    if(isFinished === "all" ){
      PlacementsIndex.getComponentMethods().removeProps('isFinishedFilter');
    }
    else{
      PlacementsIndex.getComponentMethods().addProps('isFinishedFilter', isFinished);
    }
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "change select[name='themeFilter']": function(e,template){
    let theme= $(e.target).val();
    if(theme === "all" ){
      PlacementsIndex.getComponentMethods().removeProps('themeId');
    }
    else{
      PlacementsIndex.getComponentMethods().addProps('themeId',theme);
    }
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'change select[name="hostEstablishment"]': function(e, template){
      let hostOrganizationId= $(e.target).val();
      if(hostOrganizationId === "educator" ){
        PlacementsIndex.getComponentMethods().removeProps('hostOrganizationFilter');
      }
      else{
      PlacementsIndex.getComponentMethods().addProps('hostOrganizationFilter',hostOrganizationId);

      }
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'change select[name="programme"]': function(e, template){
      let programme= $(e.target).val();
      if(programme === "student" ){ //"All" selected
        PlacementsIndex.getComponentMethods().removeProps('programmeFilter');
      }
      else{
        PlacementsIndex.getComponentMethods().addProps('programmeFilter',programme);
      }
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
'change select[name="cohort"]': function(e, template){
    let cohort= $(e.target).val();
    if(cohort === "student" ){
      PlacementsIndex.getComponentMethods().removeProps('cohortFilter');
    }
    else{
      PlacementsIndex.getComponentMethods().addProps('cohortFilter',cohort);
    }
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "click button[name='visit']": function(event, template){
    Session.set("selectedPlacement",  $(event.target).val() );
    Router.go("add-visit");
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "click .delete": function(event, template){
    event.preventDefault();
    let chosenPlacementId=  $(event.target).val();

    swal({
      title: "Are you sure you want to delete this placement ?",
      text: "All the data related to it will be deleted too!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6E3BD2",
      confirmButtonText: "Yes, delete this placement!",
      showLoaderOnConfirm: true,
      closeOnConfirm: false
    },
    function(isConfirm){
      let placementId= $(event.target).val(); //_id of the placement we have to delete
      if(isConfirm){
        Meteor.call("removePlacement", placementId, function(error, result){
          if(error){ //user not deleted
            swal({
              title: "An error occured",
              text: "We're sorry but this placement <b>couldn't be deleted</b>. Please, <b>try again</b>.",
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
                Bert.alert("To delete this placement you will have to reload the page.", "info");
              }
            });
          }
          else{ //success (placement deleted)
            swal.close();
            Bert.alert("Placement successfully deleted!", "success");
          }
        });
      }
      else{
        Bert.alert("Delete cancelled.", "info");
      }
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Template.contentAddPlacements.onCreated(function(){
  Template.instance().adding = new ReactiveVar(false);
  Template.instance().createPlacement = new ReactiveVar(false);
  Template.instance().definedPlacement = new ReactiveVar(false);
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Template.contentAddPlacements.onDestroyed(function(){
  OffersIndex.getComponentMethods().removeProps('accommodationFilter');
  OffersIndex.getComponentMethods().removeProps('carFilter');
  OffersIndex.getComponentMethods().removeProps('hostOrganizationId');
  OffersIndex.getComponentMethods().removeProps('sortBy');
  UsersIndex.getComponentMethods().removeProps('roles');
  UsersIndex.getComponentMethods().removeProps('cohortId');
  UsersIndex.getComponentMethods().removeProps('programmeId');
  UsersIndex.search("");
  OffersIndex.search("");
  Session.set("selectOffer", undefined);
  Session.set("selectStudent", undefined);
  Session.set("selectedOffer", undefined);
  Session.set("selectedStudent", undefined);
  Session.set("selectedHost", undefined);
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Template.contentAddPlacements.onRendered(function(){
  if(!Session.get("selectedOffer")){
    $('.educatorSelect').prop("disabled", true);
    $('.educatorsCloud').prop("disabled", true);
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Template.contentAddPlacements.events({
  'click button[name="selectOffer"]': function(event,template){
    event.preventDefault();
    template.createPlacement.set(false);
    Session.set("selectStudent", undefined);
    Session.set("selectOffer", true);
    $('.ui.sidebar').sidebar('show', function(){
      $("form[name='sidebarForm'] select").prop('selectedIndex',0);
      $('form[name="sidebarForm"] input[type="text"]').val("");
      $('form[name="sidebarForm"] input[type="radio"]').prop("checked", false);
      $('form[name="sidebarForm"] input[type="radio"]').attr("checked", false);

      OffersIndex.getComponentMethods().removeProps('accommodationFilter');
      OffersIndex.getComponentMethods().removeProps('carFilter');
      OffersIndex.getComponentMethods().removeProps('hostOrganizationId');
      OffersIndex.getComponentMethods().removeProps('sortBy');
      OffersIndex.getComponentMethods().addProps('sortBy', 'newest');

      OffersIndex.search("");

    });
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'click button[name="selectStudent"]': function(event,template){
    event.preventDefault();
    Session.set("selectOffer", undefined);
    Session.set("selectStudent", true);
    $('.ui.sidebar').sidebar('show', function(){
      $("form[name='sidebarForm'] select").prop('selectedIndex',0);
      $('form[name="sidebarForm"] input[type="text"]').val("");
      $('form[name="sidebarForm"] input[type="radio"]').prop("checked", false);
      $('form[name="sidebarForm"] input[type="radio"]').attr("checked", false);
      UsersIndex.getComponentMethods().removeProps('trustOrganizationId');
      UsersIndex.getComponentMethods().removeProps('hostOrganizationId');
      UsersIndex.getComponentMethods().addProps('roles', "student");
      UsersIndex.getComponentMethods().addProps('isAuthorizedFilter', "true");
      UsersIndex.getComponentMethods().addProps('isPlacedFilter', "false");
      UsersIndex.search("");

    });
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'click button[name="createPlacement"]': function(event,template){
    event.preventDefault();
    Session.set("selectOffer", undefined);
    Session.set("selectedOffer", undefined);
    template.createPlacement.set(true);
    $('.educatorSelect').prop("disabled", true);
    $('.educatorsCloud').prop("disabled", true);
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
'change select[name="cohort"]': function(e, template){
    console.log("yo");
    let cohort= $(e.target).val();
    if(cohort === "student" ){
      UsersIndex.getComponentMethods().addProps('roles', cohort);
    }
    else{
      UsersIndex.getComponentMethods().addProps('cohortId',cohort);

    }
},
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
'change select[name="programme"]': function(e, template){
    let programme= $(e.target).val();
    if(programme === "student" ){ //"All" selected
      UsersIndex.getComponentMethods().removeProps('programmeId');
      UsersIndex.getComponentMethods().addProps('roles', programme);
    }
    else{
      UsersIndex.getComponentMethods().addProps('programmeId',programme);
    }
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
  'submit form[name="placementForm"]': function(event, template){
    event.preventDefault();
    template.adding.set(true);

    let author= Meteor.userId();
    let studentId= Session.get("selectedStudent");
    let onSiteEducators= $('.educatorsCloud').select2("val") ;
    let offSiteEducator= $('.educatorSelect').select2("val");
    let tutorsIds= $('.tutorsCloud').select2("val");
    let startDate= $("form[name='placementForm'] input[name='startdate']").val();
    let endDate= $("form[name='placementForm'] input[name='enddate']").val();
    let accommodationRequired= $("form[name='placementForm'] input[name='accommodationRequired']").is(":checked");
    let carRequired= $("form[name='placementForm'] input[name='carRequired']").is(":checked");
    let isFinished= false;
    let additionalInformation= $('form[name="placementForm"] textarea').val();
    let placementData= {
      "studentId": studentId,
      'offSiteEducatorId': offSiteEducator,
      'onSiteEducatorIds': onSiteEducators,
      'tutorsIds': tutorsIds,
      'startDate': startDate,
      'endDate': endDate,
      'accommodation': accommodationRequired,
      'car': carRequired,
      'additionalInformation': additionalInformation
    };

    if(Session.get("selectedOffer")){
      placementData.isFromOffer= true;
      placementData.offerId= Session.get("selectedOffer");
    }
    else if(Template.instance().createPlacement.get() === true){
      placementData.hostOrganizationId= $('.hostSelect').select2("val");
      placementData.isFromOffer= false;
      placementData.themeId=  $('.themesSelect').select2("val");
      placementData.themeTypesId= $('.themetypesCloud').select2("val");
    }

    Meteor.call("addPlacement", placementData, function(error, result){
      if(error){ //placement not added
        Bert.alert(error.reason, "danger");
        template.adding.set(false);
      }
      else{ //success (placement added)

        swal({
          title: "Placement added!",
          type: "success",
          text: "This new placement is <b>added</b>.<br> Would you like to <b>add another one</b> ?",
          html: true,
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonColor: "#6E3BD2",
          confirmButtonText: "Yes",
          cancelButtonText: "No, go back to placements list",
          closeOnCancel: true,
          closeOnConfirm: true
        },
        function(isConfirm){
          if (!isConfirm) { //cancel button clicked
            Router.go("placements"); //go to placements page
          }
          else{ //confirm button (add another organization)
            //empty all inputs
            $('form[name="addPlacement"] input').val("");
            $('form[name="addPlacement"] input[type="checkbox"]').prop("checked", false);
            $('form[name="addPlacement"] input[type="checkbox"]').attr("checked", false);
            $('form[name="addPlacement"] textarea').val("");
            $('form[name="addPlacement"] .hostSelect').select2("val", "");
            $('form[name="addPlacement"] .educatorSelect').select2("val", "");
            $('form[name="addPlacement"] .educatorsCloud').select2("val", "");
            $('form[name="addPlacement"] .tutorsCloud').select2("val", "");
          }
        });

        //cleaning
        template.adding.set(false);
        Session.set('selectedStudent', undefined);
        Session.set('selectedOffer', undefined);
        template.createPlacement.set(false);
      }
    });
  }
});
