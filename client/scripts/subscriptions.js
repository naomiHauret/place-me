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

Template.trustFilter.onCreated(function(){
   let self = this;
   self.autorun(function() {
       self.subscribe('trustOrganizations');
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

Template.themesList.onCreated(function(){
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
      self.subscribe("hostOrganizations");
  });
});


Template.contentAddPlacements.onCreated(function(){
  let self = this;

  self.autorun(function() {
      self.subscribe('activeOffers');
      self.subscribe("themes");
      self.subscribe("thememetypes");
      self.subscribe('unplacedStudents');
      self.subscribe('tutors');
      self.subscribe('educators');
      self.subscribe('hostOrganizations');
      self.subscribe('cohorts');
      self.subscribe('programmes');

  });
});

Template.sidebar.onCreated(function(){
  let self = this;
    self.autorun(function() {
    self.subscribe('activeOffers');
    self.subscribe("thememetypes");
    self.subscribe('unplacedStudents');
    self.subscribe('organizations');
    self.subscribe('cohorts');
    self.subscribe('programmes');
  });
});
