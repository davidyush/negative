Session.set('symbols',0);

Template.createText.events({
  'submit .form-create-text': function(e) {
    e.preventDefault();

    var tags = e.target.tags.value;
    tags = tags.split("#");
    tags.shift();
    for(var i = 0; i < tags.length;i++) {
      tags[i] = tags[i].trim();
    }

    var time = new Date();
    time = time.toLocaleTimeString() + " " + time.toDateString();

    // var text = e.target.text.value;
    // if(text.length > 50) {
    //   throwError("More than 50 symbols!");
    // }

    var post = {
      title:e.target.title.value,
      text: e.target.text.value,
      tags:tags,
      dateCreated: time
    };

    Meteor.call('textInsert', post, function(error,result) {
      if(error)
        return throwError(error.reason);

      Router.go('postPage',{_id:result._id});
    });
  }
});
