Template.inputPhone.onRendered(function(){
  $(".phone").intlTelInput({
    utilsScript: "../settings/utils.js",
    preferredCountries: ['gb','ie','fr','es', 'de', 'pl'],
    initialCountry: "auto",
    autoPlaceholder: true,
    geoIpLookup: function(callback) {
      $.get('http://ipinfo.io', function() {}, "jsonp").always(function(resp) {
        var countryCode = (resp && resp.country) ? resp.country : "";
        callback(countryCode);
      });
    }
  });
});

Template.inputPhone.events({
  "blur input[name='phone']": function(event, template){
    let phone= $("input[name='phone']").val();
    if($.trim(phone)==="" || phone===""){
      Bert.alert("Phone number field is empty!", "warning");
    }
  }
});
