jQuery(document).ready( function($) {
	
	//Add slide
	newSlideNumber = 1;
	$('.rimar_slider_add a').click(function() {
		var newSlide = '<tr> \
							<td class="rimar_slider_img"> \
								<img src="'+ default_image +'" /><br /> \
								<input type="hidden" class="rimar_slider_image_id" name="rimar_slider['+ timestamp +'-'+ newSlideNumber +'][ru][image_id]" value="" /> \
								<input type="hidden" class="rimar_slider_image_url" name="rimar_slider['+ timestamp +'-'+ newSlideNumber +'][ru][image_url]" value="" /> \
								<a href="#" class="button-secondary rimar_slider_image_select">Выбрать фото</a> \
								<div class="rimar_slider_link"> \
									<input type="text" name="rimar_slider['+ timestamp +'-'+ newSlideNumber +'][ru][link]" value="" placeholder="Ссылка (необязательно)" /> \
								</div> \
							</td> \
							<td class="rimar_slider_img"> \
								<img src="'+ default_image +'" /><br /> \
								<input type="hidden" class="rimar_slider_image_id" name="rimar_slider['+ timestamp +'-'+ newSlideNumber +'][ky][image_id]" value="" /> \
								<input type="hidden" class="rimar_slider_image_url" name="rimar_slider['+ timestamp +'-'+ newSlideNumber +'][ky][image_url]" value="" /> \
								<a href="#" class="button-secondary rimar_slider_image_select">Выбрать фото</a> \
								<div class="rimar_slider_link"> \
									<input type="text" name="rimar_slider['+ timestamp +'-'+ newSlideNumber +'][ky][link]" value="" placeholder="Ссылка (необязательно)" /> \
								</div> \
							</td> \
							<td class="rimar_slider_radio"> \
								<div> \
									<label><input type="radio" name="rimar_slider['+ timestamp +'-'+ newSlideNumber +'][show]" value="1" checked /> показать</label> <br /> \
									<label><input type="radio" name="rimar_slider['+ timestamp +'-'+ newSlideNumber +'][show]" value="0" /> скрыть</label> \
								</div> \
							</td> \
							<td class="rimar_slider_sort"> \
								<span class="dashicons-before dashicons-sort"></span> \
							</td> \
							<td class="rimar_slider_remove"> \
								<a href="#"><span class="dashicons-before dashicons-no-alt"></span></a> \
							</td> \
						</tr>';
		
		$('.rimar_slider_sortable').prepend(newSlide);
		newSlideNumber++;
		
		return false;
	});
	
	//Sortable
	$('.rimar_slider_sortable tbody').sortable({
		handle: '.rimar_slider_sort'
	});
	
	//Dialog
	$('#dialog-rimar').dialog({
		resizable: false,
		autoOpen: false,
		modal: true
	});
	
	//Remove slide
	$('.rimar_slider_remove a').live('click', function(e) {
		e.preventDefault();
		var thisSlide = $(this).parents('tr');
		$('#dialog-rimar').empty().append('Вы уверены?');
		
		$('#dialog-rimar').dialog({
			title: 'Подтвердите удаление',
			buttons: {
				'Подтвердить': function() {
					thisSlide.fadeOut('fast', function() {
						thisSlide.remove();
					});
					$(this).dialog('close');
				},
				'Отменить': function() {
					$(this).dialog('close');
				}
			}
		});

		$('#dialog-rimar').dialog('open');
	});
	
	//Media Upload
	$('.rimar_slider_image_select').live('click', function(e) {
		e.preventDefault();
		var thisSlide = $(this).parents('.rimar_slider_img');
		var image = wp.media({ 
			title: 'Upload Image',
			multiple: false
		}).open()
		.on('select', function(e){
			var uploaded_image = image.state().get('selection').first();
			var imageID = uploaded_image.toJSON().id;
			var imageURL = uploaded_image.toJSON().url;
			thisSlide.find('.rimar_slider_image_id').val(imageID);
			thisSlide.find('.rimar_slider_image_url').val(imageURL);
			thisSlide.find('img').attr('src', imageURL);
		});
	});
	
});