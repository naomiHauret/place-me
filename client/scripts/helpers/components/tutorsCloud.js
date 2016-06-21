Template.tutorsCloud.helpers({
  tutor: function(){
    return Meteor.users.find({"roles":"registered", $and: [ {"roles": "tutor"}, {"profile.isAuthorized": true}]});
  }
});
