<?php
defined( 'ABSPATH' ) or die( 'No script kiddies please!' );
/**
 * Plugin Name: RimaR: Партнеры
 * Description: Ссылки на сайты партнеров в боковой колонке сайта
 * Version: 1.0.0
 * Author: radueff
 * Author URI: http://rimar.kg/
 */
add_action( 'admin_menu', 'rimar_partners_register_menu_page' );

function rimar_partners_register_menu_page() {
	//add_menu_page( $page_title, $menu_title, $capability, $menu_slug, $function, $icon_url, $position );
	$page = add_menu_page(
		'Лого сбоку',
		'Лого сбоку',
		'edit_posts',
		'rimar_partners',
		'rimar_partners',
		'dashicons-groups',
		57
	);
	add_action('admin_print_scripts-'. $page, 'rimar_partners_admin_scripts');
	add_action('admin_print_styles-'. $page, 'rimar_partners_admin_styles');
}
function rimar_partners_admin_scripts() {
	wp_enqueue_script('rimar_partners_admin', plugins_url('js/scripts_admin.js', __FILE__), array('jquery'));
	wp_enqueue_script('jquery-ui-sortable');
	wp_enqueue_script('jquery-ui-dialog');
	wp_enqueue_media();
}
function rimar_partners_admin_styles() {
	wp_register_style('rimar_partners_admin_style', plugins_url('css/style_admin.css', __FILE__));
	wp_enqueue_style('rimar_partners_admin_style');
	wp_enqueue_style('wp-jquery-ui-dialog');
}

function rimar_partners() {
	
	if(isset($_POST['rimar_partners'])) {
		update_option('rimar_partners', $_POST['rimar_partners'], false);
		echo '<div id="message" class="updated fade"><p><strong>Партнеры сохранены!</strong></p></div>';
		$rimar_partners = $_POST['rimar_partners'];
	} else {
		$rimar_partners = get_option('rimar_partners');
	}
	
	$default_image = plugins_url('images/noimage.jpg', __FILE__);
?>
	
	<div class="wrap">
		<h2>Партнеры (Лого сбоку)</h2>
		<br />
		
		<form action="" method="post">
			
			<table class="rimar_partners_sortable">
				<tbody>
					<?php if(!empty($rimar_partners)) { ?>
						<?php foreach($rimar_partners as $key => $value) { ?>
							<tr>
								<td class="rimar_partners_img">
									<label>Лого</label>
									<?php $image_attributes = wp_get_attachment_image_src($value['image_id'], 'medium'); ?>
									
									<img src="<?php echo ($image_attributes) ? $image_attributes[0] : $default_image; ?>" /><br />
									<input type="hidden" class="rimar_partners_image_id" name="rimar_partners[<?php echo $key; ?>][image_id]" value="<?php echo ($value['image_id']) ? stripslashes($value['image_id']) : '' ; ?>" />
									
									<a href="#" class="button-secondary rimar_partners_image_select">Выбрать фото</a>
								</div>
								<td>
									<label>Ссылка на сайт партнера</label>
									<input type="text" class="rimar_partners_field" name="rimar_partners[<?php echo $key; ?>][link]" value="<?php echo ($value['link']) ? stripslashes($value['link']) : '' ; ?>" />
								</td>
								<td class="rimar_partners_sort">
									<span class="dashicons-before dashicons-sort"></span>
								</td>
								<td class="rimar_partners_remove">
									<a href="#"><span class="dashicons-before dashicons-no-alt"></span></a>
								</td>
							</tr>
						<?php } ?>
					<?php } ?>
				<tbody>
			</table>
			
			<div class="rimar_partners_add">
				<a class="button-secondary">Добавить партнера</a>
			</div>
			
			<hr/>
			<input type="submit" value="Сохранить" class="button-primary rimar_save_button" />
		</form>
	</div>
	
	<div id="dialog-rimar" style="display: none;"></div>
	
	<script>
		var timestamp = '<?php echo time(); ?>';
		var default_image = '<?php echo $default_image; ?>';
		var flagRU = '<?php echo plugins_url('images/flag-ru.png', __FILE__); ?>';
		var flagEN = '<?php echo plugins_url('images/flag-en.png', __FILE__); ?>';
		var flagKY = '<?php echo plugins_url('images/flag-ky.png', __FILE__); ?>';
	</script>
<?php
}
?>