Template.inputDateTime.onRendered(function(){
    this.$('.datetimepicker').datetimepicker({
      format: 'MM/DD/YYYY HH:mm A', //e.g: 06/30/2015 10:30 AM
      sideBySide: true,
      minDate: moment(),
      showTodayButton: true
    });
});

Template.inputDateTime.events({
  "blur input[name='datetime']": function(event, template){
    let date= $('input[name="datetime"]').val();
    if(date === "" || $.trim(date)===""){
      Bert.alert("Date and time field is empty!", "warning");
    }
    if(!moment(date, "MM/DD/YYYY HH:mm A").isValid()){
      Bert.alert("This is not a valid date time format!");
    }
  }
});
