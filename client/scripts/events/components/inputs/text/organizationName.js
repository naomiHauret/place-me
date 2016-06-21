Template.organizationName.events({
  "blur input[name='organizationName']": function(event, template){
    let name= $("input[name='organizationName']").val();

    if(name === "" || $.trim(name) === ""){
      Bert.alert("Organization name field is empty!", "warning");
    }
    else{
      let exists = Establishments.findOne({name: name});
        if(exists){
        Bert.alert("There's already an establishment called like that!", "warning");
      }
    }
  }
});
