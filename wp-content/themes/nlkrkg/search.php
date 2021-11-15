<?php get_header(); ?>
	
	<section class="box_content">
		<h1 class="page_title">Результаты поиска
			<?php if(get_search_query()) { ?>
			для: <?php echo get_search_query(); ?>
			<?php } ?>
		</h1>
		
		<?php if ( have_posts() AND get_search_query() ) : ?>
			<div class="news_list">
				<?php while ( have_posts() ) : the_post(); ?>
					<div class="clearfix news_item">
						<div class="news_item_title">
							<a href="<?php the_permalink(); ?>">
								<?php 
									$title = get_the_title();
									if($s != '') {
										$keys = explode(" ", $s);
										$title = preg_replace('/('.implode('|', $keys) .')/iu', '<span class="search_highlight">\0</span>', $title);
									}
									echo $title;
								?>
							</a>
						</div>
						<div class="news_item_text">
							<?php 
								$excerpt = trim(strip_tags(get_the_excerpt()));
								if($s != '') {
									$keys = explode(" ", $s);
									$excerpt = preg_replace('/('.implode('|', $keys) .')/iu', '<span class="search_highlight">\0</span>', $excerpt);
								}
								echo apply_filters('the_content', $excerpt);
							?>
						</div>
					</div>
				<?php endwhile; ?>
			</div>
			
			<div class="pagination_news">
				<?php rimar_paging_nav(); ?>
			</div>
			
		<?php else : ?>
			<div class="page_content">
				<p class="alert alert-danger nomargin">К сожалению, поиск не дал результатов.</p>
			</div>
		<?php endif; // end have_posts() check ?>
		
	</section>

<?php get_footer(); ?>