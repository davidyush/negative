Template.postsList.helpers({
  posts: function() {
    if(Session.get('tag')) {
      return Posts.find({tags:Session.get('tag')},{sort:{dateCreated:-1}});
    }else {
      return Posts.find({},{sort:{dateCreated:-1}});
    }
  }
});
