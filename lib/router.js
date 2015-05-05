Router.configure({
  layoutTemplate:'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [Meteor.subscribe('posts',{sort:{dateCreated:1}}),
      Meteor.subscribe('notifications')];
  }
});

Router.route('/loading',{
  name:'loading'
});

Router.route('/',{
  name:'postsList'
});

Router.route('/create',{
  name:'postCreate'
});

Router.route('/posts/:_id', {
  name:'postPage',
  waitOn: function() {
    return Meteor.subscribe('comments',this.params._id);
  },
  data: function() {
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

var requireLogin = function() {
  if(!Meteor.userId()) {
    if(Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    }else {
      this.render('accessDenied');
    }
  }else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postCreate'});
