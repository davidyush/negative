Router.configure({
  layoutTemplate:'layout'
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
