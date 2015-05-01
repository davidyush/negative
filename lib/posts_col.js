Posts = new Mongo.Collection('posts');
// it defenetly should be another. another ways to create 4 different
// methods of insert, but how?


Meteor.methods({
  removeIt: function(id) {
    Posts.remove(id);
  },
  textInsert: function(postAttributes) {
    check(this.userId,String);
    check(postAttributes, {
      title:String,
      text:String,
      tags: Match.Optional([String]),
      dateCreated:String
    });

    var errors = validateText(postAttributes);
    throwDangerError(errors.title);
    throwDangerError(errors.largeTitle);
    throwDangerError(errors.text);
    throwDangerError(errors.largeText);
    throwDangerError(errors.tags);
    throwDangerError(errors.countTags);


    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author:user.username,
      submitted: new Date()
    });

    var postId = Posts.insert(post);

    return {
      _id: postId
    }
  },

  linkInsert: function(postAttributes) {
    check(this.userId,String);
    check(postAttributes, {
      title:String,
      link: String,
      nameLink: String,
      domain:String,
      tags: Match.Optional([String]),
      dateCreated:String
    });

    var errors = validateLink(postAttributes);
    throwDangerError(errors.title);
    throwDangerError(errors.largeTitle);
    throwDangerError(errors.link);
    throwDangerError(errors.nameLink);
    throwDangerError(errors.tags);
    throwDangerError(errors.countTags);

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author:user.username,
      submitted: new Date()
    });

    var postId = Posts.insert(post);

    return {
      _id: postId
    }
  },

  imageInsert: function(postAttributes) {
    check(this.userId,String);
    check(postAttributes, {
      title:String,
      image: String,
      tags: Match.Optional([String]),
      dateCreated:String
    });

    var errors = validateImage(postAttributes);
    throwDangerError(errors.title);
    throwDangerError(errors.largeTitle);
    throwDangerError(errors.image);
    throwDangerError(errors.tags);

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author:user.username,
      submitted: new Date()
    });

    var postId = Posts.insert(post);

    return {
      _id: postId
    }
  },

  youtubeInsert: function(postAttributes) {
    check(this.userId,String);
    check(postAttributes, {
      title:String,
      youtubeId: String,
      tags: Match.Optional([String]),
      dateCreated:String
    });

    var errors = validateYoutube(postAttributes);
    throwDangerError(errors.title);
    throwDangerError(errors.largeTitle);
    throwDangerError(errors.youtube);
    throwDangerError(errors.tags);

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author:user.username,
      submitted: new Date()
    });

    var postId = Posts.insert(post);

    return {
      _id: postId
    }
  }


});
