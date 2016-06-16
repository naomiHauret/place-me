//resetToken.js
Meteor.startup(function () {
      Accounts.emailTemplates.resetPassword.text = function(user, url){
          var token = url.substring(url.lastIndexOf('/')+1, url.length); //password token sent by mail
          var newUrl = Meteor.absoluteUrl('reset-password/'+token); //link the user has to click to reset his/her password
          var str = 'Hello,\n'; //mail text
              str+= 'To reset your password for Place.me, please click the link below: \n';
              str+= newUrl;
          return str;
      }
  });
