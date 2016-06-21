Template.contentAddPlacements.onCreated(function(){
  Template.instance().adding = new ReactiveVar(false);
  Template.instance().createPlacement = new ReactiveVar(false);
  Template.instance().definedPlacement = new ReactiveVar(false);

});


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

Template.contentAddPlacements.onRendered(function(){
  if(!Session.get("selectedOffer")){
    $('.educatorSelect').prop("disabled", true);
    $('.educatorsCloud').prop("disabled", true);
  }
});

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
},

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'submit form[name="placementForm"]': function(event, template){
    event.preventDefault();
    template.adding.set(true);
    let studentId= Session.get("selectedStudent");
    let onSiteEducators= $('form[name="placementForm"] .educatorsCloud').select2("val") ;
    let offSiteEducator= $('form[name="placementForm"] .educatorSelect').select2("val");
    let tutorsIds= $('form[name="placementForm"] .tutorsCloud').select2("val");;
    let themeId= $('form[name="placementForm"] .themesSelect').select2("val") ;
    let startDate= $("form[name='placementForm'] input[name='startdate']").val();
    let endDate= $("form[name='placementForm'] input[name='enddate']").val();
    let accommodation= $("form[name='placementForm'] input[name='accommodationRequired']").is(":checked");
    let car= $("form[name='placementForm'] input[name='carRequired']").is(":checked");
    let isFinished= false;
    let additionalInformation= $('form[name="placementForm"] textarea').val();

    let placementData= {
      'author': Meteor.userId(),
      'createdAt': new Date(),
      "studentId": studentId,
      'offSiteEducatorId': offSiteEducatorId,
      'onSiteEducatorIds': onSiteEducators,
      'tutorsIds': tutorsIds,
      'themeId': themeId,
      'startDate': startDate,
      'endDate': endDate,
      'accommodation': accommodation,
      'car': car,
      'isFinished': false,
      'isFinishedFilter': "false",
      'additionalInformation': additionalInformation
    };
    if(Session.get("selectedOffer")){
      placementData.isFromOffer= true;
    }
    else if(Template.instance().createPlacement.get() === true){
      placementData.isFromOffer= false;

    }

    Meteor.call('addPlacement', placementData, function(error, result){
      if(error){
        Bert.alert(error.reason, "danger");
        template.adding.set(false);

      }
      else{
        Session.set('selectedStudent', undefined);
        Session.set('selectedOffer', undefined);
        Template.createPlacement.set(false);
        template.adding.set(false);
        swal({
          title: "Placement  added!",
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

      }
    })


  }
});
