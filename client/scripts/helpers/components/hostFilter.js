Template.hostFilter.helpers({
  hostOrganization: function(){
    return Establishments.find({"type": "hostOrganization"}, { sort: { name: 1 } });
  }
});
