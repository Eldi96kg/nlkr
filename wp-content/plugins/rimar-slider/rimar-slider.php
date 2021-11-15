<?php
defined( 'ABSPATH' ) or die( 'No script kiddies please!' );
/**
 * Plugin Name: RimaR: Слайдер
 * Description: Слайдер для главной
 * Version: 1.0.0
 * Author: radueff
 * Author URI: http://rimar.kg/
 */
add_action( 'admin_menu', 'rimar_slider_register_menu_page' );

function rimar_slider_register_menu_page() {
	//add_menu_page( $page_title, $menu_title, $capability, $menu_slug, $function, $icon_url, $position );
	$page = add_menu_page(
		'Слайдер',
		'Слайдер',
		'edit_posts',
		'rimar_slider',
		'rimar_slider',
		'dashicons-images-alt2',
		57
	);
	add_action('admin_print_scripts-'. $page, 'rimar_slider_admin_scripts');
	add_action('admin_print_styles-'. $page, 'rimar_slider_admin_styles');
}
function rimar_slider_admin_scripts() {
	wp_enqueue_script('rimar_slider_admin', plugins_url('js/scripts_admin.js', __FILE__), array('jquery'));
	wp_enqueue_script('jquery-ui-sortable');
	wp_enqueue_script('jquery-ui-dialog');
	wp_enqueue_media();
}
function rimar_slider_admin_styles() {
	wp_register_style('rimar_slider_admin_style', plugins_url('css/style_admin.css', __FILE__));
	wp_enqueue_style('rimar_slider_admin_style');
	wp_enqueue_style('wp-jquery-ui-dialog');
}

function rimar_slider() {
	
	if(isset($_POST['rimar_slider'])) {
		update_option('rimar_slider', $_POST['rimar_slider'], false);
		echo '<div id="message" class="updated fade"><p><strong>Слайдер сохранен!</strong></p></div>';
		$rimar_slider = $_POST['rimar_slider'];
	} else {
		$rimar_slider = get_option('rimar_slider');
	}
	
	$default_image = plugins_url('images/noimage.jpg', __FILE__);
?>
	
	<div class="wrap">
		<h2>Слайдер (850*340 пикселей)</h2>
		<br />
		
		<form action="" method="post">
			
			<div class="rimar_slider_add">
				<a class="button-secondary">Добавить слайд</a>
			</div>
			<table class="rimar_slider_sortable">
				<thead>
					<tr>
						<th><img src="<?php echo plugins_url('images/flag-ru.png', __FILE__); ?>" width="25" alt="" /></th>
						<th><img src="<?php echo plugins_url('images/flag-ky.png', __FILE__); ?>" width="25" alt="" /></th>
						<th>Показывать слайд</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<?php if(!empty($rimar_slider)) { ?>
						<?php foreach($rimar_slider as $key => $value) { ?>
							<tr>
								<td class="rimar_slider_img">
									<img src="<?php echo ($value['ru']['image_url']) ? $value['ru']['image_url'] : $default_image ; ?>" /><br />
									<input type="hidden" class="rimar_slider_image_id" name="rimar_slider[<?php echo $key; ?>][ru][image_id]" value="<?php echo ($value['ru']['image_id']) ? stripslashes($value['ru']['image_id']) : '' ; ?>" />
									<input type="hidden" class="rimar_slider_image_url" name="rimar_slider[<?php echo $key; ?>][ru][image_url]" value="<?php echo ($value['ru']['image_url']) ? stripslashes($value['ru']['image_url']) : '' ; ?>" />
									<a href="#" class="button-secondary rimar_slider_image_select">Выбрать фото</a>
									<div class="rimar_slider_link">
										<input type="text" name="rimar_slider[<?php echo $key; ?>][ru][link]" value="<?php echo ($value['ru']['link']) ? stripslashes($value['ru']['link']) : '' ; ?>" placeholder="Ссылка (необязательно)" />
									</div>
								</td>
								<td class="rimar_slider_img">
									<img src="<?php echo ($value['ky']['image_url']) ? $value['ky']['image_url'] : $default_image ; ?>" /><br />
									<input type="hidden" class="rimar_slider_image_id" name="rimar_slider[<?php echo $key; ?>][ky][image_id]" value="<?php echo ($value['ky']['image_id']) ? stripslashes($value['ky']['image_id']) : '' ; ?>" />
									<input type="hidden" class="rimar_slider_image_url" name="rimar_slider[<?php echo $key; ?>][ky][image_url]" value="<?php echo ($value['ky']['image_url']) ? stripslashes($value['ky']['image_url']) : '' ; ?>" />
									<a href="#" class="button-secondary rimar_slider_image_select">Выбрать фото</a>
									<div class="rimar_slider_link">
										<input type="text" name="rimar_slider[<?php echo $key; ?>][ky][link]" value="<?php echo ($value['ky']['link']) ? stripslashes($value['ky']['link']) : '' ; ?>" placeholder="Ссылка (необязательно)" />
									</div>
								</td>
								<td class="rimar_slider_radio">
									<div>
										<label><input type="radio" name="rimar_slider[<?php echo $key; ?>][show]" value="1" <?php echo (isset($rimar_slider[$key]['show']) AND $rimar_slider[$key]['show'] == 1) ? 'checked' : '' ; ?> /> показать</label> <br />
										<label><input type="radio" name="rimar_slider[<?php echo $key; ?>][show]" value="0" <?php echo ($rimar_slider[$key]['show'] == 0) ? 'checked' : '' ; ?> /> скрыть</label>
									</div>
								</td>
								<td class="rimar_slider_sort">
									<span class="dashicons-before dashicons-sort"></span>
								</td>
								<td class="rimar_slider_remove">
									<a href="#"><span class="dashicons-before dashicons-no-alt"></span></a>
								</td>
							</tr>
						<?php } ?>
					<?php } ?>
				<tbody>
			</table>
			<hr/>
			<input type="submit" value="Сохранить" class="button-primary rimar_save_button" />
		</form>
	</div>
	
	<div id="dialog-rimar" style="display: none;"></div>
	
	<script>
		var timestamp = '<?php echo time(); ?>';
		var default_image = '<?php echo $default_image; ?>';
	</script>
<?php
}
?>