Template.contentEstablishments.onCreated(function(){
  Template.instance().filterHosts = new ReactiveVar(false);
  Template.instance().filterTrusts = new ReactiveVar(false);

});

Template.contentEstablishments.onRendered(function(){
  EstablishmentsIndex.getComponentMethods().removeProps('trustOrganizationId');
  EstablishmentsIndex.getComponentMethods().removeProps('_id');
  EstablishmentsIndex.getComponentMethods().removeProps('type');

});
Template.contentEstablishments.onDestroyed(function(){
  EstablishmentsIndex.getComponentMethods().removeProps('trustOrganizationId');
  EstablishmentsIndex.getComponentMethods().removeProps('_id');
  EstablishmentsIndex.getComponentMethods().removeProps('type');

});

Template.contentEstablishments.events({
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "click .delete": function(event, template){
    event.preventDefault();
    let chosenEstablishmentId=  $(event.target).val();
    let establishment=Establishments.findOne({_id: chosenEstablishmentId});
    let name= establishment.name;

    swal({
      title: "Are you sure you want to delete "+name+"?",
      text: "All the data related to him/her will be deleted too!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6E3BD2",
      confirmButtonText: "Yes, delete this establishment!",
      showLoaderOnConfirm: true,
      closeOnConfirm: false
    },
    function(isConfirm){
      let establishmentId= $(event.target).val(); //_id of the user we have to delete
      if(isConfirm){
        Meteor.call("removeEstablishment", establishmentId, function(error, result){
          if(error){ //user not deleted
            swal({
              title: "An error occured",
              text: "We're sorry but this establishment <b>couldn't be deleted</b>. Please, <b>try again</b>.",
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
                Bert.alert("To delete this establishment you will have to reload the page.", "info");
              }
            });
          }
          else{ //success (user deleted)
            swal.close();
            Bert.alert("Establishment successfully deleted!", "success");
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
  'click .filter_type': function (e, template) {
    let type=  $(e.target).val();
    $('.filter_type').removeClass("selected");
    $(e.target).addClass("selected");
    $("select").prop('selectedIndex',0);
    EstablishmentsIndex.getComponentMethods().removeProps('trustOrganizationId');
    EstablishmentsIndex.getComponentMethods().removeProps('_id');

    if(type==="trustOrganization"){
      template.filterTrusts.set( true );
      template.filterHosts.set( false );
      EstablishmentsIndex.getComponentMethods().addProps('type', type);

    }

    else if(type==="hostOrganization"){
      template.filterTrusts.set( false );
      template.filterHosts.set( true );
      EstablishmentsIndex.getComponentMethods().addProps('type', type);
    }

    else{
      template.filterTrusts.set( false );
      template.filterHosts.set( false );
      EstablishmentsIndex.getComponentMethods().removeProps('type');
    }
  },

  'change select[name="trustEstablishment"]': function(e, template){
      let trustOrganizationId= $(e.target).val();
      if(trustOrganizationId === "coordinator" ){ //"all" selected
        EstablishmentsIndex.getComponentMethods().removeProps('trustOrganizationId');
      }
      else{
        EstablishmentsIndex.getComponentMethods().addProps('trustOrganizationId',trustOrganizationId);

      }
    },

      'change select[name="hostEstablishment"]': function(e, template){
          let hostOrganizationId= $(e.target).val();
          if(hostOrganizationId === "educator"){
            EstablishmentsIndex.getComponentMethods().removeProps('trustOrganizationId');
          }
          else{
            let trustOrganizationId= Establishments.findOne({_id: hostOrganizationId}).trustOrganizationId;
            EstablishmentsIndex.getComponentMethods().addProps('_id',trustOrganizationId);

          }

  }

});
Template.contentAddTrust.onCreated(function(){
  Template.instance().adding = new ReactiveVar(false);
});

Template.contentAddHost.onCreated(function(){
  Template.instance().adding = new ReactiveVar(false);
});

Template.contentAddHost.events({
  "submit form[name='addHostForm']": function(event, template){
    event.preventDefault();
    template.adding.set( true ); //start the spinner

    //Get all values
    let name= $("form[name='addHostForm'] input[name='organizationName']").val();
    let trust= $('form[name="addHostForm"] .trustSelect option:selected').val();
    let themetypes= $('form[name="addHostForm"] .themetypesCloud').select2("val"); //return an array
    let addressLine1=$('form[name="addHostForm"] input[name="streetAddress"]').val();
    let addressLine2=$('form[name="addHostForm"] input[name="streetAddress2"]').val();
    let zipcode= $('form[name="addHostForm"] input[name="zipcode"]').val();
    let city= $('form[name="addHostForm"] input[name="city"]').val();
    let phone=$('form[name="addHostForm"] input[name="phone"]').val();
    let additionalInformation= $('form[name="addHostForm"] textarea').val();
    let exists = Establishments.findOne({name: name});


    //error case: establishment with the same name already exists
    if(exists){
      Bert.alert("There's already an establishment called like that!", danger);
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
          Bert.alert("Host establishment couldn't be added. Please, try again.", danger);
        }
        else{
          //alert (user feedback: success)
          template.adding.set( false ); //stop the spinner
          swal({
            title: "Host organization added!",
            type: "success",
            text: "This new host organization is <b>added</b>.<br> Would you like to <b>add another one</b> ?",
            html: true,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonColor: "#6E3BD2",
            confirmButtonText: "Yes",
            cancelButtonText: "No, go back to establishments list",
            closeOnCancel: true,
            closeOnConfirm: true
          },
          function(isConfirm){
            if (!isConfirm) { //cancel button clicked
              Router.go("establishments"); //go to establishments page
            }
            else{ //confirm button (add another organization)
              //empty all inputs
              $('form[name="addHostForm"] input').val("");
              $('form[name="addHostForm"] textarea').val("");
              $('form[name="addHostForm"] .trustSelect').select2("val", "");
            }
          });
        }
      });
    }

  }
});


Template.contentAddTrust.events({
  "submit form[name='addTrustForm']": function(event, template){
    event.preventDefault();
    template.adding.set( true ); //start the spinner

    let name= $("form[name='addTrustForm'] input[name='organizationName']").val();
    let addressLine1=$('form[name="addTrustForm"] input[name="streetAddress"]').val();
    let addressLine2=$('form[name="addTrustForm"]  input[name="streetAddress2"]').val();
    let zipcode= $('form[name="addTrustForm"] input[name="zipcode"]').val();
    let city= $('form[name="addTrustForm"] input[name="city"]').val();
    let phone=$('form[name="addTrustForm"]  input[name="phone"]').val();
    let additionalInformation= $('form[name="addTrustForm"]  textarea').val();
    let exists = Establishments.findOne({name: name});


    //error case: establishment with the same name already exists
    if(exists){
      Bert.alert("There's already an establishment called like that!");
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
          Bert.alert("Trust establishment couldn't be added. Please, try again.", danger);
        }
        else{
          //alert (user feedback: success)
          template.adding.set( false ); //stop the spinner
          swal({
            title: "Trust organization added!",
            type: "success",
            text: "This new trust organization is <b>added</b>.<br> Would you like to <b>add another one</b> ?",
            html: true,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonColor: "#6E3BD2",
            confirmButtonText: "Yes",
            cancelButtonText: "No, go back to establishments list",
            closeOnCancel: true,
            closeOnConfirm: true
          },
          function(isConfirm){
            if (!isConfirm) { //cancel button clicked
              Router.go("establishments"); //go to establishments page
            }
            else{ //confirm button (add another organization)
              //empty all inputs
              $('form[name="addTrustForm"] input').val("");
              $('form[name="addTrustForm"] textarea').val("");
            }
          });
        }
      });
    }

  }
});
