Template.post.helpers({
  ownPost: function() {
    return this.userId == Meteor.userId();
  },
  upvotedClass: function() {
    var userId = Meteor.userId();
    if( userId && !_.include(this.voters,userId))
      return '';
    else
      return 'btn-info disabled';
  },
  downvotedClass: function() {
    var userId = Meteor.userId();
    if( userId && !_.include(this.voters,userId))
      return '';
    else
      return 'btn-danger disabled';
  },
  // result: function() {
  //   var res = (this.votes || 0) - (this.negatives || 0);
  //
  //   return res;
  // },
  votesCount: function() {
    return this.votes || 0;
  },
  negativesCount: function() {
    return this.negatives || 0;
  },
  momentDate: function() {
    return moment(this.submitted).fromNow();
  },
  commentsCount: function() {
    return this.commentsCount || 0;
  }
});


Template.post.events({
  'click .upvote': function(e) {
    e.preventDefault();
    console.log("this._id in vote client",this._id);
    Meteor.call('upvote',this._id);
  },
  'click .downvote': function(e) {
    e.preventDefault();
    Meteor.call('downvote',this._id);
  }
});
