Template.loginForm.onCreated( function() {
  Template.instance().login = new ReactiveVar(false); //create our reactive var (for our spinner)
});


Template.loginForm.events({
  "submit form[name='loginForm']": function(event, template){ //listening to submit event on the form
    event.preventDefault();
    template.login.set( true ); //start the spinner

    //getting our user's data
    let user = $("input[name='email']").val(); //getting email value
    let password = $("input[name='password']").val(); //getting password value

    if(IsValidEmail(user)){
      //Ghost account (error)
      if(user === "registerStudent@register.com" || user === "registerEducator@register.com" || user === "registerTutor@register.com" || user === "registerCoordinator@register.com"){

        template.login.set( false ); //stop the spinner
        swal({
          title: "Access forbidden",
          text: "You are <strong>not allowed</strong> to use this functionality. Please, <strong>register</strong>.<br>If you think you used a wrong address, try again.",
          type: "error",
          showCancelButton: true,
          confirmButtonColor: "#6E3BD2",
          confirmButtonText: "Go to register page",
          cancelButtonText: "Try again",
          closeOnConfirm: true,
          html:true,
          closeOnCancel: true
        },
        function(isConfirm){
          if (isConfirm) { //"go to register page" clicked
            Router.go("register");  //redirect the user to register page
          }
        });
      }
      else { // registered (not ghost) user
        Meteor.loginWithPassword(user, password, function(error){ //check if the user exists and if there's a match between the submitted e-mail and password
        if(error){ //error handling
          template.login.set( false ); //stop the spinner
          swal({
            title: "Access forbidden",
            text: "Your e-mail address <strong>was not found</strong>. Please, <strong>try again</strong> or <strong>register</strong>.",
            type: "error",
            showCancelButton: true,
            confirmButtonColor: "#6E3BD2",
            confirmButtonText: "Go to register page",
            cancelButtonText: "Try again",
            html:true,
            closeOnConfirm: true,
            closeOnCancel: true
          },
          function(isConfirm){
            if (isConfirm) { //"go to register page" clicked
              Router.go("register"); //redirect to register page
            }
            else{
              Bert.alert("To login you will have to change your e-mail address.", "info");
            }
          });
        }
        else {
          //configure if the user stays logged in or not

            Meteor.call('insertLogin', Meteor.userId(), function(error, result) {
              if(error){
                template.login.set( false ); //stop the spinner
                swal({
                  title: "Login procedure failed!",
                  text: "We're sorry but we <b>couldn't logged you in</b> because of unexpected events. Please, <b>try again</b>.",
                  type: "error",
                  showCancelButton: true,
                  confirmButtonColor: "#6E3BD2",
                  confirmButtonText: "Try again",
                  cancelButtonText: "Cancel",
                  closeOnConfirm: true,
                  html:true,
                  closeOnCancel: true
                },
                function(isConfirm){
                  if (isConfirm) {
                    document.location.reload(true); //reload the page
                  }
                  else{
                    Bert.alert("To login you will have to reload the page.", "info");
                  }
                });
              }
              else{ //user logged in
                let message= "Welcome back "+Meteor.user().profile.firstName+" "+Meteor.user().profile.lastName+"!";
                Bert.alert(message, "success");
                Router.go("dashboard"); // Redirect user if registration succeeds
              }
            });

        }
      });
    }
  }
  else{ //invalid e-mail address
    template.login.set( false ); //stop the spinner
    $("input[name='email']").val(""); //empty email address input
    Bert.alert("This is not a valid e-mail address. Please try again.", "danger");
  }
}
});
