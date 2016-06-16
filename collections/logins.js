Logins= new Mongo.Collection("logins"); //creating a collection called Logins

//Authorizations
Logins.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Logins.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});
