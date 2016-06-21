Template.establishmentsList.helpers({
  establishments(){
    return Establishments.find({});
  },
  hideFilterTitle(){
    return Template.instance().hideFilterTitle.get();
  },
  type(){
    let type= "Trust";
    if(this.type === "hostOrganization"){
      type= "Host";
    }
    return type;
  },

  hasMoreEstablishments(){
    return Template.instance().establishments().count() <= Template.instance().limit.get();
  },
  buttonAttributes: function(){
    return {'type': 'button', 'content': "Load more establishments..."}
  },
  inputAttributes: function () {
    return { 'class': '_input-searchbar', 'placeholder': 'Start searching...' };
  },
  index: function () {
    return EstablishmentsIndex;
  },
  resultsCount: function () {
    return EstablishmentsIndex.getComponentDict().get('count');
  },
  showMore: function () {
    return false;
  },
  filterTrusts(){
    console.log("filter trust:"+Template.instance().filterTrusts.get());
    return Template.instance().filterTrusts.get();
  },
  filterHosts(){
    console.log("filter host:"+Template.instance().filterHosts.get());
    return Template.instance().filterHosts.get();
  },
  quickUploadEstablishments(){
    return Session.get("quickUploadEstablishments");
  },
  renderTmpl: () => Template.renderTemplate

});



Template.contentEstablishments.helpers({
  establishments(){
    return Establishments.find({});
  },
  hideFilterTitle(){
    return Template.instance().hideFilterTitle();
  },
  type(){
    let type= "Trust";
    if(this.type === "hostOrganization"){
      type= "Host";
    }
    return type;
  },

  hasMoreEstablishments(){
    return Template.instance().establishments().count() <= Template.instance().limit.get();
  },
  buttonAttributes: function(){
    return {'type': 'button', 'content': "Load more establishments..."}
  },
  inputAttributes: function () {
    return { 'class': '_input-searchbar', 'placeholder': 'Start searching...' };
  },
  index: function () {
    return EstablishmentsIndex;
  },
  resultsCount: function () {
    return EstablishmentsIndex.getComponentDict().get('count');
  },
  showMore: function () {
    return false;
  },
  filterTrusts(){
    console.log("filter trust:"+Template.instance().filterTrusts.get());
    return Template.instance().filterTrusts.get();
  },
  filterHosts(){
    console.log("filter host:"+Template.instance().filterHosts.get());
    return Template.instance().filterHosts.get();
  },
  renderTmpl: () => Template.renderTemplate

});


Template.contentAddTrust.helpers({
  adding(){
    return Template.instance().adding.get();
  }
});

Template.contentAddHost.helpers({
  adding(){
    return Template.instance().adding.get();
  },

    quickAddTrust(){
      return Session.get("quickAddTrust");
    },

    quickAddThemetypes(){
      return Session.get("quickAddThemetypes");
    }
});
