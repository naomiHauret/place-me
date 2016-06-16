//programmes.js
Programmes= new Mongo.Collection("programmes"); //creating a collection called Establishments

//Authorizations
Programmes.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Programmes.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});
