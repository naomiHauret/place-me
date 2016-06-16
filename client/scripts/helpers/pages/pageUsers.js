Template.usersList.helpers({
  profileCurrentUser() {
    return this._id == Meteor.userId();
  },
  email(){
    return this.emails[0].address;
  },
  status(){
    return this.roles[0];
  },
  authorized(){
    return this.profile.isAuthorized === true;
  },
  hasMoreUsers(){
    return Template.instance().users().count() <= Template.instance().limit.get();
  },

  students(){
    return Meteor.users.find({"roles": "student"}, {sort:{lastName: 1}});
  },

  tutors(){
    return Meteor.users.find({"roles": "tutor"}, {sort:{lastName: 1}});
  },

  coordinators(){
    return Meteor.users.find({"roles": "coordinator"}, {sort:{lastName: 1}});
  },

  educators(){
    return Meteor.users.find({"roles": "educator"}, {sort:{lastName: 1}});
  },
  buttonAttributes: function(){
    return {'type': 'button', 'content': "Load more users..."}
  },
  inputAttributes: function () {
    return { 'class': '_input-searchbar', 'placeholder': 'Start searching...' };
  },
  users: function () {
    return Meteor.users.find({roles :"registered"});
  },
  email(){
    return this.emails[0].address;
  },
  status(){
    return this.roles[0];
  },
  authorized(){
    return this.profile.isAuthorized === true;
  },
  index: function () {
    return UsersIndex;
  },
  resultsCount: function () {
    return UsersIndex.getComponentDict().get('count');
  },
  showMore: function () {
    return false;
  },
  filterEducators(){
    return Template.instance().filterEducators.get();
  },
  filterStudents(){
    return Template.instance().filterStudents.get();
  },
  filterCoordinators(){
    return Template.instance().filterCoordinators.get();
  },

  search(){
    let searchInput= $("._input-searchbar").val();
    let result= "Number of users "
    if(searchInput !== ""){
      result= 'Users corresponding to "'+searchInput+'" ';
    }
    return result;
  },
  renderTmpl: () => Template.renderTemplate
});

Template.contentUsers.helpers({

  profileCurrentUser() {
    return this._id == Meteor.userId();
  },
  email(){
    return this.emails[0].address;
  },
  status(){
    return this.roles[0];
  },
  authorized(){
    return this.profile.isAuthorized === true;
  },
  hasMoreUsers(){
    return Template.instance().users().count() <= Template.instance().limit.get();
  },

  students(){
    return Meteor.users.find({"roles": "student"}, {sort:{lastName: 1}});
  },

  tutors(){
    return Meteor.users.find({"roles": "tutor"}, {sort:{lastName: 1}});
  },

  coordinators(){
    return Meteor.users.find({"roles": "coordinator"}, {sort:{lastName: 1}});
  },

  educators(){
    return Meteor.users.find({"roles": "educator"}, {sort:{lastName: 1}});
  },
  buttonAttributes: function(){
    return {'type': 'button', 'content': "Load more users..."}
  },
  inputAttributes: function () {
    return { 'class': '_input-searchbar', 'placeholder': 'Start searching...' };
  },
  users: function () {
    return Meteor.users.find({roles :"registered"});
  },
  email(){
    return this.emails[0].address;
  },
  status(){
    return this.roles[0];
  },
  authorized(){
    return this.profile.isAuthorized === true;
  },
  index: function () {
    return UsersIndex;
  },
  resultsCount: function () {
    return UsersIndex.getComponentDict().get('count');
  },
  showMore: function () {
    return false;
  },
  filterEducators(){
    return Template.instance().filterEducators.get();
  },
  filterStudents(){
    return Template.instance().filterStudents.get();
  },
  filterCoordinators(){
    return Template.instance().filterCoordinators.get();
  },

  search(){
    let searchInput= $("._input-searchbar").val();
    let result= "Number of users "
    if(searchInput !== ""){
      result= 'Users corresponding to "'+searchInput+'" ';
    }
    return result;
  },
  renderTmpl: () => Template.renderTemplate
});

Template.contentAddCoordinator.helpers({
  adding(){
    return Template.instance().adding.get();
  }
});

Template.contentAddEducator.helpers({
  adding(){
    return Template.instance().adding.get();
  }
});
