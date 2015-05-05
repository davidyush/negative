Template.createFacebook.events({
  "submit .form-create-fb": function(e) {
    e.preventDefault();
    var tags = e.target.tags.value;
    tags = tags.split("#");
    tags.shift();
    for(var i = 0; i < tags.length;i++) {
      tags[i] = tags[i].trim();
    }

    var time = new Date();
    time = time.toLocaleTimeString() + " " + time.toDateString();

    var getUserId = function(userUrl) {
      var user_name = userUrl.split('/').pop().split("?")[0];
      if(user_name !== "profile.php") {
        return user_name;
      }else {
        user_name = userUrl.split("id=").pop().split("&").shift();
      }
      return user_name;
    }
    var urlProfile = e.target.fb.value;
    var idProfile = getUserId(urlProfile);
    console.log("url profile:", urlProfile);
    // -------hardcore facebook ajax-------
    // ------------what a shame------------
    var post = {};
    var user_info = {};

    $.ajax({
      url: "http://graph.facebook.com/" + urlProfile,
      dataType: 'jsonp',
      success: function(data) {
        user_info = data;
      }
    }).done(function() {
      user_info.urlImg = "https://graph.facebook.com/"+user_info.username+"/picture?type=large";

      if(!user_info.gender) {
        user_info.gender = "unknown";
      }
      if(!user_info.name) {
        user_info.name = "unknown";
      }
      post = {
        title: e.target.title.value,
        text: e.target.text.value,
        tags:tags,
        dateCreated: time,
        profileLink: urlProfile,
        profileGender: user_info.gender,
        profileName: user_info.name,
        profileImgUrl: user_info.urlImg
      };
      console.log(post);
      Meteor.call('facebookInsert', post, function(error,result) {
        if(error)
          return throwError(error.reason);

        Router.go('postPage',{_id:result._id});

      });
    });

    // ----------end of hardcore----------


  }
});
