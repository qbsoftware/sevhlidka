(function(window, document, undefined) {
    
    // Defaults
    // =====================================
   
    var wp = window.wp = {
        utils : {},
        cache : {}
    };

    // Methods
    // =====================================
	wp.utils.init = function() {
		wp.cache.window                = $(window);
		wp.cache.document              = $(document);
		wp.cache.html                  = $('html');
		wp.cache.body                  = $('body');
		wp.cache.header                = $('header.header');
		wp.cache.main              	   = $('main');
		wp.cache.footer                = $('footer');
		
		//	SCROLL TO
		wp.cache.main.find('.heading .btn_green_border').on('click', function(e) {
			e.preventDefault();
			var element = $(this).attr('href');
			$('html, body').animate({
				 scrollTop: $(element).offset().top
			}, 500);
		});
	};
	wp.utils.domLoad = function() {
		//wp.utils.xxx();
	};

	// Initialize Events
	// =====================================

	wp.utils.init();

	jQuery(function($) {
		wp.utils.domLoad();
	});

})(window, document);