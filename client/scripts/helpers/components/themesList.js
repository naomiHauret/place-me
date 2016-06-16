Template.themesList.helpers({
  theme(){
    return Themes.find({},{sort: {themeName: 1}});
  }
});
