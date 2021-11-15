<?php get_header(); ?>
	
	<?php if ( have_posts() ) : ?>
		<?php while ( have_posts() ) : the_post(); ?>
			
			<section class="box_content">
				<h1 class="page_title"><?php the_title(); ?></h1>
				
				<?php if (has_post_thumbnail()) { ?>
					<div class="news_single_img">
						<?php the_post_thumbnail('large', array('class' => 'img-responsive', 'alt' => trim(strip_tags(get_the_title())))); ?>
						<div class="news_item_date">
							<span class="news_item_date_day"><?php echo get_the_date("d"); ?></span>
							<span class="news_item_date_month"><?php echo get_the_date("M"); ?></span>
							<span class="news_item_date_year"><?php echo get_the_date("Y"); ?></span>
						</div>
					</div>
				<?php } else { ?>
					<div class="news_item_date news_single_date">
						<span class="news_item_date_day"><?php echo get_the_date("d"); ?></span>
						<span class="news_item_date_month"><?php echo get_the_date("M"); ?></span>
						<span class="news_item_date_year"><?php echo get_the_date("Y"); ?></span>
					</div>
				<?php } ?>
				
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