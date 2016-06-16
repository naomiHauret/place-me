Meteor.methods({
  'addUserAccount': function(userData) {
    let role = userData.role;
    let geo = new GeoCoder();

    if(role === "student"){
      let permanentAddress= userData.addressLine1+" "+userData.zipcode+" "+userData.city+" "+userData.country;
      let permanentAddressLine= userData.addressLine1+" "+userData.addressLine2;
      let resultPermanentAddress = geo.geocode(permanentAddress); //geocoding our address
      let latPermanentAddress= resultPermanentAddress['0'].latitude;
      let longPermanentAddress= resultPermanentAddress['0'].longitude;
      let fullAddressPermanent= resultPermanentAddress['0'].formattedAddress;
      let schoolAddress= userData.schoolAddressLine1+" "+userData.schoolZipcode+" "+userData.schoolCity+" "+"United Kingdom";
      let schoolAddressLine= userData.schoolAddressLine1+" "+userData.schoolAddressLine2;
      let resultSchoolAddress = geo.geocode(schoolAddress); //geocoding our address
      let latSchoolAddress= resultSchoolAddress['0'].latitude;
      let longSchoolAddress= resultSchoolAddress['0'].longitude;
      let fullAddressSchool= resultSchoolAddress['0'].formattedAddress;

      //creating our student
      let id = Accounts.createUser({
        email: userData.email,
        password: userData.password,
        profile: {
          firstName: userData.firstName,
          lastName:userData.lastName,
          phone: userData.phone,
          birthday: userData.birthday,
          addresses:[
            {
              formattedAddress: fullAddressPermanent ,
              street: permanentAddressLine,
              city: userData.city,
              zipcode: userData.zipcode,
              country: userData.country,
              type:"permanent",
              geopoint: {
                latitude: latPermanentAddress,
                longitude: longPermanentAddress
              }
            },

            {
              formattedAddress: fullAddressSchool ,
              street: schoolAddressLine,
              city:userData.schoolCity,
              zipcode: userData.schoolZipcode,
              country: "United Kingdom",
              type:"school",
              geopoint: {
                latitude: latSchoolAddress,
                longitude: longSchoolAddress
              }
            }

          ],
          cohortId: userData.cohort,
          programmeId: userData.programme,
          isPlaced: false,
          isPlacedFilter: "false",
          numberHours: 0
        },
        isAuthorized: true,
        isAuthorizedFilter: "true",



      });
      Roles.addUsersToRoles(id, ["student", 'registered']);
    }
    else if(role==="tutor"){
      let address= userData.addressLine1+" "+userData.zipcode+" "+userData.city;
      let addressLine= userData.addressLine1+" "+userData.addressLine2;
      let result = geo.geocode(address); //geocoding our address
      let fullAddress= result['0'].formattedAddress;

      //getting our geopoints
      let lat= result['0'].latitude;
      let long= result['0'].longitude;

      //creating our tutor
      let id= Accounts.createUser({
        email: userData.email,
        password: userData.password,
        profile: {
          firstName: userData.firstName,
          lastName:userData.lastName,
          phone: userData.phone,
          address: {
            formattedAddress: fullAddress,
            street: addressLine,
            city: userData.city,
            zipcode: userData.zipcode ,
            geopoint: {
              latitude: lat,
              longitude: long
            }
          }
        },
        isAuthorized: true,
        isAuthorizedFilter: "true",


       });
      Roles.addUsersToRoles(id, ["tutor", 'registered']);
    }

    else if(role==="educator"){

      //creating our educator
      let id= Accounts.createUser({
        email: userData.email,
        password: userData.password,
        profile: {
          firstName: userData.firstName,
          lastName:userData.lastName,
          phone: userData.phone,
          hostOrganizationId: userData.hostOrganizationId
        },
        isAuthorized: true,
        isAuthorizedFilter: "true",


      });
      Roles.addUsersToRoles(id, ["educator", 'registered']);
    }
    else{ //coordinator
      let id= Accounts.createUser({
        email: userData.email,
        password: userData.password,
        profile: {
          firstName: userData.firstName,
          lastName:userData.lastName,
          phone: userData.phone,
          trustOrganizationId: userData.trustOrganizationId
        },
        isAuthorized: true,
        isAuthorizedFilter: "true",

      });
      Roles.addUsersToRoles(id, ["coordinator",  'registered']);
    }
  },
  'removeUserAccount': function(userId) {

    let result= Meteor.users.findOne({_id: userId});
    if(result){
      result= Meteor.users.remove({_id: userId});
    }

    if(!result){
      throw new Meteor.Error(500, 'Error 500: Not found', 'user  not found');
    }
    return result;

  },

  'blockUserAccount': function(userId){
    let result= Meteor.users.findOne({_id: userId});
    if(result){
      result=  Meteor.users.update({_id: userId}, {$set: {"profile.isAuthorized": false, 'profile.isAuthorizedFilter': "false"} });
    }

    if(!result){
      throw new Meteor.Error(500, 'Error 500: Not found', 'user  not found');
    }
    return result;
  },

  'authorizeUserAccount': function(userId){
    let result= Meteor.users.findOne({_id: userId});
    if(result){
      result=  Meteor.users.update({_id: userId}, {$set: {"profile.isAuthorized": true, 'profile.isAuthorizedFilter': "true"} });
    }

    if(!result){
      throw new Meteor.Error(500, 'Error 500: Not found', 'user  not found');
    }
    return result;
  },

  'updateUserAccount': function(userId, userData){
    return "yay";
  },

  'changeRole': function(userId){
    let newRole="coordinator";
    let result= Meteor.users.findOne({_id: userId});

    if(result){
      if( Meteor.findOne({"_id": userId}).roles[0]=== "coordinator" ){
        Roles.removeUsersFromRoles(userId,["coordinator"]);
        Roles.addUsersToRoles(userId, ["educator"]);
      }
      else{
        Roles.removeUsersFromRoles(userId,["educator"]);
        Roles.addUsersToRoles(userId, ["coordinator"]);
      }
    }

    if(!result){
      throw new Meteor.Error(500, 'Error 500: Not found', 'user  not found');
    }

    return result;

  },

  'insertLogin': function(userId){
    return Logins.insert({
        userId:  userId,
        loggedInAt: new Date()
      });
  }

});
