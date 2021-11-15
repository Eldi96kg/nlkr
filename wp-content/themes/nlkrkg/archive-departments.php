<?php get_header(); ?>
	<section class="box_content">
		<h1 class="page_title"><?php post_type_archive_title(); ?></h1>
		
		<?php if ( have_posts() ) : ?>
			
			<div class="departments_list">
				<?php while ( have_posts() ) : the_post(); ?>
					<div class="departments_item">
						<a href="<?php the_permalink(); ?>"><i class="fa fa-angle-right"></i> <span><?php the_title(); ?></span></a>
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