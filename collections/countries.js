//Authorizations
SuxezCountries.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

SuxezCountries.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});
