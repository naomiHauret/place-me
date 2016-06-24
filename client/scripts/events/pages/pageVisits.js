Template.contentVisits.onDestroyed(function(){
  VisitsIndex.getComponentMethods().removeProps('isPassedFilter');
});

Template.contentVisits.events({
  'change select[name="visitPassedFilter"]': function(e,template){
    let isPassed= $(e.target).val();
    if(isPassed === "all" ){
      VisitsIndex.getComponentMethods().removeProps('isPassedFilter');
    }
    else{
      VisitsIndex.getComponentMethods().addProps('isPassed', isPassed);
    }
  },
});

Template.contentAddVisits.onCreated(function(){
  Template.instance().adding = new ReactiveVar(false);
});

Template.contentAddVisits.events({
  "submit form[name='visitForm']": function(event, template){
    event.preventDefault();
    template.adding.set(true);

    let datetime= $("input[name='datetime']").val();
    let visitData= {
      "placementId": Session.get("selectedPlacement"),
      "tutorId": Meteor.userId(),
      "dateTime": datetime,
    }
    Meteor.call("addVisit", visitData, function(error, result){
      if(error){ //placement not added
        Bert.alert(error.reason, "danger");
        template.adding.set(false);
      }
      else{ //success (placement added)

        swal({
          title: "Visit added!",
          type: "success",
          text: "This new visit is <b>added</b>.<br> Would you like to <b>add another one</b> ?",
          html: true,
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonColor: "#6E3BD2",
          confirmButtonText: "Yes",
          cancelButtonText: "No, go back to visits list",
          closeOnCancel: true,
          closeOnConfirm: true
        },
        function(isConfirm){
          if (!isConfirm) { //cancel button clicked
            Router.go("visits"); //go to placements page
          }
          else{ //confirm button (add another organization)
            //empty all inputs
            $('form[name="addVisit"] input').val("");
          }
        });

        //cleaning
        template.adding.set(false);
        Session.set('selectedPlacement', undefined);

      }
    });
  }
});
