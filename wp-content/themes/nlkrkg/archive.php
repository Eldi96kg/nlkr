<?php get_header(); ?>
	<section class="box_content">
		<h1 class="page_title">
			<?php if(is_category()) { ?>
				<?php single_term_title('', 1); ?>
			<?php } elseif(is_archive()) { ?>
				<?php post_type_archive_title(); ?>
			<?php } ?>
		</h1>
		
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