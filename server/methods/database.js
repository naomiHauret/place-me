Meteor.methods({
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  parseUploadUsers(data) {
    check( data, Array );
    console.log(data);
    for ( let i = 0; i < data.length; i++ ) {
      let item   = data[ i ],
          exists = Meteor.users.findOne( { id: item.id } );

      if ( !exists ) {
        Meteor.users.insert( item );
      } else {
          Meteor.users.update({id:item.id}, item);
      }
    }
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  parseUploadVisits(data){
    check( data, Array );

    for ( let i = 0; i < data.length; i++ ) {
      let item   = data[ i ],
          exists = Visits.findOne( { _id: item. _id } );

      if ( !exists ) {
        Visits.insert( item );
      } else {
        Visits.update({id:item.id}, item);
      }
    }
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  parseUploadEstablishments(data) {
    check( data, Array );

    for ( let i = 0; i < data.length; i++ ) {
      let item   = data[ i ],
          exists = Establishments.findOne( { _id: item. _id } );

      if ( !exists ) {
        Establishments.insert( item );
      } else {
        Establishments.update({id:item.id}, item);
      }
    }
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  parseUploadPlacements(data) {
    check( data, Array ); //check if our data is an array

    for ( let i = 0; i < data.length; i++ ) {
      let item   = data[ i ],
          exists = Placements.findOne( { _id: item. _id } ); //check if our object already exists in our collections

      if ( !exists ) {//if not
        Placements.insert( item ); //insert
      }
      else { //if so
        Placements.update({id:item.id}, item); //update it
      }
    }
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  parseUploadOffers(data) {
    check( data, Array ); //check if our data is an array

    for ( let i = 0; i < data.length; i++ ) {
      let item   = data[ i ],
          exists = Offers.findOne( { _id: item. _id } ); //check if our object already exists in our collections

      if ( !exists ) {//if not
        Offers.insert( item ); //insert
      }
      else { //if so
        Offers.update({id:item.id}, item); //update it
      }
    }
  }

});
