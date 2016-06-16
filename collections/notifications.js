Notifications= new Mongo.Collection("notifications"); //creating a collection called Notifications

//Authorizations
Notifications.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Notifications.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});
