(function (window, document, undefined) {
  // Defaults
  // =====================================

  var wp = (window.wp = {
    utils: {},
    cache: {},
  });

  // Methods
  // =====================================

  wp.utils.init = function () {
    wp.cache.window = $(window);
    wp.cache.document = $(document);
    wp.cache.html = $("html");
    wp.cache.body = $("body");
    wp.cache.header = $("header.header");
    wp.cache.main = $("main");
    wp.cache.footer = $("footer");

    //	SCROLL TO ANCHOR
    var hash = window.location.hash;
    if (hash) {
      var target = $(hash);
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 30,
          },
          500,
        );
      }
    }

    //  VIDEO
    var patterns = [
      /(?:m\.)?youtube\.com\/watch\?v=([\w-]+)/,
      /(?:m\.)?youtube\.com\/v\/([\w-]+)/,
      /youtube\.com\/embed\/([\w-]+)/,
      /youtu\.be\/([\w-]+)/,
    ];
    wp.cache.main.find("oembed").each(function (index) {
      var oembedElement = $(this);
      var figureElement = $(this).parent();
      for (p = 0; p < patterns.length; p++) {
        var matches = oembedElement.attr("url").match(patterns[p]);
        if (matches != null && matches.length > 0) {
          if (index == 0) {
            var tag = document.createElement("script");
            tag.src = "https://www.youtube.com/player_api";
            var firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
          }

          const id = matches[1];
          figureElement.html('<div class="video"></div>');
          $(function () {
            var video =
              '<div class="video"><iframe src="https://www.youtube.com/embed/' +
              id +
              '?rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
            figureElement.html(video);
          });

          break;
        }
      }
    });

    //	GALERIE
    wp.cache.main.find(".lg_item").on("click", function (e) {
      clearInterval(galleryInterval);

      var gItem = $(this);
      var galleryScript = wp.cache.body.find(
        'script[src*="/static/zoo/scripts/lightgallery.js"]',
      ).length;
      if (galleryScript < 1) {
        e.preventDefault();

        var tag = document.createElement("script");
        tag.src = "/static/zoo/scripts/lightgallery.js";
        var firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        var charge = 1;
        var galleryInterval = setInterval(function () {
          if (charge > 10) {
            clearInterval(galleryInterval);
          } else if (typeof lightGallery == "undefined") {
            charge++;
          } else {
            clearInterval(galleryInterval);

            wp.cache.main.find(".lg_list").each(function (index) {
              var lgID = "gallery" + (index + 1);
              var lg = document.getElementById(lgID);
              const gallery = window.lightGallery(lg, {
                selector: ".lg_item",
                counter: true,
                download: false,
                zoomFromOrigin: false,
                showZoomInOutIcons: false,
                mobileSettings: {
                  showCloseIcon: true,
                },
              });

              if (lgID == gItem.parent().attr("id")) {
                gallery.openGallery(gItem.index());
              }
            });
          }
        }, 100);
      }
    });
  };
  wp.utils.domLoad = function () {
    //wp.utils.xxx();
  };

  // Initialize Events
  // =====================================

  wp.utils.init();

  jQuery(function ($) {
    wp.utils.domLoad();
  });
})(window, document);
