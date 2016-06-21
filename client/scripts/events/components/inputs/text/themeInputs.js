Template.themeInputs.events({
  "blur input[name='themeName']": function(event, template){
    let name= $("input[name='themeName']").val();

    if(name === "" || $.trim(name) === ""){
      Bert.alert("Theme name field is empty!", "warning");
    }
    else{
      let exists = Themes.findOne({themeName: name});
        if(exists){
        Bert.alert("There's already a theme called like that!", "warning");
      }
    }
  }
});
