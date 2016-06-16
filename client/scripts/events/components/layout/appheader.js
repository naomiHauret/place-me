Template.appHeader.onRendered(function(){
  showMenu=false;
  showToolbar=false;
});

Template.appHeader.events({
  'click .column_iconAction-toolbar button':function(event, template){
    if(showToolbar===false){
      $('.column_iconAction-toolbar button div').removeClass("hideIcon");
      $('.column_iconAction-toolbar button div').addClass("showIcon");
      showToolbar=true;
    }
    else{
       $('.column_iconAction-toolbar button div').removeClass("showIcon");
      $('.column_iconAction-toolbar button div').addClass("hideIcon");
      showToolbar=false;
    }
    $('.row_toolbar-mobile').slideToggle(90);
  },
  'click .column_iconAction-menu button':function(event, template){
    console.log("yo");
    Overlay.show('menu',{closeable: true, title:'Menu'});
  }

});
