'use strict'
function checkBrowser() {
	/* Устанавливает классы для тега html:
	._webp - если браузер поддерживает этот формат
	._no-webp - если браузер не поддерживает этот формат
	._touch - если это тачскрин. 
	* Добавляет к .wrapper класс _loaded когда дерево DOM построено
    */
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

    function isIE() {
    	ua = navigator.userAgent;
    	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    	return is_ie;
    }
    if (isIE()) {
    	document.querySelector('html').classList.add('ie');
    }
    if (isMobile.any()) {
    	document.querySelector('html').classList.add('_touch');
    }

    function testWebP(callback) {
    	var webP = new Image();
    	webP.onload = webP.onerror = function () {
    		callback(webP.height == 2);
    	};
    	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
        testWebP(function (support) {
            if (support === true) {
                document.querySelector('html').classList.add('_webp');
            } else {
                document.querySelector('html').classList.add('_no-webp');
            }
        });

    function ibg() {
    	if (isIE()) {
    		let ibg = document.querySelectorAll("._ibg");
    		for (var i = 0; i < ibg.length; i++) {
    			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
    				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
    			}
    		}
    	}
    }
    ibg();

    window.addEventListener("load", function () {
    	if (document.querySelector('.wrapper')) {
    		setTimeout(function () {
    			document.querySelector('.wrapper').classList.add('_loaded');
    		}, 0);
    	}
    });

    let unlock = true;
};
checkBrowser();
/* Burger */
function burger_menu() {
    let burger = document.querySelector('.burger');
    let header_nav = document.querySelector('.header__menu-wrap');
    let li_in_nav = header_nav.querySelectorAll('li');
    
    burger.addEventListener('click', function() {
        burger.classList.toggle('burger_active');
        document.body.classList.toggle('_lock');
        header_nav.classList.toggle('header__menu-wrap_active')
    },false);

    for(let i = 0; i < li_in_nav.length; i++) {
        li_in_nav[i].addEventListener('click', function() {
            burger.classList.remove('burger_active');
            document.body.classList.remove('_lock');
            header_nav.classList.remove('header__menu-wrap_active')
        }, false);
    };
};
burger_menu();