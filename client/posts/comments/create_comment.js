Template.createComment.events({
  'submit .comment-form': function(e, template) {
    e.preventDefault();

    var time = new Date();
    time = time.toLocaleTimeString() + " " + time.toDateString();

    var body = e.target.body.value;
    var comment = {
      body: body,
      postId: template.data._id,
      dateCreated: time
    };

    Meteor.call('commentInsert', comment, function(error,result) {
      if(error)
        return throwError(error.reason);
    });
    e.target.body.value = "";
  }
});
