Template.notiBeta.helpers({
  notisBeta: function() {
    return Notifications.find({userId: Meteor.userId()},{sort:{submitted:-1}});
  },
  notificationCount: function(){
  	return Notifications.find({userId: Meteor.userId(), read: false}).count();
  }
});

Template.notiBetaItem.helpers({
  notificationPostPath: function() {
    return Router.routes.postPage.path({_id: this.postId});
  },
  notyDate: function() {
    return moment(this.submitted).fromNow();
  }
})

Template.notiBetaItem.events({
  'click a': function() {
    Notifications.update(this._id, {$set: {read: true}});
  }
})
