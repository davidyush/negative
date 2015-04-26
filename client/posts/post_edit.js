Template.postEdit.events({
  'submit .form-edit':function(e) {
    e.preventDefault();

    var currentPost = this._id;

    var tags = e.target.tags.value;
    tags = tags.split("#");
    tags.shift();
    for(var i = 0; i < tags.length;i++) {
      tags[i] = "#" + tags[i].trim();
    }

    var postProperies = {
      title: e.target.title.value,
      image: e.target.image.value,
      text:  e.target.text.value,
      tags:  e.target.tags.value,
    }

    Posts.update(currentPost,{$set:postProperies});
    Router.go('postPage',currentPost);
  }
});
