Meteor.methods({
  'addPlacement': function(placementData){
    return Placements.insert(placementData);
  },

  'removePlacement': function(placementId){
    Visits.remove({"_id": placementId});
    return Placements.remove({"_id": placementId});
  },

  'updatePlacement': function(placementData, placementId){
    return Placements.update({'_id': placementId}, placementData);
  }
});
