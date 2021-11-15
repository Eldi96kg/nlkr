<?php
/**
 * Template Name: ContactUs Template
 */
?>

<?php get_header(); ?>

	<?php if ( have_posts() ) : ?>
		<?php while ( have_posts() ) : the_post(); ?>
			<?php $rimar_communications = get_option('rimar_communications'); ?>
			
			<section class="box_content">
				<h1 class="page_title"><?php the_title(); ?></h1>
				
				<div class="page_content">
					<?php the_content(); ?>
				</div>
			</section>
			
			<?php if(isset($rimar_communications) AND !empty($rimar_communications['map'])) { ?>
				<section class="box_content box_margin_top_30">
					<h2 class="page_title">Наше местоположение</h2>
					
					<div class="page_content">
						<div class="row">
							<div class="col-sm-6">
								<?php if(!empty($rimar_communications['address'][$body_lang])) { ?>
									<strong>Адрес:</strong>
									<p><?php echo stripslashes(nl2br($rimar_communications['address'][$body_lang])); ?></p>
								<?php } ?>
								<?php if(!empty($rimar_communications['email'])) { ?>
									<strong>Email:</strong>
									<p><?php echo rimar_protect_email(stripslashes($rimar_communications['email'])); ?></p>
								<?php } ?>
								<?php if(!empty($rimar_communications['phone'])) { ?>
									<strong>Телефон:</strong>
									<p><a href="tel:+<?php echo rimar_generate_tel($rimar_communications['phone']); ?>"><?php echo stripslashes($rimar_communications['phone']); ?></a></p>
								<?php } ?>
								<?php if(!empty($rimar_communications['fax'])) { ?>
									<strong>Факс:</strong>
									<p><a href="fax:+<?php echo rimar_generate_tel($rimar_communications['fax']); ?>"><?php echo stripslashes($rimar_communications['fax']); ?></a></p>
								<?php } ?>
							</div>
							<div class="col-sm-6 contacts_bank">
								<?php if(!empty($rimar_communications['bank'][$body_lang])) { ?>
									<strong>Банковские реквизиты:</strong>
									<p><?php echo stripslashes(nl2br($rimar_communications['bank'][$body_lang])); ?></p>
								<?php } ?>
							</div>
						</div>
					</div>
					
					<div class="google_map"><?php echo stripslashes($rimar_communications['map']); ?></div>
				</section>
			<?php } ?>
			
		<?php endwhile; ?>
	<?php else : ?>
		<?php get_template_part( 'content', '404' ); ?>
	<?php endif; // end have_posts() check ?>

<?php get_footer(); ?>