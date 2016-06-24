//bootstrap.js
//Fills the database when server start
Meteor.startup(function(){
  seed_constants();
  seed_testAccounts();
  seed_ghostAccounts();
  seed_random();
});
