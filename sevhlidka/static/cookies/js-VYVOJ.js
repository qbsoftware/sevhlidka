window.lastFocusCookie = null;

var czechAbbr = 'cs';
var lang = document.getElementsByTagName('html')[0].getAttribute('lang')
if(lang == czechAbbr) {
textAboutCookies = 'Soubory cookies používáme k zajištění funkčnosti webu a s Vaším souhlasem i mj. k personalizaci obsahu našich webových stránek. Kliknutím na tlačítko „Souhlasím“ souhlasíte s využívaním cookies a předáním údajů o chování na webu pro zobrazení cílené reklamy na sociálních sítích a reklamních sítích na dalších webech.'
titleAboutCookies = 'Na vašem soukromí nám záleží';aClose = 'Zavřít';btnSet = 'Cookies';btnReject = 'Přijmout pouze nezbytné';btnOk = 'Souhlasím'
}

settingLinkFooterParentTagName = 'footer';settingLinkFooterParentClass = '';settingLinkFooterClass = 'ca';settingLinkFooter='<li><a href="/cookies" onclick="cookiesAdvSet(event)">'+btnSet+'</a></li>';

const insertAfter = (el, htmlString) => el.insertAdjacentHTML('afterend', htmlString);
function eugetCookie(e){var t,o,s,i=document.cookie.split(";");for(t=0;t<i.length;t++)if(o=i[t].substr(0,i[t].indexOf("=")),s=i[t].substr(i[t].indexOf("=")+1),(o=o.replace(/^\s+|\s+$/g,""))==e)return unescape(s)}
function cookiesAdvOk(){var e=new Date;e.setFullYear(e.getFullYear()+10),document.cookie="cookiesAdv=yes; path=/; expires="+e.toGMTString(),null!=document.getElementById("cookiesAdvSettings")&&(cookiesAdvRemoteControl(!0),cookiesAdvcloseSettings()),null!=document.getElementById("cookiesAdv")&&(document.getElementById("cookiesAdv").remove()),cookieAdvCallScript("yes", "change")}
function cookiesAdvReject(e){var t=new Date;e&&(t.setFullYear(t.getFullYear()+1),document.cookie="cookiesAdv=no; path=/; expires="+t.toGMTString()),null!=document.getElementById("cookiesAdvSettings")&&(cookiesAdvRemoteControl(!1),cookiesAdvcloseSettings()),null!=document.getElementById("cookiesAdv")&&(document.getElementById("cookiesAdv").remove()),e&&cookieAdvCallScript("no", "change")}
function cookiesAdvSet(event) {
	event.preventDefault();
	
	window.lastFocusCookie = event.currentTarget;
	
	document.body.classList.add("noscroll");
	document.querySelector('header').setAttribute('aria-hidden', 'true');
	document.querySelector('main').setAttribute('aria-hidden', 'true');
	document.querySelector('footer').setAttribute('aria-hidden', 'true');
	
	const cookiesAdvDOM = document.querySelector('#cookiesAdv');
	if (cookiesAdvDOM) {
		cookiesAdvDOM.setAttribute('aria-hidden', 'true');
	};
	
	if (document.getElementById("cookiesAdvSettings") !== null) {
		document.getElementById("cookiesAdvSettings").removeAttribute("hidden");
		document.getElementById("cookiesAdvSettings").focus();
    
		const cookieLink = document.querySelector(".cookies a");
		if (cookieLink) {
			cookieLink.setAttribute("aria-controls", "cookiesAdvSettings");
			cookieLink.setAttribute("aria-expanded", "true");
		};
		
		const cookieLink2 = document.querySelector("#cookiesAdv .btn-item a");
		if (cookieLink2) {
			cookieLink2.setAttribute("aria-controls", "cookiesAdvSettings");
			cookieLink2.setAttribute("aria-expanded", "true");
		};
	} else {
        langDoc = lang, "cs" == lang && (langDoc = "cz");
        var e = document.createElement("div");
        e.id = "cookiesAdvSettings", fetch("cookies/" + langDoc + ".html").then(e => e.text()).then(t => {
            e.innerHTML = t, document.body.appendChild(e), cookieAdvSetAfter()
        });
    };
}
function cookiesAdvSetOk(){var e,t=document.getElementsByClassName("remote"),o="";for(e=0;e<t.length;e++){var s=t[e].children;for(k=0;k<s.length;k++)"INPUT"==s[k].tagName&&s[k].checked&&(o+="|"+s[k].getAttribute("name"))}var i=new Date;i.setFullYear(i.getFullYear()+10),document.cookie="cookiesAdv=set"+o+"; path=/; expires="+i.toGMTString(),cookiesAdvcloseSettings(),null!=document.getElementById("cookiesAdv")&&(document.getElementById("cookiesAdv").remove()),cookieAdvCallScript("set"+o, "change")}
function cookieAdvSetAfter() {

	trapFocusCookie(document.getElementById("cookiesAdvSettings"), false);
        
	document.getElementById("cookiesAdvSettings").setAttribute("aria-modal", "true");
	document.getElementById("cookiesAdvSettings").setAttribute("tabindex", "-1");
    
	const cookieLink = document.querySelector(".cookies a");
	if (cookieLink) {
		cookieLink.setAttribute("aria-controls", "cookiesAdvSettings");
		cookieLink.setAttribute("aria-expanded", "true");
	};
	
	const cookieLink2 = document.querySelector("#cookiesAdv .btn-item a");
	if (cookieLink2) {
		cookieLink2.setAttribute("aria-controls", "cookiesAdvSettings");
		cookieLink2.setAttribute("aria-expanded", "true");
	};
	
    if (void 0 != (cookieVal = eugetCookie("cookiesAdv")) && (cookieVal.startsWith("set") || "yes" == cookieVal)) {
        var e, t = document.getElementById("cookiesAdvSettings").getElementsByClassName("remote");
        for (e = 0; e < t.length; e++) {
            var o = t[e].children;
            for (k = 0; k < o.length; k++) "INPUT" == o[k].tagName && (cookieVal.includes(o[k].getAttribute("name")) || "yes" == cookieVal) && (o[k].checked = !0)
        }
    }
    document.getElementById("cookiesAdvSettings").addEventListener("click", function(e) {
        e.target && !e.target.matches("div.content *") && cookiesAdvcloseSettings()
    }), document.getElementById("cookiesAdvSettings").addEventListener("click", function(e) {
        if (
			e.target &&
			(e.target.matches("div.line") ||
			 e.target.matches("div.line em") ||
			 e.target.matches("div.line strong.caMain"))
		) {
			toggleReadState(e.target);
		} else if (e.target.matches("button.close")) {
			cookiesAdvcloseSettings();
		}
    }), document.getElementById("cookiesAdvSettings").addEventListener("keydown", function(e) {
		if (
			e.key === "Enter" &&
			e.target &&
			e.target.matches("div.line")
		) {
			toggleReadState(e.target);
		}
	}), document.addEventListener("keydown", function(e) {
        "Escape" == e.key && null != document.getElementById("cookiesAdvSettings") && cookiesAdvcloseSettings()
    })
}
function trapFocusCookie(modal, focusFirst) {
	const focusableSelectors = 'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]';
	const focusableEls = Array.from(modal.querySelectorAll(focusableSelectors)).filter(el => isVisible(el));

	const firstEl = focusableEls[0];
	const lastEl = focusableEls[focusableEls.length - 1];

	let tabPressed = false;
	
	modal.addEventListener('keydown', function(e) {
		if (e.key === 'Tab' || e.keyCode === 9) {
			tabPressed = true;
		} else {
			tabPressed = false;
		}
	});

	modal.addEventListener('mousedown', function() {
		tabPressed = false;
	});
	
	modal.querySelectorAll('input, select, textarea').forEach(function(el) {
		el.addEventListener('focus', function() {
			if (tabPressed) {
				el.classList.add('focus');
			}
		});
		el.addEventListener('blur', function() {
			el.classList.remove('focus');
		});
	});
	
	modal.addEventListener('keydown', function(e) {
		if (e.key !== 'Tab') return;

		const active = document.activeElement;

		if (e.shiftKey && (active == modal || active === firstEl)) {
			e.preventDefault();
			lastEl.focus();
		} else if (!e.shiftKey && (active == modal || active === lastEl)) {
			e.preventDefault();
			firstEl.focus();
		}
	});
	
	setTimeout(() => {
		if (focusFirst && firstEl) {
			firstEl.focus();
		} else {
			modal.focus();
		};
	}, 50);
	
	function isVisible(el) {
		return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
	}
}
function toggleReadState(target) {
    var parentLine = target.parentElement;
    if (parentLine.classList.contains("line")) {
        parentLine = parentLine.parentElement;
    }

    var lineEl = parentLine.querySelector(".line");
    var textEl = parentLine.querySelector(".text");

    if (parentLine.classList.contains("read")) {
        parentLine.classList.remove("read");
        if (lineEl) lineEl.setAttribute("aria-expanded", "false");
        if (textEl) textEl.setAttribute("hidden", "");
    } else {
        parentLine.classList.add("read");
        if (lineEl) lineEl.setAttribute("aria-expanded", "true");
        if (textEl) textEl.removeAttribute("hidden");
    }
}
function cookiesAdvRemoteControl(e){var t,o=document.getElementById("cookiesAdvSettings").getElementsByClassName("remote");for(t=0;t<o.length;t++){var s=o[t].children;if(!o[t].classList.contains("disabled"))for(k=0;k<s.length;k++)s[k].checked=e}}
function cookiesAdvcloseSettings() {
	if (window.lastFocusCookie != null) {
		window.lastFocusCookie.focus();
			window.lastFocusCookie = null;
	};
	
    document.body.classList.remove("noscroll");
	document.querySelector('header').removeAttribute('aria-hidden');
	document.querySelector('main').removeAttribute('aria-hidden');
	document.querySelector('footer').removeAttribute('aria-hidden');
	
	const cookiesAdvDOM = document.querySelector('#cookiesAdv');
	if (cookiesAdvDOM) {
		cookiesAdvDOM.removeAttribute('aria-hidden');
	};
	
    document.getElementById("cookiesAdvSettings").setAttribute("hidden", "");
        
	const cookieLink = document.querySelector(".cookies a");
	if (cookieLink) {
		cookieLink.setAttribute("aria-expanded", "false");
	};
	
	const cookieLink2 = document.querySelector("#cookiesAdv .btn-item a");
	if (cookieLink2) {
		cookieLink2.setAttribute("aria-expanded", "false");
	};
}
Element.prototype.getCurrentStyle = function(e) {
    if (this.currentStyle) {
        var e = cssProperty(e);
        this.currentStyle[e]
    } else document.defaultView ? document.defaultView.getComputedStyle(this, "").getPropertyValue(e) : this.style[e] && this.style[e];
    return ""
}, window.addEventListener("load", function() {
    if (navigator.cookieEnabled) {
        if (void 0 == (cookieVal = eugetCookie("cookiesAdv"))) {
            var o = document.createElement("div");
            o.id = "cookiesAdv", o.innerHTML = '<div class="in in_1440"><div class="cookies-info"><div class="cookies-info-content"><strong class="caTitle">' + titleAboutCookies + "</strong><p>" + textAboutCookies + '</p></div></div><div class="btns"><div class="btns-content"><button type="button" onclick="cookiesAdvOk()" class="btn1 btn_orange btn_48">' + btnOk + '</button><button type="button" onclick="cookiesAdvReject(true)" class="btn0 btn_green_border btn_48">' + btnReject + '</button><div class="btn-item"><button type="button" onclick="cookiesAdvSet(event)">' + btnSet + '</button></div></div></div></div>', document.body.appendChild(o)
        }
        null != (footer = "" != settingLinkFooterParentTagName ? document.getElementsByTagName(settingLinkFooterParentTagName)[0] : document.getElementsByClassName(settingLinkFooterParentClass)[0]) && (footerElement = footer.getElementsByClassName(settingLinkFooterClass)[0], insertAfter(footerElement, settingLinkFooter))
    }
}), navigator.cookieEnabled && void 0 != (cookieVal = eugetCookie("cookiesAdv")) && cookieAdvCallScript(cookieVal, "load");

//zde se povolí měřící/marketingové/funkční skripty podle zvoleného nastavení
function cookieAdvCallScript(choice, type) {
	

	if(choice == 'yes' || choice.startsWith('set')) {

		//	GA4
		if (type == 'change' && (choice == 'yes' || choice.includes('analytics') || choice.includes('functional') || choice.includes('advert'))) {
		
			let consentSettings = {};
			if (choice === 'yes' || choice.includes('analytics')) {
				consentSettings['analytics_storage'] = 'granted';
			};
			if (choice === 'yes' || choice.includes('functional')) {
				consentSettings['functionality_storage'] = 'granted';
				consentSettings['personalization_storage'] = 'granted';
				consentSettings['security_storage'] = 'granted';
			};
			if (choice === 'yes' || choice.includes('advert')) {
				consentSettings['ad_storage'] = 'granted';
				consentSettings['ad_user_data'] = 'granted';
				consentSettings['ad_personalization'] = 'granted';
			};
			
			gtag('consent', 'update', consentSettings);
			dataLayer.push({event: 'consent_update'});
		};
		
		//	VYKONNE COOKIES
		if (choice == 'yes' || choice.includes('analytics')) {
		};
		
		//	FUNKCNI COOKIES
		if (choice == 'yes' || choice.includes('functional')) {
		};
		
		//	CILENE A REKLAMNI
		if (choice == 'yes' || choice.includes('advert')) {
		};
		
	} else if(choice == 'no') {
	};
}