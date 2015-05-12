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
  result: function() {
    var res = (this.votes || 0) - (this.negatives || 0);

    return res;
  },
  momentDate: function() {
    return moment(this.submitted).fromNow();
  },
  commentsCount: function() {
    return this.commentsCount || 0;
  }
});

// var Example = (function() {
//   "use strict";
//   var elem,
//     hideHandler,
//     that = {};
//
//   that.init = function(options) {
//     elem = $(options.selector);
//   };
//
//   that.show = function(text) {
//     clearTimeout(hideHandler);
//
//     elem.find("span").html(text);
//     elem.delay(200).fadeIn().delay(4000).fadeOut();
//   };
//
//   return that;
// }());

Template.post.events({
  'click .upvote': function(e) {
    e.preventDefault();
    Meteor.call('upvote',this._id);
  },
  'click .downvote': function(e) {
    e.preventDefault();
    Meteor.call('downvote',this._id);
  }
});
