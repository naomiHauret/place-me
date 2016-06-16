//variables.js

//MAIL_URL variable settings so we can send emails with our app (thanks to Mailgun)
Meteor.startup(function () {
  process.env.MAIL_URL = 'smtp://postmaster@sandbox2d855d4a7e79458ab70842e505904b89.mailgun.org:2317ae3750a4785b7e3806691ed77966@smtp.mailgun.org:587';
});
