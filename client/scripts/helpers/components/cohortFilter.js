Template.cohortFilter.helpers({
  cohort(){
    return Cohorts.find({}, { sort: { cohortYear: -1 } });
  }
});
