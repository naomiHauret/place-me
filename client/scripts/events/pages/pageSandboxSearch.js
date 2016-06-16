Template.pageSandboxSearch.onCreated(function(){
  Template.instance().filterStudents = new ReactiveVar(false);
  Template.instance().filterCoordinators = new ReactiveVar(false);
  Template.instance().filterEducators = new ReactiveVar(false);

});

Template.pageSandboxSearch.events({
  'change select[name="cohort"]': function(e, template){
      let cohort= $(e.target).val();
      if(cohort === "student" ){
        UsersIndex.getComponentMethods().addProps('roles', cohort);
      }
      else{
        UsersIndex.getComponentMethods().addProps('cohortId',cohort);

      }
  },

  'change select[name="authorization"]': function(e, template){
    let isAuthorized= $(e.target).val();
    if(isAuthorized === "registered"){
      if(Template.instance().filterEducators.get() === true){
        UsersIndex.getComponentMethods().addProps('roles', "educator");

      }
      else if(Template.instance().filterTutors.get() === true){
        UsersIndex.getComponentMethods().addProps('roles', "tutor");
      }

      else if(Template.instance().filterCoordinators.get() === true){
        UsersIndex.getComponentMethods().addProps('roles', "coordinator");
      }

      else if(Template.instance().filterStudents.get() === true){
        UsersIndex.getComponentMethods().addProps('roles', "student");

      }

      else{
        UsersIndex.getComponentMethods().addProps('roles', isAuthorized);
      }
    }
    else{
      UsersIndex.getComponentMethods().addProps('isAuthorizedFilter', isAuthorized);
    }

  },
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'change select[name="programme"]': function(e, template){
      let programme= $(e.target).val();
      if(programme === "student" ){ //"All" selected
        UsersIndex.getComponentMethods().removeProps('programmeId');
        UsersIndex.getComponentMethods().addProps('roles', programme);
      }
      else{
        UsersIndex.getComponentMethods().addProps('programmeId',programme);
      }
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'change select[name="placementFilter"]': function(e, template){
      let isPlaced= $(e.target).val();
      if(isPlaced === "student" ){
        UsersIndex.getComponentMethods().removeProps('isPlacedFilter');
        UsersIndex.getComponentMethods().addProps('roles', isPlaced);
      }
      else{
          UsersIndex.getComponentMethods().addProps('isPlacedFilter',isPlaced);

      }
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'change select[name="trustEstablishment"]': function(e, template){
      let trustOrganizationId= $(e.target).val();
      if(trustOrganizationId === "coordinator" ){
        UsersIndex.getComponentMethods().removeProps('trustOrganizationId');
        UsersIndex.getComponentMethods().addProps('roles', trustOrganizationId);
      }
      else{
        UsersIndex.getComponentMethods().addProps('trustOrganizationId',trustOrganizationId);

      }
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'change select[name="hostEstablishment"]': function(e, template){
      let hostOrganizationId= $(e.target).val();
      if(hostOrganizationId === "educator" ){
        UsersIndex.getComponentMethods().removeProps('hostOrganizationId');
        UsersIndex.getComponentMethods().addProps('roles', hostOrganizationId);
      }
      else{
        UsersIndex.getComponentMethods().addProps('hostOrganizationId',hostOrganizationId);

      }
  },
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  'click .filter_status': function (e, template) {
    let status=  $(e.target).val();
    $('.filter_status').removeClass("selected");
    $(e.target).addClass("selected");

    UsersIndex.getComponentMethods().removeProps('cohortId');
    UsersIndex.getComponentMethods().removeProps('programmeId');
    UsersIndex.getComponentMethods().removeProps('isPlacedFilter');
    UsersIndex.getComponentMethods().removeProps('isAuthorizedFilter');
    UsersIndex.getComponentMethods().removeProps('trustOrganizationId');
    UsersIndex.getComponentMethods().removeProps('hostOrganizationId');
    $("select").prop('selectedIndex',0);

    UsersIndex.getComponentMethods().addProps('roles', $(e.target).val());

    if(status==="student"){
      template.filterStudents.set( true );
      template.filterCoordinators.set( false );
      template.filterEducators.set( false );

    }

    else if(status==="coordinator"){
      template.filterCoordinators.set( true );
      template.filterEducators.set( false );
      template.filterStudents.set( false );

    }

    else if(status === "tutor"){
      template.filterCoordinators.set( false );
      template.filterEducators.set( false );
      template.filterStudents.set( false );
    }

    else if(status === "educator"){
      template.filterEducators.set( true );
      template.filterCoordinators.set( false );
      template.filterStudents.set( false );

    }

    else{
      template.filterCoordinators.set( false );
      template.filterEducators.set( false );
      template.filterStudents.set( false );
    }
  }
});
