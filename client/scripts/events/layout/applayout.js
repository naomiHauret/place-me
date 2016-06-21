Template.applayout.onCreated(function(){
  Template.instance().adding = new ReactiveVar(false);
});

Template.applayout.events({
  'click .dimmed': function(e, template){
    Session.set('selectStudent', undefined);
    Session.set('selectOffer', undefined);
    Session.set('quickAddTrust', undefined);
    Session.set('quickAddThemetypes', undefined);
    Session.set('quickAddEducator', undefined);
    Session.set('quickAddTheme', undefined);
    Session.set('quickAddHost', undefined);
    Session.set('quickUploadUsers', undefined);
    Session.set('quickUploadEstablishments', undefined);
    Session.set('quickUploadOffers', undefined);
    Session.set('quickUploadPlacements', undefined);
    Session.set('quickUploadVisits', undefined);
  },
  'click .floating-button': function(e, template){
    e.preventDefault();
    $('.ui.sidebar').sidebar('show');
  },
  'click .floating-button[name="quickAddEducator"]': function(e, template){
    Session.set("quickAddTrust", undefined);
    Session.set("quickAddHost", undefined);
    Session.set("quickAddTheme", undefined);
    Session.set("quickAddThemetypes", undefined);
    Session.set("quickUploadPlacements", undefined);
    Session.set("quickUploadEstablishments", undefined)
    Session.set("quickUploadVisits", undefined);
    Session.set("quickUploadOffers", undefined);
    Session.set("quickUploadUsers", undefined);
    Session.set("quickAddEducator", true);
  },
  'click .floating-button[name="quickAddTrust"]': function(e, template){
    Session.set("quickAddEducator", undefined);
    Session.set("quickAddHost", undefined);
    Session.set("quickAddTheme", undefined);
    Session.set("quickAddThemetypes", undefined);
    Session.set("quickUploadPlacements", undefined);
    Session.set("quickUploadEstablishments", undefined)
    Session.set("quickUploadVisits", undefined);
    Session.set("quickUploadOffers", undefined);
    Session.set("quickUploadUsers", undefined);
    Session.set("quickAddTrust", true);
  },

  'click .floating-button[name="quickAddThemetypes"]': function(e, template){
    Session.set("quickAddEducator", undefined);
    Session.set("quickAddTrust", undefined);
    Session.set("quickAddHost", undefined);
    Session.set("quickAddTheme", undefined);
    Session.set("quickUploadPlacements", undefined);
    Session.set("quickUploadEstablishments", undefined)
    Session.set("quickUploadVisits", undefined);
    Session.set("quickUploadOffers", undefined);
    Session.set("quickUploadUsers", undefined);
    Session.set("quickAddThemetypes", true);
  },

  'click .floating-button[name="quickAddTheme"]': function(e, template){
    Session.set("quickAddEducator", undefined);
    Session.set("quickAddTrust", undefined);
    Session.set("quickAddHost", undefined);
    Session.set("quickAddThemetypes", undefined);
    Session.set("quickUploadPlacements", undefined);
    Session.set("quickUploadEstablishments", undefined)
    Session.set("quickUploadVisits", undefined);
    Session.set("quickUploadOffers", undefined);
    Session.set("quickUploadUsers", undefined);
    Session.set("quickAddTheme", true);
  },

  'click .floating-button[name="quickAddHost"]': function(e, template){
    Session.set("quickAddEducator", undefined);
    Session.set("quickAddTrust", undefined);
    Session.set("quickAddTheme", undefined);
    Session.set("quickAddThemetypes", undefined);
    Session.set("quickUploadPlacements", undefined);
    Session.set("quickUploadEstablishments", undefined)
    Session.set("quickUploadVisits", undefined);
    Session.set("quickUploadOffers", undefined);
    Session.set("quickUploadUsers", undefined);
    Session.set("quickAddHost", true);
  },

  'click .floating-button[name="uploadUsers"]': function(e, template){
    Session.set("quickAddEducator", undefined);
    Session.set("quickAddTrust", undefined);
    Session.set("quickAddTheme", undefined);
    Session.set("quickAddThemetypes", undefined);
    Session.set("quickAddHost", undefined);
    Session.set("quickUploadPlacements", undefined);
    Session.set("quickUploadEstablishments", undefined)
    Session.set("quickUploadVisits", undefined);
    Session.set("quickUploadOffers", undefined);
    Session.set("quickUploadUsers", true);

  },

  'click .floating-button[name="uploadEstablishments"]': function(e, template){
    Session.set("quickAddEducator", undefined);
    Session.set("quickAddTrust", undefined);
    Session.set("quickAddTheme", undefined);
    Session.set("quickAddThemetypes", undefined);
    Session.set("quickAddHost", undefined);
    Session.set("quickUploadPlacements", undefined);
    Session.set("quickUploadUsers", undefined)
    Session.set("quickUploadVisits", undefined);
    Session.set("quickUploadOffers", undefined);
    Session.set("quickUploadEstablishments", true);
  },

  'click .floating-button[name="uploadVisits"]': function(e, template){
    Session.set("quickAddEducator", undefined);
    Session.set("quickAddTrust", undefined);
    Session.set("quickAddTheme", undefined);
    Session.set("quickAddThemetypes", undefined);
    Session.set("quickAddHost", undefined);
    Session.set("quickUploadPlacements", undefined);
    Session.set("quickUploadUsers", undefined)
    Session.set("quickUploadUsers", undefined);
    Session.set("quickUploadOffers", undefined);
    Session.set("quickUploadVisits", true);
  },

  'click .floating-button[name="uploadPlacements"]': function(e, template){
    Session.set("quickAddEducator", undefined);
    Session.set("quickAddTrust", undefined);
    Session.set("quickAddTheme", undefined);
    Session.set("quickAddThemetypes", undefined);
    Session.set("quickAddHost", undefined);
    Session.set("quickUploadEstablishments", undefined);
    Session.set("quickUploadUsers", undefined)
    Session.set("quickUploadVisits", undefined);
    Session.set("quickUploadOffers", undefined);
    Session.set("quickUploadPlacements", true);
  },

  'click .floating-button[name="uploadOffers"]': function(e, template){
    Session.set("quickAddEducator", undefined);
    Session.set("quickAddTrust", undefined);
    Session.set("quickAddTheme", undefined);
    Session.set("quickAddThemetypes", undefined);
    Session.set("quickAddHost", undefined);
    Session.set("quickUploadEstablishments", undefined);
    Session.set("quickUploadUsers", undefined)
    Session.set("quickUploadVisits", undefined);
    Session.set("quickUploadPlacements", undefined);
    Session.set("quickUploadOffers", true);

  }
});
