Meteor.methods({
  'addPlacement': function(placementData){
    //placement from offer
    let carFilter= "false";
    let accommodationFilter= "false";
    if(placementData.car === true){
      carFilter= "true";
    }

    if(placementData.accommodation === true){
      accommodationFilter = "true";
    }
    if(placementData.isFromOffer === true){
      Placements.insert({
        'author': Meteor.userId(),
        'createdAt': new Date(),
        "studentId":placementData.studentId,
        "themeId": placementData.themeId,
        "themeTypesId": placementData.themeTypesId,
        'offSiteEducatorId': placementData.offSiteEducatorId,
        'onSiteEducatorIds': placementData.onSiteEducatorsIds,
        'tutorsIds': placementData.tutorsIds,
        'startDate': placementData.startDate,
        'endDate': placementData.endDate,
        'accommodation': placementData.accommodation,
        'car': placementData.car,
        'accommodationFilter': accommodationFilter,
        'carFilter': carFilter,
        'hostOrganizationFilter': Offers.findOne({_id: placementData.offerId}).hostOrganizationId,
        'cohortFilter': Cohorts.findOne({_id: Meteor.users.findOne({_id: Meteor.userId()}).profile.cohortId  })._id,
        'programmeFilter': Programmes.findOne({_id: Meteor.users.findOne({_id: Meteor.userId()}).profile.programmeId  })._id,
        'isFromOffer': placementData.isFromOffer,
        'offerId': placementData.offerId,
        'isFinished': false,
        'isFinishedFilter': "false",
        'additionalInformation': placementData.additionalInformation
      }, function(error, placementId){
        if(error){
          console.log(error);
        }
        else{
          //Sending emails
          Meteor.call("sendStudentPlacementNotification", placementId); //to concerned student
          Meteor.call("sendTutorsPlacementNotification", placementId); //to concerned tutors
          Meteor.call("sendEducatorsPlacementNotification", placementId); //to concerned educators
        }
      });

      Offers.update({ _id: placementData.offerId }, {$inc: {currentPlacementsNumber: -1} }); //decrease the number of available places for this offer
      if( Offers.findOne({_id: placementData.offerId}).currentPlacementsNumber <=0 ) {
        Offers.update({ _id: placementData.offerId }, {$set: { isActive : false } }); //disable this offer if there are no more places available
      }
    }

    //created ex nihilo placement
    else{
      Placements.insert({
        'author': Meteor.userId(),
        'hostOrganizationId': placementData.hostOrganizationId,
        'hostOrganizationFilter': placementData.hostOrganizationId,
        'createdAt': new Date(),
        "studentId":placementData.studentId,
        'offSiteEducatorId': placementData.offSiteEducatorId,
        'onSiteEducatorIds': placementData.onSiteEducatorIds,
        'tutorsIds': placementData.tutorsIds,
        'startDate': placementData.startDate,
        'endDate': placementData.endDate,
        'accommodation': placementData.accommodation,
        'car': placementData.car,
        'accommodationFilter': accommodationFilter,
        'carFilter': carFilter,
        'isFromOffer': placementData.isFromOffer,
        'isFinished': false,
        'isFinishedFilter': "false",
        'additionalInformation': placementData.additionalInformation
      }, function(error, placementId){
        if(error){
          console.log(error);
        }
        else{
          //Sending emails
          Meteor.call("sendStudentPlacementNotification", placementId); //to concerned student
          Meteor.call("sendTutorsPlacementNotification", placementId); //to concerned tutors
          Meteor.call("sendEducatorsPlacementNotification", placementId); //to concerned educators
        }
      });
    }

    return Meteor.users.update({_id: placementData.studentId}, {$set: { 'profile.isPlaced' : true, 'profile.isPlacedFilter' : "true"}});

  },

  'removePlacement': function(placementId){
    Visits.remove({placementId: placementId });
    return Placements.remove({"_id": placementId});
  },

  'updatePlacement': function(placementData, placementId){
    return Placements.update({'_id': placementId}, placementData);
  }
});
