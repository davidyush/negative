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
  document.getElementsByTagName("body")[0].appendChild(el);
}, 0);



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
