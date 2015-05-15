if(Meteor.isClient) {
  Session.setDefault('imgId',null);
  Session.setDefault('fileName','No File');

  function removeTrash(id) {
    Images.remove(id);
    Session.set('fileName','No File');
  }
}
Template.createImage.helpers({
  fileName: function() {
    return Session.get('fileName');
  }
});

Template.createImage.events({
  'change .imgInput': function(e) {
    FS.Utility.eachFile(event, function(file) {
      console.log("the file ",file);
      Session.set("fileName",file.name);
      Images.insert(file,function(err,fileObj) {
        if(err)
          throwError(err.reason);
        console.log(fileObj);
        console.log("is Image",fileObj.isImage());
        if(fileObj.isImage())
          Session.set('imgId',fileObj._id);
      });

    });
  },
  'click #uploadImg': function(e) {
    $("#link-create-img").prop('disabled',true);
  },
  'click #link-create-img': function(e) {
    $("#uploadImg").prop('disabled',true);
    removeTrash(Session.get('imgId'));
  },
  'click .link-img': function() {
    $("#link-create-img").prop('disabled',false);
  },
  'click .upload-img': function() {
    $("#uploadImg").prop('disabled',false);
  },
  'submit .form-create-image': function(e) {
    e.preventDefault();

    var tags = e.target.tags.value;
    tags = tags.split("#");
    tags.shift();
    for(var i = 0; i < tags.length;i++) {
      tags[i] = tags[i].trim();
    }

    var post = {
      title:e.target.title.value,
      text: e.target.text.value,
      image: e.target.image.value,
      tags:tags
    };

    if(!post.image) {
      post.image = Images.findOne(Session.get('imgId')).url();
    }

    console.log("image is ",post.image);
    console.log("the post",post);
    Meteor.call('imageInsert', post, function(error,result) {
      if(error)
        return throwError(error.reason);

      Router.go('postPage',{_id:result._id});
    });

  }
});
