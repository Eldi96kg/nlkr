jQuery(document).ready( function($) {
	
	//Add slide
	newSlideNumber = 1;
	$('.rimar_partners_add a').click(function() {
		var newSlide = '<tr> \
							<td class="rimar_partners_img"> \
								<label>Лого</label> \
								<img src="'+ default_image +'" /><br /> \
								<input type="hidden" class="rimar_partners_image_id" name="rimar_partners['+ timestamp +'-'+ newSlideNumber +'][image_id]" value="" /> \
								<a href="#" class="button-secondary rimar_partners_image_select">Выбрать фото</a> \
							</div> \
							<td> \
								<label>Ссылка на сайт партнера</label> \
								<input type="text" class="rimar_partners_field" name="rimar_partners['+ timestamp +'-'+ newSlideNumber +'][link]" value="" /> \
							</td> \
							<td class="rimar_partners_sort"> \
								<span class="dashicons-before dashicons-sort"></span> \
							</td> \
							<td class="rimar_partners_remove"> \
								<a href="#"><span class="dashicons-before dashicons-no-alt"></span></a> \
							</td> \
						</tr>';
		
		$('.rimar_partners_sortable').append(newSlide);
		newSlideNumber++;
		
		return false;
	});
	
	//Sortable
	$('.rimar_partners_sortable tbody').sortable({
		handle: '.rimar_partners_sort'
	});
	
	//Dialog
	$('#dialog-rimar').dialog({
		resizable: false,
		autoOpen: false,
		modal: true
	});
	
	//Remove slide
	$('.rimar_partners_remove a').live('click', function(e) {
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
	$('.rimar_partners_image_select').live('click', function(e) {
		e.preventDefault();
		var thisSlide = $(this).parents('tr');
		var image = wp.media({ 
			title: 'Выбрать лого',
			multiple: false
		}).open()
		.on('select', function(e){
			var uploaded_image = image.state().get('selection').first();
			var imageID = uploaded_image.toJSON().id;
			var imageURL = uploaded_image.toJSON().url;
			thisSlide.find('.rimar_partners_image_id').val(imageID);
			thisSlide.find('.rimar_partners_img').find('img').attr('src', imageURL);
		});
	});
	
});