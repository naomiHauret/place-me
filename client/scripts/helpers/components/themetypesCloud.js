Template.themetypesCloud.helpers({
  themetype: function(){
    return Themetypes.find({}, { sort: { themetypeName: 1 } });
  }
});
