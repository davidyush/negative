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
    console.log(Posts.findOne(this.params._id));
    return Posts.findOne(this.params._id);
  }
});
