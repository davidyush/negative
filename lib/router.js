Router.configure({
  layoutTemplate:'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return Meteor.subscribe('notifications');
  }
});

Router.route('/loading',{
  name:'loading'
});

// Router.route('/',{
//   name:'postsList'
// });

PostsListController = RouteController.extend({
  template:'postsList',
  increment: 10,
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {
      sort: {submitted: -1},
      limit: this.postsLimit()
    }
  },
  // waitOn: function() {
  //   return Meteor.subscribe('posts',this.findOptions());
  // },
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('posts',this.findOptions());
  },
  posts: function() {
    return Posts.find({},this.findOptions());
  },
  data: function() {
    var hasMore = this.posts().count() === this.postsLimit();
    var nextPath = this.route.path({postsLimit: this.postsLimit() + this.increment});
    return {
      posts: this.posts(),
      ready: this.postsSub.ready,
      nextPath: hasMore ? nextPath : null
    };
  }
});


Router.route('/create',{
  name:'postCreate'
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


Router.route('/:postsLimit?', {
  name: 'postsList'
});

// Router.route('/:postsLimit?', {
//   name: 'postsList',
//   waitOn: function() {
//     var limit = parseInt(this.params.postsLimit) || 5;
//     return Meteor.subscribe('posts', {sort: {submitted: -1}, limit: limit});
//   },
//   data: function() {
//     var limit = parseInt(this.params.postsLimit) || 5;
//     return {
//       posts: Posts.find({}, {sort: {submitted: -1}, limit: limit})
//     };
//   }
// });

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
