Visits = new Mongo.Collection("visits");

//Authorizations
Visits.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Visits.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});
