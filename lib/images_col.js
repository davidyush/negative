Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})]
});

Images.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  },
  download: function(){
    return true;
  }
});
Meteor.methods({
  validUpload: function(fileObject) {
    check(fileObject._id,String);
    console.log("getting file",fileObject);

    if (fileObject.isImage())
      return true;

  }
});
