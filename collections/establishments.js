//establishments.js
Establishments= new Mongo.Collection("establishments"); //creating a collection called Establishments

//Authorizations
Establishments.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Establishments.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

//search index for easy:search 
EstablishmentsIndex = new EasySearch.Index({
  engine:  new EasySearch.Minimongo({ //use minimongo (client-side collection ) to search
      sort: () => { name: 1 }, // sort by  name
      selector: function (searchObject, options, aggregation) {
        let selector = this.defaultConfiguration().selector(searchObject, options, aggregation);

        // filter by type
        if (options.search.props.type) {
          selector.type = options.search.props.type;
        }

        if (options.search.props._id) {
          selector._id = options.search.props._id;
        }

        if (options.search.props.trustOrganizationId) {
          selector.trustOrganizationId = options.search.props.trustOrganizationId;
        }


        return selector;
      }
    }),
  collection: Establishments,
  fields: ['name', 'address.formattedAddress', 'phone'],
  defaultSearchOptions: {
    limit: 6
  },
  permission: () => {
    //console.log(Meteor.userId());

    return true;
  }
});
