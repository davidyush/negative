Template.register.events({
  'submit .form': function(e) {
    e.preventDefault();
    var regName = e.target.regName.value;
    var regEmail = e.target.regEmail.value;
    var regPass = e.target.regPass.value;
    Accounts.verifyEmail(regEmail,function(error){
      if(error)
        throwError(error.reason);
    });
    Accounts.createUser({
      username: regName,
      email: regEmail,
      password: regPass
    },function(error) {
      if(error)
        throwError(error.reason);
    });
  }
});

Template.login.events({
  'submit .form': function(e) {
    e.preventDefault();
    var logName = e.target.logName.value;
    var logPass = e.target.logPass.value;
    Meteor.loginWithPassword(logName,logPass);
  }
});

Template.dashboard.helpers({
  username: function() {
    return Meteor.user().username;
  }
});

Template.dashboard.events({
  "click .logout": function(event) {
    event.preventDefault();
    Meteor.logout();
  }
});

Template.changePass.events({
  'submit form': function(event) {
    event.preventDefault();
    var oldPass = event.target.oldPass.value;
    var newPass = event.target.newPass.value;
    var newPassAgain = event.target.newPassAgain.value;
    Accounts.changePassword(oldPass,newPass, function(error) {
      if(newPass !== newPassAgain)
        throwError(error.reason);
    });

    event.target.oldPass.value = "";
    event.target.newPass.value = "";
  }
});
