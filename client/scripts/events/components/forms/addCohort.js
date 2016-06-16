Template.addCohort.onCreated( function() {
  Template.instance().adding = new ReactiveVar(false); //create a reactive var for our spinner
});
