Router.configure({
  layoutTemplate:'layout',
  waitOn: function() {
    return Meteor.subscribe('posts');
  }
});

Router.route('/',{
  name:'postsList'
});

Router.route('/create',{
  name:'postCreate'
});

Router.route('/posts/:_id', {
  name:'postPage',
  data: function() {
    console.log(this.params);
    return Posts.findOne(this.params._id);
  }
});

Router.route('/posts/:_id/edit', {
  name:'postEdit',
  data: function() {
    return Posts.findOne(this.params._id);
  }
});

Router.route('/search/:tag',{
  name:'postsTag',
  data: function() {
    return Posts.find({tags: this.params.tag});
  }
});
