$(function() {
  //before deploy should be another
  //what? who wrote it? it works normal, just don't touch it.
  window.vkAsyncInit = function() {
    VK.init({
      apiId: "4905998"
    });
  };

  setTimeout(function() {
    var el = document.createElement("script");
    el.type = "text/javascript";
    el.src = "//vk.com/js/api/openapi.js";
    el.async = true;
    $("body").append(el);
  }, 0);


  // window.fbAsyncInit = function() {
  //   FB.init({
  //     appId      : '690334511095194',
  //     cookie     : true,
  //     status     : true,
  //     xfbml      : true,
  //     version    : 'v2.3'
  //   });
  // };

  //do i need it?
  // (function(d, s, id){
  //    var js, fjs = d.getElementsByTagName(s)[0];
  //    if (d.getElementById(id)) {return;}
  //    js = d.createElement(s); js.id = id;
  //    js.src = "//connect.facebook.net/en_US/sdk.js";
  //    fjs.parentNode.insertBefore(js, fjs);
  //  }(document, 'script', 'facebook-jssdk'));

  //welocome 2010
  var windowScreen = $(window);
  windowScreen.scroll(function() {
     if(windowScreen.scrollTop() + windowScreen.height() == $(document).height()) {
        $("#load-more").trigger("click");
     }
  });

});



var isMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};
Session.set('isMobile',isMobile.any());
