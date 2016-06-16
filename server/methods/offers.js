Meteor.methods({
  'addOffer': function(offerData){
    let carFilter= "true";
    let accommodationFilter= "true";

    if(offerData.car === false){
      carFilter="false";
    }

    if(offerData.accommodation === false){
      accommodationFilter="false";
    }
    return Offers.insert({
      hostOrganizationId: offerData.hostOrganizationId,
      createdAt: new Date(),
      author: Meteor.userId(),
      startDate: offerData.startDate ,
      endDate: offerData.endDate  ,
      themeTypesId: offerData.themeTypesId ,
      accommodation: offerData.accommodation ,
      accommodationFilter: accommodationFilter ,
      car: offerData.car ,
      carFilter: carFilter ,
      isActive: true,
      additionalInformation: offerData.additionalInformation,
      initialPlacementsNumber: offerData.number,
      currentPlacementsNumber: offerData.number
    });
  },

  'removeOffer': function(offerId){
    return Offers.remove({_id: offerId});
  },

  'updateOffer': function(offerId, offerData){
    return "#yolo";
  }

});
