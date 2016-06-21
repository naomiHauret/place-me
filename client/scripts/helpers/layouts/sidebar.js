Template.sidebar.helpers({
  uploading(){
    return Template.instance().uploading.get();

  },
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
    return Session.get("quickAddEducator");
  },
  quickAddThemetypes(){
    return Session.get("quickAddThemetypes");
  },
  quickAddTheme(){
    return Session.get("quickAddTheme");
  },
  quickUploadUsers(){
    return Session.get("quickUploadUsers");
  },
  quickUploadEstablishments(){
    return Session.get("quickUploadEstablishments");
  },
  quickUploadOffers(){
    return Session.get("quickUploadOffers");
  },
  quickUploadPlacements(){
    return Session.get("quickUploadPlacements");
  },
  quickUploadVisits(){
    return Session.get("quickUploadVisits");
  },
  quickViewStaff(){
    return Session.get("quickViewStaff");
  },

  quickViewLogin(){
    return Session.get("quickViewLogin")
  }
});
