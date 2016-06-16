Template.breadcrumbOfferDetails.helpers({
  offer(){
    return Offers.findOne({_id: this._id});
  }
});

Template.contentIndicationsOfferDetails.helpers({
  offer(){
    return Offers.findOne({_id: this._id});
  },

  offerStatus(){
    let status= "active";
    if( Offers.findOne({_id: this._id}).isActive === false){
      status= "filled. There is no more placement available for this offer."
    }
    return status;
  }
})

Template.contentOfferDetails.helpers({
  offer(){
    return Offers.findOne({_id: this._id});
  },

  hostOrganization(){
    let hostId= Offers.findOne({_id: this._id}).hostOrganizationId;
    return Establishments.findOne({_id: hostId}).name;
  },

  isAccommodationProvided(){
    let provided="no";
    if(Offers.findOne({_id: this._id}).accommodation === true){
      provided= "yes";
    }

    return provided;
  },

  isCarProvided(){
    let provided="no";
    if(Offers.findOne({_id: this._id}).car === true){
      provided= "yes";
    }

    return provided;
  },

  themetypes(){
    let themetypes ="";
    let themetypesIdArray= Offers.findOne({_id: this._id}).themeTypesId;
    themetypesIdArray.map(function(o){
      themetypes+= " | "+Themetypes.findOne({"_id": o.toString()}).name;
    });

    return themetypes;
  },

  publicationDate(){
    return moment(Offers.findOne({_id: this._id}).createdAt).format("MM/DD/YYYY"); // Eg: Sunday 15th June 2016 at 12:45
  },

  offerStatus(){
    let status= "active";
    if( Offers.findOne({_id: this._id}).isActive === false){
      status= "filled. There is no more placement available."
    }
    return status;
  },

  establishmentPosition(){
    let hostId= Offers.findOne({_id: this._id}).hostOrganizationId;
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
