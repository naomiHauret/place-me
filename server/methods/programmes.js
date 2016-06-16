Meteor.methods({
  'addProgramme': function(programmeData){
    return Programmes.insert({
      programmeName: programmeData.programmeName,
    });
  },

  'removeProgramme': function(programmeId){
    return Programmes.remove({
      _id: programmeId
    });
  },

  'updateProgramme': function(programmeData, programmeId){

  }
});
