Meteor.methods({
  'addTheme': function(themeData){
    return Themes.insert({
      themeName: themeData.themeName,
    });
  },

  'removeTheme': function(themeId){
    return Themes.remove({
      _id: themeId
    });
  },

  'updateTheme': function(themeData, themeId){
    return "oeoeoe";
  }
});
