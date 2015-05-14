Meteor.methods({
  upvote: function(postId) {
    check(this.userId, String);
    check(postId, String);

    var affected = Posts.update({
      _id: postId,
      voters: {$ne: this.userId}
    }, {
      $addToSet: {voters: this.userId},
      $inc: {votes: 1}
    });



    var liked = {
      userId: this.userId,
      postId: postId,
      author: Meteor.user().username,
      submitted: new Date
    };
    console.log(liked);

    createLikeNotification(liked);

    if (! affected)
      throw new Meteor.Error('invalid', "You weren't able to upvote that post");
    // var postId = postId;


  },
  downvote: function(postId) {
    check(this.userId, String);
    check(postId, String);

    var affected = Posts.update({
      _id: postId,
      voters: {$ne: this.userId}
    }, {
      $addToSet: {voters: this.userId},
      $inc: {negatives: 1}
    });

    var disliked = {
      userId: this.userId,
      postId: postId,
      author: Meteor.user().username,
      submitted: new Date
    };
    console.log(disliked);

    createHateNotification(disliked);

    if (! affected)
      throw new Meteor.Error('invalid', "You weren't able to upvote that post");
  }

});
