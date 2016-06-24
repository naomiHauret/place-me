Template.educatorsSelects.onCreated(function(){
  let offerId= Session.get("selectedOffer");
  if(offerId){
    let hostOrganizationId= Offers.findOne({_id: offerId}).hostOrganizationId;
    let educators= Meteor.users.find({ "roles": "registered", $and: [{"roles": "educator"}, {"profile.isAuthorized": true}, {"profile.hostOrganizationId": hostOrganizationId}] },  {sort: {'profile.lastName': 1}});

    Template.instance().onSiteEducatorsList = new ReactiveVar(educators);
    Template.instance().offSiteEducatorsList = new ReactiveVar(educators);
  }else{
    let educators= Meteor.users.find({ "roles": "registered", $and: [{"roles": "educator"}, {"profile.isAuthorized": true}] },  {sort: {'profile.lastName': 1}});
    Template.instance().offSiteEducatorsList = new ReactiveVar(educators);
    Template.instance().onSiteEducatorsList = new ReactiveVar(educators);

  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Template.educatorsSelects.onRendered(function () {

  $('.educatorSelect').select2({
    placeholder: 'Tips: you can type or select an off-site educator',
    allowClear: true
  });

  $('.educatorsCloud').select2({
    placeholder: 'Tips: you can type or select educators',
    allowClear: true
  });



});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Template.educatorsSelects.events({
  "blur .educatorSelect": function(event, template){
    let educator= $('.educatorSelect').select2("val");
    if(establishment===""){
      Bert.alert("You haven't selected any educator!", "warning");
    }
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "blur .educatorsCloud": function(event, template){
    let educators= $('.educatorsCloud').select2("val");

    if($.trim(educators)===""){
      Bert.alert("You haven't selected any educator!", "warning");
    }
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "change .educatorsCloud": function(event, template){ //multiple educator select list (tag cloud) change : got to change the single educator select list
    let offerId= Session.get("selectedOffer");
    let onSiteEducatorsId= $('.educatorsCloud').select2("val");

    if(offerId){
      let hostOrganizationId= Offers.findOne({_id: offerId}).hostOrganizationId;
      let offSiteEducatorsList= Meteor.users.find({ "roles": "registered", $and: [{"roles": "educator"}, {"profile.isAuthorized": true}, {"profile.hostOrganizationId": hostOrganizationId},  {"_id": {$nin: onSiteEducatorsId }}] },  {sort: {'profile.lastName': 1}});

    }
    else{
      let hostOrganizationId= $('.hostSelect').select2("val");
      let offSiteEducatorsList= Meteor.users.find({"_id": {$nin: onSiteEducatorsId} });
    }


    template.offSiteEducatorsList.set( offSiteEducatorsList );

  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "change .educatorSelect": function(event, template){
    let offerId= Session.get("selectedOffer");
    let offSiteEducator= $('.educatorSelect').select2("val");

    if(offerId){
      let hostOrganizationId= Offers.findOne({_id: offerId}).hostOrganizationId;
      let onSiteEducatorsList= Meteor.users.find({"profile.hostOrganizationId": hostOrganizationId, $and: [ {"_id": {$ne: offSiteEducatorsList }}] });

    }
    else{
      let onSiteEducatorsList= Meteor.users.find( {"_id": {$ne: offSiteEducatorsList } } );

    }

    template.onSiteEducatorsList.set( onSiteEducatorsList );

  }
});
