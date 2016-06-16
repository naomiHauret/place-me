Template.breadcrumbEstablishmentDetails.helpers({
  establishment(){
    return Establishments.findOne({_id: this._id});
  }
});

Template.contentIndicationsEstablishmentDetails.helpers({
  establishment(){
    return Establishments.findOne({_id: this._id});
  },
  isHost(){
    return Establishments.findOne({_id: this._id}).type === "hostOrganization";
  },

  isTrust(){
    return Establishments.findOne({_id: this._id}).type === "trustOrganization";

  }
});

Template.contentEstablishmentDetails.helpers({
  establishment(){
    return Establishments.findOne({_id: this._id});
  },
  establishmentTrustOrganization(){
    console.log(Establishments.findOne({_id: this._id}).trustOrganizationId);
    let trustId= Establishments.findOne({_id: this._id}).trustOrganizationId;
    console.log(Establishments.findOne({_id: trustId}).name);
    return Establishments.findOne({_id: trustId}).name;
  },

  establishmentAddress(){
    return Establishments.findOne({_id: this._id}).address.formattedAddress;
  },

  isHost(){
    return Establishments.findOne({_id: this._id}).type === "hostOrganization";
  },

  establishmentPosition(){
    let latitude=  Establishments.findOne({_id: this._id}).address.geopoint.latitude; //get the latitude of the establishment from the database
    let longitude =  Establishments.findOne({_id: this._id}).address.geopoint.longitude;  //get the longitude of the establishment from the database

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
