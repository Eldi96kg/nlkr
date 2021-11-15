<?php get_header(); ?>
	<section class="box_content">
		<h1 class="page_title"><?php post_type_archive_title(); ?></h1>
		
		<?php if ( have_posts() ) : ?>
			
			<div class="events_list">
				<?php while ( have_posts() ) : the_post(); ?>
					<div class="clearfix events_item">
						<div class="events_item_img">
							<a href="<?php the_permalink(); ?>">
								<?php 
									if (has_post_thumbnail()) {
										the_post_thumbnail('thumb_slider', array('class' => 'img-responsive', 'alt' => trim(strip_tags(get_the_title()))));
									} else {
										echo '<img src="'. get_bloginfo('template_url') .'/images/noimage-slider.jpg" alt="No Image" class="img-responsive" />';
									}
								?>
								
								<?php $event_date = get_field('event_date'); ?>
								<?php if(!empty($event_date)) { ?>
									<?php $event_date_unix = strtotime($event_date); ?>
									<?php $months_list = array("01"=>"января", "02"=>"февраля", "03"=>"марта", "04"=>"апреля", "05"=>"мая", "06"=>"июня", "07"=>"июля", "08"=>"августа", "09"=>"сентября", "10"=>"октября", "11"=>"ноября", "12"=>"декабря"); ?>
									
									<span class="events_item_date">
										<span class="events_item_date_day"><?php echo date('d', $event_date_unix); ?></span>
										<span class="events_item_date_month"><?php echo $months_list[date('m', $event_date_unix)]; ?></span>
										<span class="events_item_date_time"><i class="fa fa-clock-o"></i><?php echo date('H:i', $event_date_unix); ?></span>
									</span>
								<?php } ?>
							</a>
						</div>
						<div class="events_item_title">
							<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
						</div>
						<div class="events_item_text"><?php the_excerpt(); ?></div>
						<div class="events_item_link">
							<a href="<?php the_permalink(); ?>">Подробнее</a>
						</div>
					</div>
				<?php endwhile; ?>
			</div>
			
			<div class="pagination_news">
				<?php rimar_paging_nav(); ?>
			</div>
	
		<?php else : ?>
			<div class="alert alert-danger text-center">К сожалению, событий не найдено.</div>
		<?php endif; // end have_posts() check ?>
	</section>

<?php get_footer(); ?>