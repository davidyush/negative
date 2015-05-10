Template.registerHelper('pluralize',function (n, things){
  if (n === 1)
    return '1 ' + things;
  else
    return n + ' ' + things + 's'
});
