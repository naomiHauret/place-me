Template.hostList.onRendered(function () {
  $('.hostSelect').select2({
    placeholder: 'Tips: you can type or select host organization',
    allowClear: true
  });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Template.hostList.events({
  'change .hostSelect': function(event, template){
    let establishment= $('.hostSelect option:selected').val();
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "blur .hostSelect": function(event, template){
    let establishment= $('.hostSelect option:selected').val();
    if(establishment===""){
      Bert.alert("You haven't selected any establishment!", "warning");
    }
  }
});
