Template.contentVisits.helpers({
  isTutor(){
    let tutorsArray= tutorsArray=Placements.findOne({_id: this._id}).tutorsIds;
    return ($.inArray(Meteor.userId(), tutorsArray) === true);
  },

  visit(){
    return Visits.findOne({_id: this._id});
  },

  placement(){
    let placementId= Visits.findOne({_id: this._id}).placementId;
    return Placements.findOne({_id: placementId});
  },

  student(){
    let placementId= Visits.findOne({_id: this._id}).placementId;
    let studentId= Placements.findOne({_id:placementId}).studentId;
    let student=Meteor.users.findOne({_id: studentId});

    return student.profile.firstName+" "+student.profile.lastName;
  },

  hostOrganization(){
    let placementId= Visits.findOne({_id: this._id}).placementId;
    let placement= Placements.findOne({_id: placementId});

    let hostId="";
    if(placement.isFromOffer ===true ){
      let offerId= placement.offerId;
      hostId= Offers.findOne({_id: offerId}).hostOrganizationId;
    }
    else{
      hostId= placement.hostOrganizationId;
    }

    let host= Establishments.findOne({_id: hostId});
    return host.name;
  },

  placementTheme(){
    let placementId= Visits.findOne({_id: this._id}).placementId;
    let placement= Placements.findOne({_id: placementId});
    let themeId="";
    if(placement.isFromOffer ===true ){
      let offerId= placement.offerId;
      themeId= Offers.findOne({_id: offerId}).themeId;
    }

    else{
      themeId= placement.themeId;
    }
    return Themes.findOne({_id: themeId}).themeName;
  },

  visitTutor(){
    let tutorId= Visits.findOne({_id: this._id}).tutorId;
    let tutor= Meteor.users.findOne({_id: tutorId});

    return tutor.profile.firstName+" "+tutor.profile.lastName;
  },
  buttonAttributes: function(){
    return {'type': 'button', 'content': "Load more placements..."}
  },
  inputAttributes: function () {
    return { 'class': '_input-searchbar', 'placeholder': 'Start searching...' };
  },
  index: function () {
    return VisitsIndex;
  },
  resultsCount: function () {
    return VisitsIndex.getComponentDict().get('count');
  },
  showMore: function () {
    return false;
  },
  quickUploadVisits(){
    return Session.get("quickUploadVisits");
  },


  renderTmpl: () => Template.renderTemplate


});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Template.contentAddVisits.helpers({
  adding(){
    return Template.instance().adding.get();
  },
  selectTutor(){
    return Session.get("selectTutor");
  },
  selectPlacement(){
    return Session.get("selectPlacement");
  },

  definedPlacement(){
    return ( (Session.get("selectedTutor") !== undefined &&  Session.get("selectedPlacement") !== undefined) || (Session.get("selectedTutor") !== undefined && Template.instance().createVisit.get()===true ));

  },

  createVisit(){
    return Template.instance().createVisit.get();
  },

  buttonAttributes: function(){
    return {'type': 'button', 'content': "Load more..."}
  },
  inputAttributes: function () {
    return { 'class': '_input-searchbar', 'placeholder': 'Start searching...' };
  },

  tutorsIndex: function () {
    return UsersIndex;
  },

  placementsIndex: function () {
    return VisitsIndex;
  },
  resultsCountplacements: function () {
    return PlacementsIndex.getComponentDict().get('count');
  },

  resultsCountTutors: function () {
    return UsersIndex.getComponentDict().get('count');
  },

  showMore: function () {
    return false;
  },
  selectedPlacement(){
    return Session.get("selectedPlacement");
  },

  selectedTutor(){
    return Session.get("selectedTutor");
  },


  tutor(){
    let tutorId= Session.get("selectedTutor");
    return Meteor.users.findOne({_id: tutorId});
  },


  offer(){
    let offerId= Session.get("selectedPlacement");
    return Offers.findOne({_id: offerId});
  },


  offerHostOrganization(){
    let offerId= Session.get("selectedPlacement");
    let hostId= Offers.findOne({_id: offerId}).hostOrganizationId;
    return Establishments.findOne({_id: hostId}).name;
  },

  offerTheme(){
    let offerId= Session.get("selectedPlacement");
    let themeId= Offers.findOne({_id: offerId}).themeId;
    return Themes.findOne({_id: themeId}).themeName;
  },

  offerHostOrganizationList(){
    let offerId= this._id;
    let hostId= Offers.findOne({_id: offerId}).hostOrganizationId;
    return Establishments.findOne({_id: hostId}).name;
  },

  offerThemetypesList(){
    let offerId= this._id;
    let themetypes ="";
    let themetypesIdArray= Offers.findOne({_id: offerId }).themeTypesId;

    themetypesIdArray.map(function(o){
      themetypes+= " | "+Themetypes.findOne({"_id": o.toString()}).name;
    });
    return themetypes;
  },

  studentCohort(){
    let cohortId= Meteor.users.findOne({_id: this._id}).profile.cohortId;
    return Cohorts.findOne({_id: cohortId}).cohortYear;
  },
  studentProgramme(){
    let programmeId= Meteor.users.findOne({_id: this._id}).profile.programmeId;
    return Programmes.findOne({_id: programmeId}).programmeName;
  },

  isAccommodationProvided(){
    let offerId= Session.get("selectedPlacement");
    let provided="no";
    if(Offers.findOne({_id: offerId}).accommodation === true){
      provided= "yes";
    }

    return provided;
  },

  isCarProvided(){
    let offerId= Session.get("selectedPlacement");
    let provided="no";
    if(Offers.findOne({_id: offerId}).car === true){
      provided= "yes";
    }

    return provided;
  },


  offers(){
    return Offers.find({});
  },

  students(){
    return Meteor.users.find({ "roles": "registered", $and: [{"roles": "student"}, {"profile.isAuthorized": true}, {"profile.isPlaced": false}]});

  },

  tutors(){
    return Meteor.users.find({"roles":"registered", $and: [ {"roles": "tutor"}, {"profile.isAuthorized": true}]} );
  },

  educators(){
    let offerId= Session.get("selectedPlacement");
    let hostId= Offers.findOne({_id: offerId}).hostOrganizationId;
    return Meteor.users.find({ "roles": "registered", $and: [{"roles": "educator"}, {"profile.isAuthorized": true}, {"profile.hostOrganizationId": hostId} ]});
  },

  offerThemetypes(){
    let offerId= Session.get("selectedPlacement");
    let themetypes ="";
    let themetypesIdArray= Offers.findOne({_id: offerId }).themeTypesId;
    themetypesIdArray.map(function(o){
      themetypes+= " | "+Themetypes.findOne({"_id": o.toString()}).name;
    });

    return themetypes;
  },

  displayPlacementDetails(){
    return Session.get("selectedPlacement") !== undefined && Session.get("selectedTutor") !== undefined;
  },

  quickAddTheme(){
    return Session.get("quickAddTheme");
  },

  quickAddEducator(){
    return Session.get("quickAddEducator");
  },
  quickAddThemetypes(){
    return Session.get("quickAddThemetypes");
  }
});
