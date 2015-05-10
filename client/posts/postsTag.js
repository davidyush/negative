Template.postsTag.events({
  'click .load-tag': function(e) {
    e.preventDefault();
    var currentLimit = Session.get('limitedTag');
    Session.set('limitedTag',currentLimit + 1);
  }
});
