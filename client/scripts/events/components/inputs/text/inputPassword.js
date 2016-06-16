Template.inputPassword.events({
  "blur input[name='password']": function(event, template){
    let password= $("input[name='password']").val();
    if(password === "" || $.trim(password)===""){
      Bert.alert('Password field is empty!', 'warning');
    }
  }
});

Template.inputPasswordConfirm.events({
  "blur input[name='passwordagain']": function(event, template){
    let password= $("input[name='passwordagain']").val();
    if(password === "" || $.trim(password)===""){
      Bert.alert('Verification password field is empty!', 'warning');
    }
  }
});


Template.inputKey.events({
  "blur input[name='key']": function(event, template){
    let key= $("input[name='key']").val();
    if(key === "" || $.trim(key)===""){
      Bert.alert('Password field is empty!', 'warning');
    }
  }
});
