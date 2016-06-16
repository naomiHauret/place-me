Template.contentUsers.onCreated(function(){
  Template.instance().filterStudents = new ReactiveVar(false);
  Template.instance().filterCoordinators = new ReactiveVar(false);
  Template.instance().filterEducators = new ReactiveVar(false);
});

Template.contentUsers.onRendered(function(){
  UsersIndex.search("");
  UsersIndex.getComponentMethods().removeProps('roles');
  UsersIndex.getComponentMethods().removeProps('cohortId');
  UsersIndex.getComponentMethods().removeProps('programmeId');
  UsersIndex.getComponentMethods().removeProps('isPlacedFilter');
  UsersIndex.getComponentMethods().removeProps('isAuthorizedFilter');
  UsersIndex.getComponentMethods().removeProps('trustOrganizationId');
  UsersIndex.getComponentMethods().removeProps('hostOrganizationId');
});

Template.contentUsers.onDestroyed(function(){
  UsersIndex.search("");
  UsersIndex.getComponentMethods().removeProps('roles');
  UsersIndex.getComponentMethods().removeProps('cohortId');
  UsersIndex.getComponentMethods().removeProps('programmeId');
  UsersIndex.getComponentMethods().removeProps('isPlacedFilter');
  UsersIndex.getComponentMethods().removeProps('isAuthorizedFilter');
  UsersIndex.getComponentMethods().removeProps('trustOrganizationId');
  UsersIndex.getComponentMethods().removeProps('hostOrganizationId');
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Template.contentUsers.events({
    "click .giveAccess": function(event, template){
        event.preventDefault();
        let chosenUserId=  $(event.target).val();
        let user=Meteor.users.findOne({_id: chosenUserId});
        let name= user.profile.firstName+" "+user.profile.lastName;

        swal({
          title: "Are you sure you want to unblock "+name+"?",
          text: "His/her access to Place Me is currently restricted!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#6E3BD2",
          confirmButtonText: "Yes, unblock "+name+"!",
          showLoaderOnConfirm: true,
          closeOnConfirm: false
        },
        function(isConfirm){
          let userId= $(event.target).val(); //_id of the user we have to delete
          if(isConfirm){
            Meteor.call("authorizeUserAccount", userId, function(error, result){
              if(error){ //user not deleted
                swal({
                  title: "An error occured",
                  text: "We're sorry but this user <b>couldn't be unblocked</b>. Please, <b>try again</b>.",
                  type: "error",
                  showCancelButton: true,
                  confirmButtonColor: "#6E3BD2",
                  confirmButtonText: "Try again",
                  cancelButtonText: "Cancel",
                  closeOnConfirm: true,
                  html:true,
                  closeOnCancel: true
                },
                function(isConfirm){ //try again clicked
                  if (isConfirm) {
                    document.location.reload(true); //reload the page
                  }
                  else{
                    Bert.alert("To unblock this user you will have to reload the page.", "info");
                  }
                });
              }
              else{ //success (user blocked)
                  swal.close();
                  Bert.alert("User successfully unblocked!", "success");
              }
            });
          }
          else{
            Bert.alert("Unblock cancelled.", "info");
          }
        });
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    "click .restrict": function(event, template){
      event.preventDefault();
      let chosenUserId=  $(event.target).val();
      let user=Meteor.users.findOne({_id: chosenUserId});
      let name= user.profile.firstName+" "+user.profile.lastName;

      swal({
        title: "Are you sure you want to block "+name+"?",
        text: "He/she won't be able to use Place Me!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#6E3BD2",
        confirmButtonText: "Yes, block "+name+"!",
        showLoaderOnConfirm: true,
        closeOnConfirm: false
      },
      function(isConfirm){
        let userId= $(event.target).val(); //_id of the user we have to delete
        if(isConfirm){
          Meteor.call("blockUserAccount", userId, function(error, result){
            if(error){ //user not deleted
              swal({
                title: "An error occured",
                text: "We're sorry but this user <b>couldn't be blocked</b>. Please, <b>try again</b>.",
                type: "error",
                showCancelButton: true,
                confirmButtonColor: "#6E3BD2",
                confirmButtonText: "Try again",
                cancelButtonText: "Cancel",
                closeOnConfirm: true,
                html:true,
                closeOnCancel: true
              },
              function(isConfirm){ //try again clicked
                if (isConfirm) {
                  document.location.reload(true); //reload the page
                }
                else{
                  Bert.alert("To block this user you will have to reload the page.", "info");
                }
              });
            }
            else{ //success (user blocked)
                swal.close();
                Bert.alert("User successfully blocked!", "success");
            }
          });
        }
        else{
          Bert.alert("Block cancelled.", "info");
        }
      });
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    "click .delete": function(event, template){
      event.preventDefault();
      let chosenUserId=  $(event.target).val();
      let user=Meteor.users.findOne({_id: chosenUserId});
      let name= user.profile.firstName+" "+user.profile.lastName;

      swal({
        title: "Are you sure you want to delete "+name+"?",
        text: "All the data related to him/her will be deleted too!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#6E3BD2",
        confirmButtonText: "Yes, delete this user!",
        showLoaderOnConfirm: true,
        closeOnConfirm: false
      },
      function(isConfirm){
        let userId= $(event.target).val(); //_id of the user we have to delete
        if(isConfirm){
          Meteor.call("removeUserAccount", userId, function(error, result){
            if(error){ //user not deleted
              swal({
                title: "An error occured",
                text: "We're sorry but this user <b>couldn't be deleted</b>. Please, <b>try again</b>.",
                type: "error",
                showCancelButton: true,
                confirmButtonColor: "#6E3BD2",
                confirmButtonText: "Try again",
                cancelButtonText: "Cancel",
                closeOnConfirm: true,
                html:true,
                closeOnCancel: true
              },
              function(isConfirm){ //try again clicked
                if (isConfirm) {
                  document.location.reload(true); //reload the page
                }
                else{
                  Bert.alert("To delete this user you will have to reload the page.", "info");
                }
              });
            }
            else{ //success (user deleted)
              swal.close();
              Bert.alert("User successfully deleted!", "success");
            }
          });
        }
        else{
          Bert.alert("Delete cancelled.", "info");
        }
      });
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  'change select[name="cohort"]': function(e, template){
      let cohort= $(e.target).val();
      if(cohort === "student" ){
        UsersIndex.getComponentMethods().removeProps('cohortId');
        UsersIndex.getComponentMethods().addProps('roles', cohort);
      }
      else{
        UsersIndex.getComponentMethods().addProps('cohortId',cohort);

      }
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  'change select[name="authorization"]': function(e, template){
    let isAuthorized= $(e.target).val();
    if(isAuthorized === "registered"){
      UsersIndex.getComponentMethods().removeProps('isAuthorizedFilter');
      if(Template.instance().filterEducators.get() === true){
        UsersIndex.getComponentMethods().addProps('roles', "educator");

      }
      else if(Template.instance().filterTutors.get() === true){
        UsersIndex.getComponentMethods().addProps('roles', "tutor");
      }

      else if(Template.instance().filterCoordinators.get() === true){
        UsersIndex.getComponentMethods().addProps('roles', "coordinator");
      }

      else if(Template.instance().filterStudents.get() === true){
        UsersIndex.getComponentMethods().addProps('roles', "student");

      }

      else{
        UsersIndex.getComponentMethods().addProps('roles', isAuthorized);
      }
    }
    else{
      UsersIndex.getComponentMethods().addProps('isAuthorizedFilter', isAuthorized);
    }

  },
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'change select[name="programme"]': function(e, template){
      let programme= $(e.target).val();
      if(programme === "student" ){ //"All" selected
        UsersIndex.getComponentMethods().removeProps('programmeId');
        UsersIndex.getComponentMethods().addProps('roles', programme);
      }
      else{
        UsersIndex.getComponentMethods().addProps('programmeId',programme);
      }
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'change select[name="placementFilter"]': function(e, template){
      let isPlaced= $(e.target).val();
      if(isPlaced === "student" ){
        UsersIndex.getComponentMethods().removeProps('isPlacedFilter');
        UsersIndex.getComponentMethods().addProps('roles', isPlaced);
      }
      else{
          UsersIndex.getComponentMethods().addProps('isPlacedFilter',isPlaced);

      }
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'change select[name="trustEstablishment"]': function(e, template){
      let trustOrganizationId= $(e.target).val();
      if(trustOrganizationId === "coordinator" ){
        UsersIndex.getComponentMethods().removeProps('trustOrganizationId');
        UsersIndex.getComponentMethods().addProps('roles', trustOrganizationId);
      }
      else{
        UsersIndex.getComponentMethods().addProps('trustOrganizationId',trustOrganizationId);

      }
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'change select[name="hostEstablishment"]': function(e, template){
      let hostOrganizationId= $(e.target).val();
      if(hostOrganizationId === "educator" ){
        UsersIndex.getComponentMethods().removeProps('hostOrganizationId');
        UsersIndex.getComponentMethods().addProps('roles', hostOrganizationId);
      }
      else{
        UsersIndex.getComponentMethods().addProps('hostOrganizationId',hostOrganizationId);

      }
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  'click .filter_status': function (e, template) {
    let status=  $(e.target).val();
    $('.filter_status').removeClass("selected");
    $(e.target).addClass("selected");

    UsersIndex.getComponentMethods().removeProps('cohortId');
    UsersIndex.getComponentMethods().removeProps('programmeId');
    UsersIndex.getComponentMethods().removeProps('isPlacedFilter');
    UsersIndex.getComponentMethods().removeProps('isAuthorizedFilter');
    UsersIndex.getComponentMethods().removeProps('trustOrganizationId');
    UsersIndex.getComponentMethods().removeProps('hostOrganizationId');
    $("select").prop('selectedIndex',0);

    UsersIndex.getComponentMethods().addProps('roles', $(e.target).val());

    if(status==="student"){
      template.filterStudents.set( true );
      template.filterCoordinators.set( false );
      template.filterEducators.set( false );

    }

    else if(status==="coordinator"){
      template.filterCoordinators.set( true );
      template.filterEducators.set( false );
      template.filterStudents.set( false );

    }

    else if(status === "tutor"){
      template.filterCoordinators.set( false );
      template.filterEducators.set( false );
      template.filterStudents.set( false );
    }

    else if(status === "educator"){
      template.filterEducators.set( true );
      template.filterCoordinators.set( false );
      template.filterStudents.set( false );

    }

    else{
      template.filterCoordinators.set( false );
      template.filterEducators.set( false );
      template.filterStudents.set( false );
    }
  }
});


Template.contentAddCoordinator.onCreated( function() {
  Template.instance().adding = new ReactiveVar(false); //create a reactive var called adding (for our spinner)
});

Template.contentAddCoordinator.onRendered(function(){
  //Set inputs value with session variables if the user has reloaded the page (so he doesn't lost what he entered)
  if( Session.get("coordinatorMail")!== undefined && Session.get("coordinatorMail") !== ""){
    $('form[name="addCoordinatorForm"] input[name="email"]').val(Session.get("coordinatorMail"));
  }
  $('form[name="addCoordinatorForm"] input[name="email"]').val(Session.get("coordinatorMail"));
  $('form[name="addCoordinatorForm"] input[name="firstName"]').val(Session.get("coordinatorFirstName"));
  $('form[name="addCoordinatorForm"] input[name="lastName"]').val(Session.get("coordinatorLastName"));
  $('form[name="addCoordinatorForm"] input[name="phone"]').val(Session.get("coordinatorPhone"));
  $('form[name="addCoordinatorForm"] .trustSelect option:selected').val(Session.get("coordinatorTrustEstablishment"));
});

Template.contentAddCoordinator.events({
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "change form[name='addCoordinatorForm'] input[name='email']": function(event, template){
    Session.set("coordinatorMail", $('form[name="addCoordinatorForm"] input[name="email"]').val() );
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "change form[name='addCoordinatorForm'] input[name='firstName']": function(event, template){
    Session.set("coordinatorFirstName", $('form[name="addCoordinatorForm"] input[name="firstName"]').val() );
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "change form[name='addCoordinatorForm'] input[name='lastName']": function(event, template){
    Session.set("coordinatorLastName", $('form[name="addCoordinatorForm"] input[name="lastName"]').val());
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "change form[name='addCoordinatorForm'] input[name='phone']": function(event, template){
    Session.set("coordinatorPhone", $('form[name="addCoordinatorForm"] input[name="phone"]').val());
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "change form[name='addCoordinatorForm'] .trustSelect": function(event, template){
    Session.set("coordinatorTrustEstablishment", $('form[name="addCoordinatorForm"] .trustSelect option:selected').val());
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "blur form[name='addCoordinatorForm'] input[name='email']": function(event, template){ //listening to key-up events on all inputs
    let email = $("form[name='addCoordinatorForm'] input[name='email']").val(); //getting email value
    let user=  Meteor.users.findOne({"emails.address" : email});

    if(user === undefined ){ //email not found
      if (IsValidEmail(email)) { //email valid
        Bert.alert("This e-mail address is valid and not already used", 'success'); //visual pop-up (success)
        Session.set("coordinatorMail", email);
      }
      else{
        if(email=== "" || $.trim(email)==="" ){ //empty email address (error)
          Bert.alert('Your e-mail address is empty!','warning');
        }
        else{
          Bert.alert('This is not a valid e-mail address!','warning');
        }
      }
    }
    else { //email already taken
      //ghost account
      if (email === "registerStudent@register.com" || email === "registerEducator@register.com" || email === "registerTutor@register.com" || email === "registerCoordinator@register.com"){
        Bert.alert("Access forbidden. Please, change your e-mail address.", 'warning');
      }
      else{
        Bert.alert('This e-mail address is already taken!','warning'); //visual pop-up (warning)
      }
    }
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "submit form[name='addCoordinatorForm']": function(event, template){
    event.preventDefault();

    template.adding.set( true ); //start the spinner

    //getting our coordinator data
    let email= $('form[name="addCoordinatorForm"] input[name="email"]').val();
    let firstName= $('form[name="addCoordinatorForm"] input[name="firstName"]').val();
    let lastName= $('form[name="addCoordinatorForm"] input[name="lastName"]').val();
    let phone=$('form[name="addCoordinatorForm"] input[name="phone"]').val();
    let trustEstablishment= $('form[name="addCoordinatorForm"] .trustSelect option:selected').val();
    let status= "coordinator";

    if(IsValidEmail(email)){ //valid email
      if(email !=="registerStudent@register.com" && email !=="registerEducator@register.com" && email !=="registerTutor@register.com" && email !=="registerCoordinator@register.com"){ //not our register ghost account email

        let user=  Meteor.users.findOne({"emails.address" : email}); //check if user exists

        if (user !== undefined){ //error: user existing (email already used)
          template.adding.set( false ); //stop the spinner
          Bert.alert("This e-mail address is already used", 'danger'); //visual pop-up (success)
          $('form[name="addCoordinatorForm"] input[name="email"]').val(""); //empty e-mail input
        }
        else{

          //our coordinator data
          let userdata={
            "email": email,
            "password": faker.internet.password(), //random password
            "role": status,
            "firstName": firstName,
            "lastName": lastName,
            "phone": phone,
            "trustOrganizationId": trustEstablishment
          };

          Meteor.call('addUserAccount', userdata, function (error, result) { //add new coordinator

            if (error) {
              swal({
                title: "An error occured",
                text: "We're sorry but the coordinator <b>couldn't be added</b>. Please, <b>try again</b>.",
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
                  Bert.alert("To add this coordinator you will had to reload the page.", "info");
                }
              });
              template.adding.set( false ); //stop the spinner
            }
            else {
              Accounts.forgotPassword({email: email}, function(err) {
                if (err) { //handling error
                  template.adding.set( false ); //stop the spinner

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
                    Bert.alert('We are sorry but something went wrong. Please, try again add the coordinator again.', 'danger'); //visual pop-up (danger);
                  }
                  let userId= Meteor.users.findOne({"emails.address": email})._id;
                  Meteor.call("removeUserAccount", userId, function(error, result){ //remove the just added coordinator (had been added before)
                    if(error){
                      Bert.alert("Oops. Seems like there's a problem. Please reload the page and try again.", "danger");
                    }
                  });
                }
                else{

                  template.adding.set( false ); //stop the spinner

                  //coordinator is added. We don't need these anymore
                  Session.set("coordinatorMail", undefined);
                  Session.set("coordinatorFirstName", undefined);
                  Session.set("coordinatorlastName", undefined);
                  Session.set("coordinatorPhone", undefined);
                  Session.set("coordinatorTrustEstablishment", undefined);

                  //alert (user feedback: success)
                  swal({
                    title: "Coordinator added!",
                    type: "success",
                    text: "This new coordinator is <b>added</b> and an e-mail was sent to him or her to initialize the account.<br> Would you like to <b>add another coordinator</b> ?",
                    html: true,
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonColor: "#6E3BD2",
                    confirmButtonText: "Yes",
                    cancelButtonText: "No, go back to users list",
                    closeOnCancel: true,
                    closeOnConfirm: true
                  },
                  function(isConfirm){
                    if (!isConfirm) { //cancel button clicked
                      Router.go("users"); //go to users page
                    }
                    else{ //confirm button (add another coordinator)
                      //empty all inputs
                      $('form[name="addCoordinatorForm"] input').val("");
                      $('form[name="addCoordinatorForm"] .trustSelect').select2("val", "");
                    }
                  });
                }
              });
            }
          });
        }
      }
      else{ //ghost user account (register accounts)
        template.adding.set( false );
        $('form[name="addCoordinatorForm"] input[name="email"]').val(""); //empty e-mail input
        Bert.alert("Access forbidden. Please, use another e-mail address.", "danger"); //visual pop-up (danger)
      }
    }
    else{  //error: email address not valid
      template.adding.set( false ); //stop the spinner
      $('form[name="addCoordinatorForm"] input[name="email"]').val(""); //empty e-mail input
      Bert.alert('This is not a valid e-mail address!','danger'); //visual pop-up (warning)
    }
  }
});

Template.contentAddEducator.onCreated( function() {
  Template.instance().adding = new ReactiveVar(false); //create a reactive var called adding (for our spinner)
});

Template.contentAddEducator.onRendered(function(){
  //Set inputs value with session variables if the user has reloaded the page (so he doesn't lost what he entered)
  if( Session.get("educatorMail")!== undefined && Session.get("educatorMail") !== ""){
    $('form[name="addEducatorForm"] input[name="email"]').val(Session.get("educatorMail"));
  }
  $('form[name="addEducatorForm"] input[name="firstName"]').val(Session.get("educatorFirstName"));
  $('form[name="addEducatorForm"] input[name="lastName"]').val(Session.get("educatorLastName"));
  $('form[name="addEducatorForm"] input[name="phone"]').val(Session.get("educatorPhone"));
  $('form[name="addEducatorForm"] .hostSelect option:selected').val(Session.get("educatorHostEstablishment"));
});

Template.contentAddEducator.events({
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "change  form[name='addEducatorForm'] input[name='email']": function(event, template){
    Session.set("educatorMail", $('form[name="addEducatorForm"] input[name="email"]').val() );
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "change  form[name='addEducatorForm'] input[name='firstName']": function(event, template){
    Session.set("educatorFirstName", $('form[name="addEducatorForm"] input[name="firstName"]').val() );
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "change  form[name='addEducatorForm'] input[name='lastName']": function(event, template){
    Session.set("educatorLastName", $('form[name="addEducatorForm"] input[name="lastName"]').val());
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "change form[name='addEducatorForm'] input[name='phone']": function(event, template){
    Session.set("educatorPhone", $('form[name="addEducatorForm"] input[name="phone"]').val());
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "change form[name='addEducatorForm'] .hostSelect": function(event, template){
    Session.set("educatorHostEstablishment", $('form[name="addEducatorForm"] .hostSelect option:selected').val());
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "blur form[name='addEducatorForm'] input[name='email']": function(event, template){ //listening to key-up events on all inputs
    let email = $("form[name='addEducatorForm'] input[name='email']").val(); //getting email value
    let user=  Meteor.users.findOne({"emails.address" : email});

    if(user === undefined ){ //email not found
      if (IsValidEmail(email)) { //email valid
        Session.set("educatorMail", $('form[name="addEducatorForm"] input[name="email"]').val() );
        Bert.alert("This e-mail address is valid and not already used", 'success'); //visual pop-up (success)
      }
      else{
        if(email=== "" || $.trim(email)==="" ){ //empty email address (error)
          Bert.alert('Your e-mail address is empty!','warning');
        }
        else{
          Bert.alert('This is not a valid e-mail address!','warning');
        }
      }
    }
    else { //email already taken
      //ghost account
      if (email === "registerStudent@register.com" || email === "registerEducator@register.com" || email === "registerTutor@register.com" || email === "registerCoordinator@register.com"){
        Bert.alert("Access forbidden. Please, change your e-mail address.", 'warning');
      }
      else{
        Bert.alert('This e-mail address is already taken!','warning'); //visual pop-up (warning)
      }
    }
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "submit form[name='addEducatorForm']": function(event, template){
    event.preventDefault();

    template.adding.set( true ); //start the spinner

    //getting our educator data
    let email= $('form[name="addEducatorForm"] input[name="email"]').val();
    let firstName= $('form[name="addEducatorForm"] input[name="firstName"]').val();
    let lastName= $('form[name="addEducatorForm"] input[name="lastName"]').val();
    let phone=$('form[name="addEducatorForm"] input[name="phone"]').val();
    let hostEstablishment= $('form[name="addEducatorForm"] .hostSelect option:selected').val();
    let status= "educator";

    if(IsValidEmail(email)){ //valid email
      if(email !=="registerStudent@register.com" && email !=="registerEducator@register.com" && email !=="registerTutor@register.com" && email !=="registerCoordinator@register.com"){ //not our register ghost account email

        let user=  Meteor.users.findOne({"emails.address" : email}); //check if user exists

        if (user !== undefined){ //error: user existing (email already used)
          template.adding.set( false ); //stop the spinner
          Bert.alert("This e-mail address is already used", 'danger'); //visual pop-up (success)
          $('form[name="addEducatorForm"] input[name="email"]').val(""); //empty e-mail input
        }
        else{

          //our educator data
          let userdata={
            "email": email,
            "password": faker.internet.password(), //random password
            "role": status,
            "firstName": firstName,
            "lastName": lastName,
            "phone": phone,
            "hostOrganizationId": hostEstablishment
          };

          Meteor.call('addUserAccount', userdata, function (error, result) { //add new educator

            if (error) {
              swal({
                title: "An error occured",
                text: "We're sorry but the educator <b>couldn't be added</b>. Please, <b>try again</b>.",
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
                  Bert.alert("To add this educator you will had to reload the page.", "info");
                }
              });
              template.adding.set( false ); //stop the spinner
            }
            else {
              Accounts.forgotPassword({email: email}, function(err) {
                if (err) { //handling error
                  template.adding.set( false ); //stop the spinner

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
                    Bert.alert('We are sorry but something went wrong. Please, try again add the educator again.', 'danger'); //visual pop-up (danger);
                  }
                  let userId= Meteor.users.findOne({"emails.address": email})._id;
                  Meteor.call("removeUserAccount", userId, function(error, result){ //remove the just added educator (had been added before)
                    if(error){
                      Bert.alert("Oops. Seems like there's a problem. Please reload the page and try again.", "danger");
                    }
                  });
                }
                else{

                  template.adding.set( false ); //stop the spinner

                  //educator is added. We don't need these anymore
                  Session.set("educatorMail", undefined);
                  Session.set("educatorFirstName", undefined);
                  Session.set("educatorlastName", undefined);
                  Session.set("educatorPhone", undefined);
                  Session.set("educatorHostEstablishment", undefined);

                  //alert (user feedback: success)
                  swal({
                    title: "educator added!",
                    type: "success",
                    text: "This new educator is <b>added</b> and an e-mail was sent to him or her to initialize the account.<br> Would you like to <b>add another educator</b> ?",
                    html: true,
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonColor: "#6E3BD2",
                    confirmButtonText: "Yes",
                    cancelButtonText: "No, go back to users list",
                    closeOnCancel: true,
                    closeOnConfirm: true
                  },
                  function(isConfirm){
                    if (!isConfirm) { //cancel button clicked
                      Router.go("users"); //go to users page
                    }
                    else{ //confirm button (add another educator)
                      //empty all inputs
                      $('input').val("");
                      $('.hostSelect').select2("val", "");
                    }
                  });
                }
              });
            }
          });
        }
      }
      else{ //ghost user account (register accounts)
        template.adding.set( false );
        $('input[name="email"]').val(""); //empty e-mail input
        Bert.alert("Access forbidden. Please, use another e-mail address.", "danger"); //visual pop-up (danger)
      }
    }
    else{  //error: email address not valid
      template.adding.set( false ); //stop the spinner
      $('form[name="addEducatorForm"] input[name="email"]').val(""); //empty e-mail input
      Bert.alert('This is not a valid e-mail address!','danger'); //visual pop-up (warning)
    }
  }
});
