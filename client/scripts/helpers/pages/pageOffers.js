Template.contentOffers.helpers({
  offers(){
    return Offers.find({});
  },

  hostOrganization(){
    let hostId= Offers.findOne({_id: this._id}).hostOrganizationId;
    return Establishments.findOne({_id: hostId}).name;
  },
  themetypes(){
    let themetypes ="";
    let themetypesIdArray= Offers.findOne({_id: this._id}).themeTypesId;
    themetypesIdArray.map(function(o){
      themetypes+= " | "+Themetypes.findOne({"_id": o.toString()}).code;
    });

    return themetypes;
  },

  theme(){
    let themeId= Offers.findOne({_id: this._id}).themeId;
    return Themes.findOne({_id: themeId}).themeName;
  },

  publicationDate(){
    return moment(Offers.findOne({_id: this._id}).createdAt).format("MM/DD/YYYY"); // Eg: Sunday 15th June 2016 at 12:45
  },

  buttonAttributes: function(){
    return {'type': 'button', 'content': "Load more offers..."}
  },
  inputAttributes: function () {
    return { 'class': '_input-searchbar', 'placeholder': 'Start searching...' };
  },
  index: function () {
    return OffersIndex;
  },
  resultsCount: function () {
    return OffersIndex.getComponentDict().get('count');
  },
  showMore: function () {
    return false;
  },

  quickUploadOffers(){
    return Session.get("quickUploadOffers");
  },

  renderTmpl: () => Template.renderTemplate

});


Template.contentAddOffers.helpers({
  adding(){
    return Template.instance().adding.get();
  },
  quickAddHost(){
    return Session.get("quickAddHost");
  },
  quickAddThemetypes(){
    return Session.get("quickAddThemetypes");
  }
});
