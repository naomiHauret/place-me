Template.addressInput.helpers({
  isStudent(){
    return Meteor.user().emails[0].address === "registerStudent@register.com"
  }
})
