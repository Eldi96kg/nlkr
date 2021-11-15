<?php get_header(); ?>
	<section class="box_content">
		<h1 class="page_title"><?php post_type_archive_title(); ?></h1>
		
		<?php if ( have_posts() ) : ?>
			<div class="page_content">
				<?php while ( have_posts() ) : the_post(); ?>
					<h6 class="no_bot"><?php the_title(); ?></h6>
					<?php the_content(); ?>
				<?php endwhile; ?>
			</div>
			
			<?php rimar_paging_nav(); ?>
			
		<?php else : ?>
			<div class="alert alert-danger text-center nomargin">Раздел в разработке</div>
		<?php endif; // end have_posts() check ?>
		
	</section>

<?php get_footer(); ?>