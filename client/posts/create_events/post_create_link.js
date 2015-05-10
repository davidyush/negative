Template.createLink.events({
  'submit .form-create-link': function(e) {
    e.preventDefault();

    var tags = e.target.tags.value;
    tags = tags.split("#");
    tags.shift();
    for(var i = 0; i < tags.length;i++) {
      tags[i] = tags[i].trim();
    }

    var a = document.createElement('a');
    a.href = e.target.link.value;
    console.log('a.href',a.href);
    domain = a.hostname;
    console.log("domain",domain);

    console.log(tags);
    var post = {
      title:e.target.title.value,
      link: e.target.link.value,
      nameLink: e.target.nameLink.value,
      text: e.target.text.value,
      domain: domain,
      tags:tags
    };

    Meteor.call('linkInsert', post, function(error,result) {
      if(error)
        return throwError(error.reason);

      Router.go('postPage',{_id:result._id});
    });
  }
});
