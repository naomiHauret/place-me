Themetypes = new Mongo.Collection("themetypes");

//Authorizations
Themetypes.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Themetypes.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});
