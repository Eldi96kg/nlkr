// Viewport Bugfixes
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
	var msViewportStyle = document.createElement('style')
	msViewportStyle.appendChild(
		document.createTextNode(
			'@-ms-viewport{width:auto!important}'
		)
	)
	document.querySelector('head').appendChild(msViewportStyle)
}

jQuery(document).ready(function($) {
	//Tooltips
	$('[data-toggle="tooltip"]').tooltip();
	
	//Main menu actions
	$('.header_menu li.menu-item-has-children').hover(function() {
		if($(window).width() >= 992) {
			$(this).children('ul').first().stop().slideDown(100);
		}
	}, function() {
		if($(window).width() >= 992) {
			$(this).children('ul').first().stop().slideUp(100);
		}
	});
	$('.header_menu li.menu-item-has-children a').click(function() {
		if($(this).parent().find('ul').length > 0) {
			$(this).parent().find('ul').first().stop().slideToggle(200);
			return false;
		}
	});
	$('.offcanvas_menu li.menu-item-has-children a').click(function() {
		if($(this).parent().find('ul').length > 0) {
			$(this).parent().find('ul').first().stop().slideToggle(200);
			return false;
		}
	});
	
	//Scroll to top
	$('.scroll_up').click(function() {
		$('html, body').animate({ scrollTop: 0 }, 500);
		return false;
	});
	
	//Main Slider
	$('.main_slider').owlCarousel({
		loop: true,
		items: 1,
		nav: true,
		navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
		dots: true,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
        autoHeight: true
	});
	
	//Gallery
	$('.page_content').lightGallery({
		selector: 'a.lightgallery',
		loop: true,
		thumbnail: true,
		showThumbByDefault: false,
		download: false,
		autoplay: false,
		autoplayControls: false,
		counter: false,
		zoom: true
	});
	$('.gallery').lightGallery({
		selector: 'a',
		loop: true,
		thumbnail: true,
		showThumbByDefault: false,
		download: false,
		autoplay: false,
		autoplayControls: false,
		counter: false,
		zoom: true
	});
	$('.videogallery').lightGallery({
		selector: 'a',
		loop: true,
		thumbnail: false,
		showThumbByDefault: false,
		download: false,
		autoplay: false,
		autoplayControls: false,
		counter: false,
		zoom: false
	});
	
	
});


//Scroll to top 
jQuery(window).scroll(function() {
	var scrollSize = jQuery(this).scrollTop();
	
	if (scrollSize > 300) {
		jQuery('.scroll_up').show();
	} else {
		jQuery('.scroll_up').hide();
	}
});
