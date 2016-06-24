seed_random= function(){
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Students
  //Placed
  Seed( 'Users', {
    min: 55,
    environments: [ 'development', 'staging', 'product' ],
    model( index ) {
      return {
        username: faker.internet.email(), //random email
        email: faker.internet.email(), //random email
        password: faker.internet.password(), //random password
        profile: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          birthday: moment(faker.date.past()).format('MM/DD/YYYY'),
          phone: faker.phone.phoneNumber(),
          addresses:  [
            //permanent address
            {
              formattedAddress: faker.address.streetAddress()+", "+faker.address.city()+", "+faker.address.zipCode()+", "+faker.address.country() ,
              street : faker.address.streetAddress(),
              city: faker.address.city(),
              zipcode: faker.address.zipCode(),
              country: faker.address.country(),
              geopoint: {
                latitude: faker.address.latitude(),
                longitude: faker.address.longitude()
              },
              type:"permanent"
            },
            //address during studies
            {
              formattedAddress: faker.address.streetAddress()+", "+faker.address.city()+", "+faker.address.zipCode(),
              street : faker.address.streetAddress(),
              city : faker.address.city(),
              zipcode : faker.address.zipCode(),
              geopoint: {
                latitude: faker.address.latitude(),
                longitude: faker.address.longitude()
              },
              type:"school"
            }
          ],
          cohortId: faker.random.arrayElement(cohortsArray),
          programmeId: faker.random.arrayElement(programmesArray),
          isPlaced: true,
          isPlacedFilter: "true",
          numberHours: faker.random.number(),
          isAuthorized: true,
          isAuthorizedFilter: "true"
        },

        roles: ['student', 'registered']

      };
    }
  });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Unplaced
  Seed( 'Users', {
    min: 85,
    environments: [ 'development', 'staging', 'product' ],
    model( index ) {
      return {
        username: faker.internet.email(), //random email
        email: faker.internet.email(), //random email
        password: faker.internet.password(), //random password
        profile: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          birthday: moment(faker.date.past()).format('MM/DD/YYYY'),
          phone: faker.phone.phoneNumber(),
          addresses:  [
            //permanent address
            {
              formattedAddress: faker.address.streetAddress()+", "+faker.address.city()+", "+faker.address.zipCode()+", "+faker.address.country() ,
              street : faker.address.streetAddress(),
              city: faker.address.city(),
              zipcode: faker.address.zipCode(),
              country: faker.address.country(),
              geopoint: {
                latitude: faker.address.latitude(),
                longitude: faker.address.longitude()
              },
              type:"permanent"
            },
            //address during studies
            {
              formattedAddress: faker.address.streetAddress()+", "+faker.address.city()+", "+faker.address.zipCode(),
              street : faker.address.streetAddress(),
              city : faker.address.city(),
              zipcode : faker.address.zipCode(),
              geopoint: {
                latitude: faker.address.latitude(),
                longitude: faker.address.longitude()
              },
              type:"school"
            }
          ],
          cohortId: faker.random.arrayElement(cohortsArray),
          programmeId: faker.random.arrayElement(programmesArray),
          isPlaced: false,
          isPlacedFilter: "false",
          numberHours: faker.random.number(),
          isAuthorized: true,
          isAuthorizedFilter: "true"
        },

        roles: ['student', 'registered'],
      };
    }
  });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Blocked students
  Seed( 'Users', {
    min: 95,
    environments: [ 'development', 'staging', 'product' ],
    model( index ) {
      return {
        username: faker.internet.email(), //random email
        email: faker.internet.email(), //random email
        password: faker.internet.password(), //random password
        profile: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          birthday: moment(faker.date.past()).format('MM/DD/YYYY'),
          phone: faker.phone.phoneNumber(),
          addresses:  [
            //permanent address
            {
              formattedAddress: faker.address.streetAddress()+", "+faker.address.city()+", "+faker.address.zipCode()+", "+faker.address.country() ,
              street : faker.address.streetAddress(),
              city: faker.address.city(),
              zipcode: faker.address.zipCode(),
              country: faker.address.country(),
              geopoint: {
                latitude: faker.address.latitude(),
                longitude: faker.address.longitude()
              },
              type:"permanent"
            },
            //address during studies
            {
              formattedAddress: faker.address.streetAddress()+", "+faker.address.city()+", "+faker.address.zipCode(),
              street : faker.address.streetAddress(),
              city : faker.address.city(),
              zipcode : faker.address.zipCode(),
              geopoint: {
                latitude: faker.address.latitude(),
                longitude: faker.address.longitude()
              },
              type:"school"
            }
          ],
          cohortId: faker.random.arrayElement(cohortsArray),
          programmeId: faker.random.arrayElement(programmesArray),
          isPlaced: false,
          isPlacedFilter: "false",
          numberHours: faker.random.number(),
          isAuthorized: false,
          isAuthorizedFilter: "false"
        },

        roles: ['student', 'registered'],
      };
    }
  });


  studentsArray= [];
  Meteor.users.find({"roles": "student"}).map(function(o){
    studentsArray.push(o._id);
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //some tutors
  //Authorized
  Seed( 'Users', {
    min: 155,
    environments: [ 'development', 'staging', 'product' ],
    model( index ) {
      return {
        username: faker.internet.email(), //random email
        email: faker.internet.email(), //random email
        password: faker.internet.password(), //random password
        profile: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          phone: faker.phone.phoneNumber(),
          address: {
            formattedAddress: faker.address.streetAddress()+", "+faker.address.city()+", "+faker.address.zipCode(),
            street: faker.address.streetAddress(),
            city: faker.address.city(),
            zipcode: faker.address.zipCode(),
            geopoint: {
              latitude: faker.address.latitude(),
              longitude: faker.address.longitude()
            }
          },
          isAuthorized: true,
          isAuthorizedFilter: "true"
        },
        roles: ['tutor',  'registered'],
      };
    }
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Blocked
  Seed( 'Users', {
    min: 165,
    environments: [ 'development', 'staging', 'product' ],
    model( index ) {
      return {
        username: faker.internet.email(), //random email
        email: faker.internet.email(), //random email
        password: faker.internet.password(), //random password
        profile: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          phone: faker.phone.phoneNumber(),
          address: {
            formattedAddress: faker.address.streetAddress()+", "+faker.address.city()+", "+faker.address.zipCode(),
            street: faker.address.streetAddress(),
            city: faker.address.city(),
            zipcode: faker.address.zipCode(),
            geopoint: {
              latitude: faker.address.latitude(),
              longitude: faker.address.longitude()
            }
          },
          isAuthorized: false,
          isAuthorizedFilter: "false"
        },

        roles: ['tutor',  'registered']

      };
    }
  });


  tutorsArray= [];
  Meteor.users.find({"roles": "tutor"}).map(function(o){
    tutorsArray.push(o._id);
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Organizations
  //Trust
  Seed( 'Establishments', {
    min: 65,
    environments: [ 'development', 'staging', 'product' ],
    model( index ) {
      return {
        name: faker.company.companyName(),
        phone: faker.phone.phoneNumber(),
        address: {
          formattedAddress: faker.address.streetAddress()+", "+faker.address.city()+", "+faker.address.zipCode(),
          street: faker.address.streetAddress(),
          city: faker.address.city(),
          zipcode: faker.address.zipCode(),
          geopoint: {
            latitude: faker.address.latitude(),
            longitude: faker.address.longitude()
          }
        },
        type: 'trustOrganization',
        additionalInformation:  faker.lorem.paragraph()
      };
    }
  });

  trustOrganizationArray=[];
  Establishments.find({"type": 'trustOrganization'}).map(function(o){
    trustOrganizationArray.push(o._id);
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Host
  Seed( 'Establishments', {
    min: 185,
    environments: [ 'development', 'staging', 'product' ],
    model( index ) {
      return {
        name: faker.company.companyName(),
        phone: faker.phone.phoneNumber(),
        address: {
          formattedAddress: faker.address.streetAddress()+", "+faker.address.city()+", "+faker.address.zipCode(),
          street: faker.address.streetAddress(),
          city: faker.address.city(),
          zipcode: faker.address.zipCode(),
          geopoint: {
            latitude: faker.address.latitude(),
            longitude: faker.address.longitude()
          }
        },
        type: 'hostOrganization',
        additionalInformation:  faker.lorem.paragraph(),
        trustOrganizationId:  faker.random.arrayElement(trustOrganizationArray)
      };
    }
  });

  hostOrganizationArray=[];
  Establishments.find({"type": 'hostOrganization'}).map(function(o){
    hostOrganizationArray.push(o._id);
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Coordinators
  //Authorized
  Seed( 'Users', {
    min: 285,
    environments: [ 'development', 'staging', 'product' ],
    model( index ) {
      return {
        username: faker.internet.email(), //random email
        email: faker.internet.email(), //random email
        password: faker.internet.password(), //random password
        profile: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          phone: faker.phone.phoneNumber(),
          trustOrganizationId: faker.random.arrayElement(trustOrganizationArray),
          isAuthorized: true,
          isAuthorizedFilter: "true"
        },

        roles: ['coordinator',  'registered']
      };
    }
  });

  //Blocked
  Seed( 'Users', {
    min: 290,
    environments: [ 'development', 'staging', 'product' ],
    model( index ) {
      return {
        username: faker.internet.email(), //random email
        email: faker.internet.email(), //random email
        password: faker.internet.password(), //random password
        profile: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          phone: faker.phone.phoneNumber(),
          trustOrganizationId: faker.random.arrayElement(trustOrganizationArray),
          isAuthorized: false,
          isAuthorizedFilter: "false"
        },

        roles: ['coordinator', 'registered']
      };
    }
  });


  coordinatorsArray= [];
  Meteor.users.find({"roles": "coordinator"}).map(function(o){
    coordinatorsArray.push(o._id);
  });


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Educators
  //Authorized
  Seed( 'Users', {
    min: 305,
    environments: [ 'development', 'staging', 'product' ],
    model( index ) {
      return {
        username: faker.internet.email(), //random email
        email: faker.internet.email(), //random email
        password: faker.internet.password(), //random password
        profile: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          phone: faker.phone.phoneNumber(),
          hostOrganizationId: faker.random.arrayElement(hostOrganizationArray),
          isAuthorized: true,
          isAuthorizedFilter: "true"
        },

        roles: ['educator',  'registered']
      };
    }
  });

  //Blocked
  Seed( 'Users', {
    min: 325,
    environments: [ 'development', 'staging', 'product' ],
    model( index ) {
      return {
        username: faker.internet.email(), //random email
        email: faker.internet.email(), //random email
        password: faker.internet.password(), //random password
        profile: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          phone: faker.phone.phoneNumber(),
          hostOrganizationId: faker.random.arrayElement(hostOrganizationArray),
          isAuthorized: false,
          isAuthorizedFilter: "false"
        },

        roles: ['educator', 'registered']
      };
    }
  });

  educatorsArray= [];
  Meteor.users.find({"roles": "educator"}).map(function(o){
    educatorsArray.push(o._id);
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Offers
  Seed('Offers',{
    min: 50,
    environments: [ 'development', 'staging', 'product' ],
    model( index ) {
      return {
        createdAt: faker.date.past(),
        hostOrganizationId: faker.random.arrayElement(hostOrganizationArray),
        author: faker.random.arrayElement(coordinatorsArray),
        startDate: moment(faker.date.recent()).format('MM/DD/YYYY') ,
        endDate: moment(faker.date.future()).format('MM/DD/YYYY') ,
        themeId: faker.random.arrayElement(themesArray) ,
        themeTypesId:[faker.random.arrayElement(themetypesArray), faker.random.arrayElement(themetypesArray), faker.random.arrayElement(themetypesArray), faker.random.arrayElement(themetypesArray) ] ,
        accommodation: true ,
        accommodationFilter: "true" ,
        car: true ,
        carFilter: "true" ,
        isActive: true,
        additionalInformation:  faker.lorem.paragraph(),
        initialPlacementsNumber: faker.random.number({
          'min':5,
          'max':8
        }),
        currentPlacementsNumber: faker.random.number({
          'min':1,
          'max':5
        })
      };
    }
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  Seed('Offers',{
    min: 100,
    environments: [ 'development', 'staging', 'product' ],
    model( index ) {
      return {
        createdAt: faker.date.past(),
        hostOrganizationId: faker.random.arrayElement(hostOrganizationArray),
        author: faker.random.arrayElement(coordinatorsArray),
        startDate: moment(faker.date.recent()).format('MM/DD/YYYY') ,
        endDate: moment(faker.date.future()).format('MM/DD/YYYY') ,
        themeId: faker.random.arrayElement(themesArray) ,
        themeTypesId:[faker.random.arrayElement(themetypesArray), faker.random.arrayElement(themetypesArray), faker.random.arrayElement(themetypesArray), faker.random.arrayElement(themetypesArray) ] ,
        accommodation: false ,
        accommodationFilter: "false" ,
        car: true ,
        carFilter: "true" ,
        isActive: true,
        additionalInformation:  faker.lorem.paragraph(),
        initialPlacementsNumber: faker.random.number({
          'min':5,
          'max':8
        }),
        currentPlacementsNumber: faker.random.number({
          'min':1,
          'max':5
        })
      };
    }
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  Seed('Offers',{
    min: 160,
    environments: [ 'development', 'staging', 'product' ],
    model( index ) {
      return {
        createdAt: faker.date.past(),
        hostOrganizationId: faker.random.arrayElement(hostOrganizationArray),
        author: faker.random.arrayElement(coordinatorsArray),
        startDate: moment(faker.date.recent()).format('MM/DD/YYYY') ,
        endDate: moment(faker.date.future()).format('MM/DD/YYYY') ,
        themeId: faker.random.arrayElement(themesArray) ,
        themeTypesId:faker.random.arrayElement(themetypesArray) ,
        accommodation: false ,
        accommodationFilter: "false" ,
        car: false ,
        carFilter: "false" ,
        isActive: true,
        additionalInformation:  faker.lorem.paragraph(),
        initialPlacementsNumber: faker.random.number({
          'min':3,
          'max':12
        }),
        currentPlacementsNumber: faker.random.number({
          'min':1,
          'max':3
        })
      };
    }
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  Seed('Offers',{
    min: 300,
    environments: [ 'development', 'staging', 'product' ],
    model( index ) {
      return {
        createdAt: faker.date.past(),
        hostOrganizationId: faker.random.arrayElement(hostOrganizationArray),
        author: faker.random.arrayElement(coordinatorsArray),
        startDate: moment(faker.date.recent()).format('MM/DD/YYYY') ,
        endDate: moment(faker.date.future()).format('MM/DD/YYYY') ,
        themeId: faker.random.arrayElement(themesArray) ,
        themeTypesId:[faker.random.arrayElement(themetypesArray), faker.random.arrayElement(themetypesArray), faker.random.arrayElement(themetypesArray), faker.random.arrayElement(themetypesArray) ]  ,
        accommodation: true ,
        accommodationFilter: "true" ,
        car: false ,
        carFilter: "false" ,
        isActive: true,
        additionalInformation:  faker.lorem.paragraph(),
        initialPlacementsNumber: faker.random.number({
          'min':2,
          'max':6
        }),
        currentPlacementsNumber: faker.random.number({
          'min':1,
          'max':6
        })
      };
    }
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  Seed('Offers',{
    min: 780,
    environments: [ 'development', 'staging', 'product' ],
    model( index ) {
      return {
        createdAt: faker.date.past(),
        hostOrganizationId: faker.random.arrayElement(hostOrganizationArray),
        author: faker.random.arrayElement(coordinatorsArray),
        startDate: moment(faker.date.recent()).format('MM/DD/YYYY') ,
        endDate: moment(faker.date.future()).format('MM/DD/YYYY') ,
        themeId: faker.random.arrayElement(themesArray) ,
        themeTypesId:[faker.random.arrayElement(themetypesArray), faker.random.arrayElement(themetypesArray), faker.random.arrayElement(themetypesArray), faker.random.arrayElement(themetypesArray) ]  ,
        accommodation: true ,
        accommodationFilter: "true" ,
        car: false ,
        carFilter: "false" ,
        isActive: false,
        additionalInformation:  faker.lorem.paragraph(),
        initialPlacementsNumber: faker.random.number({
          'min':1,
          'max':15
        }),
        currentPlacementsNumber: faker.random.number({
          'min':0,
          'max':0
        })
      };
    }
  });
  offersArray=[];
  Offers.find({}).map(function(o){
    offersArray.push(o._id);
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Placements
  //Created ex nihilo
  Seed('Placements',{
    min: 50,
    environments: [ 'development', 'staging', 'product' ],
    model( index ) {
      return {
        createdAt: faker.date.past(),
        hostOrganizationId: faker.random.arrayElement(hostOrganizationArray),
        author: faker.random.arrayElement(tutorsArray),
        studentId: faker.random.arrayElement(studentsArray),
        offSiteEducatorId: faker.random.arrayElement(educatorsArray),
        onSiteEducatorIds: [faker.random.arrayElement(educatorsArray), faker.random.arrayElement(educatorsArray)],
        tutorsIds: [faker.random.arrayElement(tutorsArray), faker.random.arrayElement(tutorsArray)],
        startDate: moment(faker.date.recent()).format('MM/DD/YYYY') ,
        endDate: moment(faker.date.future()).format('MM/DD/YYYY') ,
        themeId: faker.random.arrayElement(themesArray) ,
        themeTypesId:[faker.random.arrayElement(themetypesArray), faker.random.arrayElement(themetypesArray), faker.random.arrayElement(themetypesArray), faker.random.arrayElement(themetypesArray) ] ,
        accommodation: true ,
        accommodationFilter: "true" ,
        car: true ,
        carFilter: "true" ,
        isFromOffer: false,
        isFinished: false,
        isFinishedFilter: "false",
        cohortFilter: faker.random.arrayElement(cohortsArray),
        programmeFilter: faker.random.arrayElement(programmesArray),
        additionalInformation:  faker.lorem.paragraph(),

      };
    }
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //From offer
  Seed('Placements',{
    min: 100,
    environments: [ 'development', 'staging', 'product' ],
    model( index ) {
      return {
        createdAt: faker.date.past(),
        offerId:  faker.random.arrayElement(offersArray),
        author: faker.random.arrayElement(tutorsArray),
        studentId: faker.random.arrayElement(studentsArray),
        offSiteEducatorId: faker.random.arrayElement(educatorsArray),
        onSiteEducatorIds: [faker.random.arrayElement(educatorsArray), faker.random.arrayElement(educatorsArray)],
        tutorsIds: [faker.random.arrayElement(tutorsArray), faker.random.arrayElement(tutorsArray)],
        startDate: moment(faker.date.recent()).format('MM/DD/YYYY') ,
        endDate: moment(faker.date.future()).format('MM/DD/YYYY') ,
        accommodation: true ,
        car: true ,
        isFromOffer: true,
        isFinished: false,
        isFinishedFilter: "false",
        hostOrganizationFilter: faker.random.arrayElement(hostOrganizationArray),
        cohortFilter: faker.random.arrayElement(cohortsArray),
        programmeFilter: faker.random.arrayElement(programmesArray),
        additionalInformation:  faker.lorem.paragraph(),

      };
    }
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Finished
  //From offer
  Seed('Placements',{
    min: 210,
    environments: [ 'development', 'staging', 'product' ],
    model( index ) {
      return {
        createdAt: faker.date.past(),
        offerId:  faker.random.arrayElement(offersArray),
        author: faker.random.arrayElement(tutorsArray),
        studentId: faker.random.arrayElement(studentsArray),
        offSiteEducatorId: faker.random.arrayElement(educatorsArray),
        onSiteEducatorIds: [faker.random.arrayElement(educatorsArray), faker.random.arrayElement(educatorsArray)],
        tutorsIds: [faker.random.arrayElement(tutorsArray), faker.random.arrayElement(tutorsArray)],
        startDate: moment(faker.date.recent()).format('MM/DD/YYYY') ,
        endDate: moment(faker.date.future()).format('MM/DD/YYYY') ,
        accommodation: true ,
        car: true ,
        hostOrganizationFilter: faker.random.arrayElement(hostOrganizationArray),
        isFromOffer: true,
        isFinished: true,
        isFinishedFilter: "true",
        cohortFilter: faker.random.arrayElement(cohortsArray),
        hostOrganizationFilter: faker.random.arrayElement(hostOrganizationArray),
        programmeFilter: faker.random.arrayElement(programmesArray),
        additionalInformation:  faker.lorem.paragraph(),

      };
    }
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Finished
  //created ex-nihilo
  Seed('Placements',{
    min: 280,
    environments: [ 'development', 'staging', 'product' ],
    model( index ) {
      return {
        createdAt: faker.date.past(),
        hostOrganizationId: faker.random.arrayElement(hostOrganizationArray),
        hostOrganizationFilter: faker.random.arrayElement(hostOrganizationArray),
        author: faker.random.arrayElement(tutorsArray),
        studentId: faker.random.arrayElement(studentsArray),
        offSiteEducatorId: faker.random.arrayElement(educatorsArray),
        onSiteEducatorIds: [faker.random.arrayElement(educatorsArray), faker.random.arrayElement(educatorsArray)],
        tutorsIds: [faker.random.arrayElement(tutorsArray), faker.random.arrayElement(tutorsArray)],
        startDate: moment(faker.date.recent()).format('MM/DD/YYYY') ,
        endDate: moment(faker.date.future()).format('MM/DD/YYYY') ,
        themeId: faker.random.arrayElement(themesArray) ,
        themeTypesId:[faker.random.arrayElement(themetypesArray), faker.random.arrayElement(themetypesArray), faker.random.arrayElement(themetypesArray), faker.random.arrayElement(themetypesArray) ] ,
        accommodation: true ,
        car: true ,
        isFromOffer: false,
        isFinished: true,
        isFinishedFilter: "true",
        cohortFilter: faker.random.arrayElement(cohortsArray),
        programmeFilter: faker.random.arrayElement(programmesArray),
        additionalInformation:  faker.lorem.paragraph(),

      };
    }
  });
  placementsArray=[];
  Placements.find({}).map(function(o){
    placementsArray.push(o._id);
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Visits
  //Future
  Seed('Visits',{
    min: 50,
    environments: [ 'development', 'staging', 'product' ],
    model( index ) {
      return {
        createdAt: faker.date.past(),
        author: faker.random.arrayElement(tutorsArray),
        placementId: faker.random.arrayElement(placementsArray),
      	tutorId: faker.random.arrayElement(tutorsArray), //refers to a tutor
      	dateTime: moment(faker.date.future()).format('MM/DD/YYYY HH:mm') , //format MM/DD/YYYY HH:mm
      	isPassed: false,
      	isPassedFilter: "false", //trick for easy:search
      };
    }
  });
  //Past
  Seed('Visits',{
    min: 250,
    environments: [ 'development', 'staging', 'product' ],
    model( index ) {
      return {
        createdAt: faker.date.past(),
        author: faker.random.arrayElement(tutorsArray),
        placementId: faker.random.arrayElement(placementsArray),
        tutorId: faker.random.arrayElement(tutorsArray), //refers to a tutor
        dateTime: moment(faker.date.past()).format('MM/DD/YYYY HH:mm') , //format MM/DD/YYYY HH:mm
        isPassed: true,
        isPassedFilter: "true", //trick for easy:search
        notes:  faker.lorem.paragraph()
      };
    }
  });

  visitsArray=[];
  Visits.find({}).map(function(o){
    visitsArray.push(o._id);
  });
}
