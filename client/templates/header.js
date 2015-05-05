var mobileNavToggle = function(action) {
  if(Session.get('isMobile')) {
    $("#nav-collapse").collapse(action);
  }
}
Template.header.events({
  'click .search-tag':function(e) {
    e.preventDefault();
    var tag_word = $("#tag-word").val();

    if(tag_word.charAt(0) === "#") {
      tag_word = tag_word.split('');
      tag_word.shift();
      tag_word = tag_word.join('');
    }

    mobileNavToggle('toggle');

    if(tag_word)
      Router.go('/search/' + tag_word);
    else
      Router.go('/');

  },
  'click .sub-create': function() {
    mobileNavToggle('toggle');
  },
  'click .navbar-brand': function() {
    mobileNavToggle('hide');
  }
});
// $("#nav-collapse").collapse('show');
