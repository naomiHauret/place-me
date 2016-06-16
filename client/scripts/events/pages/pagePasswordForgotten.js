Template.passwordForgottenForm.onCreated( function() {
  Template.instance().processing = new ReactiveVar(false); //create a reactive var for our spinner
});


Template.passwordForgottenForm.events({
  "click a[name='tryAgainLink']": function(event, template){
    Session.set("verifiedEmail", undefined); //destroy our session variable
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "blur input[name='email']": function(event,template){

    let email = $("input[name='email']").val(); //getting email value
    let user=  Meteor.users.findOne({"emails.address" : email}); //find if this user exists or not

    if(IsValidEmail(email)){ //valid email
      //Ghost (unauthorized) account (error)
      if (email === "registerStudent@register.com" || email === "registerEducator@register.com" || email === "registerTutor@register.com" || email === "registerCoordinator@register.com"){
        Bert.alert("Access forbidden. Please, change your e-mail address.", 'warning');
      }
    }
    else{ //invalid email
      Bert.alert("Your e-mail address is invalid.", 'warning');
    }
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "submit form[name='passwordForgottenForm']": function(event, template){ //listening to submit event on the form
    event.preventDefault();
    template.processing.set( true ); //start our spinner

    let email = $("input[name='email']").val(); //getting email value
    let user=  Meteor.users.findOne({"emails.address" : email});//find if this user exists or not

    if(IsValidEmail(email)){ //valid email
      //Ghost (unauthorized) account (error)
      if (email === "registerStudent@register.com" || email === "registerEducator@register.com" || email === "registerTutor@register.com" || email === "registerCoordinator@register.com"){
        template.processing.set( false ); //stop the spinner
        swal({
          title: "Access forbidden",
          text: "You are <b>not allowed</b> to use this functionality. Please, <b>register</b>.<br>If you think you used a wrong address, try again.",
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
          if (isConfirm) { // "go to register page" clicked
            Router.go("register"); //redirect user to register page
          }
        });
      }
      else{
        if(user !== undefined ){ //email found

          //reCAPTCHA
          if (!reCAPTCHA.settings.useOldCaptcha){
            gRecaptchaResponse = $('#g-recaptcha-response').val();
          }
          else {
            gRecaptchaResponse = {
              captcha_challenge_id: Recaptcha.get_challenge(),
              captcha_solution: Recaptcha.get_response()
            }
          }

          let formData = {
            "dataEmail": $("input[name='email']").val(),
            "gRecaptchaResponse" : gRecaptchaResponse
          };

          //get the captcha data
          let recaptchaResponse = $('#g-recaptcha-response').val();
          if(recaptchaResponse === ""){ //error: reCAPTCHA challenge wasn't done
            template.processing.set( false ); //stop the spinner
            Bert.alert("You must confirm you're not a robot!", "danger");
          }
          else{ //reCAPTCHA challenge done
            Meteor.call('formSubmissionMethod', formData, function (error, result) { //passing reCAPTCHA challenge (verifying if not a robot)
              if (error) { //error
                template.processing.set( false ); //stop the spinner
                swal({
                  title: "An unexpected error occured",
                  text: "And we don't know why. But nevermind. To submit your reset password request, please <b>try again</b>.",
                  type: "error",
                  showCancelButton: true,
                  confirmButtonColor: "#6E3BD2",
                  confirmButtonText: "Try again",
                  cancelButtonText: "Cancel",
                  html:true,
                  closeOnConfirm: true,
                  closeOnCancel: true
                },
                function(isConfirm){
                  if (isConfirm) { //"try again" clicked
                    document.location.reload(true); //reload the page
                  }
                  else{
                    Bert.alert("You will have to change your e-mail address to get a reset password mail.", "info");
                  }
                });
              }
              else {
                if(result===true){ //not a robot
                  template.processing.set( true );
                  Accounts.forgotPassword({email: email}, function(err) {
                    if (err) { //handling error
                      template.processing.set( false );
                      if (err.message === 'User not found [403]') {
                        swal({
                          title: "Access forbidden",
                          text: "Your e-mail address <b>was not found</b>. Please, <b>try again</b> or <b>register</b>.",
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
                          if (isConfirm) {
                            Router.go("register");
                          }
                        });
                      }
                      else {
                        template.processing.set( false );
                        Bert.alert('We are sorry but something went wrong. Please, reload the page and try again.', 'danger'); //visual pop-up (danger);
                      }
                    }
                    else {
                        template.processing.set( false );
                      Session.set("verifiedEmail", true);
                      verifiedEmail= Session.get("verifiedEmail"); //session variable to check if an e-mail was sent
                      Session.set('resetPasswordToken', Accounts._resetPasswordToken);  //session variable to check if the link was clicked (in the email)
                      Bert.alert("E-mail sent!", 'success'); // visual pop-up (success)
                    }
                  });

                }
                else{
                  template.processing.set( false );
                  Bert.alert("Robots are not allowed to register! If you're not a robot, please reload the page and try again.", "danger");
                }
              }
            });
          }
        }

        else{ //email not found
          template.processing.set( false );
          swal({
            title: "Access forbidden",
            text: "Your e-mail address <b>was not found</b>. Please, <b>try again</b> or <b>register</b>.",
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
            if (isConfirm) {
              Router.go("register");
            }
          });
        }

      }
      }
      else{
        template.processing.set( false );
        if(email=== "" || $.trim(email)===""){
          Bert.alert("The e-mail field is empty! Please try again.", 'danger');
        }
        else{
          Bert.alert("This is not a valid e-mail address. Please try again.", 'danger');
        }
      }
    }
  });
