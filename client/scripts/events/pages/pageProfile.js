Template.contentProfile.events({
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "blur input[name='firstName']": function(event, template){
    let firstName= $("input[name='firstName']").val();
    if($.trim(firstName)==="" || firstName ===""){
      Bert.alert("First name field is empty!", "warning");
    }
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "blur input[name='lastName']": function(event, template){
    let lastName = $("input[name='lastName']").val();
    if($.trim(lastName)==="" || lastName ===""){
      Bert.alert("Last name field is is empty!", "warning");
    }
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "click button[name='editButton']": function(event, template){
    console.log("cc");
    let status= Meteor.user().roles[0];
    $("select").prop("disabled", false);
    $("input").prop("disabled", false);

    if(status === "student"){
      $('.datetimepicker').data("DateTimePicker").show();
    }

    template.editing.set( true );

  },
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
  "click button[name='delete']": function(event, template){
    swal({
      title: "Are you sure you want to delete this user?",
      text: "All the data related to him/her will be deleted to!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6E3BD2",
      confirmButtonText: "Yes, delete this user!",
      showLoaderOnConfirm: true,
      closeOnConfirm: false
    },
    function(){
      let userId= $("button[name='delete']").val();
      console.log(userId);
      Meteor.call("removeUserAccount", userId, function(error, result){
        if(error){
          Bert.alert("Oops. Seems like there's a problem. Please reload the page and try again.", "danger");
        }
        else{
          swal({
            title: "User deleted!",
            text: "This user has been deleted!",
            type: "success",
            showCancelButton: false,
            confirmButtonColor: "#6E3BD2",
            confirmButtonText: "Close",
            timer: 5000,
            closeOnConfirm: true
          });
          Router.go("users");
        }
      });

    });
  }
});
