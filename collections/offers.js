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
OffersIndex = new EasySearch.Index({ //new index called OffersIndex. Accessible from anywhere within the project
  collection: Offers, //collection to fetch document from
  fields: ['_id', 'createdAt'], //fields to seach upon
  defaultSearchOptions: {
    sortBy: 'newest', //default sort option: newest documents first
    limit: 6 // maximum number of document to be displayed (increasable from the user interface)
  },
  engine: new EasySearch.Minimongo({ //Minimongo engine is used here

    sort: function (searchObject, options) { //results sorter

       sortBy = options.search.props.sortBy; // return a mongo sort specifier

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

      //filter:  theme provided or not
      if(options.search.props.themeId){
        selector.themeId= options.search.props.themeId;
      }

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
