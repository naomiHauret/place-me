Placements= new Mongo.Collection("placements");

Placements.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Placements.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});
