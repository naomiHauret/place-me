Meteor.methods({
  'addCohort': function(cohortData){
    return Cohorts.insert({
      cohortYear: cohortData.cohortYear,
    });
  },

  'removeCohort': function(cohortId){
    return Cohorts.remove({
      _id: cohortId
    });
  },

  'updateCohort': function(cohortData, cohortId){

  }
});
