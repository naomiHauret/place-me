Template.sidebar.helpers({
  adding(){
    return Template.instance().adding.get();
  },
  quickAddTrust(){
    return Session.get("quickAddTrust");
  },
  quickAddHost(){
    return Session.get("quickAddHost");
  },
  quickAddEducator(){
    return Session.get("quickEducator");
  },
  quickAddThemetypes(){
    return Session.get("quickAddThemetypes")
  },
  quickAddTheme(){
    return Session.get("quickAddTheme")
  },
  quickUploadUsers(){
    return Session.get("quickUploadUsers");
  },
  quickUploadEstablishments(){
    return Session.get("quickUploadUsers");
  },
  quickUploadOffers(){
    return Session.get("quickUploadUsers");
  },
  quickUploadPlacements(){
    return Session.get("quickUploadUsers");
  },
  quickUploadVisits(){
    return Session.get("quickUploadUsers");
  },
  quickViewStaff(){
    return Session.get("quickViewStaff");
  }
});
