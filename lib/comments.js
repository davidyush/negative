Comments = new Mongo.Collection('comments');

Meteor.methods({
  commentInsert: function(commentAttributes) {
    check(this.userId, String);
    check(commentAttributes, {
      postId: String,
      body: String
    });


    var errors = validateComment(commentAttributes);
    _.values(errors).forEach(function(e) {
      throwDangerError(e);
    });

    var user = Meteor.user();
    var post = Posts.findOne(commentAttributes.postId);
    console.log(post._id);

    comment = _.extend(commentAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

    Posts.update(comment.postId,{$inc:{commentsCount: 1}});

    var commentId = Comments.insert(comment);

    createCommentNotification(comment);

    return {
      _id: commentId
    }
  }
});
