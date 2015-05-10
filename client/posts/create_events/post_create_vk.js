Template.createVk.events({
  'submit .form-create-vk': function(e) {
    e.preventDefault();
    var tags = e.target.tags.value;
    tags = tags.split("#");
    tags.shift();
    for(var i = 0; i < tags.length;i++) {
      tags[i] = tags[i].trim();
    }

    function getUserId(link) {
      var id = link.split('/').pop();
      if(id.substring(0,2) === "id") {
        id = link.split('/').pop().slice(2);
      }
      return id;
    }

    function getGender(num) {
      var result;
      if(num === 2)
        result = "male"
      else if(num === 1)
        result = "female"
      else
        result = "unknown"
      return result;
    }

    var inputLink = e.target.vkLink.value;

    // if(!inputLink) {
    //   throwDangerError("vk fail, you are wrong!");
    // }

    var userId = getUserId(inputLink);
    var post = {
      title: e.target.title.value,
      text: e.target.text.value,
      tags: tags
    };

    var searchFields = ['sex','photo_200'];
    VK.Api.call('users.get',{ uids:userId,fields: searchFields }, function(res) {
      if(res.response) {
        console.log("The Response vk:",res.response[0]);
      }

      if(res.response[0] != undefined) {
        var name = res.response[0].first_name + " " + res.response[0].last_name;
        var gender = getGender(res.response[0].sex);
        var imgUrl = res.response[0].photo_200;
      }

      post = _.extend(post, {
         profileLink: inputLink,
         profileName: name,
         profileGender: gender,
         profileImgUrl: imgUrl
      });
      console.log("The post",post);

      Meteor.call('vkInsert', post, function(error,result) {
        if(error)
          return throwError(error.reason);

        Router.go('postPage',{_id:result._id});

      });

    });

  }
});
