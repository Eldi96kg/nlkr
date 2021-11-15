<?php global $body_lang; ?>

<div class="sidebar_item">
	<div class="sidebar_item_title">О Библиотеке</div>
	<div class="clearfix sidebar_item_body sidebar_about">
		<div class="sidebar_about_text">Постановлением Правительства КР № 173 от 1 апреля 2015 г. библиотеке присвоено имя выдающегося поэта Алыкула Осмонова, внесшего огромный вклад в развитие национальной литературы Кыргызстана</div>
		<div class="sidebar_about_alykul">
			<div class="sidebar_about_alykul_img">
				<img src="<?php bloginfo('template_url'); ?>/images/alykul.jpg" alt="" />
			</div>
			<div class="sidebar_about_alykul_body">
				<div class="sidebar_about_alykul_text">
					<div class="sidebar_about_alykul_name">Алыкул Осмонов</div>
					<div class="sidebar_about_alykul_dates">(1915 - 1950)</div>
				</div>
				<ul class="sidebar_about_alykul_links">
					<li><a href="<?php echo get_the_permalink(1294); ?>">Биография</a></li>
					<li><a href="<?php echo get_the_permalink(1685); ?>">Музей</a></li>
				</ul>
			</div>
		</div>
	</div>
</div>

<?php 
	$date_now = date('Y-m-d H:i:s');
	$next_event = get_posts(array(
		'posts_per_page'	=> 1,
		'post_type'			=> 'events',
		'meta_query' 		=> array(
			'relation' 			=> 'AND',
			array(
				'key'			=> 'event_date',
				'compare'		=> '>',
				'value'			=> $date_now,
				'type'			=> 'DATETIME'
			),
		),
		'order'				=> 'ASC',
		'orderby'			=> 'meta_value',
		'meta_key'			=> 'event_date',
		'meta_type'			=> 'DATE'
	));

	if($next_event) {
		$event_date = get_field('event_date', $next_event[0]->ID);
		if(!empty($event_date)) {
			$event_date_unix = strtotime($event_date);
			$months_list = array("01"=>"января", "02"=>"февраля", "03"=>"марта", "04"=>"апреля", "05"=>"мая", "06"=>"июня", "07"=>"июля", "08"=>"августа", "09"=>"сентября", "10"=>"октября", "11"=>"ноября", "12"=>"декабря");
?>
			<div class="sidebar_item">
				<div class="sidebar_item_title">Мероприятия</div>
				<div class="clearfix sidebar_item_body sidebar_events">
					<div class="sidebar_events_item">
						<div class="sidebar_events_item_day"><?php echo date('d', $event_date_unix); ?></div>
						<div class="sidebar_events_item_month"><?php echo $months_list[date('m', $event_date_unix)]; ?></div>
						<div class="sidebar_events_item_hours"><i class="fa fa-clock-o"></i> <?php echo date('H:i', $event_date_unix); ?></div>
						<div class="sidebar_events_item_title"><a href="<?php echo get_permalink($next_event[0]->ID); ?>"><?php echo $next_event[0]->post_title; ?></a></div>
					</div>
				</div>
			</div>
<?php 
		}
	}
?>

<?php $rimar_partners = get_option('rimar_partners'); ?>
<?php if(!empty($rimar_partners)) { ?>
	<div class="sidebar_item sidebar_logos">
		<?php foreach($rimar_partners as $key => $value) { ?>
			<?php $image_attributes = wp_get_attachment_image_src($value['image_id'], 'medium'); ?>
			<?php if($image_attributes AND !empty($value['link'])) { ?>
				<a href="<?php echo stripslashes($value['link']); ?>" class="sidebar_logos_item" target="_blank"><img src="<?php echo $image_attributes[0]; ?>" alt="" /></a>
			<?php } ?>
		<?php } ?>
	</div>
<?php } ?>

<?php if (is_active_sidebar('sidebar_general')) : ?>
	<?php dynamic_sidebar('sidebar_general'); ?>
<?php endif; ?>
