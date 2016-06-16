Template.cohortList.events({
  "change select[name='cohort']": function(event, template){  //listening to state (checked/unchecked) change on all radio buttons
    event.preventDefault();
    Session.set("cohortId", $('select[name="cohort"] option:selected').val());
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "blur select[name='cohort']": function(event, template){
    let cohort= $('select[name="cohort"] option:selected').val();
    if(cohort===""){
      Bert.alert("You haven't selected any cohort!", "warning");
    }
  }
});
