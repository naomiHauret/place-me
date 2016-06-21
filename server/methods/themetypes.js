Meteor.methods({
  'addThemetype': function(themetypeData){
    return Themetypes.insert({
      name: themetypeData.name,
      code: themetypeData.code,
    });
  },

  'removeThemetype': function(themetypeId){
    return Themetypes.remove({
      _id: themetypeId
    });
  },

  'updateThemetype': function(themetypeData, themetypeId){
    return "oeoeoe";
  }
});
