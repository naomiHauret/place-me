Template.contentIndicationsProfile.helpers({
  profileCurrentUser() {
    return Router.current().params._id == Meteor.userId();
  },
  user(){
    return Meteor.users.findOne({_id: this._id});
  },
  isStudent(){
    return Meteor.users.findOne({_id: this._id}).roles[0] === "student";
  },
  isTutor(){
    return Meteor.users.findOne({_id: this._id}).roles[0] === "tutor";
  },
  isCoordinator(){
    return Meteor.users.findOne({_id: this._id}).roles[0] === "coordinator";
  },

  isEducator(){
    return Meteor.users.findOne({_id: this._id}).roles[0] === "educator";
  }

});

Template.breadcrumbProfile.helpers({
  profileCurrentUser() {
    return Router.current().params._id == Meteor.userId();
  },
  user(){
    return Meteor.users.findOne({_id: this._id});
  }
});

Template.contentProfile.helpers({
  profileCurrentUser() {
    return Router.current().params._id == Meteor.userId();
  },
  user(){
    return Meteor.users.findOne({_id: this._id});
  },
  userCohort(){
    let cohortId= Meteor.users.findOne({_id: this._id}).profile.cohortId;
    return Cohorts.findOne({_id: cohortId}).cohortYear;
  },
  userProgramme(){
    let programmeId= Meteor.users.findOne({_id: this._id}).profile.programmeId;
    return Programmes.findOne({_id: programmeId}).programmeName;
  },

  userPlaced(){
    let placed = "Not placed";
    if(Meteor.users.findOne({_id: this._id}).profile.isPlaced === true ){
      placed = "Placed";
    }

    return placed;
  },

  userTrustOrganization(){
    let trustId= Meteor.users.findOne({_id: this._id}).profile.trustOrganizationId;
    return Establishments.findOne({_id: trustId}).name;
  },
  userHostOrganization(){
    let hostId= Meteor.users.findOne({_id: this._id}).profile.hostOrganizationId;
    return Establishments.findOne({_id: hostId}).name;
  },
  userPermanentAddress(){
    return Meteor.users.findOne({_id: this._id}).profile.addresses[0].formattedAddress;
  },
  userStudyAddress(){
    return Meteor.users.findOne({_id: this._id}).profile.addresses[1].formattedAddress;
  },
  userEmail(){
    return Meteor.users.findOne({_id: this._id}).emails[0].address;
  },
  userStatus(){
    return Meteor.users.findOne({_id: this._id}).roles[0];
  },
  isStudent(){
    return Meteor.users.findOne({_id: this._id}).roles[0] === "student";
  },
  isTutor(){
    return Meteor.users.findOne({_id: this._id}).roles[0] === "tutor";
  },
  isCoordinator(){
    return Meteor.users.findOne({_id: this._id}).roles[0] === "coordinator";
  },

  isEducator(){
    return Meteor.users.findOne({_id: this._id}).roles[0] === "educator";
  },

  isAuthorized(){
    return Meteor.users.findOne({_id: this._id}).profile.isAuthorized === true;
  }
});
