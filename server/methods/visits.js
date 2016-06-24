Meteor.methods({
  'addVisit': function(visitData){
    let isPassedFilter= "false";

    if(visitData.isPassed === true){
      //passed visit
      isPassedFilter= "true";
      return Visits.insert({
        'author': Meteor.userId(),
        'tutorId': visitData.tutorId,
        'createdAt': new Date(),
        "placementId":visitData.placementId,
        //'isPassed': visitData.isPassed,
        //'isPassedFilter': isPassedFilter,
        //'notes': visitData.notes
      }, function(error, visitId){
        if(error){
          console.log(error);
        }
        else{
          //Sending emails
          Meteor.call("sendStudentVisitNotification", visitId); //to concerned student
          Meteor.call("sendTutorVisitNotification", visitId); //to concerned tutor
          Meteor.call("sendEducatorsVisitNotification", visitId); //to concerned educators
        }
      });
    }

    else{
      //incoming visit
      return Visits.insert({
        'author': Meteor.userId(),
        'tutorId': visitData.tutorId,
        'createdAt': new Date(),
        "placementId":visitData.placementId,
        'isPassed': visitData.isPassed,
        'isPassedFilter': isPassedFilter,
      }, function(error, visitId){
        if(error){
          console.log(error);
        }
        else{
          //Sending emails
          Meteor.call("sendStudentVisitNotification", visitId); //to concerned student
          Meteor.call("sendTutorVisitNotification", visitId); //to concerned tutor
          Meteor.call("sendEducatorsVisitNotification", visitId); //to concerned educators
        }
      });
    }
  },

  'removeVisit': function(visitId){
    Visits.remove({"_id": visitId});
    return Visits.remove({"_id": visitId});
  },

  'updateVisit': function(visitData, visitId){
    return Visits.update({'_id': visitId}, visitData);
  }
});
