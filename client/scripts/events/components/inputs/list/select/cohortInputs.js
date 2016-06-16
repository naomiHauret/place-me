Template.cohortInputs.onRendered(function(){
    this.$('.datetimepicker').datetimepicker({
      inline: true,
      sideBySide: true,
      format: 'YYYY', //date only
      defaultDate: moment().add(4, 'years'), //2020 (in 2016), 2021(in 2017)
      minDate: moment().add(4, 'years'),//min year is 2020 (in 2016), 2021 (in 2017) etc
      showTodayButton: true
    });
});

Template.cohortInputs.events({
  "blur input[name='cohort']": function(event, template){
    let date= $("input[name='cohort']").val();

    if(date === "" || $.trim(date)===""){
      Bert.alert("Cohort year is empty!", "warning");
    }
    if(!moment(date, "YYYY").isValid()){
      Bert.alert("This is not a valid date format! Use a year instead.");
    }
  }

});
