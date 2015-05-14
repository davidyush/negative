Template.comment.helpers({
  submittedText: function() {
    return this.submitted.toString();
  },
  momentCommentDate: function() {
    return moment(this.submitted).fromNow();
  }
});
