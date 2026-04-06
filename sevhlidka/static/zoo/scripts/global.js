var menuTimer = null;
var menuTimer2 = null;
var closeItem = null;
(function (window, document, undefined) {
  // Defaults
  // =====================================

  var wp0 = (window.wp0 = {
    utils: {},
    cache: {},
  });

  //	CAPTCHA
  wp0.utils.recaptcha = false;
  wp0.utils.initRecaptcha = function () {
    if (wp0.utils.recaptcha == false) {
      var src =
        "https://www.google.com/recaptcha/api.js?render=6Lcn2XEsAAAAAFPJiRHKJY_I2FpHN-_95wb1rK_s";
      var script = document.createElement("script");
      script.onload = function () {
        grecaptcha.ready(function () {
          grecaptcha
            .execute("6Lcn2XEsAAAAAFPJiRHKJY_I2FpHN-_95wb1rK_s", {
              action: "form",
            })
            .then(function (token) {
              wp0.cache.body.find(".form_captcha .captcha").val(token);
            });
        });
      };
      script.src = src;
      document.body.appendChild(script);
      wp0.utils.recaptcha = true;
    }
  };

  // Methods
  // =====================================

  wp0.utils.init = function () {
    wp0.cache.window = $(window);
    wp0.cache.document = $(document);
    wp0.cache.html = $("html");
    wp0.cache.body = $("body");
    wp0.cache.header = $("header.header");
    wp0.cache.main = $("main");
    wp0.cache.footer = $("footer");

    //	LOKALIZACE
    var lang = wp0.cache.html.attr("lang");
    var loc1 = "Vyhledávání";
    var loc2 = "/vyhledavani";
    var loc3 = "Hledat";
    var loc4 = "Zavřít vyhledávání";
    var loc5 = "Jsme jedna smečka | Zoo Brno";
    var loc6 = "Změnit jazyk na EN";
    var loc7 = "Otevřít vyhledávání";
    var loc8 = "Zavřít menu";
    var loc9 = "Zpět";
    var loc10 = "Zobrazit vše";

    //	LAST FOCUS
    window.lastFocus = null;

    //	DROPDOWN MENU CONTROL
    window.dropDownMenuControl = false;

    //	DROPDOWN MENU SKIP FOCUS
    window.dropDownMenuSkipFocus = false;

    //	OPEN TO NEW TAB
    wp0.cache.body.find("a.do_noveho_okna").attr("target", "_blank");

    //	INPUT, SELECT, TEXTAREA + ZAVRENI PO ZMACKNUTI ESCAPE
    var tabPressed = false;
    wp0.cache.document.on("keydown", function (e) {
      if (e.keyCode == 27) {
        if (wp0.cache.html.hasClass("modal")) {
          closeModal(true);
        }
        if (
          wp0.cache.header
            .find(".header_language_box button")
            .attr("aria-expanded") == "true"
        ) {
          closeLang(true);
        }
        var activeDP = wp0.cache.header.find(
          ".header_nav_main .with_dm > a[aria-expanded=true]",
        );
        if (activeDP.length == 1) {
          window.dropDownMenuSkipFocus = true;
          var box = activeDP.closest(".with_dm");
          box.find("> .dropdownmenu").attr("hidden", "");
          activeDP.attr("aria-expanded", "false").focus();
        }
      }
      if (e.key === "Tab" || e.keyCode === 9) {
        tabPressed = true;
      } else {
        tabPressed = false;
      }
    });
    wp0.cache.window.on("mousedown", function (e) {
      tabPressed = false;
    });
    wp0.cache.body.find("input, select, textarea").each(function () {
      var element = $(this);
      element
        .on("focus", function (e) {
          if (tabPressed) {
            element.addClass("focus");
          }
        })
        .on("blur", function (e) {
          element.removeClass("focus");
        });
    });

    //	NOTIFIKACE
    var closed = getCookie("headerNotificationClosed");
    if (closed !== "1") {
      wp0.cache.body.find(".header_notification").show();
      wp0.cache.body
        .find(".header_notification .close")
        .on("click", function (e) {
          e.preventDefault();
          document.cookie = "headerNotificationClosed=1; path=/";
          wp0.cache.body.find(".header_notification").remove();
        });
    }

    //	VYHLEDAVANI
    wp0.cache.header.find(".header_search button").on("click", function (e) {
      e.preventDefault();

      var searchEl = $(this);
      search(searchEl, loc1, loc2, loc3, loc4);
    });

    //	VYBER JAZYKOVE MUTACE
    wp0.cache.header
      .find(".header_language_box button")
      .on("click", function (e) {
        e.preventDefault();
        var button = $(this);
        if (button.attr("aria-expanded") == "false") {
          button.attr("aria-expanded", "true").addClass("open");
          button.parent().find(".selectbox").removeAttr("hidden");
        } else {
          closeLang(false);
        }
      });
    wp0.cache.header.find(".header_language_box").on("focusout", function (e) {
      requestAnimationFrame(() => {
        var box = $(this);
        var focusedElement = document.activeElement;
        if (!$.contains(box[0], focusedElement)) {
          closeLang(false);
        }
      });
    });

    //	MENU ID
    window.menuId = false;
    menuIdFn();

    //	DROPDOWN MENU
    menuDropdownFn();

    //	MOBIL MENU
    wp0.cache.header.find(".header_menu button").on("click", function (e) {
      e.preventDefault();

      var menuEl = $(this);
      window.lastFocus = menuEl;
      mobilMenu(
        0,
        lang,
        loc1,
        loc2,
        loc3,
        loc4,
        loc5,
        loc6,
        loc7,
        loc8,
        loc9,
        loc10,
      );
    });

    //	ZAVRENI PO KLIKU MIMO ELEMENT
    wp0.cache.document.on("mouseup", function (e) {
      if (wp0.cache.html.hasClass("modal")) {
        var container = wp0.cache.body.find(".modal_content");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          closeModal(true);
        }
      }
      if (
        wp0.cache.header
          .find(".header_language_box button")
          .attr("aria-expanded") == "true"
      ) {
        var container = wp0.cache.header.find(".header_language_box");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          closeLang(false);
        }
      }
    });

    //	ODESLANI NEWSLETTERU Z PATICKY
    wp0.cache.footer.find(".form_newsletter").on("submit", function (e) {
      e.preventDefault();
      newsletter($(this));
    });

    //	RECAPTCHA
    wp0.cache.body.find(".form_captcha input").focus(function () {
      if (wp0.utils.recaptcha == false) {
        wp0.utils.initRecaptcha();
      }
    });
  };
  wp0.utils.domLoad = function () {
    //wp0.utils.xxx();
  };

  // Initialize Events
  // =====================================

  wp0.utils.init();
  if (document.forceRecaptcha) {
    wp0.utils.initRecaptcha();
  }

  jQuery(function ($) {
    wp0.utils.domLoad();
  });
})(window, document);

$(window).resize(function () {
  //	MENU ID
  menuIdFn();

  //	DROPDOWN MENU
  menuDropdownFn();
});

//	OTEVRENI MODAL OKNA
function openModal(modal, data, focusFirst) {
  if ($(data).filter(".modal_redirect").length > 0) {
    var redirectURL = $(data).filter(".modal_redirect").attr("data-url");
    if (redirectURL == "?") {
      location.reload();
    } else {
      window.open(redirectURL, "_self");
    }
  } else {
    var $outer = $("<div>")
        .css({ visibility: "hidden", width: 100, overflow: "scroll" })
        .appendTo("body"),
      widthWithScroll = $("<div>")
        .css({ width: "100%" })
        .appendTo($outer)
        .outerWidth();
    $outer.remove();
    wp0.cache.header
      .css("margin-right", 100 - widthWithScroll + "px")
      .attr("aria-hidden", "true");
    wp0.cache.main
      .css("margin-right", 100 - widthWithScroll + "px")
      .attr("aria-hidden", "true");
    wp0.cache.footer
      .css("margin-right", 100 - widthWithScroll + "px")
      .attr("aria-hidden", "true");

    wp0.cache.html.addClass("modal");
    if (modal != "") {
      wp0.cache.body.append(modal);
      if (data != "") {
        wp0.cache.body.find(".modal_content").html(data);
      }
    }
  }

  trapFocus(wp0.cache.body.find("#modal"), focusFirst);
}

//	ZAVRENI MODAL OKNA
function closeModal(changeFocus) {
  if (window.lastFocus) {
    window.lastFocus.focus();
  } else if (changeFocus) {
    wp0.cache.body.focus();
  }

  wp0.cache.header.css("margin-right", 0).removeAttr("aria-hidden");
  wp0.cache.main.css("margin-right", 0).removeAttr("aria-hidden");
  wp0.cache.footer.css("margin-right", 0).removeAttr("aria-hidden");

  wp0.cache.html.find("#modal").remove();
  wp0.cache.html.removeClass("modal");
  window.lastFocus = null;
}

//	FOCUS TRAP
function trapFocus(modal, focusFirst) {
  var focusableSelectors =
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]';
  var focusableEls = modal.find(focusableSelectors).filter(":visible");
  var firstEl = focusableEls.first();
  var lastEl = focusableEls.last();

  //	INPUT, SELECT, TEXTAREA
  var tabPressed = false;
  modal.off("keydown.tabPressed").on("keydown.tabPressed", function (e) {
    if (e.key === "Tab" || e.keyCode === 9) {
      tabPressed = true;
    } else {
      tabPressed = false;
    }
  });
  modal.off("mousedown.tabPressed").on("mousedown.tabPressed", function (e) {
    tabPressed = false;
  });
  modal.find("input, select, textarea").each(function () {
    var element = $(this);
    element
      .off("focus")
      .on("focus", function (e) {
        if (tabPressed) {
          element.addClass("focus");
        }
      })
      .off("blur")
      .on("blur", function (e) {
        element.removeClass("focus");
      });
  });

  modal.off("keydown.trapFocus").on("keydown.trapFocus", function (e) {
    if (e.key !== "Tab") return;

    var isShift = e.shiftKey;
    var active = $(document.activeElement);

    if (isShift && (active.is(modal) || active.is(firstEl))) {
      e.preventDefault();
      lastEl.focus();
    } else if (!isShift && (active.is(modal) || active.is(lastEl))) {
      e.preventDefault();
      firstEl.focus();
    }
  });

  if (focusFirst) {
    firstEl.focus();
  } else {
    modal.focus();
  }
}

//	MUTACE
function closeLang(focus) {
  var button = wp0.cache.header.find(".header_language_box button");
  button.attr("aria-expanded", "false").removeClass("open");
  button.parent().find(".selectbox").attr("hidden", "");
  if (focus) {
    button.focus({ preventScroll: true });
  }
}

//	MENU ID
function menuIdFn() {
  if (window.matchMedia("(min-width: 1024px)").matches && window.menuId) {
    window.menuId = false;
    wp0.cache.header.find(".header_menu button").removeAttr("id");
    wp0.cache.header.find(".header_nav nav").attr("id", "menu_main");
  } else if (
    window.matchMedia("(max-width: 1023px)").matches &&
    window.menuId == false
  ) {
    window.menuId = true;
    wp0.cache.header.find(".header_nav nav").removeAttr("id");
    wp0.cache.header.find(".header_menu button").attr("id", "menu_main");
  }
}

//	DROPDOWN MENU

function menuDropdownFn() {
  if (
    window.matchMedia("(min-width: 1024px)").matches &&
    window.dropDownMenuControl == false
  ) {
    window.dropDownMenuControl = true;

    var hideFrameId = null;
    wp0.cache.header.find(".header_nav_main .with_dm").each(function () {
      var dpItem = $(this);
      dpItem.find("> a").attr({
        "aria-haspopup": "true",
        "aria-expanded": "false",
        "aria-controls": dpItem.find("> a").attr("data-dp"),
      });
      dpItem
        .on("mouseenter", function (e) {
          showMenuDrop($(this));
        })
        .on("mouseleave", function (e) {
          hideMenuDrop($(this));
        })
        .on("focusin", function (e) {
          if (window.dropDownMenuSkipFocus) {
            window.dropDownMenuSkipFocus = false;
            return;
          }
          if (hideFrameId !== null) {
            cancelAnimationFrame(hideFrameId);
            hideFrameId = null;
          }
          showMenuDrop2($(this));
        })
        .on("focusout", function (e) {
          hideFrameId = requestAnimationFrame(() => {
            hideFrameId = null;
            var box = $(this);
            var focusedElement = document.activeElement;
            if (!$.contains(box[0], focusedElement)) {
              hideMenuDrop2();
            }
          });
        });
    });
  } else if (
    window.matchMedia("(max-width: 1023px)").matches &&
    window.dropDownMenuControl
  ) {
    window.dropDownMenuControl = false;
    wp0.cache.header
      .find(".header_nav_main .with_dm > a")
      .removeAttr("aria-haspopup aria-expanded aria-controls");
    wp0.cache.header
      .find(".header_nav_main .with_dm")
      .off("mouseenter mouseleave focusin focusout");
  }
}
function showMenuDrop(box) {
  window.clearTimeout(menuTimer);

  var link = box.find("> a");
  if (link.attr("aria-expanded") == "false") {
    var menu = function () {
      link.attr("aria-expanded", "true");
      box.find("> .dropdownmenu").removeAttr("hidden");
    };
    menuTimer = window.setTimeout(menu, 400);
  } else {
    var curItemPos = link.attr("data-dp");
    if (closeItem == curItemPos && menuTimer2) {
      window.clearTimeout(menuTimer2);
      closeItem = null;
    }
  }

  return false;
}
function hideMenuDrop(box) {
  var link = box.find("> a");
  if (link.attr("aria-expanded") == "true") {
    var curItemPos = link.attr("data-dp");
    closeItem = curItemPos;

    var menu2 = function () {
      if (closeItem != curItemPos) return;
      link.attr("aria-expanded", "false");
      box.find("> .dropdownmenu").attr("hidden", "");
      closeItem = null;
    };
    menuTimer2 = window.setTimeout(menu2, 400);
  } else {
    if (menuTimer) {
      window.clearTimeout(menuTimer);
    }
  }

  return false;
}
function showMenuDrop2(box) {
  hideMenuDrop2();
  box.find("> a").attr("aria-expanded", "true");
  box.find("> .dropdownmenu").removeAttr("hidden");
}
function hideMenuDrop2() {
  window.clearTimeout(menuTimer);
  window.clearTimeout(menuTimer2);
  wp0.cache.header
    .find(".header_nav_main .with_dm > a[aria-expanded=true]")
    .attr("aria-expanded", "false");
  wp0.cache.header
    .find(".header_nav_main .with_dm > .dropdownmenu")
    .attr("hidden", "");
}

//	VYHLEDAVANI
function search(searchEl, loc1, loc2, loc3, loc4) {
  var modal =
    '<div id="modal" class="modal_search" role="dialog" aria-modal="true" aria-label="' +
    loc1 +
    '" tabindex="-1"><div class="modal_content modal_search_content"></div></div>';
  var data =
    '<div class="in in_1440"><form action="' +
    loc2 +
    '" method="get" class="form_search"><div class="form_search_content"><input type="text" name="q" value=""autocomplete="off"><button type="submit" title="' +
    loc3 +
    '">' +
    loc3 +
    '</button></div><button type="button" class="form_search_close">' +
    loc4 +
    "</button></form></div>";

  //	OTEVRENI MODAL OKNA
  wp0.cache.body.find("#modal").remove();
  window.lastFocus = searchEl;
  openModal(modal, data, true);

  //	ZAVRENI VYHLEDAVANI
  wp0.cache.body
    .find(".modal_search_content .form_search_close")
    .on("click", function (e) {
      e.preventDefault();
      closeModal(true);
    });
}

//	MOBIL MENU
function mobilMenu(
  id,
  lang,
  loc1,
  loc2,
  loc3,
  loc4,
  loc5,
  loc6,
  loc7,
  loc8,
  loc9,
  loc10,
) {
  mobilMenuClose();

  //	PRO JISTOTU ZASCROLUJI NA ZACATEK STRANKY
  $("html, body").scrollTop(0);

  if (id == 0) {
    wp0.cache.body.addClass("lightbox_open");
    wp0.cache.body.find("header, main, footer").attr("aria-hidden", "true");
    wp0.cache.body.find("#lightbox_menu").addClass("open");
  }

  var smallMenuHtml = [];
  smallMenuHtml[smallMenuHtml.length] =
    '<div id="lightbox_menu" class="lightbox open" role="dialog" aria-modal="true" aria-label="' +
    loc1 +
    '" tabindex="-1">';
  smallMenuHtml[smallMenuHtml.length] = '<div class="lightbox_header">';
  smallMenuHtml[smallMenuHtml.length] = '<div class="lightbox_header_leftcol">';
  smallMenuHtml[smallMenuHtml.length] =
    '<div class="lightbox_header_logo"><a href="/"><img src="/static/images/logos/zoo-header.svg" alt="' +
    loc5 +
    '"></a></div>';
  smallMenuHtml[smallMenuHtml.length] = "</div>";
  smallMenuHtml[smallMenuHtml.length] =
    '<div class="lightbox_header_rightcol">';
  /*if (lang == 'cs') {
		smallMenuHtml[smallMenuHtml.length] = '<div class="lightbox_header_language lang_en"><a href="#"><span class="visually_hidden">' + loc6 +'</span></a></div>';
	} else {
		smallMenuHtml[smallMenuHtml.length] = '<div class="lightbox_header_language lang_cs"><a href="#"><span class="visually_hidden">' + loc6 +'</span></a></div>';
	}*/
  smallMenuHtml[smallMenuHtml.length] =
    '<div class="lightbox_header_search"><button type="button">' +
    loc7 +
    "</button></div>";
  smallMenuHtml[smallMenuHtml.length] =
    '<div class="lightbox_header_menu"><button type="button" class="lightbox_header_close"><span class="visually_hidden">' +
    loc8 +
    "</span></button></div>";
  smallMenuHtml[smallMenuHtml.length] = "</div>";
  smallMenuHtml[smallMenuHtml.length] = "</div>";
  smallMenuHtml[smallMenuHtml.length] = '<div class="lightbox_content">';
  if (id != 0) {
    var currentCat = cats.find((c) => c.id == id);
    var currentCatParent = currentCat.parent;
    var currentCatName = currentCat.name;

    smallMenuHtml[smallMenuHtml.length] =
      '<a href="#" class="lightbox_content_back no_fv" data-id="' +
      currentCatParent +
      '"><span>' +
      loc9 +
      "</span></a>";
    smallMenuHtml[smallMenuHtml.length] =
      '<a href="' +
      currentCat.url +
      '" class="lightbox_content_current no_fv"><span class="title">' +
      currentCatName +
      '</span><span class="desc">' +
      loc10 +
      "</span></a>";
  }
  smallMenuHtml[smallMenuHtml.length] = '<ul class="lightbox_content_list">';

  var childs = cats.filter((c) => c.parent == id);
  $.each(childs, function (index1, obj1) {
    var subChilds = cats.filter((c) => c.parent == obj1.id);
    var itemClass = "";
    if (subChilds.length > 0) {
      itemClass = " with_sub";
    }
    smallMenuHtml[smallMenuHtml.length] =
      '<li class="main' +
      itemClass +
      '"><a href="' +
      obj1.url +
      '" data-id="' +
      obj1.id +
      '" class="no_fv">' +
      obj1.name +
      "</a></li>";
  });

  if (id == 0) {
    wp0.cache.footer.find(".important_links li > a").each(function () {
      smallMenuHtml[smallMenuHtml.length] =
        '<li class="sub"><a href="' +
        $(this).attr("href") +
        '" class="no_fv">' +
        $(this).html() +
        "</a></li>";
    });
  }

  smallMenuHtml[smallMenuHtml.length] = "</ul>";

  if (id == 0) {
    smallMenuHtml[smallMenuHtml.length] = '<div class="lightbox_socials_list">';
    smallMenuHtml[smallMenuHtml.length] =
      '<a href="https://www.facebook.com/zoobrno/" class="lightbox_socials_item" target="_blank" rel="noopener noreferrer"><img src="/static/images/socials/fb-beige500.svg" alt="Facebook"></a>';
    smallMenuHtml[smallMenuHtml.length] =
      '<a href="https://www.instagram.com/zoobrno/" class="lightbox_socials_item" target="_blank" rel="noopener noreferrer"><img src="/static/images/socials/ig-beige500.svg" alt="Instagram"></a>';
    smallMenuHtml[smallMenuHtml.length] =
      '<a href="https://www.youtube.com/c/zoobrno" class="lightbox_socials_item" target="_blank" rel="noopener noreferrer"><img src="/static/images/socials/yt-beige500.svg" alt="YouTube"></a>';
    smallMenuHtml[smallMenuHtml.length] = "</div>";
  }

  smallMenuHtml[smallMenuHtml.length] = "</div>";
  smallMenuHtml[smallMenuHtml.length] = "</div>";

  wp0.cache.body.append(smallMenuHtml.join(""));
  wp0.cache.body.find(".lightbox_content").scrollTop(0);

  //	POSUN VPRED
  wp0.cache.body
    .find(
      "#lightbox_menu .lightbox_content_back, #lightbox_menu .lightbox_content_list .with_sub > a",
    )
    .on("click", function (e) {
      e.preventDefault();
      var curItem = $(this).attr("data-id");
      mobilMenu(
        curItem,
        lang,
        loc1,
        loc2,
        loc3,
        loc4,
        loc5,
        loc6,
        loc7,
        loc8,
        loc9,
        loc10,
      );
    });

  trapFocus(wp0.cache.body.find("#lightbox_menu"), false);

  //	VYHLEDAVANI
  wp0.cache.body
    .find("#lightbox_menu .lightbox_header_search button")
    .on("click", function (e) {
      e.preventDefault();

      mobilMenuClose();

      var searchEl = wp0.cache.header.find(".header_search button");
      search(searchEl, loc1, loc2, loc3, loc4);
    });

  //	ZAVRENI
  wp0.cache.body
    .find("#lightbox_menu .lightbox_header_menu button")
    .on("click", function (e) {
      e.preventDefault();
      mobilMenuClose();
    });
}
function mobilMenuClose() {
  if (window.lastFocus) {
    window.lastFocus.focus();
  } else {
    wp0.cache.body.find(".accessibility li:first a").focus();
  }

  wp0.cache.body.removeClass("lightbox_open");
  wp0.cache.body.find("header, main, footer").removeAttr("aria-hidden");
  wp0.cache.body.find("#lightbox_menu").remove();
  window.lastFocus = null;
}

//	GET COOKIE
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
  return null;
}

//	ODESLANI NEWSLETTERU
function newsletter(form) {
  var ajaxUrl = "/newsletter?layout=ajax";
  $.post(ajaxUrl, form.find("input").serializeArray(), function (data) {
    wp0.cache.footer.find(".footer_newsletter_form").html(data);

    //	LOAD CATCHA
    if (wp0.utils.recaptcha == false) {
      wp0.utils.initRecaptcha();
    } else {
      grecaptcha
        .execute("6Lcn2XEsAAAAAFPJiRHKJY_I2FpHN-_95wb1rK_s", { action: "form" })
        .then(function (token) {
          wp0.cache.body.find(".form_captcha .captcha").val(token);
        });
    }

    //	ODESLANI NEWSLETTERU
    wp0.cache.footer.find(".form_newsletter").on("submit", function (e) {
      e.preventDefault();
      newsletter($(this));
    });
  });
}
