Template.createLink.events({
  'submit .form-create-link': function(e) {
    e.preventDefault();

    var tags = e.target.tags.value;
    tags = tags.split("#");
    tags.shift();
    for(var i = 0; i < tags.length;i++) {
      tags[i] = tags[i].trim();
    }

    var time = new Date();
    time = time.toLocaleTimeString() + " " + time.toDateString();

    console.log(tags);
    var post = {
      title:e.target.title.value,
      link: e.target.link.value,
      nameLink: e.target.nameLink.value,
      tags:tags,
      dateCreated: time
    };

    post._id = Posts.insert(post);

    Router.go('postPage',post);
  }
});
