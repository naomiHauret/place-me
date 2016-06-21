Template.themeFilter.helpers({
  theme(){
    return Themes.find({},{sort: {themeName: 1}});
  }
});
