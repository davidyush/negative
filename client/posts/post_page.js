Template.postPage.helpers({
  comments: function() {
    return Comments.find({postId:this._id});
  },
  ownPost: function() {
    return this.userId == Meteor.userId();
  }
});

Template.postPage.events({
  "click .delete": function(e) {
    e.preventDefault();
    var postId = this._id;
    bootbox.confirm("Delete your post?", function(result) {
      if(result) {
        Meteor.call('removeIt',postId);
        Router.go('home');
      }
    });
  }
});
