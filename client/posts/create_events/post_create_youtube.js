Template.createYoutube.events({
  "submit .form-create-youtube": function(e) {
    e.preventDefault();

    var tags = e.target.tags.value;
    tags = tags.split("#");
    tags.shift();
    for(var i = 0; i < tags.length;i++) {
      tags[i] = tags[i].trim();
    }

    var link = e.target.youtube.value;
    //var id = link.split("v=")[1].substring(0, 11)
    var id = link.split("=");
    id.shift();
    id = id.join('');
    // console.log("link", link);
    // console.log("id:", id);

    var post = {
      title: e.target.title.value,
      text: e.target.text.value,
      youtubeId: id,
      tags: tags
    };

    Meteor.call('youtubeInsert', post, function(error,result) {
      if(error)
        return throwError(error.reason);

      Router.go('postPage',{_id:result._id});
    });

  }
});
