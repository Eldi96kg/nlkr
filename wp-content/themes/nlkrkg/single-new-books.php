<?php get_header(); ?>
	
	<?php if ( have_posts() ) : ?>
		<?php while ( have_posts() ) : the_post(); ?>
			
			<section class="box_content">
				<h1 class="page_title">Новые поступления за <?php the_title(); ?> год</h1>
				
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
						<div class="new_books_select">
							<select onchange="this.options[this.selectedIndex].value && (window.location = this.options[this.selectedIndex].value);" class="form-control">
								<option value="">Выберите год...</option>
								<?php while ( $loop->have_posts() ) : $loop->the_post(); ?>
									<option value="<?php the_permalink(); ?>"><?php the_title(); ?></option>
								<?php endwhile; ?>
							</select>
						</div>
				<?php 
						wp_reset_postdata();
					}
				?>
				
				<div class="clearfix page_content">
					<?php the_content(); ?>
				</div>
				
				<div class="social_share">
					<script type="text/javascript" src="//yastatic.net/es5-shims/0.0.2/es5-shims.min.js" charset="utf-8"></script>
					<script type="text/javascript" src="//yastatic.net/share2/share.js" charset="utf-8"></script>
					<div class="ya-share2" data-services="vkontakte,facebook,odnoklassniki,gplus,pinterest,viber,whatsapp,skype,telegram"></div>
				</div>
				
			</section>
			
		<?php endwhile; ?>
	<?php else : ?>
		<?php get_template_part( 'content', '404' ); ?>
	<?php endif; // end have_posts() check ?>

<?php get_footer(); ?>