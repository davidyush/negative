Template.createFacebook.events({
  "submit .form-create-fb": function(e) {
    e.preventDefault();
    console.log("what?");
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
    console.log("url:",urlProfile);
    console.log("id:", idProfile);
    // -------hardcore facebook ajax-------
    // ------------what a shame------------
    var post = {};
    var user_info = {};

    // $.getJSON(urlProfile,function(data) {
    //   console.log(data);
    // });


    $.ajax({
      url: "http://graph.facebook.com/" + urlProfile,
      dataType: 'jsonp',
      success: function(data) {
        user_info = data;
        console.log(data);
      },
      fail: function() {
        alert(fail);
      }
    }).done(function() {
      user_info.urlImg = "https://graph.facebook.com/"+user_info.username+"/picture?type=large";
      console.log(user_info);

      post = {
        title: e.target.title.value,
        profileName: user_info.name,
        profileGender: user_info.gender,
        profileImgUrl: user_info.urlImg,
        profileLink: user_info.link,
        text: e.target.text.value,
        tags:tags,
        dateCreated: time
      };

      Meteor.call('facebookInsert', post, function(error,result) {
        if(error)
          return throwError(error.reason);

        Router.go('postPage',{_id:result._id});

      });
    });

    // ----------end of hardcore----------


  }
});
