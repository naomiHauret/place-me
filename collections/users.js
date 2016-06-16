//Authorizations
Meteor.users.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Meteor.users.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});


Accounts.users.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Accounts.users.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

//Search index for easy:search

UsersIndex = new EasySearch.Index({
  engine:  new EasySearch.Minimongo({ //use minimongo (client-side collection ) to search
      sort: () => { lastName: 1 }, // sort by last name
      selector: function (searchObject, options, aggregation) {
        let selector = this.defaultConfiguration().selector(searchObject, options, aggregation);

        // filter by status (student, educator, tutor, coordinator)
        if (options.search.props.roles) {
          selector.roles = options.search.props.roles;
        }

        if (options.search.props.isAuthorizedFilter) {
          _.extend(selector,{"profile.isAuthorizedFilter": options.search.props.isAuthorizedFilter});
        }

        //student filter: cohort
        if (options.search.props.cohortId) {
          _.extend(selector,{"profile.cohortId": options.search.props.cohortId});
        }
        //student filter: programme
        if (options.search.props.programmeId) {
            _.extend(selector,{"profile.programmeId": options.search.props.programmeId});
        }

        //student filter: placement (is placed or not)
        if (options.search.props.isPlacedFilter) {
            _.extend(selector,{"profile.isPlacedFilter": options.search.props.isPlacedFilter});
        }

        //coordinator filter: trust id
        if(options.search.props.trustOrganizationId){
            _.extend(selector,{"profile.trustOrganizationId": options.search.props.trustOrganizationId});
        }

        //educator filter: host id
        if(options.search.props.hostOrganizationId){
            _.extend(selector,{"profile.hostOrganizationId": options.search.props.hostOrganizationId});
        }

        return selector;
      }
    }),
  collection: Meteor.users,
  fields: ['profile.lastName', 'profile.firstName', 'emails.0.address', 'profile.phone'],
  defaultSearchOptions: {
    limit: 6
  },
  permission: () => {
    //console.log(Meteor.userId());

    return true;
  }
});
