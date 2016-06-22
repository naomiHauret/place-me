Meteor.methods({
  /*
  //How to send e-mail:

  'sendEmail': function (to, subject, text) {
    this.unblock(); // Let other method calls from the same client start running without waiting for the email sending to complete.

    if (!Meteor.user()) // don’t allow sending email unless the user is logged in

      throw new Meteor.Error(403, "not logged in");

    // and here is where you can throttle the number of emails this user
    // is allowed to send per day

    Email.send({
      to: to,
      from: Meteor.user().emails[0].address,
      subject: subject,
      text: text
    });
  },
  */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'sendStudentPlacementNotification': function(placementId){ //placement notification email for student
    this.unblock();
    if (!Meteor.user()){ // don’t allow sending email unless the user is logged in
      throw new Meteor.Error(403, "not logged in");
    }
    else{
      let placement= Placements.findOne({_id: placementId}); //JSON of our placement
      let studentId= placement.studentId; // id of the student concerned by the placement
      let studentName= Meteor.users.findOne({_id: studentId}).firstName+" "+Meteor.users.findOne({_id: studentId}).lastName; //student name
      let placementDate="from "+placement.startDate+"  to "+placement.endDate; //dates of the placement
      let placementSite;
      let placementTheme;
      let placementThemetypes;

      if(placement.isFromOffer === true ){ //Got to fetch all from Offers collection

        let offer= Offers.findOne({_id: placement.offerId }); //JSON of our offer
        placementSite= Establishments.findOne({_id: offer.hostOrganizationId}).name; //Placement Host establishment/organization name
        placementTheme= Themes.findOne({_id: offer.themeId}).themeName; //Placement theme

        let placementThemetypesArray= offer.themeTypesId;  //array of id of placement themetypes
        placementThemetypesArray.map(function(themetypeId){ //each item from this array
          placementThemetypes+=Themetypes.findOne({_id: themetypeId}).name+" ;"; // get placement themetypes name
        });
      }
      else{
        placementSite= Establishments.findOne({_id: placement.hostOrganizationId}).name; //Placement Host establishment/organization name
        placementTheme= Themes.findOne({_id: placement.themeId}).themeName; //Placement theme

        let placementThemetypesArray= placement.themeTypesId;  //array of id of placement themetypes
        placementThemetypesArray.map(function(themetypeId){ //each item from this array
          placementThemetypes+=Themetypes.findOne({_id: themetypeId}).name+" ;"; // get placement themetypes name
        });
      }

      let to= Meteor.users.findOne({_id: studentId}).emails[0].address; //set destinary address
      let subject= "New placement: "+placementTheme+", "+placementDate+" at "+placementSite; //set email subject

      //set email text
      let text="<p>Hello "+studentName+",</p><br>";
      text+="<p>You've been assigned to a new "+placementTheme+" placement at "+placementSite+" "+placementDate+".</p>";
      text+="<p>You will get further information about your placement on Place Me (place-me.org).</p>";
      text+="<p>Be sure to bring your placement folder and all assessment documentation with you on your placement commencement. The assessment forms should be completed by your educators in the final week of the placement. You will have to return this to the University at the end of your placement.</p>"
      text+="<p>Also, don't forget to get in touch with your educators before your placement starts! Their phone numbers and e-mail addresses are available on Place Me.</p><br>";
      text+="<p><i>If you have any queries please do not hesitate to contact Liz Cade at Wrexham Plas Coch Campus on 01978 293549 or email l.cade@glyndwr.ac.uk</i></p><br>";
      text+="<p>Have a nice day!</p>";

      //Send email
      Email.send({
        to: to,
        from: "do-not-reply@place-me.org",
        subject: subject,
        text: text
      });
    }
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'sendTutorsPlacementNotification': function(placementId){ //placement notification email for tutors
    this.unblock();
    if (!Meteor.user()){ // don’t allow sending email unless the user is logged in
      throw new Meteor.Error(403, "not logged in");
    }
    else{
      let placement= Placements.findOne({_id: placementId}); //JSON of our placement
      let studentId= placement.studentId; // id of the student concerned by the placement
      let studentName= Meteor.users.findOne({_id: studentId}).firstName+" "+Meteor.users.findOne({_id: studentId}).lastName; //student name
      let placementDate="from "+placement.startDate+"  to "+placement.endDate; //dates of the placement
      let placementSite;
      let placementTheme;
      let placementThemetypes;

      if(placement.isFromOffer === true ){ //Got to fetch all from Offers collection

        let offer= Offers.findOne({_id: placement.offerId }); //JSON of our offer
        placementSite= Establishments.findOne({_id: offer.hostOrganizationId}).name; //Placement Host establishment/organization name
        placementTheme= Themes.findOne({_id: offer.themeId}).themeName; //Placement theme

        let placementThemetypesArray= offer.themeTypesId;  //array of id of placement themetypes
        placementThemetypesArray.map(function(themetypeId){ //each item from this array
          placementThemetypes+=Themetypes.findOne({_id: themetypeId}).name+" ;"; // get placement themetypes name
        });
      }
      else{
        placementSite= Establishments.findOne({_id: placement.hostOrganizationId}).name; //Placement Host establishment/organization name
        placementTheme= Themes.findOne({_id: placement.themeId}).themeName; //Placement theme

        let placementThemetypesArray= placement.themeTypesId;  //array of id of placement themetypes
        placementThemetypesArray.map(function(themetypeId){ //each item from this array
          placementThemetypes+=Themetypes.findOne({_id: themetypeId}).name+" ;"; // get placement themetypes name
        });
      }

      let tutorsArray= placement.tutorsIds; //get all tutors (id)
      tutorsArray.map(function(tutorId){ //each tutor
        let tutorName= Meteor.users.findOne({_id: tutorId}).firstName+" "+Meteor.users.findOne({_id: tutorId}).lastName; //get tutor's name
        let to= Meteor.users.findOne({_id: tutorId}).emails[0].address; //set destinary address
        let subject= "New placement: "+studentName+", "+placementTheme+" placement, "+placementDate+" at "+placementSite; //set email subject

        //set email text
        let text= "<p><b>Hello "+tutorName+",</b></p><br>";
        text+="<p>You've been assigned the supervision of "+studentName+"'s "+placementTheme+" placement at "+placementSite+" "+placementDate+".</p>";
        text+="<p>To set up visits and  get further information about this placement, please go on Place Me (place-me.org).</p>";

        //send email
        Email.send({
          to: to,
          from: "do-not-reply@place-me.org",
          subject: subject,
          text: text
        });
      });
    }
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'sendEducatorsPlacementNotification': function(placementId){ //placement notification email for educators
    this.unblock();
    if (!Meteor.user()){ // don’t allow sending email unless the user is logged in
      throw new Meteor.Error(403, "not logged in");
    }
    else{
      let placement= Placements.findOne({_id: placementId}); //JSON of our placement
      let studentId= placement.studentId; // id of the student concerned by the placement
      let studentName= Meteor.users.findOne({_id: studentId}).firstName+" "+Meteor.users.findOne({_id: studentId}).lastName; //student name
      let placementDate="from "+placement.startDate+"  to "+placement.endDate; //dates of the placement
      let placementSite;
      let placementTheme;
      let placementThemetypes;

      if(placement.isFromOffer === true ){ //Got to fetch all from Offers collection

        let offer= Offers.findOne({_id: placement.offerId }); //JSON of our offer
        placementSite= Establishments.findOne({_id: offer.hostOrganizationId}).name; //Placement Host establishment/organization name
        placementTheme= Themes.findOne({_id: offer.themeId}).themeName; //Placement theme

        let placementThemetypesArray= offer.themeTypesId;  //array of id of placement themetypes
        placementThemetypesArray.map(function(themetypeId){ //each item from this array
          placementThemetypes+=Themetypes.findOne({_id: themetypeId}).name+" ;"; // get placement themetypes name
        });
      }
      else{
        placementSite= Establishments.findOne({_id: placement.hostOrganizationId}).name; //Placement Host establishment/organization name
        placementTheme= Themes.findOne({_id: placement.themeId}).themeName; //Placement theme

        let placementThemetypesArray= placement.themeTypesId;  //array of id of placement themetypes
        placementThemetypesArray.map(function(themetypeId){ //each item from this array
          placementThemetypes+=Themetypes.findOne({_id: themetypeId}).name+" ;"; // get placement themetypes name
        });
      }

      //array of educators (id)
      let educatorsArray= placement.onSiteEducatorIds;  //create educators array and initialize it with on-site educators array
      educatorsArray.push( placement.offSiteEducatorId); //get offsite educator and push it to educators array

      educatorsArray.map(function(educatorId){ //each educator from the array
        let educatorName= Meteor.users.findOne({_id: educatorId}).firstName+" "+Meteor.users.findOne({_id: educatorId}).lastName; //get educator'name
        let to= Meteor.users.findOne({_id: educatorId}).emails[0].address; //set destinary address
        let subject= "New placement: "+studentName+", "+placementTheme+"placement, "+placementDate+" at "+placementSite; //set email subject

        //Set email text
        let text= "<b>Dear "+educatorName+",</b><br>"
        text+="<p>Many thanks for offering such a valuable practice placement experience for"+studentName+". Students are expected to provide you with a copy of their evaluation feedback before the end of placement. If you have not received this and would like a copy, please do not hesitate to contact the University. </p>"
        text+="<p>The placement outcome and supporting documentation will be moderated by the Practice Education Team and ratified at the next Assessment Board. If you would like any feedback on this outcome please contact the University.</p>";
        text+="<p>We would very much appreciate it if you could complete the Practice Educator's Evaluation Form enclosed and return by post or email to Liz Cade at Wrexham Plas Coch Campus (or email l.cade@glyndwr.ac.uk). Your constructive feedback helps to monitor placement quality and inform any developments.</p>";
        text+="<p>In the meantime thanks once again for supporting the student and the programme by offering this placement opportunity. We look forward to working with you again very soon.</p>";
        text+="<br><p><i>Yours sincerely</i></p>";

        //Send email
        Email.send({
          to: to,
          from: "do-not-reply@place-me.org",
          subject: subject,
          text: text
        });
      });
    }
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'sendVerificationLink': function() { //password reset link
    let userId = Meteor.userId();
    if ( userId ) {
      return Accounts.sendVerificationEmail( userId );
    }
  }
});
