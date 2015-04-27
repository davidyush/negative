Template.createYoutube.events({
  "submit .form-create-youtube": function(e) {
    e.preventDefault();

    var tags = e.target.tags.value;
    tags = tags.split("#");
    tags.shift();
    for(var i = 0; i < tags.length;i++) {
      tags[i] = tags[i].trim();
    }

    var time = new Date();
    time = time.toLocaleTimeString() + " " + time.toDateString();

    var link = e.target.youtube.value;
    var id = link.split("=");
    id.shift();
    id = id.join('');
    console.log("link", link);
    console.log("id:", id);


    var post = {
      title: e.target.title.value,
      youtubeId: id,
      tags: tags,
      dateCreated: time
    };

    post._id = Posts.insert(post);

    Router.go('postPage',post);

  }
});
