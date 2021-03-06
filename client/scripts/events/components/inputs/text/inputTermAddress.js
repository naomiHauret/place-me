Template.inputTermAddress.events({
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "blur input[name='streetAddressSchool']": function(event, template){
    let addressLine=$('input[name="streetAddressSchool"]').val()+" "+$('input[name="streetAddress2School"]').val();
    if($.trim(addressLine)==="" || addressLine===""){
      Bert.alert("Address field is empty!", "warning");
    }
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "blur input[name='streetAddress2School']": function(event, template){
    let addressLine=$('input[name="streetAddressSchool"]').val()+" "+$('input[name="streetAddress2School"]').val();
    if($.trim(addressLine)==="" || addressLine===""){
      Bert.alert("Address field is empty!", "warning");
    }
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "blur input[name='zipCodeSchool']": function(event, template){
    let postcode= $("input[name='zipcodeSchool']").val();
    if($.trim(postcode)==="" || postcode ===""){
      Bert.alert("Postcode field is empty!", "warning");
    }
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "blur input[name='citySchool']": function(event, template){
    let city = $("input[name='citySchool']").val();
    if($.trim(city)==="" || city ===""){
      Bert.alert("City field is empty!", "warning");
    }
  }
});
