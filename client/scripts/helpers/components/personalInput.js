Template.personalInput.helpers({
  displayBirthday: function(){
    return Session.get("displayBirthday");
  },
  displayAddress: function() {
    return Session.get("displayAddress");
  }
});
