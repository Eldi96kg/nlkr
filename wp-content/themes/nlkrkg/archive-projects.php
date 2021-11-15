<?php get_header(); ?>
	<section class="box_content">
		<h1 class="page_title"><?php post_type_archive_title(); ?></h1>
		
		<?php if ( have_posts() ) : ?>
			
			<div class="news_list">
				<?php while ( have_posts() ) : the_post(); ?>
					<div class="clearfix news_item">
						<div class="news_item_title">
							<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
						</div>
						<div class="news_item_text"><?php the_excerpt(); ?></div>
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