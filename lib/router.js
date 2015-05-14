  Router.configure({
  layoutTemplate:'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return Meteor.subscribe('notifications');
  }
});

PostsListController = RouteController.extend({
  template: 'postsList',
  increment: 10,
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('posts', this.findOptions());
  },
  posts: function() {
    return Posts.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.posts().count() === this.postsLimit();
    return {
      posts: this.posts(),
      ready: this.postsSub.ready,
      nextPath: hasMore ? this.nextPath() : null
    };
  }
});

NewPostsController = PostsListController.extend({
  sort: {submitted: -1, _id: -1},
  findOptions: function() {
    return {sort: this.sort, limit: this.postsLimit()};
  },
  nextPath: function() {
    return Router.routes.newPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});

BestPostsController = PostsListController.extend({
  sort: {votes: -1, submitted: -1, _id: -1},
  findOptions: function() {
    return {sort: this.sort, limit: this.postsLimit()};
  },
  nextPath: function() {
    return Router.routes.bestPostes.path({postsLimit: this.postsLimit() + this.increment})
  }
});

Router.route('/', {
  name: 'home',
  controller: NewPostsController
});

Router.route('/new/:postsLimit?', {name: 'newPosts'});

Router.route('/best/:postsLimit?', {name: 'bestPosts'});

// Router.route('/:tag/:postsLimit?', {name: 'postsTag'});

Router.route('/search/:tag',{
  name:'postsTag',
  waitOn: function() {
    Meteor.subscribe('posts',{
      sort: {submitted: -1},
      limit: 20
    });
  },
  data: function() {
    return Posts.find({tags: this.params.tag});
  }
});



Router.route('/posts/:_id', {
  name:'postPage',
  waitOn: function() {
    return [
      Meteor.subscribe('comments',this.params._id),
      Meteor.subscribe('singlePost', this.params._id)
    ];
  },
  data: function() {
    return Posts.findOne(this.params._id);
  }
});

// Router.route('/posts/:_id/edit', {
//   name:'postEdit',
//   data: function() {
//     return Posts.findOne(this.params._id);
//   }
// });


Router.route('/create',{
  name:'postCreate'
});

Router.route('/loading',{
  name:'loading'
});

Router.route('/recept', {
  name:'recept'
});

Router.route('/noti', {
  name:'notiBeta'
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
