Template.applayout.events({
  'click .floating-button': function(e, template){
    e.preventDefault();
    $('.ui.sidebar').sidebar('show');
  }

});
