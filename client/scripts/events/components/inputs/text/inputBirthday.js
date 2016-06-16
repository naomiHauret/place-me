Template.inputBirthday.onRendered(function(){
    this.$('.datetimepicker').datetimepicker({
      sideBySide: false,
      format: 'MM/DD/YYYY', //date only
      defaultDate: moment().subtract(15, 'years'),
      maxDate: moment().subtract(15, 'years'),//minimum age to register is 15
      showTodayButton: true
    });
});

Template.inputBirthday.events({
  "blur input[name='birthdayDate']": function(event, template){
    let date= $("input[name='birthdayDate']").val();
    console.log("val birthday: "+date);
    if(date === "" || $.trim(date)===""){
      Bert.alert("Your birthday date is empty!", "warning");
    }
    if(!moment(date, "MM/DD/YYYY").isValid()){
      Bert.alert("This is not a valid date format!");
    }
  }
});
