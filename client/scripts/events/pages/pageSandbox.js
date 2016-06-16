Template.pageSandbox.onCreated(function(){
  tour = new Tour({
  steps: [
  {
    element: "#menu",
    title: "Menu",
    content: "This is menu"
  },
  {
    element: "#sidebar",
    title: "Sidebar",
    content: "This is sidebar"
  },
  {
    element: "#selectCountry",
    title: "Select",
    content: "This is select"
  }
  ],
  backdrop: true

  });

  // Initialize the tour
  tour.init();


  Template.instance().adding = new ReactiveVar(false);


});

Template.pageSandbox.events({
  "click button[name='updateModal']": function(event, template){
    swal({
      title: "Update database",
      text: "To update the database, please upload a CSV below.",
      type: "input",
      inputType: "file",
      showCancelButton: true,
      showLoaderOnConfirm: true,
      allowOutsideClick: true,
      confirmButtonText: "Update database",
      animation: "slide-from-top",
    },
    function(inputValue){
      console.log(inputValue);
      if (inputValue === false){
        return false;
      }

      if(inputValue === "") {
        swal.showInputError("You must upload a CSV file to update the database!");
        return false;
      }
    }
  );
},
"click button[name='overlay']": function(event,template){
  Overlay.show('loginForm',{closeable: true, title:'prova'});
},

"click button[name='onboard']": function(event, template){
  // Start the tour
  tour.start();
  tour.restart();

},

"click button[name='edit']": function(){
  let buttonState= $("button[name='edit']").val();
  if(buttonState === 'edit'){
    console.log(buttonState);
    $('input').prop('disabled', true);
    $('select').prop('disabled', true);
    $('textarea').prop('disabled', true);

    $("button[name='edit']").prop('value', 'save');
    $("button[name='edit']").html('Save changes');
  }

  else{
    $('input').prop('disabled', false);
    $('select').prop('disabled', false);
    $('textarea').prop('disabled', false);
    $("button[name='edit']").prop('value', 'edit');
    $("button[name='edit']").html('Edit');
  }
}
});
