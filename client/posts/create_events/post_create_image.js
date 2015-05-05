Template.createImage.events({
  'submit .form-create-image': function(e) {
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
      text: e.target.text.value,
      image: e.target.image.value,
      tags:tags,
      dateCreated: time
    };

    Meteor.call('imageInsert', post, function(error,result) {
      if(error)
        return throwError(error.reason);

      Router.go('postPage',{_id:result._id});
    });

  }
});
