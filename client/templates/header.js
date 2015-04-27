Template.header.events({
  'click .search-tag':function(e) {
    e.preventDefault();
    var tag_word = $("#tag-word").val();

    if(tag_word.charAt(0) === "#") {
      tag_word = tag_word.split('');
      tag_word.shift();
      tag_word = tag_word.join('');
    }

    if(tag_word)
      Router.go('/search/' + tag_word);
    else
      Router.go('/');

  }
});
