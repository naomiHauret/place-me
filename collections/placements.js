Placements= new Mongo.Collection("placements");

Placements.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Placements.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

PlacementsIndex = new EasySearch.Index({ //new index called PlacementsIndex. Accessible from anywhere within the project
  collection: Placements, //collection to fetch document from
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
          createdAt: -1 //most recent placements first
        };
      }
      else if ('oldest' === sortBy) {
        return {
          createdAt: 1 //oldest placements first
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
      if(options.search.props.isFinishedFilter){
        selector.isFinishedFilter= options.search.props.isFinishedFilter;
      }

      //filter:  theme provided or not
      if(options.search.props.themeId){
        selector.themeId= options.search.props.themeId;
      }

      //filter: studentId
      if(options.search.props.studentId){
        selector.studentId= options.search.props.studentId;
      }

      //filter:  cohort
      if(options.search.props.cohortFilter){
        selector.cohortFilter= options.search.props.cohortFilter;
      }

      //filter:  programme
      if(options.search.props.programmeFilter){
        selector.programmeFilter= options.search.props.programmeFilter;
      }


      //filter: host
      if (options.search.props.hostOrganizationFilter) {
        selector.hostOrganizationFilter = options.search.props.hostOrganizationFilter;
      }

      return selector;
    }

  }),
  permission: () => {
    //console.log(Meteor.userId());

    return true;
  }
});
