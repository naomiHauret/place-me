//our subscriptions
Template.inputEmail.onCreated(function(){
   let self = this;
   self.autorun(function() {
       self.subscribe('userInfo');
   });
});


Template.cohortList.onCreated(function(){
  let self = this;
  self.autorun(function() {
      self.subscribe('cohorts');
  });
});

Template.programmeList.onCreated(function(){
  let self = this;
  self.autorun(function() {
      self.subscribe('programmes');
  });
});

Template.hostList.onCreated(function(){
   let self = this;
   self.autorun(function() {
       self.subscribe('hostOrganizations');
   });
});

Template.trustList.onCreated(function(){
   let self = this;
   self.autorun(function() {
       self.subscribe('trustOrganizations');
   });
});



Template.cohortFilter.onCreated(function(){
  let self = this;
  self.autorun(function() {
      self.subscribe('cohorts');
  });
});

Template.programmeFilter.onCreated(function(){
  let self = this;
  self.autorun(function() {
      self.subscribe('programmes');
  });
});

Template.hostFilter.onCreated(function(){
   let self = this;
   self.autorun(function() {
       self.subscribe('hostOrganizations');
   });
});

Template.themeFilter.onCreated(function(){
   let self = this;
   self.autorun(function() {
       self.subscribe('themes');
   });
});

Template.trustFilter.onCreated(function(){
   let self = this;
   self.autorun(function() {
       self.subscribe('trustOrganizations');
   });
});

Template.organizationName.onCreated(function(){
  let self = this;
  self.autorun(function() {
      self.subscribe('organizationNames');
  });
});

Template.organizationInput.onCreated(function(){
  let self = this;
  self.autorun(function() {
      self.subscribe('organizations');
  });
});

Template.countryList.onCreated(function(){
   let self = this;
   self.autorun(function() {
       self.subscribe('countries');
   });
});

Template.themetypesCloud.onCreated(function(){
   let self = this;
   self.autorun(function() {
       self.subscribe('themetypes');
   });
});

Template.educatorsSelects.onCreated(function(){
   let self = this;
   self.autorun(function() {
      self.subscribe('hostOrganizations');
       self.subscribe('educators');
   });
});

Template.tutorsCloud.onCreated(function(){
   let self = this;
   self.autorun(function() {
       self.subscribe('tutors');
   });
});

Template.themetypeInputs.onCreated(function(){
   let self = this;
   self.autorun(function() {
       self.subscribe('themetypes');
   });
});

Template.themesList.onCreated(function(){
  let self = this;
  self.autorun(function() {
      self.subscribe('themes');
  });
});

Template.themeInputs.onCreated(function(){
  let self = this;
  self.autorun(function() {
      self.subscribe('themes');
  });
});

Template.breadcrumbProfile.onCreated(function(){
  let self = this;
  self.autorun(function() {
    self.subscribe('users');
    self.subscribe('organizations');
    self.subscribe('cohorts');
    self.subscribe('programmes');
  });
});

Template.contentProfile.onCreated(function(){
  let self = this;
  self.autorun(function() {
      self.subscribe('users');
      self.subscribe('organizations');
      self.subscribe('cohorts');
      self.subscribe('programmes');

  });
});

Template.contentIndicationsProfile.onCreated(function(){
  let self = this;
  self.autorun(function() {
    self.subscribe('users');
    self.subscribe('organizations');
    self.subscribe('cohorts');
    self.subscribe('programmes');
  });
});

Template.contentUsers.onCreated(function(){
  let self = this;
  self.autorun(function() {
      self.subscribe('users');
  });
});

Template.pageSandboxSearch.onCreated(function(){
  let self = this;
  self.autorun(function() {
      self.subscribe('users');
  });
});

Template.user.onCreated(function(){
  let self = this;
  self.autorun(function() {
      self.subscribe('users');
  });
});

Template.contentEstablishments.onCreated(function(){
  let self = this;
  self.autorun(function() {
      self.subscribe('organizations');
  });
});

Template.contentAddHost.onCreated(function(){
  let self = this;
  self.autorun(function() {
      self.subscribe('organizations');
  });
});

Template.contentAddTrust.onCreated(function(){
  let self = this;
  self.autorun(function() {
      self.subscribe('organizations');
  });
});

Template.breadcrumbEstablishmentDetails.onCreated(function(){
  let self = this;
  self.autorun(function() {
      self.subscribe('organizations');
  });
});

Template.contentIndicationsEstablishmentDetails.onCreated(function(){
  let self = this;
  self.autorun(function() {
      self.subscribe('organizations');
  });
});

Template.contentEstablishmentDetails.onCreated(function(){
  let self = this;
  self.autorun(function() {
      self.subscribe('organizations');
  });
});

Template.contentOffers.onCreated(function(){
  let self = this;
  self.autorun(function() {
      self.subscribe('activeOffers');
      self.subscribe('hostOrganizations');
      self.subscribe('themetypes');
      self.subscribe('themes');

  });
});

Template.breadcrumbOfferDetails.onCreated(function(){
  let self = this;
  self.autorun(function() {
      self.subscribe('offers');
  });
});

Template.contentIndicationsOfferDetails.onCreated(function(){
  let self = this;
  self.autorun(function() {
      self.subscribe('offers');
      self.subscribe('themetypes');
      self.subscribe('themes');
      self.subscribe("hostOrganizations");
  });
});



Template.contentPlacements.onCreated(function(){
  let self = this;

  self.autorun(function() {
      self.subscribe('offers');
      self.subscribe('placements');
      self.subscribe("themes");
      self.subscribe("themetypes");
      self.subscribe('placedStudents');
      self.subscribe('tutors');
      self.subscribe('educators');
      self.subscribe('hostOrganizations');
      self.subscribe('cohorts');
      self.subscribe('programmes');

  });
});

Template.breadcrumbPlacementDetails.onCreated(function(){
  let self = this;
  self.autorun(function() {
      self.subscribe('placements');
  });
});

Template.contentIndicationsPlacementDetails.onCreated(function(){
  let self = this;
  self.autorun(function() {
      self.subscribe('placements');
      self.subscribe('themetypes');
      self.subscribe('themes');
      self.subscribe("hostOrganizations");
  });
});

Template.contentAddPlacements.onCreated(function(){
  let self = this;

  self.autorun(function() {
      self.subscribe('activeOffers');
      self.subscribe("themes");
      self.subscribe("themetypes");
      self.subscribe('unplacedStudents');
      self.subscribe('tutors');
      self.subscribe('educators');
      self.subscribe('hostOrganizations');
      self.subscribe('cohorts');
      self.subscribe('programmes');

  });
});

Template.contentPlacementDetails.onCreated(function(){
  let self = this;
    self.autorun(function() {
    self.subscribe('offers');
    self.subscribe('placements');
    self.subscribe("themes");
    self.subscribe("themetypes");
    self.subscribe('students');
    self.subscribe('tutors');
    self.subscribe('educators');
    self.subscribe('hostOrganizations');
    self.subscribe('cohorts');
    self.subscribe('programmes');
  });
});


Template.contentVisits.onCreated(function(){
  let self = this;

  self.autorun(function() {
    self.subscribe('visits');
    self.subscribe('students');
    self.subscribe('themes');
    self.subscribe('hostOrganizations');
    self.subscribe('placements');
    self.subscribe('offers');
    self.subscribe('tutors')
  });
});

Template.breadcrumbVisitDetails.onCreated(function(){
  let self = this;
  self.autorun(function() {
    self.subscribe('visits');
    self.subscribe('placements');
    self.subscribe('tutors')
  });
});

Template.contentIndicationsVisitsDetails.onCreated(function(){
  let self = this;
  self.autorun(function() {
      self.subscribe('visits');
      self.subscribe('placements');
      self.subscribe('tutors');
  });
});

Template.contentAddVisits.onCreated(function(){
  let self = this;

  self.autorun(function() {
    self.subscribe('visits');
    self.subscribe('placements');
    self.subscribe('tutors');
  });
});

Template.contentVisitDetails.onCreated(function(){
  let self = this;
    self.autorun(function() {
    self.subscribe('visits');
    self.subscribe('placements');
    self.subscribe('tutors');
  });
});



Template.sidebar.onCreated(function(){
  let self = this;
    self.autorun(function() {
    self.subscribe('activeOffers');
    self.subscribe("themetypes");
    self.subscribe("themes");
    self.subscribe('unplacedStudents');
    self.subscribe('organizations');
    self.subscribe('cohorts');
    self.subscribe('programmes');
  });
});
