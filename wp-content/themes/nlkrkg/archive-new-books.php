<?php get_header(); ?>
	<section class="box_content">
		<?php //All Books
			$loop = new WP_Query( 
				array(
					'post_status' => 'publish',
					'post_type' => 'new-books',
					'posts_per_page' => -1,
					'ignore_sticky_posts' => 1
				)
			);
			if ( $loop->have_posts() ) {
		?>
				<h1 class="page_title">Новые поступления за <?php echo $loop->posts[0]->post_title; ?> год</h1>
				<div class="new_books_select">
					<select onchange="this.options[this.selectedIndex].value && (window.location = this.options[this.selectedIndex].value);" class="form-control">
						<option value="">Выберите год...</option>
						<?php while ( $loop->have_posts() ) : $loop->the_post(); ?>
							<option value="<?php the_permalink(); ?>"><?php the_title(); ?></option>
						<?php endwhile; ?>
					</select>
				</div>
				
				<div class="clearfix page_content">
					<?php echo apply_filters('the_content', $loop->posts[0]->post_content); ?>
				</div>
				
				<div class="social_share">
					<script type="text/javascript" src="//yastatic.net/es5-shims/0.0.2/es5-shims.min.js" charset="utf-8"></script>
					<script type="text/javascript" src="//yastatic.net/share2/share.js" charset="utf-8"></script>
					<div class="ya-share2" data-services="vkontakte,facebook,odnoklassniki,gplus,pinterest,viber,whatsapp,skype,telegram"></div>
				</div>
		<?php 
				wp_reset_postdata();
			} else {
		?>
				<h1 class="page_title"><?php post_type_archive_title(); ?></h1>
				<div class="alert alert-danger text-center nomargin">Раздел в разработке</div>
		<?php 
			}
		?>
	</section>

<?php get_footer(); ?>