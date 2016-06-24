Template.breadcrumbPlacementDetails.helpers({
  placement(){
    return Placements.findOne({_id: this._id});
  }
});

Template.contentIndicationsPlacementDetails.helpers({
  placement(){
    return Placements.findOne({_id: this._id});
  },

  placementStatus(){
    let status= "finished";
    if( Placements.findOne({_id: this._id}).isFinished === false){
      status= "ongoing."
    }
    return status;
  }
});

Template.contentPlacementDetails.helpers({
  placement(){
    return Placements.findOne({_id: this._id});
  },
  
  isTutor(){
    let tutorsArray= tutorsArray=Placements.findOne({_id: this._id}).tutorsIds;
    return ($.inArray(Meteor.userId(), tutorsArray) === true);
  },

  isFromOffer(){
    return Placements.findOne({_id: this._id}).isFromOffer ===true;
  },

  offer(){
    let toReturn= "";
    if( Placements.findOne({_id: this._id}).isFromOffer ===true){
      offerId=  Placements.findOne({_id: this._id}).offerId;
      toReturn= Offers.findOne({_id: offerId });
    }
    return toReturn;
  },

  hostOrganization(){
    let hostId="";
    if(Placements.findOne({_id: this._id}).isFromOffer ===true ){
      let offerId= Placements.findOne({_id: this._id}).offerId;
      hostId= Offers.findOne({_id: offerId}).hostOrganizationId;
    }
    else{
      hostId= Placements.findOne({_id: this._id}).hostOrganizationId;
    }

    let host= Establishments.findOne({_id: hostId});
    return host.name;
  },

  isAccommodationRequired(){
    let required="no";
    if(Placements.findOne({_id: this._id}).accommodation === true){
      required= "yes";
    }

    return required;
  },

  isCarRequired(){
    let required="no";
    if(Placements.findOne({_id: this._id}).car === true){
      required= "yes";
    }

    return required;
  },

  themetypes(){
    let themetypes ="";
    let themetypesIdArray="";
    let offerId= "";
    if(Placements.findOne({_id: this._id}).isFromOffer ===true ){
      offerId= Placements.findOne({_id: this._id}).offerId;
      themetypesIdArray= Offers.findOne({_id: offerId}).themeTypesId;
    }
    else{
      themetypesIdArray= Placements.findOne({_id: this._id}).themeTypesId;
    }

    themetypesIdArray.map(function(o){
      themetypes+= " | "+Themetypes.findOne({_id: o}).name;
    });

    return themetypes;
  },

  theme(){
    let theme ="";
    let offerId= "";
    if(Placements.findOne({_id: this._id}).isFromOffer ===true ){
      offerId= Placements.findOne({_id: this._id}).offerId;
      themeId= Offers.findOne({_id: offerId}).themeId;
    }
    else{
      themeId= Placements.findOne({_id: this._id}).themeId;
    }

    return Themes.findOne({_id: themeId}).themeName;
  },


  placementStatus(){
    let status= "finished";
    if( Placements.findOne({_id: this._id}).isFinished === false){
      status= "ongoing."
    }
    return status;
  },

  student(){
    let studentId= Placements.findOne({_id:this._id}).studentId;
    let student=Meteor.users.findOne({_id: studentId});

    return student.profile.firstName+" "+student.profile.lastName;
  },

  cohort(){
    let studentId= Placements.findOne({_id:this._id}).studentId;
    let cohortId= Meteor.users.findOne({_id: studentId}).profile.cohortId;
    return Cohorts.findOne({_id: cohortId}).cohortYear;
  },

  programme(){
    let studentId= Placements.findOne({_id:this._id}).studentId;
    let programmeId= Meteor.users.findOne({_id: studentId}).profile.programmeId;
    return Programmes.findOne({_id: programmeId}).programmeName;
  },

  tutors(){
    let tutorsArray=Placements.findOne({_id: this._id}).tutorsIds;
    let tutors="";

    tutorsArray.map(function(o){
      tutor=Meteor.users.findOne({_id: o});
      tutors+= tutor.profile.firstName+" "+tutor.profile.lastName+"; ";
    });

    return tutors;
  },
  onSiteEducators(){
    let educatorsArray=Placements.findOne({_id: this._id}).onSiteEducatorIds;
    let educators="";

    educatorsArray.map(function(o){
      educator= Meteor.users.findOne({_id: o});
      educators+= educator.profile.firstName+" "+educator.profile.lastName+"; ";
    });
    return educators;
  },

  offSiteEducator(){
    let educatorId= Placements.findOne({_id: this._id}).offSiteEducatorId;
    let educator= Meteor.users.findOne({_id: educatorId});
    let name= educator.profile.firstName+" "+educator.profile.lastName;

    return name;
  },

  establishmentPosition(){
    let hostId="";
    if(Placements.findOne({_id: this._id}).isFromOffer ===true ){
      let offerId= Placements.findOne({_id: this._id}).offerId;
      hostId= Offers.findOne({_id: offerId}).hostOrganizationId;
    }
    else{
      hostId= Placements.findOne({_id: this._id}).hostOrganizationId;
    }

    let latitude=  Establishments.findOne({_id: hostId}).address.geopoint.latitude; //get the latitude of the establishment from the database
    let longitude =  Establishments.findOne({_id: hostId}).address.geopoint.longitude;  //get the longitude of the establishment from the database

    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: 8
      };
    }
  }

});
