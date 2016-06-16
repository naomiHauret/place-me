Template.registerHelper("isPageLogin", function() {
  return Router.current().route.getName()==="login";
});
