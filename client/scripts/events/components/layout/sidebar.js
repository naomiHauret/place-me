Template.sidebar.onCreated(function(){
  Template.instance().adding = new ReactiveVar(false);
  Template.instance().uploading= new ReactiveVar(false);
});

Template.sidebar.onDestroyed(function(){
  //Cleaning
  //- search indexes
  OffersIndex.getComponentMethods().removeProps('accommodationFilter');
  OffersIndex.getComponentMethods().removeProps('carFilter');
  OffersIndex.getComponentMethods().removeProps('themeId');
  OffersIndex.getComponentMethods().removeProps('sortBy');
  UsersIndex.getComponentMethods().removeProps('roles');
  UsersIndex.getComponentMethods().removeProps('isAuthorizedFilter');
  UsersIndex.getComponentMethods().removeProps('isPlacedFilter');
  UsersIndex.getComponentMethods().removeProps('cohortId');
  UsersIndex.getComponentMethods().removeProps('programmeId');
  UsersIndex.getComponentMethods().removeProps('trustOrganizationId');
  UsersIndex.getComponentMethods().removeProps('hostOrganizationId');

  //- sidebar
  $("form[name='sidebarForm'] select").prop('selectedIndex',0);
  $("form[name='sidebarForm'] input").val("");
  UsersIndex.search("");

  //Session
  Session.set("selectStudent", undefined);
  Session.set("selectOffer", undefined);
  Session.set('quickAddTrust', undefined);
  Session.set('quickAddThemetypes', undefined);
  Session.set('quickAddTheme', undefined);
  Session.set('quickAddEducator', undefined);
  Session.set('quickAddHost', undefined);
  Session.set('quickUploadUsers', undefined);
  Session.set('quickUploadEstablishments', undefined);
  Session.set('quickUploadOffers', undefined);
  Session.set('quickUploadPlacements', undefined);
  Session.set('quickUploadVisits', undefined);
});

Template.sidebar.events({

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'click .closeSidebar': function(e, template){
    e.preventDefault();
    //Clean sidebar
    Session.set("selectStudent", undefined);
    Session.set('quickAddTrust', undefined);
    Session.set('quickAddEducator', undefined);
    Session.set('quickAddThemetypes', undefined);
    Session.set('quickAddTheme', undefined);
    Session.set('quickAddHost', undefined);
    Session.set('quickUploadUsers', undefined);
    Session.set('quickUploadEstablishments', undefined);
    Session.set('quickUploadOffers', undefined);
    Session.set('quickUploadPlacements', undefined);
    Session.set('quickUploadVisits', undefined);

    //Hide sidebar
    $('.ui.sidebar').sidebar('hide');

  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'change form[name="sidebarForm"] select[name="cohort"]': function(e, template){
    console.log("yo from applayout");
    let cohort= $(e.target).val();
    console.log(cohort);
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
  'change form[name="sidebarForm"] select[name="programme"]': function(e, template){
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
  'change form[name="sidebarForm"] select[name="dateOrder"]': function(e,template){
  console.log("date change "+$(e.target).val());
  OffersIndex.getComponentMethods().addProps('sortBy', $(e.target).val());
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'change form[name="sidebarForm"] select[name="hostEstablishment"]': function(e, template){
    let hostOrganizationId= $(e.target).val();
    if(hostOrganizationId === "educator" ){
      OffersIndex.getComponentMethods().removeProps('hostOrganizationId');
    }
    else{
      OffersIndex.getComponentMethods().addProps('hostOrganizationId',hostOrganizationId);

    }
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "change form[name='sidebarForm'] select[name='accommodation']": function(e,template){
  let accommodation= $(e.target).val();
  if(accommodation === "all" ){
    OffersIndex.getComponentMethods().removeProps('accommodationFilter');
  }
  else{
    OffersIndex.getComponentMethods().addProps('accommodationFilter', accommodation);

  }
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "change form[name='sidebarForm'] select[name='car']": function(e,template){
  let car= $(e.target).val();
  if(car === "all" ){
    OffersIndex.getComponentMethods().removeProps('carFilter');
  }
  else{
    OffersIndex.getComponentMethods().addProps('carFilter',car);

  }
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "change form[name='sidebarForm'] select[name='themeFilter']": function(e,template){
  let theme= $(e.target).val();
  if(theme === "all" ){
    OffersIndex.getComponentMethods().removeProps('themeId');
  }
  else{
    OffersIndex.getComponentMethods().addProps('themeId',theme);

  }
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "change form[name='sidebarForm'] input[type='radio'].selectStudent": function(e,template){
  let selectedStudent= $("input[type='radio'].selectStudent:checked").val();

  Session.set("selectedStudent", selectedStudent);

  if(Session.get("selectedStudent")!== undefined){
    $('.ui.sidebar').sidebar('hide');
    Session.set("selectStudent", undefined);
    Bert.alert("Student selected!", "success" );
  }
  else{
    Bert.alert("Oops. The student wasn't selected. Please try again.", "danger");
  }
},
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
"change form[name='sidebarForm'] input[type='radio'].selectOffer": function(e,template){
  let selectedOffer= $("input[type='radio'].selectOffer:checked").val();
  Session.set("selectedOffer", selectedOffer);

  if(Session.get("selectedOffer")!== undefined){
    $('.ui.sidebar').sidebar('hide');
    Session.set("selectOffer", undefined);
    Session.set("selectedHost", undefined);
    Bert.alert("Placement offer selected!", "success" );

  }
  else{
    Bert.alert("Oops. The placement offer wasn't selected. Please try again.", "danger");
  }

},
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
'change input[name="updateUsers"]' ( event, template ) {
  template.uploading.set( true );

  Papa.parse( event.target.files[0], {
    header: true,
    complete( results, file ) {
      Meteor.call( 'parseUploadUsers', results.data, ( error, response ) => {
        if ( error ) {
          Bert.alert( error.reason, "danger" );
        } else {
          template.uploading.set( false );
          $('.ui.sidebar').sidebar('hide');
          Session.set("quickUploadUsers", undefined);
          Bert.alert( 'Upload complete!', 'success');
        }
      });
    }
  });
},
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
'change input[name="updateEstablishments"]' ( event, template ) {
  template.uploading.set( true );

  Papa.parse( event.target.files[0], {
    header: true,
    complete( results, file ) {
      Meteor.call( 'parseUploadEstablishments', results.data, ( error, response ) => {
        if ( error ) {
          Bert.alert( error.reason, "danger" );
        } else {
          template.uploading.set( false );
          $('.ui.sidebar').sidebar('hide');
          Session.set("quickUploadEstablishments", undefined);
          Bert.alert( 'Upload complete!', 'success' );
        }
      });
    }
  });
},

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
'change input[name="updateVisits"]' ( event, template ) {
  template.uploading.set( true );

  Papa.parse( event.target.files[0], {
    header: true,
    complete( results, file ) {
      Meteor.call( 'parseUploadVisits', results.data, ( error, response ) => {
        if ( error ) {
          Bert.alert( error.reason, "danger" );
        } else {
          template.uploading.set( false );
          $('.ui.sidebar').sidebar('hide');
          Session.set("quickUploadVisits", undefined);
          Bert.alert( 'Upload complete!', 'success', );
        }
      });
    }
  });
},

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
'change input[name="updatePlacements"]' ( event, template ) {
  template.uploading.set( true );

  Papa.parse( event.target.files[0], {
    header: true,
    complete( results, file ) {
      Meteor.call( 'parseUploadPlacements', results.data, ( error, response ) => {
        if ( error ) {
          Bert.alert( error.reason, "danger" );
        } else {
          template.uploading.set( false );
          $('.ui.sidebar').sidebar('hide');
          Session.set("quickUploadPlacements", undefined);
          Bert.alert( 'Upload complete!', 'success');
        }
      });
    }
  });
},
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
'change input[name="updateOffers"]' ( event, template ) {
  template.uploading.set( true );

  Papa.parse( event.target.files[0], {
    header: true,
    complete( results, file ) {
      Meteor.call( 'parseUploadOffers', results.data, ( error, response ) => {
        if ( error ) {
          Bert.alert( error.reason, "danger" );
        } else {
          template.uploading.set( false );
          $('.ui.sidebar').sidebar('hide');
          Session.set("quickUploadOffers", undefined);
          Bert.alert( 'Upload complete!', 'success');
        }
      });
    }
  });
},
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
"submit #quickAddTrust":function(event, template){
  event.preventDefault();
  template.adding.set( true ); //start the spinner

  //Get all values
  let name= $("form[name='sidebarForm'] input[name='organizationName']").val();
  let addressLine1=$('form[name="sidebarForm"] input[name="streetAddress"]').val();
  let addressLine2=$('form[name="sidebarForm"] input[name="streetAddress2"]').val();
  let zipcode= $('form[name="sidebarForm"] input[name="zipcode"]').val();
  let city= $('form[name="sidebarForm"] input[name="city"]').val();
  let phone=$('form[name="sidebarForm"] input[name="phone"]').val();
  let additionalInformation= $('form[name="sidebarForm"] textarea').val();
  let exists = Establishments.findOne({name: name});

  //error case: establishment with the same name already exists
  if(exists){
    template.adding.set( false ); //stop the spinner
    Bert.alert("There's already an establishment called like that. To add this establishment, change its name.", "danger");
  }
  else{
    let establishmentData={
      "name": name,
      "addressLine1": addressLine1,
      "addressLine2": addressLine2,
      "city": city,
      "phone": phone,
      "zipcode": zipcode,
      "type": "trustOrganization",
      "additionalInformation": additionalInformation
    };

    Meteor.call("addEstablishment",  establishmentData, function (error, result){
      if(error){
        template.adding.set( false ); //stop the spinner
        Bert.alert("This trust organization couldn't be added. Please, try again.", "danger");
      }
      else{
        //alert (user feedback: success)
        template.adding.set( false ); //stop the spinner
        Session.set('quickAddTrust', undefined);
        $('.ui.sidebar').sidebar('hide');
        Bert.alert("Trust organization successfully added!", "success");
      }
    });
  }
},
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
"submit #quickAddHost":function(event, template){
  event.preventDefault();
  template.adding.set( true ); //start the spinner

  //Get all values
  let name= $("form[name='sidebarForm'] input[name='organizationName']").val();
  let trust= $('form[name="sidebarForm"] .trustSelect option:selected').val();
  let themetypes= $('form[name="sidebarForm"] .themetypesCloud').select2("val"); //return an array
  let addressLine1=$('form[name="sidebarForm"] input[name="streetAddress"]').val();
  let addressLine2=$('form[name="sidebarForm"] input[name="streetAddress2"]').val();
  let zipcode= $('form[name="sidebarForm"] input[name="zipcode"]').val();
  let city= $('form[name="sidebarForm"] input[name="city"]').val();
  let phone=$('form[name="sidebarForm"] input[name="phone"]').val();
  let additionalInformation= $('form[name="sidebarForm"] textarea').val();
  let exists = Establishments.findOne({name: name});

  //error case: establishment with the same name already exists
  if(exists){
    template.adding.set( false ); //stop the spinner
    Bert.alert("There's already an establishment called like that. To add this establishment, change its name.", "danger");
  }
  else{
    let establishmentData={
      "name": name,
      "trustOrganizationId": trust,
      "themetypes": themetypes,
      "addressLine1": addressLine1,
      "addressLine2": addressLine2,
      "city": city,
      "phone": phone,
      "zipcode": zipcode,
      "type": "hostOrganization",
      "additionalInformation": additionalInformation
    };

    Meteor.call("addEstablishment",  establishmentData, function (error, result){
      if(error){
        template.adding.set( false ); //stop the spinner
        Bert.alert("This host organization couldn't be added. Please, try again.", "danger");
      }
      else{
        //alert (user feedback: success)
        template.adding.set( false ); //stop the spinner
        Session.set('quickAddHost', undefined);
        $('.ui.sidebar').sidebar('hide');
        Bert.alert("Host organization successfully added!", "success");
      }
    });
  }
},
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
"submit #quickAddEducator":function(event, template){
  event.preventDefault();
  event.preventDefault();

  template.adding.set( true ); //start the spinner

  //getting our educator data
  let email= $('form[name="sidebarForm"] input[name="email"]').val();
  let firstName= $('form[name="sidebarForm"] input[name="firstName"]').val();
  let lastName= $('form[name="sidebarForm"] input[name="lastName"]').val();
  let phone=$('form[name="sidebarForm"] input[name="phone"]').val();
  let hostEstablishment= $('form[name="sidebarForm"] .hostSelect option:selected').val();
  let status= "educator";

  if(IsValidEmail(email)){ //valid email
    if(email !=="registerStudent@register.com" && email !=="registerEducator@register.com" && email !=="registerTutor@register.com" && email !=="registerCoordinator@register.com"){ //not our register ghost account email

      let user=  Meteor.users.findOne({"emails.address" : email}); //check if user exists

      if (user !== undefined){ //error: user existing (email already used)
        template.adding.set( false ); //stop the spinner
        Bert.alert("This e-mail address is already used", 'danger'); //visual pop-up (success)
        $('form[name="sidebarForm"] input[name="email"]').val(""); //empty e-mail input
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
                Session.set('quickAddEducator', undefined);
                $('.ui.sidebar').sidebar('hide');
                Bert.alert("Educator successfully added!", "success");
              }
            });
          }
        });
      }
    }
    else{ //ghost user account (register accounts)
      template.adding.set( false );
      $('form[name="sidebarForm"] input[name="email"]').val(""); //empty e-mail input
      Bert.alert("Access forbidden. Please, use another e-mail address.", "danger"); //visual pop-up (danger)
    }
  }
  else{  //error: email address not valid
    template.adding.set( false ); //stop the spinner
    $('form[name="sidebarForm"] input[name="email"]').val(""); //empty e-mail input
    Bert.alert('This is not a valid e-mail address!','danger'); //visual pop-up (warning)
  }
},
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
"submit #quickAddTheme": function(event,template){
  event.preventDefault();
  template.adding.set(true);
  let themeName= $('form[name="sidebarForm"] input[name="themeName"]').val();
  let exists = Themes.findOne({themeName: themeName});

  //error case: establishment with the same name already exists
  if(exists){
    template.adding.set( false ); //stop the spinner
    Bert.alert("There's already a theme called like that. To add this theme, change its name.", "danger");
  }
  else{
    let themeData={
      "themeName": themeName
    };

    Meteor.call("addTheme", themeData, function(error, result){
      if(error){
        Bert.alert("This theme couldn't be added. Please try again.", "danger");
      }
      else{
        Session.set('quickAddTheme', undefined);
        $('.ui.sidebar').sidebar('hide');
        Bert.alert("Theme successfully added!", "success");
      }
    });
  }
},
"submit #quickAddThemetypes": function(event,template){
  event.preventDefault();
  template.adding.set(true);
  let themetypeName= $('form[name="sidebarForm"] input[name="themetypeName"]').val();
  let themetypeCode= $('form[name="sidebarForm"] input[name="themetypeCode"]').val();

  let exists=false;
  if(Themetypes.findOne({name: themetypeName}) !== undefined || Themetypes.findOne({code: themetypeCode}) !== undefined  ){
    exists= true;
  }
  //error case: establishment with the same name already exists
  if(exists){
    template.adding.set( false ); //stop the spinner
    Bert.alert("There's already a themetype with that name and/or that code. To add this themetype, change its name or its code and try again.", "danger");
  }
  else{
    let themetypeData={
      "name": themetypeName,
      "code": themetypeCode
    };
    Meteor.call("addThemetype", themetypeData, function(error, result){
      if(error){
        Bert.alert("This themetype couldn't be added. Please try again.", "danger");
      }
      else{
        Session.set('quickAddThemetypes', undefined);
        $('.ui.sidebar').sidebar('hide');
        Bert.alert("Themetype successfully added!", "success");
      }
    });
  }
},
});
