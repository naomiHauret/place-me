Template.sidebar.onCreated(function(){
  Template.instance().adding = new ReactiveVar(false);
});

Template.sidebar.onDestroyed(function(){
  OffersIndex.getComponentMethods().removeProps('accommodationFilter');
  OffersIndex.getComponentMethods().removeProps('carFilter');
  OffersIndex.getComponentMethods().removeProps('sortBy');
  UsersIndex.getComponentMethods().removeProps('roles');
  UsersIndex.getComponentMethods().removeProps('isAuthorizedFilter');
  UsersIndex.getComponentMethods().removeProps('isPlacedFilter');
  UsersIndex.getComponentMethods().removeProps('cohortId');
  UsersIndex.getComponentMethods().removeProps('programmeId');
  UsersIndex.getComponentMethods().removeProps('trustOrganizationId');
  UsersIndex.getComponentMethods().removeProps('hostOrganizationId');
  $("form[name='sidebarForm'] select").prop('selectedIndex',0);
  $("form[name='sidebarForm'] input").val("");
  UsersIndex.search("");
  Session.set("selectStudent", undefined);
  Session.set('quickAddTrust', undefined);
  Session.set('quickAddThemetypes', undefined);
  Session.set('quickAddTheme', undefined);
  Session.set('quickAddHost', undefined);
  Session.set('quickUploadUsers', undefined);
  Session.set('quickUploadEstablishments', undefined);
  Session.set('quickUploadOffers', undefined);
  Session.set('quickUploadPlacements', undefined);
  Session.set('quickUploadVisits', undefined);
});

Template.sidebar.events({

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'click .closeSidebar': function(e, template){
    e.preventDefault();
    Session.set("selectStudent", undefined);
    Session.set('quickAddTrust', undefined);
    Session.set('quickAddThemetypes', undefined);
    Session.set('quickAddTheme', undefined);
    Session.set('quickAddHost', undefined);
    Session.set('quickUploadUsers', undefined);
    Session.set('quickUploadEstablishments', undefined);
    Session.set('quickUploadOffers', undefined);
    Session.set('quickUploadPlacements', undefined);
    Session.set('quickUploadVisits', undefined);
    $('.ui.sidebar').sidebar('hide');

  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'change form[name="sidebarForm"] select[name="cohort"]': function(e, template){
    console.log("yo from applayout");
    let cohort= $(e.target).val();
    console.log(cohort);
    if(cohort === "student" ){
      UsersIndex.getComponentMethods().removeProps('cohortId');
      UsersIndex.getComponentMethods().addProps('roles', cohort);
    }
    else{
      UsersIndex.getComponentMethods().addProps('cohortId',cohort);

    }
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'change form[name="sidebarForm"] select[name="programme"]': function(e, template){
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
  'change form[name="sidebarForm"] select[name="dateOrder"]': function(e,template){
  console.log("date change "+$(e.target).val());
  OffersIndex.getComponentMethods().addProps('sortBy', $(e.target).val());
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'change form[name="sidebarForm"] select[name="hostEstablishment"]': function(e, template){
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
  "change form[name='sidebarForm'] select[name='accommodation']": function(e,template){
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
  "change form[name='sidebarForm'] select[name='car']": function(e,template){
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
  "change form[name='sidebarForm'] input[type='radio'].selectStudent": function(e,template){
  let selectedStudent= $("input[type='radio'].selectStudent:checked").val();

  Session.set("selectedStudent", selectedStudent);
  $('.ui.sidebar').sidebar('hide');
  Session.set("selectStudent", undefined);

  if(Session.get("selectedStudent")!== undefined){
    Bert.alert("Student selected!", "success" );
  }
  else{
    Bert.alert("Oops. The student wasn't selected. Please try again.", "danger");
  }
},
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
"change form[name='sidebarForm'] input[type='radio'].selectOffer": function(e,template){
let selectedOffer= $("input[type='radio'].selectPOffer:checked").val();
console.log(selectedStudent);
Session.set("selectedOffer", selectedSOffer);
$('.ui.sidebar').sidebar('hide');
Session.set("selectOffer", undefined);

if(Session.get("selectedOffer")!== undefined){
  Bert.alert("Placement offer selected!", "success" );
}
else{
  Bert.alert("Oops. The offer wasn't selected. Please try again.", "danger");
}
}
});
