Themes = new Mongo.Collection("themes");

//Authorizations
Themes.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Themes.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});
