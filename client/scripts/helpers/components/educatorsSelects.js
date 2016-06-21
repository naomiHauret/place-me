Template.educatorsSelects.helpers({
  onSiteEducator: function(){
    return Template.instance().onSiteEducatorsList.get();
  },

  offSiteEducator: function(){
    return Template.instance().offSiteEducatorsList.get();
  }
});
