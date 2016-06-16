Template.pageRegister.onDestroyed(function(){ //when page is destroyed
  //Destroy status session variables
  Session.set("student", undefined);
  Session.set("coordinator", undefined);
  Session.set("educator", undefined);
  Session.set("tutor", undefined);
});


Template.registerForm.onCreated( function() {
  //Reactive var for register form
  Template.instance().loading = new ReactiveVar(false);
  Template.instance().processing = new ReactiveVar(false);
  Template.instance().step2= new ReactiveVar(false);
});

Template.studentForm.onRendered(function(){
  //Disable the "different addresses" fields
  $('input[name="differentAddresses"]').attr( "checked", false );
  $('input[name="streetAddressSchool"]').attr("disabled", true);
  $('input[name="streetAddress2School"]').attr("disabled", true);
  $('input[name="citySchool"]').attr("disabled", true);
  $('input[name="zipcodeSchool"]').attr("disabled", true);
});

Template.registerForm.events({
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "change select[name='status']": function(event, template){  //listening to changes on our select list
    event.preventDefault();
    let status = $('select[name="status"] option:selected').val(); //getting which option is selected
    educator= Session.set("educator", undefined);
    student= Session.set("student", undefined);
    tutor= Session.set("tutor", undefined);
    coordinator= Session.set("coordinator", undefined);

    //comparing and setting our status session variable
    if(status === "student"){
      Session.set("student", true);
    }
    else if(status === "educator"){
      Session.set("educator", true);
    }
    else if(status === "tutor"){
      Session.set("tutor", true);
    }

    else if(status === "coordinator"){
      Session.set("coordinator", true);
    }
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'click button[data-state="step-2"]': function(event, template){
    event.preventDefault();
    //getting our data
    let email = $("input[name='email']").val();
    let status = $('select[name="status"] option:selected').val();
    let key= $("input[name='key']").val();
    let unregisteredUser = "";
    let user=  Meteor.users.findOne({"emails.address" : email}); //get the user of this address in our database (return undefined if it doesn't exist)

    template.loading.set( true ); //start the spinner

    if(IsValidEmail(email)){ //valid email
      if(email !=="registerStudent@register.com" && email !=="registerEducator@register.com" && email !=="registerTutor@register.com" && email !=="registerCoordinator@register.com"){ //not our register ghost account email

      if (user !== undefined){ //error: user existing (email already used)
          template.loading.set( false ); //stop the spinner
          Bert.alert("This e-mail address is already used", 'danger'); //visual pop-up (success)
          $('input[name="email"]').val(""); //empty e-mail input
        }
        else{

          //getting our ghost register account
          if(status === "student" || status === "educator" || status === "tutor" || status === "coordinator"){

            if(status === "student"){ //register as a student
              unregisteredUser= "registerStudent@register.com";
              Session.set("status", "student");

            }
            else if(status ==="educator"){ //register as an educator
              unregisteredUser= "registerEducator@register.com";
              Session.set("status", "educator");
            }

            else if(status === "tutor"){ //register as a tutor
              unregisteredUser= "registerTutor@register.com";
              Session.set("status", "tutor");

            }
            else if(status === "coordinator"){ //register as a coordinator
              unregisteredUser= "registerCoordinator@register.com";
              Session.set("status", "coordinator");
            }


            //Google reCAPTCHA
            if (!reCAPTCHA.settings.useOldCaptcha){
              gRecaptchaResponse = $('#g-recaptcha-response').val();
            }
            else {
              gRecaptchaResponse = {
                captcha_challenge_id: Recaptcha.get_challenge(),
                captcha_solution: Recaptcha.get_response()
              }
            }

            //get the data to be submitted
            let formData = {
              "dataEmail": $("input[name='email']").val(),
              "dataStatus": $('select[name="status"] option:selected').val(),
              "dataKey": $("input[name='key']").val(),
              "gRecaptchaResponse" : gRecaptchaResponse
            };

            //get the captcha data
            let recaptchaResponse = $('#g-recaptcha-response').val();

            if(recaptchaResponse === ""){ //error: reCAPTCHA not confirmed
              template.loading.set( false ); //stop spinner
              Bert.alert("You must confirm you're not a robot!", "danger");
            }

            else{
              Meteor.call('formSubmissionMethod', formData, function (error, result) {
                if (error) {
                  template.loading.set( false ); //stop the spinner
                  Bert.alert("Oops. Seems like there's a problem. Please reload the page and try again.", "danger");
                }
                else {
                  if(result===true){
                    Meteor.loginWithPassword(unregisteredUser, key, function(error){ //check if the user exists and if there's a match between the submitted e-mail and password
                    if(error){ //error handling
                      template.loading.set(false); //stop the spinner
                      let reason = error.reason;
                      if(reason === "Match failed" || reason ==="Incorrect password"){ //Incorrect key
                        reason= "Your register key is wrong. Please try again.";
                      }
                      Bert.alert(reason, 'danger'); //visual pop-up (danger)
                    }
                    else{ //user allowed to register
                      template.step2.set(true); //go to step 2
                      Session.set("registerEmail", email); //set our user's email address (will be used in step 2)
                      template.loading.set(false); //stop the spinner
                    }
                  });
                }
                else{ // failed reCAPTCHA challenge (robot?)
                  template.loading.set( false ); //stop the spinner
                  Bert.alert("Robots are not allowed to register! If you're not a robot, please reload the page and try again.", "danger");
                }
              }
            });
          }
        }
        else{ //status not selected
          template.loading.set( false ); //stop the spinner
          Bert.alert('You must select your status to get registered!', 'danger');
        }
      }
    }
    else{ //forbidden user (ghost register account)
      template.loading.set( false ); //stop the spinner
      Bert.alert("Access forbidden. Please, use another e-mail address.", "danger");
       $("input[name='email']").val(""); //empty email address input
    }
  }
  else{  //error: email address not valid
    template.loading.set( false ); //stop the spinner
    $("input[name='email']").val(""); //empty email address input
    Bert.alert('This is not a valid e-mail address!','danger'); //visual pop-up (warning)
  }
},

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
"submit form[name='registerForm']": function(event, template){
  event.preventDefault();

  template.processing.set( true ); //start the spinner

  //getting our new user's data
  let email= Session.get("registerEmail") ;
  let password= $('input[name="password"]').val() ;
  let firstName= $('input[name="firstName"]').val();
  let lastName= $('input[name="lastName"]').val() ;
  let addressLine1=$('input[name="streetAddress"]').val();
  let addressLine2=$('input[name="streetAddress2"]').val();
  let zipcode= $('input[name="zipcode"]').val();
  let city= $('input[name="city"]').val();
  let country= $('.countrySelect').val();
  let phone=$('input[name="phone"]').val();
  let birthday= $('input[name="birthdayDate"]').val();
  let cohort= $('select[name="cohort"]').val();
  let programme= $('select[name="programme"]').val();
  let hostEstablishment= $('.hostSelect option:selected').val();
  let trustEstablishment= $('.trustSelect option:selected').val();
  let status= Session.get("status");
  let differentAddresses= $('input[name="differentAddresses"]').is(':checked');

  if(status === "student"){
    if(($.trim(birthday)==="")){
      template.processing.set( false );
      Bert.alert("Your birthday date is empty. Please try again.", "danger");
    }
  }

  //setting our new user's data in an object
  let userdata={
    "email": email,
    "password": password,
    "role": status,
    "firstName": firstName,
    "lastName": lastName,
    "phone": phone
  };

  //Student specific inputs
  if(status === "student"){
    userdata.cohort= cohort;
    userdata.programme=programme;
    userdata.birthday= birthday;
    userdata.addressLine1= addressLine1 ;
    userdata.addressLine2= addressLine2 ;
    userdata.city= city;
    userdata.zipcode= zipcode;
    userdata.country= country;

    if(differentAddresses){
      userdata.schoolAddressLine1= $('input[name="streetAddressSchool"]').val() ;
      userdata.schoolAddressLine2= $('input[name="streetAddress2School"]').val() ;
      userdata.schoolCity= $('input[name="citySchool"]').val();
      userdata.schoolZipcode= $('input[name="zipcodeSchool"]').val();
    }
    else{
      userdata.schoolAddressLine1= userdata.addressLine1;
      userdata.schoolAddressLine2= userdata.addressLine2 ;
      userdata.schoolCity= userdata.city;
      userdata.schoolZipcode=  userdata.zipcode;
    }
  }

  //Tutor specific inputs
  else if(status === "tutor"){
    userdata.addressLine1= addressLine1 ;
    userdata.addressLine2= addressLine2 ;
    userdata.city= city;
    userdata.zipcode= zipcode;
  }

  //Coordinator specific inputs
  else if(status === "coordinator"){
    userdata.trustOrganizationId = trustEstablishment;
  }

  //Educator specific inputs
  else if (status === "educator"){
    userdata.hostOrganizationId = hostEstablishment;
  }

  //add our new user
  Meteor.call('addUserAccount', userdata, function (error, result) {

  if(error) { //error
      Bert.alert( error.reason, 'danger' );
      template.processing.set( false ); //stop the spinner

    }
    else { //user added

      Meteor.loginWithPassword(email, password, function(error){ //log our freshly added user

        if(error){
          Bert.alert( error.reason, 'danger' );
          template.processing.set( false ); //stop the spinner

        }
        else{ //user registered and logged in
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
              swal({
                title: "Welcome!",
                type: "success",
                text: "You are now <b>registered</b>.<br> Welcome!",
                html: true,
                timer: 7000,
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonColor: "#6E3BD2",
                confirmButtonText: "Close",
                closeOnConfirm: true
              });
              template.processing.set( false ); //stop the spinner
              Router.go("dashboard"); //redirect to dashboard
            }
          });


        }
      });
    }
  });
}
});

Template.registerFormStep1.events({
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "blur input[name='email']": function(event, template){ //listening to key-up events on all inputs
    let email = $("input[name='email']").val(); //getting email value
    let user=  Meteor.users.findOne({"emails.address" : email});

    if(user === undefined ){ //email not found
      if (IsValidEmail(email)) {
        Bert.alert("This e-mail address is valid and not already used", 'success'); //visual pop-up (success)
      }
      else{
        if(email=== "" || $.trim(email)==="" ){
          Bert.alert('Your e-mail address is empty!','warning');
        }
        else{
          Bert.alert('This is not a valid e-mail address!','warning');
        }
      }
    }
    else { //email already taken
      Bert.alert('This e-mail address is already taken!','warning'); //visual pop-up (warning)
    }
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "blur input[name='key']": function(event, template){  //listening to changes on our select list
    let key= $("input[name='key']").val();
    if(key=== "" || $.trim(key)===""){
      Bert.alert("The key is empty!", "warning");
    }
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "blur select[name='status']": function(event, template){
    let status = $('select[name="status"]').val(); //getting which option is selected
    if(status ===""){
      Bert.alert("You haven't selected any status!", "warning");
    }
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "change select[name='status']": function(event, template){  //listening to changes on our select list
    event.preventDefault();
    let status = $('select[name="status"] option:selected').val(); //getting which option is selected
    educator= Session.set("educator", undefined);
    student= Session.set("student", undefined);
    tutor= Session.set("tutor", undefined);
    coordinator= Session.set("coordinator", undefined);

    //comparing
    if(status === "student"){
      Session.set("student", true);
    }
    else if(status === "educator"){
      Session.set("educator", true);
    }
    else if(status === "tutor"){
      Session.set("tutor", true);
    }

    else if(status === "coordinator"){
      Session.set("coordinator", true);
    }
  }
});

Template.registerFormStep2.onRendered(function(){
  $('input[name="email"]').val(Session.get("registerEmail"));
  $('input[name="email"]').prop('disabled', true);
});
