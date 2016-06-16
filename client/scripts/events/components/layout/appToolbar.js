Template.appToolbar.events({
  'click a[name="logout"]': function(event, template){
    let message= "Goodbye "+Meteor.user().profile.firstName+" "+Meteor.user().profile.lastName+"!";
    Bert.alert(message, "success");
    Meteor.logout();
    Router.go("login");
  }
});
