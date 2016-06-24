Visits = new Mongo.Collection("visits");

//Authorizations
Visits.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Visits.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

VisitsIndex = new EasySearch.Index({ //new index called PlacementsIndex. Accessible from anywhere within the project
  collection: Visits, //collection to fetch document from
  fields: ['_id', 'createdAt'], //fields to seach upon
  defaultSearchOptions: {
    //sortBy: 'newest', //default sort option: newest documents first
    limit: 6 // maximum number of document to be displayed (increasable from the user interface)
  },
  engine: new EasySearch.Minimongo({ //Minimongo engine is used here
    /*sort: function (searchObject, options) { //results sorter

       sortBy = options.search.props.sortBy; // return a mongo sort specifier

      if ('newest' === sortBy) {
        return {
          createdAt: -1 //most recent visit first
        };
      }
      else if ('oldest' === sortBy) {
        return {
          createdAt: 1 //oldest visit first
        };
      }
      else {
        throw new Meteor.Error('Invalid sort by prop passed');
      }
    },*/

    //filter by
    selector: function (searchObject, options, aggregation) {
      let selector = this.defaultConfiguration().selector(searchObject, options, aggregation);

      //filter:  placement finished or not
      if(options.search.props.isPassedFilter){
        selector.isPassedFilter= options.search.props.isPassedFilter;
      }

      return selector;
    }

  }),
  permission: () => {
    //console.log(Meteor.userId());

    return true;
  }
});
