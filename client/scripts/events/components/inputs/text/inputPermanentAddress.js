Template.studentAddressInput.events({
  "change input[name='differentAddresses'] ": function(event, template){
    console.log("check bro");
    if($("input[name='differentAddresses']").is(':checked')){
        Session.set("differentAddresses", true);
    }

    else{
      Session.set("differentAddresses", undefined);
    }
  }
});
