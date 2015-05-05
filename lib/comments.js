Comments = new Mongo.Collection('comments');

Meteor.methods({
  commentInsert: function(commentAttributes) {
    check(this.userId, String);
    check(commentAttributes, {
      postId: String,
      body: String,
      dateCreated: String
    });


    var errors = validateComment(commentAttributes);
    throwDangerError(errors.body);

    var user = Meteor.user();
    var post = Posts.findOne(commentAttributes.postId);
    console.log(post._id);
    // if (!post)
    //   throw new Meteor.Error('invalid-comment', 'You must comment on a post');

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
