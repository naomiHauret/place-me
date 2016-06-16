Template.programmeList.events({
  "change select[name='programme']": function(event, template){  //listening to state (checked/unchecked) change on all radio buttons
    event.preventDefault();
    Session.set("programmeId", $('select[name="programmeId"] option:selected').val());
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "blur select[name='programme']": function(event, template){
    let programme= $('select[name="programme"]').val();
    if(programme===""){
      Bert.alert("You haven't selected any programme!", "warning");
    }
  }
});
