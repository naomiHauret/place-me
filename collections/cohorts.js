//cohorts.js
Cohorts= new Mongo.Collection("cohorts"); //creating a collection called Cohorts
//Authorizations
Cohorts.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Cohorts.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});
