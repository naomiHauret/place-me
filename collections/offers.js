Offers= new Mongo.Collection("offers"); //creating a collection called Offers

//Authorizations
Offers.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Offers.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});


//Easy search


OffersIndex = new EasySearch.Index({
  collection: Offers,
  fields: ['_id', 'createdAt'],
  defaultSearchOptions: {
    sortBy: 'newest',
    limit: 6
  },
  engine: new EasySearch.Minimongo({
    sort: function (searchObject, options) {
      const sortBy = options.search.props.sortBy;

      // return a mongo sort specifier
      if ('newest' === sortBy) {
        return {
          createdAt: -1 //most recent offers first
        };
      }
      else if ('oldest' === sortBy) {
        return {
          createdAt: 1 //oldest offers first
        };
      }
      else {
        throw new Meteor.Error('Invalid sort by prop passed');
      }
    },

    //filter by
    selector: function (searchObject, options, aggregation) {
      let selector = this.defaultConfiguration().selector(searchObject, options, aggregation);

      //filter:  car provided or not
      if(options.search.props.carFilter){
        selector.carFilter= options.search.props.carFilter;
      }

      //filter:  accommodation provided or not
      if(options.search.props.accommodationFilter){
        selector.accommodationFilter= options.search.props.accommodationFilter;
      }

      //filter: host
      if (options.search.props.hostOrganizationId) {
        selector.hostOrganizationId = options.search.props.hostOrganizationId;
      }

      return selector;
    }

  }),
  permission: () => {
    //console.log(Meteor.userId());

    return true;
  }
});
