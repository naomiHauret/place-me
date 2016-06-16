Template.pageSandboxSearch.helpers({
      buttonAttributes: function(){
        return {'type': 'button', 'content': "Load more users..."}
      },
      inputAttributes: function () {
        return { 'class': '_input-searchbar', 'placeholder': 'Start searching...' };
      },
      users: function () {
        return Meteor.users.find({roles :"registered"});
      },
      email(){
        return this.emails[0].address;
      },
      status(){
        return this.roles[0];
      },
      authorized(){
        return this.isAuthorized === true;
      },
      index: function () {
        return UsersIndex;
      },
      resultsCount: function () {
        return UsersIndex.getComponentDict().get('count');
      },
      showMore: function () {
        return false;
      },
      filterEducators(){
        return Template.instance().filterEducators.get();
      },
      filterStudents(){
        return Template.instance().filterStudents.get();
      },
      filterCoordinators(){
        return Template.instance().filterCoordinators.get();
      },
      renderTmpl: () => Template.renderTemplate
});
