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

    _.values(errors).forEach(function(e) {
      throwDangerError(e);
    });

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author:user.username,
      submitted: new Date(),
      commentsCount: 0
    });

    var postId = Posts.insert(post);

    return {
      _id: postId
    }
  },

  linkInsert: function(postAttributes) {
    check(this.userId,String);
    check(postAttributes, {
      title: String,
      link : String,
      nameLink: String,
      text : String,
      domain:String,
      tags: Match.Optional([String]),
      dateCreated:String
    });

    var errors = validateLink(postAttributes);

    _.values(errors).forEach(function(e) {
      throwDangerError(e);
    });

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author:user.username,
      submitted: new Date(),
      commentsCount: 0
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
      text:String,
      image: String,
      tags: Match.Optional([String]),
      dateCreated:String
    });

    var errors = validateImage(postAttributes);

    _.values(errors).forEach(function(e) {
      throwDangerError(e);
    });

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author:user.username,
      submitted: new Date(),
      commentsCount: 0
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
      text:String,
      youtubeId: String,
      tags: Match.Optional([String]),
      dateCreated:String
    });

    var errors = validateYoutube(postAttributes);
    _.values(errors).forEach(function(e) {
      throwDangerError(e);
    });

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author:user.username,
      submitted: new Date(),
      commentsCount: 0
    });

    var postId = Posts.insert(post);

    return {
      _id: postId
    }
  },

  facebookInsert: function(postAttributes) {
    check(this.userId,String);
    check(postAttributes, {
      title:String,
      text:String,
      profileName: String,
      profileGender: String,
      profileImgUrl: String,
      profileLink: String,
      tags: Match.Optional([String]),
      dateCreated:String
    });

    var errors = validateFacebook(postAttributes);
    _.values(errors).forEach(function(e) {
      throwDangerError(e);
    });

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author:user.username,
      submitted: new Date(),
      commentsCount: 0
    });

    var postId = Posts.insert(post);

    return {
      _id: postId
    }
  },


});
