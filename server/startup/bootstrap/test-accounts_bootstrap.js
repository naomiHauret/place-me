//ghost-accounts_bootstrap.js
//fills our collections with ghost accounts data when the server starts (and if our collections don't have any data)
//ghost accounts are accounts that allow the user to access the real register page.

seed_testAccounts=function() {
  //Ghost accounts to access real register page
  Seed( 'Users', {
    data: [
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //My test account
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

        roles: [ 'tutor','educator', 'coordinator', 'student', 'registered' ]
      },
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      {
        //Super user (admin) test account
        username: 'sudo',
        email: 'sudo@test.com',
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

        roles: [ 'tutor','educator', 'coordinator', 'student', 'registered' ]

      },
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      {
        //Student test account
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
        //Educator test account
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
        //Forbidden user test account
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
        //Coordinator test account
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
      //Tutor test account
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
}
