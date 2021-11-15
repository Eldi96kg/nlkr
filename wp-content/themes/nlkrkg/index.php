<?php get_header(); ?>
		
	<section class="box_content">
		<h1 class="page_title"><?php echo get_the_title(get_option('page_for_posts')); ?></h1>
		
		<?php if ( have_posts() ) : ?>
			
			<div class="news_list">
				<?php while ( have_posts() ) : the_post(); ?>
					<?php get_template_part( 'content', 'news' ); ?>
				<?php endwhile; ?>
			</div>
			
			<div class="pagination_news">
				<?php rimar_paging_nav(); ?>
			</div>
			
		<?php else : ?>
			<div class="alert alert-danger text-center">К сожалению, подходящих публикаций не найдено.</div>
		<?php endif; // end have_posts() check ?>
		
	</section>

<?php get_footer(); ?>