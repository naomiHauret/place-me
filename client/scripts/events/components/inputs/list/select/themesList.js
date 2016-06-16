Template.themesList.onRendered(function () {
   $('.themesSelect').select2({
     placeholder: 'Tips: you can type or select theme',
     allowClear: true
   });
});

Template.trustList.events({
  'change .themesSelect': function(event, template){
    let theme= $('.themesSelect option:selected').val();
    if(theme===""){
      Bert.alert("You haven't selected any themes!", "warning");
    }
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  "blur .themesSelect": function(event, template){
    let theme= $('.themesSelect option:selected').val();
    if(theme===""){
      Bert.alert("You haven't selected any themes!", "warning");
    }
  }
});
