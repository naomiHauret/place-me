Template.inputEmail.events({
  "blur input[name='email']": function(event, template){
    let email= $("input[name='email']").val();
    if(email === "" || $.trim(email)===""){
      Bert.alert('E-mail field is empty!', 'warning');
    }
    else{
      if(!IsValidEmail(email)){
        Bert.alert('This is not a valid email address!', 'warning');
      }
    }
  }
});
