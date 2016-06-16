Template.selectStatus.events({
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "blur select[name='status']": function(event, template){
    let status = $('select[name="status"] option:selected').val(); //getting which option is selected
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
