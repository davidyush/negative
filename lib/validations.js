isImage = function(img) {
  return img.match(/\.(jpg|png|gif|jpeg)\b/);
}
maxTags = function(num,tags) {
  return tags.length <= num;
}
isLink = function(link) {
  return link.match(/$(ftp|http|https):\/\/.*/);
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

validateText = function (post) {
  var errors = {};
  if (!post.title)
    errors.title = "The title is empty!wtf?!";
  if(isLargeTitle(post.title))
    errors.largeTitle = "The title should be less than 50 symbols";
  if (!post.text)
    errors.text =  "The text is empty!wtf?!";
  if(isLargeText(post.text))
    errors.largeText = "The text should be less than 300 symbols";
  if (_.isEmpty(post.tags)){
    errors.tags = "Make some tags darling, with #";
  }
  if(!maxTags(5,post.tags)) {
    errors.countTags = "The max count of tags is 5";
  }
  return errors;
}


validateImage = function (post) {
  var errors = {};
  if (!post.title)
    errors.title = "Please fill in a title";
  if(isLargeTitle(post.title))
    errors.largeTitle = "The title should be less than 50 symbols";
  if (!isImage(post.image))
    errors.image =  "Set the image .png .gif .jpeg .jpg";
  if (_.isEmpty(post.tags)){
    errors.tags = "Make some tags darling, with #";
  }
  if(!maxTags(5,post.tags)) {
    errors.maxTags = "The max count of tags is 5";
  }
  return errors;
}


validateLink = function (post) {
  var errors = {};
  if (!post.title)
    errors.title = "Please fill in a title";
  if(isLargeTitle(post.title))
    errors.largeTitle = "The title should be less than 50 symbols";
  if(!isLink(post.link)) {
    errors.link = "The link should start with http:// or https://";
  }
  if(!post.nameLink) {
    errors.nameLink = "Please set the name of a link";
  }
  if (_.isEmpty(post.tags)){
    errors.tags = "Make some tags darling, with #";
  }
  if(!maxTags(5,post.tags)) {
    errors.maxTags = "The max count of tags is 5";
  }
  return errors;
}

validateYoutube = function (post) {
  var errors = {};
  if (!post.title)
    errors.title = "Please fill in a title";
  if(isLargeTitle(post.title))
    errors.largeTitle = "The title should be less than 50 symbols";
  if(!isYoutube(post.youtubeId)) {
    errors.youtube = "Are you sure it's youtube link?";
  }
  if (_.isEmpty(post.tags)){
    errors.tags = "Make some tags darling, with #";
  }
  if(!maxTags(5,post.tags)) {
    errors.maxTags = "The max count of tags is 5";
  }
  return errors;
}
