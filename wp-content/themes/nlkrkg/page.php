<?php get_header(); ?>

	<?php if ( have_posts() ) : ?>
		<?php while ( have_posts() ) : the_post(); ?>
			
			<section class="box_content">
				<h1 class="page_title"><?php the_title(); ?></h1>
				
				<div class="clearfix page_content">
					<?php the_content(); ?>
				</div>
			</section>
			
		<?php endwhile; ?>
	<?php else : ?>
		<?php get_template_part( 'content', '404' ); ?>
	<?php endif; // end have_posts() check ?>

<?php get_footer(); ?>