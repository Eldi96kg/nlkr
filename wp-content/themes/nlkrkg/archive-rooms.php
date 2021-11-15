<?php get_header(); ?>
	<section class="box_content">
		<h1 class="page_title"><?php post_type_archive_title(); ?></h1>
		
		<?php if ( have_posts() ) : ?>
			
			<div class="row halls_list">
				<?php while ( have_posts() ) : the_post(); ?>
					<div class="col-sm-6 halls_item">
						<a href="<?php the_permalink(); ?>">
							<span class="halls_item_img">
								<?php 
									if (has_post_thumbnail()) {
										the_post_thumbnail('thumb_default', array('class' => 'img-responsive', 'alt' => trim(strip_tags(get_the_title()))));
									} else {
										echo '<img src="'. get_bloginfo('template_url') .'/images/noimage.jpg" alt="No Image" class="img-responsive" />';
									}
								?>
							</span>
							<span class="halls_item_title"><?php the_title(); ?></span>
						</a>
					</div>
				<?php endwhile; ?>
			</div>
			
			<div class="pagination_news">
				<?php rimar_paging_nav(); ?>
			</div>
	
		<?php else : ?>
			<div class="alert alert-danger text-center nomargin">Раздел в разработке</div>
		<?php endif; // end have_posts() check ?>
	</section>

<?php get_footer(); ?>