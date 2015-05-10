Template.comment.helpers({
  submittedText: function() {
    return this.submitted.toString();
  },
  momentCommentDate: function() {
    console.log("dateCreated",this.dateCreated);
    return moment(this.submitted).fromNow();
  }
});
