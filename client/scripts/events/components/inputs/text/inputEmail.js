Template.inputEmail.events({
  "blur input[name='email']": function(event, template){ //on blur event on input[name="email"]

    let email= $("input[name='email']").val(); //get input value

    if(email === "" || $.trim(email)===""){ //if empty e-mail
      Bert.alert('E-mail field is empty!', 'warning'); //throw warning toastr alert
    }

    else{
      if(!IsValidEmail(email)){ //if invalid format
        Bert.alert('This is not a valid email address!', 'warning'); //throw warning toastr alert
      }
    }
  }
});
