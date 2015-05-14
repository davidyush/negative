Notifications = new Mongo.Collection('notifications');

Notifications.allow({
  update: function(userId, doc, fieldNames) {
    return ownsDocument(userId, doc) &&
      fieldNames.length === 1 && fieldNames[0] === 'read';
  }
});

createCommentNotification = function(comment) {
  var post = Posts.findOne(comment.postId);
  if (comment.userId !== post.userId) {
    Notifications.insert({
      userId : post.userId,
      postId : post._id,
      title: post.title,
      commentId: comment._id,
      commenterName: comment.author,
      submitted: comment.submitted,
      read:false
    });
  }
}

createLikeNotification = function(upvote) {
  var post = Posts.findOne(upvote.postId);
  if(upvote.userId !== post.userId) {
    Notifications.insert({
      userId: post.userId,
      postId: post._id,
      title: post.title,
      submitted: upvote.submitted,
      voterName: upvote.author,
      read: false
    });
  }
}

createHateNotification = function(unvote) {
  var post = Posts.findOne(unvote.postId);
  if(unvote.userId !== post.userId) {
    Notifications.insert({
      userId: post.userId,
      postId: post._id,
      title: post.title,
      submitted: unvote.submitted,
      unvoterName: unvote.author,
      read: false
    });
  }
}
