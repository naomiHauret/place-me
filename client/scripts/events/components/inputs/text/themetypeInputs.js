Template.themetypeInputs.events({
  "blur input[name='themetypeName']": function(event, template){
    let name= $("input[name='themetypeName']").val();

    if(name === "" || $.trim(name) === ""){
      Bert.alert("Themetype name field is empty!", "warning");
    }
    else{
      let exists = Themetypes.findOne({name: name});
        if(exists){
        Bert.alert("There's already a themetype called like that!", "warning");
      }
    }
  },
  "blur input[name='themetypeCode']": function(event, template){
    let code= $("input[name='themetypeCode']").val();

    if(code === "" || $.trim(code) === ""){
      Bert.alert("Themetype code field is empty!", "warning");
    }
    else{
      let exists = Themetypes.findOne({code: code});
        if(exists){
        Bert.alert("There's already a themetype with that code!", "warning");
      }
    }
  }

});
