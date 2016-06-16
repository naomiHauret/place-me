Meteor.methods({
  'addEstablishment': function(establishmentData){
    let type = establishmentData.type;
    let geo = new GeoCoder();

    let address= establishmentData.addressLine1+" "+establishmentData.zipcode+" "+establishmentData.city;
    let addressLine= establishmentData.addressLine1+" "+establishmentData.addressLine2;
    let result = geo.geocode(address); //geocoding our address
    let fullAddress= result['0'].formattedAddress;

    //getting our geopoints
    let lat= result['0'].latitude;
    let long= result['0'].longitude;

    if(type === "trustOrganization"){
      return Establishments.insert({
        name: establishmentData.name,
        phone: establishmentData.phone,
        address: {
          formattedAddress: fullAddress,
          street: addressLine,
          city: establishmentData.city,
          zipcode: establishmentData.zipcode,
          geopoint: {
            latitude: lat,
            longitude: long
          }
        },
        type: 'trustOrganization',
        additionalInformation: establishmentData.additionalInformation
      });
    }

    else{
      return Establishments.insert({
        name: establishmentData.name,
        phone: establishmentData.phone,
        address: {
          formattedAddress: fullAddress,
          street: addressLine,
          city: establishmentData.city,
          zipcode: establishmentData.zipcode,
          geopoint: {
            latitude: lat,
            longitude: long
          }
        },
        type: 'hostOrganization',
        trustOrganizationId: establishmentData.trustOrganizationId,
        additionalInformation: establishmentData.additionalInformation
      });
    }
  },

  'removeEstablishment': function(establishmentId) {

    let typeToRemove= Establishments.findOne({_id: establishmentId }).type;
    let result;

    if( typeToRemove){
      if(typeToRemove === "hostOrganization"){
        //delete associated educators
        Meteor.users.remove({hostOrganizationId: establishmentId});

        //delete associated offers
        Offers.remove({hostOrganizationId: establishmentId});
      }

      else{
        //delete associated coordinators
        Meteor.users.remove({"profile.trustOrganizationId": establishmentId});

        //delete associated educators (from host organizations)
        let tabHost= [];
        Establishments.find({trustOrganizationId: establishmentId}).map(function(o){
          tabHost.push(o._id);
        });


        tabHost.map(function(o){
          //delete associated educators, offers
          Meteor.users.remove({"profile.hostOrganizationId": o});
          Offers.remove({hostOrganizationId: o});
        }) ;

        //delete associated host organizations
        Establishments.remove({trustOrganizationId: establishmentId});
      }

      result= Establishments.remove({_id: establishmentId});
    }

    else{
      throw new Meteor.Error(500, 'Error 500: Not found', 'establishment  not found');

    }

    return result;
  },

  'updateEstablishment': function(establishmentId, establishmentData){

  }

});
