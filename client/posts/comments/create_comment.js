Template.createComment.events({
  'submit .comment-form': function(e, template) {
    e.preventDefault();

    var body = e.target.body.value;
    var comment = {
      body: body,
      postId: template.data._id
    };

    Meteor.call('commentInsert', comment, function(error,result) {
      if(error)
        return throwError(error.reason);
    });
    e.target.body.value = "";
  }
});
