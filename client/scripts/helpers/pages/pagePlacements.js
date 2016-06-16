Template.contentAddPlacements.helpers({
  adding(){
    return Template.instance().adding.get();
  },
  selectStudent(){
    return Session.get("selectStudent");
  },
  selectOffer(){
    return Session.get("selectOffer");
  },

  buttonAttributes: function(){
    return {'type': 'button', 'content': "Load more..."}
  },
  inputAttributes: function () {
    return { 'class': '_input-searchbar', 'placeholder': 'Start searching...' };
  },
  studentsIndex: function () {
    return UsersIndex;
  },
  offersIndex: function () {
    return OffersIndex;
  },
  resultsCountOffers: function () {
    return OffersIndex.getComponentDict().get('count');
  },

  resultsCountStudents: function () {
    return UsersIndex.getComponentDict().get('count');
  },

  showMore: function () {
    return false;
  },
  selectedOffer(){
    return Session.get("selectedOffer");
  },

  selectedStudent(){
    return Session.get("selectedStudent");
  },

  student(){
    let studentId= Session.get("selectedStudent");
    return Meteor.users.findOne({_id: studentId});
  },

  cohort(){
    let studentId= Session.get("selectedStudent");
    let cohortId= Meteor.users.findOne({_id: studentId}).profile.cohortId;
    if(studentId){

    }
    return Cohorts.findOne({_id: cohortId}).cohortYear;
  },

  studentEmail(){
    let studentId= Session.get("selectedStudent");
    return Meteor.users.findOne({_id: studentId}).emails[0].address;
  },
  programme(){
    let studentId= Session.get("selectedStudent");
    let programmeId= Meteor.users.findOne({_id: studentId}).profile.programmeId;
    return Programmes.findOne({_id: programmeId}).programmeName;
  },

  currentTutor(){
    return Meteor.users.findOne({_id: Meteor.userId()});
  },

  offer(){
    let offerId= Session.get("selectedOffer");
    return Offers.findOne({_id: offerId});
  },


  hostOrganization(){
    let offerId= Session.get("selectedOffer");
    let hostId= Offers.findOne({_id: offerId}).hostOrganizationId;
    return Establishments.findOne({_id: hostId}).name;
  },

  studentCohort(){
    let cohortId= Meteor.users.findOne({_id: this._id}).profile.cohortId;
    return Cohorts.findOne({_id: cohortId}).cohortYear;
  },
  studentProgramme(){
    let programmeId= Meteor.users.findOne({_id: this._id}).profile.programmeId;
    return Programmes.findOne({_id: programmeId}).programmeName;
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
    let offerId= Session.get("selectedOffer");
    let hostId= Offers.findOne({_id: offerId}).hostOrganizationId;
    return Meteor.users.find({ "roles": "registered", $and: [{"roles": "educator"}, {"profile.isAuthorized": true}, {"profile.hostOrganizationId": hostId} ]});
  },

  themetypes(){
    let offerId= Session.get("selectedOffer");
    let themetypes ="";
    let themetypesIdArray= Offers.findOne({_id: offerId }).themeTypesId;
    themetypesIdArray.map(function(o){
      themetypes+= " | "+Themetypes.findOne({"_id": o.toString()}).name;
    });

    return themetypes;
  },

  displayPlacementDetails(){
    return Session.get("selectedOffer") !== undefined && Session.get("selectedStudent") !== undefined;
  }
});