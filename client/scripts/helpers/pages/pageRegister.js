Template.pageRegister.helpers({
  student: function() {
    return Session.get('student');  //return the session variable called student
  },
  educator: function() {
     return Session.get('educator'); //return the session variable called educator
  },
  coordinator: function(){
    return Session.get('coordinator'); //return the session variable called coordinator
  },
  tutor: function(){
    return Session.get('tutor'); //return the session variable called tutor
  }
});

Template.registerForm.helpers({
  loading() {
    return Template.instance().loading.get();
  },
  processing() {
    return Template.instance().processing.get();
  },
  step2(){
    return Template.instance().step2.get();
  }
});


Template.registerFormStep2.helpers({
  student() {
    return Session.get('student');  //return the session variable called student
  },
  educator() {
     return Session.get('educator'); //return the session variable called educator
  },
  coordinator(){
    return Session.get('coordinator'); //return the session variable called coordinator
  },
  tutor(){
    return Session.get('tutor'); //return the session variable called tutor
  }
});
