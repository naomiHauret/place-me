Template.contentDatabase.onCreated(function() {
  Template.instance().uploading = new ReactiveVar( false );
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Template.contentDatabase.events({
  'change input[name="updateUsers"]' ( event, template ) {
    template.uploading.set( true );

    Papa.parse( event.target.files[0], {
      header: true,
      complete( results, file ) {
        Meteor.call( 'parseUploadUsers', results.data, ( error, response ) => {
          if ( error ) {
            Bert.alert( error.reason, "danger" );
          } else {
            template.uploading.set( false );
            Bert.alert( 'Upload complete!', 'success');
          }
        });
      }
    });
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'change input[name="updateEstablishments"]' ( event, template ) {
    template.uploading.set( true );

    Papa.parse( event.target.files[0], {
      header: true,
      complete( results, file ) {
        Meteor.call( 'parseUploadEstablishments', results.data, ( error, response ) => {
          if ( error ) {
            Bert.alert( error.reason, "danger" );
          } else {
            template.uploading.set( false );
            Bert.alert( 'Upload complete!', 'success' );
          }
        });
      }
    });
  },

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'change input[name="updateVisits"]' ( event, template ) {
    template.uploading.set( true );

    Papa.parse( event.target.files[0], {
      header: true,
      complete( results, file ) {
        Meteor.call( 'parseUploadVisits', results.data, ( error, response ) => {
          if ( error ) {
            Bert.alert( error.reason, "danger" );
          } else {
            template.uploading.set( false );
            Bert.alert( 'Upload complete!', 'success', );
          }
        });
      }
    });
  },

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'change input[name="updatePlacements"]' ( event, template ) {
    template.uploading.set( true );

    Papa.parse( event.target.files[0], {
      header: true,
      complete( results, file ) {
        Meteor.call( 'parseUploadPlacements', results.data, ( error, response ) => {
          if ( error ) {
            Bert.alert( error.reason, "danger" );
          } else {
            template.uploading.set( false );
            Bert.alert( 'Upload complete!', 'success');
          }
        });
      }
    });
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'change input[name="updateOffers"]' ( event, template ) {
    template.uploading.set( true );

    Papa.parse( event.target.files[0], {
      header: true,
      complete( results, file ) {
        Meteor.call( 'parseUploadOffers', results.data, ( error, response ) => {
          if ( error ) {
            Bert.alert( error.reason, "danger" );
          } else {
            template.uploading.set( false );
            Bert.alert( 'Upload complete!', 'success');
          }
        });
      }
    });
  }
});
