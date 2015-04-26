Template.header.events({
  'click .navbar-brand': function(e) {
    e.preventDefault();
    Session.set('tag',false);
    Router.go('/');
  },
  'click .search-tag':function(e) {
    e.preventDefault();
    var tag_word = $("#tag-word").val();
    console.log(tag_word);
    Session.set('tag',tag_word);
    Router.go('/');
  }
});
