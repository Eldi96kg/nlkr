<?php
/**
 * Template Name: HomePage Template
 */
?>

<?php get_header(); ?>

	<?php if ( have_posts() ) : ?>
		<?php while ( have_posts() ) : the_post(); ?>
			<?php global $body_lang; ?>
			
			<?php $rimar_slider = get_option('rimar_slider'); ?>
			<?php if(!empty($rimar_slider)) { ?>
				<div class="main_slider owl-carousel box_margin_bot_30">
					<?php foreach($rimar_slider as $key => $value) { ?>
						<?php if (!empty($value[$body_lang]['image_id']) AND $value['show'] == 1) { ?>
							<?php $image = wp_get_attachment_image_src($value[$body_lang]['image_id'], 'large'); ?>
							<?php if($image) { ?>
								<div class="item">
									<div class="main_slider_item" style="background-image: url(<?php echo $image[0]; ?>);">
										<?php if (!empty($value[$body_lang]['link'])) { ?>
											<a href="<?php echo $value[$body_lang]['link']; ?>"></a>
										<?php } ?>
									</div>
								</div>
							<?php }	?>
						<?php } ?>
					<?php } ?>
				</div>
			<?php } ?>
			
			<section class="box_content box_margin_top_30">
				<h2 class="page_title">Национальная библиотека Кыргызской Республики <br />имени Алыкула Осмонова</h2>
				
				<div class="clearfix main_about">
					<?php if (has_post_thumbnail()) { ?>
						<div class="main_about_img">
							<?php the_post_thumbnail('medium', array('class' => 'img-responsive', 'alt' => trim(strip_tags(get_the_title())))); ?>
						</div>
					<?php } ?> 
					<div class="page_content main_about_text">
						<?php the_content(); ?>
					</div>
				</div>
			</section>
			
			<section class="box_content box_margin_top_30">
				<div class="news_list">
					<div class="clearfix news_item">
						<div class="news_item_img">
							<img width="300" src="http://nlkr.gov.kg/wp-content/uploads/2019/02/director.jpg" class="img-responsive" alt="">
						</div>
						<div class="news_item_body">
							<h2 class="page_title">Директор</h2>
							<div class="news_item_title">
								Бакашова <br />
								Жылдыз <br />
								Кемеловна
							</div>
							<div class="news_item_text">
								доктор филологических наук, <br />
								профессор, <br />
								заслуженный деятель культуры Кыргызкой Республики
							</div>
						</div>
					</div>
				</div>
			</section>
			
			<?php //News
				$loop = new WP_Query( 
					array(
						'post_status' => 'publish',
						'post_type' => 'post',
						'posts_per_page' => 5,
						'ignore_sticky_posts' => 1
					)
				);
				if ( $loop->have_posts() ) {
			?>
					<section class="box_content box_margin_top_30">
						<h2 class="page_title">Последние новости</h2>
						
						<div class="news_list">
							<?php while ( $loop->have_posts() ) : $loop->the_post(); ?>
								<?php get_template_part( 'content', 'news' ); ?>
							<?php endwhile; ?>
						</div>
						
						<div class="main_news_btn">
							<a href="<?php echo get_permalink(get_option('page_for_posts')); ?>" class="btn btn-sm btn-default">Все новости</a>
						</div>
					</section>
			<?php 
					wp_reset_postdata();
				}
			?>
			
		<?php endwhile; // end of the loop. ?>
	<?php else : ?>
		<?php get_template_part( 'content', '404' ); ?>
	<?php endif; // end have_posts() check ?>

<?php get_footer(); ?>