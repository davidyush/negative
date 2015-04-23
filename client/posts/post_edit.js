// Template.postEdit.events({
//   'submit .form-edit':function(e) {
//     e.preventDefault();
//
//     var currentPost = this._id;
//
//     var tags = e.target.tags.value;
//     console.log(tags);
//
//     var postProperies = {
//       title: e.target.title.value,
//       image: e.target.image.value,
//       text:  e.target.text.value,
//       tags:  e.target.tags.value,
//     }
//
//     Posts.update(currentPost,{$set:postProperies});
//     Router.go('postPage',currentPost);
//   }
// });
