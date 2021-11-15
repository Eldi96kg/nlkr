jQuery(document).ready( function($) {
	//Tabs
	$('#rimar_tabs_block').tabs({
		activate: function(event, ui) {
			window.location.hash = ui.newPanel.selector;
			jQuery('html, body').animate({ scrollTop: 0 }, 0);
		}
	});
	
	// Switch to correct tab when URL changes (back/forward browser buttons)
	$(window).bind('hashchange', function() {
		if (location.hash !== '') {
			var tabNum = $('a[href="'+ location.hash +'"]').parent().index();
			$('#rimar_tabs_block').tabs('option', 'active', tabNum);
		} else {
			$('#rimar_tabs_block').tabs('option', 'active', 0);
		}
	});
	
	//Sortable
	$('.rimar_cs_social_sortable').sortable({
		handle: '.rimar_cs_social_sort',
	});
});