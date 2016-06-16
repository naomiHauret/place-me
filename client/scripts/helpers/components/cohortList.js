Template.cohortList.helpers({
  cohort(){
    return Cohorts.find({}, { sort: { cohortYear: -1 } });
  }
});
