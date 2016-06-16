//bootstrap.js
//filled our collections with fake (but coherent!) data when the server starts (and if our collections don't have any data)
Meteor.startup(function() {
  let rolesArray= ["coordinator", "educator", "student", "tutor"]; //array containing the different roles a user can have
  let establishmentsTypeArray= ["trustOrganization", "hostOrganization"];
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //programmes
  Seed( 'Programmes', {
    data: [
      {programmeName: "Multi"},
      {programmeName: "Full-time"},
      {programmeName: "Part-time"},
      {programmeName: "Accelerated"},
      {programmeName: "Erasmus"},
      {programmeName: "PgDip"}
    ]
  });

  let programmesArray= [];
  Programmes.find({}).map(function(o){
    programmesArray.push(o._id);
  });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //cohorts
  Seed( 'Cohorts', {
    data: [
      {cohortYear: 2011},
      {cohortYear: 2012},
      {cohortYear: 2013},
      {cohortYear: 2014},
      {cohortYear: 2015},
      {cohortYear: 2016},
      {cohortYear: 2017},
      {cohortYear: 2018},
      {cohortYear: 2019}
    ]
  });

  let cohortsArray= [];
  Cohorts.find({}).map(function(o){
    cohortsArray.push(o._id);
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Themes
  Seed( 'Themes', {
    data: [
      {themeName: "Assessment"},
      {themeName: "Elective"},
      {themeName: "Evaluation"},
      {themeName: "Integration 1"},
      {themeName: "Integration 2"},
      {themeName: "Intervention"},
      {themeName: "Intervention & Evaluation"},
      {themeName: "Planning"}
    ]
  });

  let themesArray= [];
  Themes.find({}).map(function(o){
    themesArray.push(o._id);
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  Seed( 'Themetypes', {
    data: [
      {
        name: "Accident & Emergency",
        code: "A&E",
        type: "Physical settings"
      },
      {
        name: "Artificial Limbs and Appliance Service e.g. Wheelchairs, Posture & Mobility equipment, limb fitting",
        code: "ALAS",
        type: "Specialist Services"
      },
      {
        name: "Acute Mental Health e.g. acute psychiatry, assessment wards, Psychiatric ICU (Adult)",
        code: "AMH",
        type: "Mental Health Settings"
      },
      {
        name: "Acute Physical  e.g. medical, acute admissions, assessment wards, cardiology unit (Adult)",
        code: "AP",
        type: "Physical settings"
      },
      {
        name: "Burns & Plastics, e.g. plastic surgery, burns splinting, scar management",
        code: "B&P",
        type: "Specialist Services"
      },
      {
        name: "Child & Adolescent Mental Health Service, e.g. Aspergers, challenging behaviour",
        code: "CAMHS",
        type: "Children's Services"
      },
      {
        name: "Community Mental Health Team (Adult), Intensive Support team, Vulnerable People Services",
        code: "CMHT",
        type: "Mental Health Settings"
      },
      {
        name: "Community Physical, e.g. community hospital, community physical elderly (Adult), Crisis Intervention, Enhanced Care, Pulmonary Outreach, Cardiac Services",
        code: "CP",
        type: "Physical Settings"
      },
      {
        name:"Drug and alcohol Service, Addictions",
        code: "DA",
        type: "Mental Health Settings"
      },
      {
        name:"Eating Disorders",
        code: "EA",
        type: "Mental Health Settings"
      },
      {
        name: "Education and Training",
        code: "E&T"
      },
      {
        name: "Elderly Care Assessment Service",
        code: "ECAS"
      },
      {
        name: "Forensic Mental Health Service or Prison Service, Secure Unit",
        code: "FMH",
        type: "Mental Health Settings"
      },
      {
        name: "GP practice / surgeries",
        code:"GP",
        type:"Other"
      },
      {
        name:"Housing",
        code: "H",
        type: "Social Services / Community Services"
      },
      {
        name: "Hand Therapy, e.g. hand rehab, splinting",
        code: "HT",
        type: "Specialist Services"
      },
      {
        name: "Inter-Agency e.g. split placement in S.S. and health sector",
        code: "IA",
        type: "Other"
      },
      {
        name: "Intermediate Care",
        code: "IC",
        type:"Physical Settings"
      },
      {
       name: "Learning Disabilities e.g. hospital or community based, (Adult and paediatric)",
       code: "LD",
       type: "Specialist Services"
      },
      {
        name: "Management Placement",
        code: "M",
        type: "Other"
      },
      {
        name:"Memory service",
        code: "MS",
        type: "Mental Health Settings"
      },
      {
        name: "Mental Health Day Hospital (Adult and Older Adult)",
        code: "MHDH",
        type: "Mental Health Settings"
      },
      {
        name: "Neurology e.g. stroke unit, CVA, spinal unit, ABI, neuro rehab",
        code: "N",
        type: "Specialist Services"

      },
      {
        name: "Oncology, e.g. cancer care",
        code: "O",
        type: "Specialist Services"

      },
      {
        name:"Older adult – in patient, rehab",
        code:"OA",
        type:"Physical settings"
      },
      {
        name: "Outpatients",
        code: "OP",
        type: "Other"
      },
      {
        name: "Overseas / International",
        code: "OI",
        type: "Other"
      },
      {
        name: "Paediatrics e.g. school, children centre",
        code: "P",
        type: "Children's Services"
      },
      {
        name: "Palliative Care e.g. hospice, Macmillan",
        code: "PC",
        type: "Specialist Services"

      },
      {
        name: "Physical Day Hospital (Adult and Older Adult)",
        code: "PDH",
        type: "Physical Settings"
      },
      {
        name: "Pain Management",
        code: "PM",
        type: "Specialist Services"

      },
      {
        name: "Psychiatry Old Age e.g. EMI, Dementia care, Older adult in-patient mental health",
        code: "POA",
        type: "Mental Health Settings"
      },
      {
        name: "Private Practice",
        code: "PP",
        type: "Other"
      },
      {
        name: "Rheumatology",
        code: "R",
        type: "Specialist Services"

      },
      {
        name: "Rehab Physical e.g. medical rehab, pulmonary rehab, cardiac rehab, (Adult)",
        code: "RP",
        type: "Physical settings"
      },
      {
        name: "Residential setting",
        code: "RE",
        type: "Other"
      },
      {
        name: "Role Emerging Placement e.g. asylum seekers, outdoors activity centre, charities / 3rd sector",
        code: "REP",
        type:"Other"
      },
      {
        name: "Rehab Mental Health e.g. Long term mental health, (Adult)",
        code: "RMH",
        type: "Mental Health Settings"

      },
      {
        name: "Reablement Team (Adult)",
        code: "RT",
        type: "Social Services / Community Services"
      },
      {
        name: "Surgical e.g. Amputation, vascular surgery, general surgery ",
        code: "S",
        type: "Specialist Services"

      },
      {
        name: "Social Services, e.g. equipment and adaptations, community based assessments (Adult and paediatric)",
        code: "SS",
        type: "Social Services / Community Services"
      },
      {
        name: "Telecare and assistive technology",
        code:"T",
        type: "Social Services / Community Services"
      },
      {
        name: " Trauma and Orthopaedics e.g. fractures, elective hip and knee surgery",
        code: "T&O",
        type: "Specialist Services"

      },
      {
        name: "Veterans e.g. Combat Stress",
        code: "V",
        type: "Other"
      },
      {
        name: "Vocational Rehabilitation ",
        code: "VR",
        type: "Other"
      }
    ]
  });

  let themetypesArray= [];
  Themetypes.find({}).map(function(o){
    themetypesArray.push(o._id);
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Some users with defined and random data
  Seed( 'Users', {
    data: [
      {
        username: 'registerStudent',
        email: 'registerStudent@register.com',
        password: 'randomStudent',
        isAuthorized: false,
        isAuthorizedFilter: "false",
        roles: ['unregistered']


      },
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      {
        username: 'registerTutor',
        email: 'registerTutor@register.com',
        password: 'randomTutor',
        isAuthorized: false,
        isAuthorizedFilter: "false",
        roles: ['unregistered']
      },
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      {
        username: 'registerEducator',
        email: 'registerEducator@register.com',
        password: 'randomEducator',
        isAuthorized: false,
        isAuthorizedFilter: "false",
        roles: ['unregistered']

      },
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      {
        username: 'registerCoordinator',
        email: 'registerCoordinator@register.com',
        password: 'randomCoordinator',
        isAuthorized: false,
        isAuthorizedFilter: "false",
        roles: ['unregistered']
      },
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      {
        username: 'naomihauret',
        email: 'hauretnaomi@gmail.com',
        password: 'password',
        profile: {
          firstName: "Naomi",
          lastName: "Hauret",
          birthday: "04-06-1996",
          phone: "+33 6 38 79 02 82",
          address: {
            street: "37, route de Serguin",
            city: "Questembert",
            zipcode: "56230",
            geopoint: {
              latitude: faker.address.latitude(),
              longitude: faker.address.longitude()
            }
          },
          isAuthorized: true,
          isAuthorizedFilter: "true"
        },

        roles: [ 'admin', 'registered' ]
      },
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      {
        username: 'admin',
        email: 'admin@test.com',
        password: 'password',
        profile: {
          firstName: faker.name.firstName(), //random first name
          lastName: faker.name.lastName(), //random last name
          birthday: moment(faker.date.past()).format('MM/DD/YYYY'), //random date
          phone: faker.phone.phoneNumber(), //random phone number
          address: {
            street: faker.address.streetAddress(), //random street name and number
            city: faker.address.city(), //random city
            zipcode: faker.address.zipCode(), //random zip code
            geopoint: {
              latitude: faker.address.latitude(),
              longitude: faker.address.longitude()
            }
          },
          isAuthorized: true,
          isAuthorizedFilter: "true"
        },

        roles: [ 'admin', 'educator', 'coordinator', 'student', 'tutor', 'registered' ]

      },
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      {
        username: 'student',
        email: 'student@test.com',
        password: 'password',
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
          numberHours: faker.random.number(),
          cohortId: faker.random.arrayElement(cohortsArray),
          programmeId: faker.random.arrayElement(programmesArray),
          isAuthorized: true,
          isAuthorizedFilter: "true"
        },

        roles: [ 'student', 'registered' ],

      },
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      {
        username: 'educator',
        email: 'educator@test.com',
        password: 'password',
        profile: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          birthday: moment(faker.date.past()).format('MM/DD/YYYY'),
          phone: faker.phone.phoneNumber(),
          address: {
            formattedAddress: faker.address.streetAddress()+", "+faker.address.city()+", "+faker.address.zipCode()+", "+faker.address.country() ,
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

        roles: [ 'educator',  'registered' ]

      },
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      {
        username: 'forbiddenEducator',
        email: 'forbiddenEducator@test.com',
        password: 'password',
        profile: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          birthday: moment(faker.date.past()).format('MM/DD/YYYY'),
          phone: faker.phone.phoneNumber(),
          address: {
            formattedAddress: faker.address.streetAddress()+", "+faker.address.city()+", "+faker.address.zipCode()+", "+faker.address.country() ,
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

        roles: [ 'educator',  'registered' ]

      },

      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      {
        username: 'coordinator',
        email: 'coordinator@test.com',
        password: 'password',
        profile: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          birthday: moment(faker.date.past()).format('MM/DD/YYYY'),
          phone: faker.phone.phoneNumber(),
          address: {
            formattedAddress: faker.address.streetAddress()+", "+faker.address.city()+", "+faker.address.zipCode()+", "+faker.address.country() ,
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

        roles: [ 'coordinator', 'registered' ]

      },
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      {
        username: 'tutor',
        email: 'tutor@test.com',
        password: 'password',
        profile: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          birthday: moment(faker.date.past()).format('MM/DD/YYYY'),
          phone: faker.phone.phoneNumber(),
          address: {
            formattedAddress: faker.address.streetAddress()+", "+faker.address.city()+", "+faker.address.zipCode()+", "+faker.address.country() ,
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

        roles: [ 'tutor', 'registered' ]
      }
    ]
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Some students
  Seed( 'Users', {
    min: 355,
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

  Seed( 'Users', {
    min: 505,
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

  Seed( 'Users', {
    min: 525,
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
        roles: ['student', 'registered'],
      };
    }
  });

  Seed( 'Users', {
    min: 535,
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

        roles: ['student', 'registered']
      };
    }
  });

  Seed( 'Users', {
    min: 555,
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

        roles: ['student', 'registered']
      };
    }
  });

  let studentsArray= [];
  Meteor.users.find({"roles": "student"}).map(function(o){
    studentsArray.push(o._id);
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //some tutors
  Seed( 'Users', {
    min: 655,
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


  Seed( 'Users', {
    min: 705,
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



  let tutorsArray= [];
  Meteor.users.find({"roles": "tutor"}).map(function(o){
    tutorsArray.push(o._id);
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Some trust organizations
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

  let trustOrganizationArray=[];
  Establishments.find({"type": 'trustOrganization'}).map(function(o){
    trustOrganizationArray.push(o._id);
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Some host Establishments
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

  let hostOrganizationArray=[];
  Establishments.find({"type": 'hostOrganization'}).map(function(o){
    hostOrganizationArray.push(o._id);
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //some coordinators
  Seed( 'Users', {
    min: 800,
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


  Seed( 'Users', {
    min: 830,
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


  let coordinatorsArray= [];
  Meteor.users.find({"roles": "coordinator"}).map(function(o){
    coordinatorsArray.push(o._id);
  });


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //some educators
  Seed( 'Users', {
    min: 950,
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

  Seed( 'Users', {
    min: 1020,
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

  let educatorsArray= [];
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




});
