<?php get_header(); ?>
	<section class="box_content">
		<h1 class="page_title"><?php post_type_archive_title(); ?></h1>
		
		<?php if ( have_posts() ) : ?>
			
			<div class="online_libraries_list">
				<?php while ( have_posts() ) : the_post(); ?>
					<?php $library_link = get_field('library_link'); ?>
					<?php if(!empty($library_link)) { ?>
						<div class="clearfix online_libraries_item">
							<div class="online_libraries_item_img">
								<?php if (has_post_thumbnail()) { ?>
									<a href="<?php echo $library_link; ?>" target="_blank">
										<?php the_post_thumbnail('medium', array('alt' => trim(strip_tags(get_the_title())))); ?>
									</a>
								<?php } ?>
							</div>
							<div class="online_libraries_item_body">
								<a href="<?php echo $library_link; ?>" target="_blank" class="online_libraries_item_title"><?php the_title(); ?></a>
								<div class="page_content online_libraries_item_text"><?php the_content(); ?></div>
							</div>
						</div>
					<?php } ?>
				<?php endwhile; ?>
			</div>
			
			<?php rimar_paging_nav(); ?>
	
		<?php else : ?>
			<div class="alert alert-danger text-center nomargin">Раздел в разработке</div>
		<?php endif; // end have_posts() check ?>
	</section>

<?php get_footer(); ?>