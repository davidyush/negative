isImage = function(img) {
  return img.match(/\.(jpg|png|gif|jpeg)\b/);
}
maxTags = function(num,tags) {
  return tags.length <= num;
}
isLink = function(link) {
  return link.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/);
}
isYoutube = function(youtubeId) {
  if(youtubeId.length === 11) {
    return true;
  }
  return false;
}
isLargeTitle = function(title) {
  return title.length > 50;
}
isLargeText = function(text) {
  return text.length > 300;
}

throwDangerError = function(field,message) {
  if(!message)
    message = field;
  if(field)
    throw new Meteor.Error('invalid-post',message);
}

var messageError = {
  bodyEmpty : "The body is empty!wtf?!",
  titleEmpty: "The title is empty",
  titleLarge : "The title should be less than 50 symbols",
  descriptionEmpty: "Please add some description",
  descriptionLarge: "The description should be less than 300 symbols",
  tagsEmpty: "Make some tags darling, with #",
  tagsTooMuch: "The max count of tags is 5",
  imageWrong: "Set the image .png .gif .jpeg .jpg",
  httpWrong: "The link should start with http:// or https://",
  linkNameEmpty: "Please set the name of a link",
  youtubeWrong:"Are you sure it's youtube link?",
  facebookWrong:"Facebook failed",
  vkWrong: "Vk failed!"
};


validateComment = function (comment) {
  var errors = {};
  if (!comment.body)
    errors.body = messageError.bodyEmpty;
  return errors;
}


validateText = function (post) {
  var errors = {};
  if (!post.title)
    errors.title = messageError.titleEmpty;
  if(isLargeTitle(post.title))
    errors.largeTitle = messageError.titleLarge;
  if (!post.text)
    errors.text = messageError.descriptionEmpty;
  if(isLargeText(post.text))
    errors.largeText = messageError.descriptionLarge;
  if (_.isEmpty(post.tags)){
    errors.tags = messageError.tagsEmpty;
  }
  if(!maxTags(5,post.tags)) {
    errors.countTags = messageError.tagsTooMuch;
  }
  return errors;
}


validateImage = function (post) {
  var errors = {};
  if (!post.title)
    errors.title = messageError.titleEmpty;
  if(isLargeTitle(post.title))
    errors.largeTitle = messageError.titleLarge;
  if (!post.text)
    errors.text = messageError.descriptionEmpty;
  if(isLargeText(post.text))
    errors.largeText = messageError.descriptionLarge;
  if (!isImage(post.image))
    errors.image =  messageError.imageWrong;
  if (_.isEmpty(post.tags)){
    errors.tags = messageError.tagsEmpty;
  }
  if(!maxTags(5,post.tags)) {
    errors.maxTags = messageError.tagsTooMuch;
  }
  return errors;
}


validateLink = function (post) {
  var errors = {};
  if (!post.title)
    errors.title = messageError.titleEmpty;
  if(isLargeTitle(post.title))
    errors.largeTitle = messageError.titleLarge;
  if (!post.text)
    errors.text = messageError.descriptionEmpty;
  if(isLargeText(post.text))
    errors.largeText = messageError.descriptionLarge;
  if(!isLink(post.link)) {
    errors.link = messageError.httpWrong;
  }
  if(!post.nameLink) {
    errors.nameLink = messageError.linkNameEmpty;
  }
  if (_.isEmpty(post.tags)){
    errors.tags = messageError.tagsEmpty;
  }
  if(!maxTags(5,post.tags)) {
    errors.maxTags = messageError.tagsTooMuch;
  }
  return errors;
}

validateYoutube = function (post) {
  var errors = {};
  if (!post.title)
    errors.title = messageError.titleEmpty;
  if(isLargeTitle(post.title))
    errors.largeTitle = messageError.titleLarge;
  if (!post.text)
    errors.text = messageError.descriptionEmpty;
  if(isLargeText(post.text))
    errors.largeText = messageError.descriptionLarge;
  if(!isYoutube(post.youtubeId)) {
    errors.youtube = messageError.youtubeWrong;
  }
  if (_.isEmpty(post.tags)){
    errors.tags = messageError.tagsEmpty;
  }
  if(!maxTags(5,post.tags)) {
    errors.maxTags = messageError.tagsTooMuch;
  }
  return errors;
}

validateFacebook = function(post) {
  var errors = {};
  console.log("validate",post);
  if (!post.title)
    errors.title = messageError.titleEmpty;
  if(isLargeTitle(post.title))
    errors.largeTitle = messageError.titleLarge;
  if(!post.profileLink)
    errors.facebook = messageError.facebookWrong;
  if(!post.text)
    errors.text = messageError.descriptionEmpty;
  if(isLargeText(post.text))
    errors.largeText = messageError.descriptionLarge;
  if (_.isEmpty(post.tags)){
    errors.tags = messageError.tagsEmpty;
  }
  if(!maxTags(5,post.tags)) {
    errors.maxTags = messageError.tagsTooMuch;
  }
  return errors;
}

validateVk = function(post) {
  var errors = {};
  console.log("validate",post);
  if (!post.title)
    errors.title = messageError.titleEmpty;
  if(isLargeTitle(post.title))
    errors.largeTitle = messageError.titleLarge;
  if(!post.profileLink)
    errors.vk = messageError.vkWrong;
  if(!post.text)
    errors.text = messageError.descriptionEmpty;
  if(isLargeText(post.text))
    errors.largeText = messageError.descriptionLarge;
  if (_.isEmpty(post.tags)){
    errors.tags = messageError.tagsEmpty;
  }
  if(!maxTags(5,post.tags)) {
    errors.maxTags = messageError.tagsTooMuch;
  }
  return errors;
}
