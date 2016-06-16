Template.studentForm.events({
  'change input[name="differentAddresses"]': function(event,template){
    let differentAddresses= $('input[name="differentAddresses"]').is(':checked');
    if(differentAddresses){
      $('input[name="streetAddressSchool"]').attr("disabled", false);
      $('input[name="streetAddress2School"]').attr("disabled", false);
      $('input[name="citySchool"]').attr("disabled", false);
      $('input[name="zipcodeSchool"]').attr("disabled", false);
    }
    else{
      $('input[name="streetAddressSchool"]').attr("disabled", true);
      $('input[name="streetAddress2School"]').attr("disabled", true);
      $('input[name="citySchool"]').attr("disabled", true);
      $('input[name="zipcodeSchool"]').attr("disabled", true);
    }
  }
});
