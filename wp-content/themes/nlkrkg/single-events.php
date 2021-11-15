<?php get_header(); ?>
	
	<?php if ( have_posts() ) : ?>
		<?php while ( have_posts() ) : the_post(); ?>
			
			<section class="box_content">
				<h1 class="page_title"><?php the_title(); ?></h1>
				
				<div class="events_single_img">
					<?php 
						if (has_post_thumbnail()) {
							the_post_thumbnail('large', array('class' => 'img-responsive', 'alt' => trim(strip_tags(get_the_title()))));
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
				</div>
				
				<div class="clearfix page_content">
					<?php the_content(); ?>
				</div>
				
				<div class="social_share">
					<script type="text/javascript" src="//yastatic.net/es5-shims/0.0.2/es5-shims.min.js" charset="utf-8"></script>
					<script type="text/javascript" src="//yastatic.net/share2/share.js" charset="utf-8"></script>
					<div class="ya-share2" data-services="vkontakte,facebook,odnoklassniki,gplus,pinterest,viber,whatsapp,skype,telegram"></div>
				</div>
				
			</section>
			
		<?php endwhile; ?>
	<?php else : ?>
		<?php get_template_part( 'content', '404' ); ?>
	<?php endif; // end have_posts() check ?>

<?php get_footer(); ?>