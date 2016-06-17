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
});

Template.contentAddPlacements.events({
  'click button[name="selectOffer"]': function(event,template){
    event.preventDefault();
    Session.set("selectStudent", false);
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
      OffersIndex.search("");

    });
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'click button[name="selectStudent"]': function(event,template){
    event.preventDefault();
    Session.set("selectOffer", false);
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
    template.createPlacement.set(true);
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
  console.log("cc");
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

    Session.set('selectedStudent', undefined);
    Session.set('selectedOffer', undefined);
    template.instance().adding.set(false);

  }
});
