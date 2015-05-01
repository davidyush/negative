Template.post.events({
  "click .delete": function(e) {
    Meteor.call('removeIt',this._id);
  }
});
