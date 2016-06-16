Template.countryList.helpers({
  countries: function(){
    return SuxezCountries.find({}, { sort: { "cn_short_en": 1 } });
  }
});
