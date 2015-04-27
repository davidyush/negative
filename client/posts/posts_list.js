Template.postsList.helpers({
  posts: function() {
    return Posts.find({},{sort:{dateCreated:-1}});
  }
});
