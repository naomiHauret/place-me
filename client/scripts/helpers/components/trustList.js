Template.trustList.helpers({
  trustOrganization: function(){
    return Establishments.find({"type": "trustOrganization"}, { sort: { name: 1 } })
  }
});
