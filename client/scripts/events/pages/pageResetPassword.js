Template.resetPasswordForm.onCreated(function() {
  // when the template is created
  if(Accounts._resetPasswordToken) {
    Session.set("resetPasswordToken", Accounts._resetPasswordToken); //set a session variable called resetPasswordToken and initialize it with a password token
  }
  Template.instance().changing = new ReactiveVar(false);

});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Template.resetPasswordForm.events({
  "blur input[name='password']": function(event, template){
    let password = $("input[name='password']").val(); //password value
    if(password==="" ||  $.trim(password)===""){
      Bert.alert("Your password is empty!", 'warning');
    }
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "blur input[name='passwordagain']": function(event, template){ //listening to key-up events on all inputs
    let password = $("input[name='password']").val(); //password value
    let passwordagain = $("input[name='passwordagain']").val(); //password verification value

    if (passwordagain !== '' &&  passwordagain!==password ){ //password are different
      Bert.alert("Both password must be identical!", 'warning'); //visual pop-up (warning)
    }
    else if (password === passwordagain){ //passwords are the same
      if(password !== '' && $.trim(password)!==""){
        Bert.alert('Both passwords are identical!','success'); //visual pop-up (success)
      }
      else{
        Bert.alert("Your password is empty!", 'warning');
      }
    }
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "submit form[name='resetPasswordForm']": function(event, template){
    event.preventDefault();
    template.changing.set( true );
    let password = $("input[name='password']").val();
    let passwordagain = $("input[name='passwordagain']").val();
    if(password !== '' && $.trim(password)!==""){
      if( password=== passwordagain ){ //passwords are the same
        Accounts.resetPassword(Session.get('resetPasswordToken'), password, function(err) {
          if (err) {
            Bert.alert('We are sorry but something went wrong.', "danger" ); //visual pop-up (error)
            template.changing.set( false );
          } else {
            Meteor.call('insertLogin', Meteor.userId(),  function(error, result) {
              if(error){
                template.changing.set( false );
                Bert.alert("Oops. Seems like an error occured. Please, try to sign in again "+error, "danger");
              }
              else{
                swal({
                  title: "Password changed!",
                  type: "success",
                  text: "Your password has been <b>successfully changed</b>.<br> Welcome back!",
                  html: true,
                  timer: 7000,
                  showConfirmButton: true,
                  showCancelButton: true,
                  confirmButtonColor: "#6E3BD2",
                  confirmButtonText: "Close",
                  closeOnConfirm: true
                });
                template.changing.set( false );
                Session.set('resetPasswordToken', undefined); //destroying the session variable so the reset page isn't accessible anymore (even through the e-mail link)
                Router.go("dashboard"); //loading profile page
              }
            });

          }
        });

      }
      else{ //passwords are different
        template.changing.set( false );
        Bert.alert('Both password must be identical! Please change the second one.','danger'); //visual pop-up (error)
      }
    }
    else{
      template.changing.set( false );
      Bert.alert("Your password is empty. Please try again.", 'danger');
    }
  }
});
