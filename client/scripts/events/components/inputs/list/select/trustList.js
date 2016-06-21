Template.trustList.onRendered(function () {
   $('.trustSelect').select2({
     placeholder: 'Tips: you can type or select trust organization',
     allowClear: true
   });
});

Template.trustList.events({

  "blur .trustSelect": function(event, template){
    let establishment= $('.trustSelect').select2("val");
    if(establishment===""){
      Bert.alert("You haven't selected any establishment!", "warning");
    }
  }
});
