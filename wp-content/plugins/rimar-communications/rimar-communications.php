<?php
defined( 'ABSPATH' ) or die( 'No script kiddies please!' );
/**
 * Plugin Name: RimaR: Контактные данные
 * Description: Список контактных данных (телефон, адрес и т.д.)
 * Version: 2.0.0
 * Author: radueff
 * Author URI: http://rimar.kg/
 */
add_action( 'admin_menu', 'rimar_communications_register_menu_page' );

function rimar_communications_register_menu_page() {
	//add_menu_page( $page_title, $menu_title, $capability, $menu_slug, $function, $icon_url, $position );
	$page = add_menu_page(
		'Контакты',
		'Контакты',
		'edit_posts',
		'rimar_communications',
		'rimar_communications',
		'dashicons-phone',
		57
	);
	add_action('admin_print_scripts-'. $page, 'rimar_communications_admin_scripts');
	add_action('admin_print_styles-'. $page, 'rimar_communications_admin_styles');
}
function rimar_communications_admin_scripts() {
	wp_enqueue_script('rimar_communications_admin', plugins_url('js/scripts_admin.js', __FILE__), array('jquery'));
	wp_enqueue_script('jquery-ui-sortable');
	wp_enqueue_script('jquery-ui-tabs');
}
function rimar_communications_admin_styles() {
	wp_register_style('rimar_communications_admin_style', plugins_url('css/style_admin.css', __FILE__));
	wp_enqueue_style('rimar_communications_admin_style');
}

function rimar_communications() {
	
	if(isset($_POST['rimar_communications'])) {
		update_option('rimar_communications', $_POST['rimar_communications'], false);
		echo '<div id="message" class="updated fade"><p><strong>Контакты сохранены!</strong></p></div>';
		$rimar_communications = $_POST['rimar_communications'];
	} else {
		$rimar_communications = get_option('rimar_communications');
	}
?>
	
	<div class="wrap">
		<h2>Контактные данные</h2>
		<br />
		
		<form action="" method="post">
			<div id="rimar_tabs_block">
				<ul class="rimar_tabs">
					<li><a href="#tab_general">Основные</a></li>
					<li><a href="#tab_social">Социалки</a></li>
				</ul>
				
				<div class="rimar_tab" id="tab_general">
					<div class="clearfix rimar_cs_block">
						<table>
							<tr>
								<td class="rimar_cs_img">
									<img src="<?php echo plugins_url('images/phone.png', __FILE__); ?>" alt="" />
								</td>
								<td>
									<label for="phone">Телефон</label>
									<input type="text" id="phone" class="rimar_cs_field" name="rimar_communications[phone]" value="<?php echo (isset($rimar_communications['phone'])) ? stripslashes($rimar_communications['phone']) : '' ; ?>" placeholder="Телефон. Например: +996 (312) 12-34-56" />
								</td>
							</tr>
						</table>
					</div>
					<div class="clearfix rimar_cs_block">
						<table>
							<tr>
								<td class="rimar_cs_img">
									<img src="<?php echo plugins_url('images/fax.png', __FILE__); ?>" alt="" />
								</td>
								<td>
									<label for="fax">Факс</label>
									<input type="text" id="fax" class="rimar_cs_field" name="rimar_communications[fax]" value="<?php echo (isset($rimar_communications['fax'])) ? stripslashes($rimar_communications['fax']) : '' ; ?>" placeholder="Факс. Например: +996 (312) 12-34-56" />
								</td>
							</tr>
						</table>
					</div>
					<div class="clearfix rimar_cs_block">
						<table>
							<tr>
								<td class="rimar_cs_img">
									<img src="<?php echo plugins_url('images/email.png', __FILE__); ?>" alt="" />
								</td>
								<td>
									<label for="email">Email</label>
									<input type="text" id="email" class="rimar_cs_field" name="rimar_communications[email]" value="<?php echo (isset($rimar_communications['email'])) ? stripslashes($rimar_communications['email']) : '' ; ?>" placeholder="Email, например: email@domain.com" />
								</td>
							</tr>
						</table>
					</div>
					<div class="clearfix rimar_cs_block">
						<table>
							<tr>
								<td class="rimar_cs_img">
									<img src="<?php echo plugins_url('images/address.png', __FILE__); ?>" alt="" />
								</td>
								<td>
									<label for="address">Адрес</label>
									<div class="rimar_cs_lang">
										<div class="rimar_cs_lang_img">
											<img src="<?php echo plugins_url('images/flag-ru.png', __FILE__); ?>" width="25" alt="" />
										</div>
										<textarea class="rimar_cs_field" rows="2" name="rimar_communications[address][ru]" placeholder="Адрес, например: Кыргызстан, г. Бишкек, 720000, ул. Советская 123"><?php echo (isset($rimar_communications['address']['ru'])) ? stripslashes($rimar_communications['address']['ru']) : '' ; ?></textarea>
									</div>
									<div class="rimar_cs_lang rimar_cs_lang_2">
										<div class="rimar_cs_lang_img">
											<img src="<?php echo plugins_url('images/flag-ky.png', __FILE__); ?>" width="25" alt="" />
										</div>
										<textarea class="rimar_cs_field" rows="2" name="rimar_communications[address][ky]" placeholder="Адрес, например: Кыргызстан, г. Бишкек, 720000, ул. Советская 123"><?php echo (isset($rimar_communications['address']['ky'])) ? stripslashes($rimar_communications['address']['ky']) : '' ; ?></textarea>
									</div>
								</td>
							</tr>
						</table>
					</div>
					<div class="clearfix rimar_cs_block">
						<table>
							<tr>
								<td class="rimar_cs_img">
									<img src="<?php echo plugins_url('images/company.png', __FILE__); ?>" alt="" />
								</td>
								<td>
									<label for="bank">Реквизиты</label>
									<div class="rimar_cs_lang">
										<div class="rimar_cs_lang_img">
											<img src="<?php echo plugins_url('images/flag-ru.png', __FILE__); ?>" width="25" alt="" />
										</div>
										<textarea class="rimar_cs_field" rows="5" name="rimar_communications[bank][ru]" placeholder="Реквизиты"><?php echo (isset($rimar_communications['bank']['ru'])) ? stripslashes($rimar_communications['bank']['ru']) : '' ; ?></textarea>
									</div>
									<div class="rimar_cs_lang rimar_cs_lang_2">
										<div class="rimar_cs_lang_img">
											<img src="<?php echo plugins_url('images/flag-ky.png', __FILE__); ?>" width="25" alt="" />
										</div>
										<textarea class="rimar_cs_field" rows="5" name="rimar_communications[bank][ky]" placeholder="Реквизиты"><?php echo (isset($rimar_communications['bank']['ky'])) ? stripslashes($rimar_communications['bank']['ky']) : '' ; ?></textarea>
									</div>
								</td>
							</tr>
						</table>
					</div>
					<div class="clearfix rimar_cs_block">
						<table>
							<tr>
								<td class="rimar_cs_img">
									<img src="<?php echo plugins_url('images/googlemaps.png', __FILE__); ?>" alt="" />
								</td>
								<td>
									<label for="map">Код iframe для вставки карты</label>
									<textarea id="map" class="rimar_cs_field" name="rimar_communications[map]" placeholder="Код iframe" row="3" style="min-height: 70px;"><?php echo (isset($rimar_communications['map'])) ? stripslashes($rimar_communications['map']) : '' ; ?></textarea>
									
									<ol>
										<li>Откройте <a href="https://www.google.com/maps" target="_blank">Google maps</a></li>
										<li>Найдите нужное место через поиск</li>
										<li>Нажмите "Поделиться"</li>
										<li>В открывшемся модальном окне выберите "Встраивание карт"</li>
										<li>Скопируйте код iframe и вставьте в поле выше</li>
									</ol>
								</td>
							</tr>
						</table>
					</div>
				</div>
				
				<div class="rimar_tab" id="tab_social">
					<div class="rimar_cs_social_sortable">
						<?php 
							if(isset($rimar_communications['social'])) {
								$social_list = $rimar_communications['social'];
							} else {
								$social_list = array(
									'facebook' => '',
									'odnoklassniki' => '',
									'instagram' => ''
								);
							}
						?>
						
						<?php foreach($social_list as $key=>$value) { ?>
							<div class="clearfix rimar_cs_block">
								<table>
									<tr>
										<td class="rimar_cs_img">
											<img src="<?php echo plugins_url('images/'. $key .'.png', __FILE__); ?>" alt="" />
										</td>
										<td>
											<label for="<?php echo $key; ?>_link">Ссылка на <?php echo $key; ?></label>
											<input type="text" id="<?php echo $key; ?>_link" class="rimar_cs_field" name="rimar_communications[social][<?php echo $key; ?>][link]" value="<?php echo (isset($rimar_communications['social'][$key]['link'])) ? stripslashes($rimar_communications['social'][$key]['link']) : '' ; ?>" placeholder="ссылка на <?php echo $key; ?>" />
										</td>
										<td class="rimar_cs_radio">
											<label>Показывать ссылку</label>
											<div>
												<label><input type="radio" name="rimar_communications[social][<?php echo $key; ?>][show]" value="1" <?php echo (isset($rimar_communications['social'][$key]['show']) AND $rimar_communications['social'][$key]['show'] == 1) ? 'checked' : '' ; ?> /> показать</label> 
												<label><input type="radio" name="rimar_communications[social][<?php echo $key; ?>][show]" value="0" <?php echo ($rimar_communications['social'][$key]['show'] == 0) ? 'checked' : '' ; ?> /> скрыть</label>
											</div>
										</td>
										<td class="rimar_cs_sort rimar_cs_social_sort">
											<span class="dashicons-before dashicons-sort"></span>
										</td>
									</tr>
								</table>
							</div>
						<?php } ?>
						
					</div>
				</div>
			</div>
			
			<hr/>
			<input type="submit" value="Сохранить" class="button-primary rimar_save_button" />
		</form>
	</div>
<?php
}
?>