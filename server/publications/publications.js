//publications.js

//Publish registered users, sorted alphabetically
Meteor.publish('users', function () {
  return Meteor.users.find({roles :"registered"}, {sort: {'profile.lastName': 1}});
});

//Publish email addresses of users
Meteor.publish('userInfo', function () {
  return Meteor.users.find({}, {fields: {emails: 1}});
});

//Publish unplaced students
Meteor.publish('unplacedStudents', function(){
  return Meteor.users.find({ "roles": "registered", $and: [{"roles": "student"}, {"profile.isAuthorized": true}, {"profile.isPlaced": false}] },  {sort: {'profile.lastName': 1}});
});

//Publish tutors
Meteor.publish("tutors", function(){
  return Meteor.users.find({"roles":"registered", $and: [ {"roles": "tutor"}, {"profile.isAuthorized": true}]}, {sort: {'profile.lastName': 1}} );
});

//Publish educators
Meteor.publish('educators', function(){
  return Meteor.users.find({ "roles": "registered", $and: [{"roles": "educator"}, {"profile.isAuthorized": true}] },  {sort: {'profile.lastName': 1}});
});


//Publish cohorts
Meteor.publish('cohorts', function(){
  return Cohorts.find({}, {fields: {'cohortYear': 1}});
});

//Publish programmes
Meteor.publish('programmes', function(){
  return Programmes.find({},{fields: {'programmeName': 1}});
});

//Publish country names
Meteor.publish('countries', function(){
  return SuxezCountries.find({}, {fields: {'cn_short_local': 1, 'cn_short_en': 1} } );
});


//Publish themes
Meteor.publish('themes', function(){
  return Themes.find({}, {sort: {'themeName': 1}});
});

//Publish all themetypes
Meteor.publish('themetypes', function(){
  return Themetypes.find({}, {sort: {'name': 1}});
});

Meteor.publish('organizationNames', function(){
  return Establishments.find({}, {fields: {'name': 1}}, {sort: {'name': 1}});

});

//Publish all organizations/establishments
Meteor.publish('organizations', function(){
  return Establishments.find({}, {sort: {'name': 1}});
});

//Publish host organizations
Meteor.publish('hostOrganizations', function(){
  return Establishments.find({'type': 'hostOrganization'}, {sort: {'name': 1}});
});

//Publish trust organizations
Meteor.publish('trustOrganizations', function(){
  return Establishments.find({'type': 'trustOrganization'}, {sort: {'name': 1}});
});

Meteor.publish('offers', function(){
  return Offers.find({}, {sort: {'createdAt': -1 }});
});
Meteor.publish('activeOffers', function(){
  return Offers.find({'isActive': true}, {sort: {'createdAt': -1 }});
});
