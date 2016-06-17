Template.applayout.events({
  'click .floating-button': function(e, template){
    e.preventDefault();
    $('.ui.sidebar').sidebar('show');
  },

  'click .floating-button[name="quickAddTrust"]': function(e, template){
    Session.set("quickAddTrust", true);
  },

  'click .floating-button[name="quickAddThemetypes"]': function(e, template){
    Session.set("quickAddThemetypes", true);
  },

  'click .floating-button[name="quickAddTheme"]': function(e, template){
    Session.set("quickAddTheme", true);
  },

  'click .floating-button[name="quickAddHost"]': function(e, template){
    Session.set("quickAddHost", true);
  }

});
