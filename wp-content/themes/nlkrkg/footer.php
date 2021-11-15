				
			</div> <?php //end of .content ?>
			<div class="col-md-4 col-lg-3 sidebar">
				<?php get_sidebar(); ?>
			</div>
		</div> <?php //end of .row ?>
	</div> <?php //end of #wrapper ?>
	
	
	<?php $rimar_communications = get_option('rimar_communications'); ?>
	<?php global $body_lang; ?>
	
	<footer>
		<div class="footer">
			<div class="container">
				<div class="row">
					<div class="col-md-9">
						<div class="row">
							<div class="col-md-3 footer_menu">
								<div class="footer_title">О библиотеке</div>
								<?php
									if (has_nav_menu('footer_menu_1')) :
										wp_nav_menu(array('theme_location' => 'footer_menu_1'));
									endif;
								?>
							</div>
							<div class="col-md-3 footer_menu">
								<div class="footer_title">&nbsp;</div>
								<?php
									if (has_nav_menu('footer_menu_2')) :
										wp_nav_menu(array('theme_location' => 'footer_menu_2'));
									endif;
								?>
							</div>
							<div class="col-md-3 footer_menu">
								<div class="footer_title">Читателям</div>
								<?php
									if (has_nav_menu('footer_menu_3')) :
										wp_nav_menu(array('theme_location' => 'footer_menu_3'));
									endif;
								?>
							</div>
							<div class="col-md-3 footer_menu">
								<div class="footer_title">Информация</div>
								<?php
									if (has_nav_menu('footer_menu_4')) :
										wp_nav_menu(array('theme_location' => 'footer_menu_4'));
									endif;
								?>
							</div>
						</div>
					</div>
					<?php if(isset($rimar_communications)) { ?>
						<div class="col-md-3 footer_contacts">
							<div class="footer_title">Контакты</div>
							<div class="footer_contacts_inner">
								<?php if(!empty($rimar_communications['address'][$body_lang])) { ?>
									<div class="footer_contacts_item">
										<i class="fa fa-map-marker"></i> <?php echo stripslashes(nl2br($rimar_communications['address'][$body_lang])); ?>
									</div>
								<?php } ?>
								<?php if(!empty($rimar_communications['phone'])) { ?>
									<div class="footer_contacts_item">
										<i class="fa fa-phone"></i> 
										<a href="tel:+<?php echo rimar_generate_tel($rimar_communications['phone']); ?>"><?php echo stripslashes($rimar_communications['phone']); ?></a>
									</div>
								<?php } ?>
								<?php if(!empty($rimar_communications['fax'])) { ?>
									<div class="footer_contacts_item">
										<i class="fa fa-fax"></i> 
										<a href="tel:+<?php echo rimar_generate_tel($rimar_communications['fax']); ?>"><?php echo stripslashes($rimar_communications['fax']); ?></a>
									</div>
								<?php } ?>
								<?php if(!empty($rimar_communications['email'])) { ?>
									<div class="footer_contacts_item footer_contacts_item_email">
										<i class="fa fa-envelope"></i> 
										<?php echo rimar_protect_email(stripslashes($rimar_communications['email'])); ?>
									</div>
								<?php } ?>
							</div>
						</div>
					<?php } ?>
				</div>
			</div>
		</div>
		
		<div class="footer_bot">
			<div class="container">
				<div class="clearfix">
					<?php if(isset($rimar_communications) AND !empty($rimar_communications['social'])) { ?>
						<div class="footer_social">
							<?php foreach($rimar_communications['social'] as $key=>$value) { ?>
								<?php if(isset($rimar_communications['social'][$key]['link']) AND $rimar_communications['social'][$key]['show'] == 1) { ?>
									<a href="<?php echo stripslashes($rimar_communications['social'][$key]['link']); ?>" target="_blank">
										<i class="fa fa-<?php echo $key; ?>"></i>
									</a>
								<?php } ?>
							<?php } ?>
						</div>
					<?php } ?>
					<div class="copyright">
						<a href="<?php echo esc_url(home_url('/')); ?>"><?php echo get_bloginfo('name'); ?></a> <span>&copy; 2010-<?php echo date('Y'); ?> Все права защищены</span>
					</div>
				</div>
				<div class="clearfix" style="padding-top: 30px; text-align: center;">
					<!-- WWW.NET.KG , code for http://nlkr.gov.kg -->
						<script language="javascript" type="text/javascript">
						 java="1.0";
						 java1=""+"refer="+escape(document.referrer)+"&amp;page="+escape(window.location.href);
						 document.cookie="astratop=1; path=/";
						 java1+="&amp;c="+(document.cookie?"yes":"now");
						</script>
						<script language="javascript1.1" type="text/javascript">
						 java="1.1";
						 java1+="&amp;java="+(navigator.javaEnabled()?"yes":"now");
						</script>
						<script language="javascript1.2" type="text/javascript">
						 java="1.2";
						 java1+="&amp;razresh="+screen.width+'x'+screen.height+"&amp;cvet="+
						 (((navigator.appName.substring(0,3)=="Mic"))?
						 screen.colorDepth:screen.pixelDepth);
						</script>
						<script language="javascript1.3" type="text/javascript">java="1.3"</script>
						<script language="javascript" type="text/javascript">
						 java1+="&amp;jscript="+java+"&amp;rand="+Math.random();
						 document.write("<a href='http://www.net.kg/stat.php?id=4721&amp;fromsite=4721' target='_blank'>"+
						 "<img src='http://www.net.kg/img.php?id=4721&amp;"+java1+
						 "' border='0' alt='WWW.NET.KG' width='88' height='31' /></a>");
						</script>
						<noscript>
						 <a href="http://www.net.kg/stat.php?id=4721&amp;fromsite=4721" target="_blank"><img src="http://www.net.kg/img.php?id=4721" border="0" alt="WWW.NET.KG" width="88" height="31"/></a>
						</noscript>
					<!-- /WWW.NET.KG -->
				</div>
			</div>
		</div>
	</footer>
	
	<a href="#" class="scroll_up"><i class="fa fa-angle-up"></i></a>
	
	<div class="navbar-offcanvas navbar-offcanvas-touch" id="js-bootstrap-offcanvas">
		<div class="offcanvas_menu">
			<?php
				if (has_nav_menu('header_menu')) :
					wp_nav_menu(array('theme_location' => 'header_menu'));
				endif;
			?>
		</div>
		<div class="offcanvas_search">
			<?php echo get_search_form(); ?>
		</div>
		<?php if(isset($rimar_communications)) { ?>
			<div class="offcanvas_contacts">
				<?php if(!empty($rimar_communications['phone'])) { ?>
					<div class="offcanvas_contacts_item">
						<i class="fa fa-phone"></i>
						<a href="tel:<?php echo rimar_generate_tel($rimar_communications['phone']); ?>" class="offcanvas_phones_num"><?php echo stripslashes($rimar_communications['phone']); ?></a>
					</div>
				<?php } ?>
				<?php if(!empty($rimar_communications['fax'])) { ?>
					<div class="offcanvas_contacts_item">
						<i class="fa fa-fax"></i>
						<a href="tel:<?php echo rimar_generate_tel($rimar_communications['fax']); ?>" class="offcanvas_phones_num"><?php echo stripslashes($rimar_communications['fax']); ?></a>
					</div>
				<?php } ?>
				<?php if(!empty($rimar_communications['address'][$body_lang])) { ?>
					<div class="offcanvas_contacts_item">
						<i class="fa fa-map-marker"></i>
						<?php echo stripslashes(nl2br($rimar_communications['address'][$body_lang])); ?>
					</div>
				<?php } ?>
				<?php if(!empty($rimar_communications['email'])) { ?>
					<div class="offcanvas_contacts_item">
						<i class="fa fa-envelope"></i>
						<?php echo rimar_protect_email(stripslashes($rimar_communications['email'])); ?>
					</div>
				<?php } ?>
			</div>
		<?php } ?>
	</div>
	<a href="#" class="navbar-offcanvas-close"></a>
	
	<?php wp_footer(); ?>
	
	<script type='text/javascript' src='<?php bloginfo('template_url'); ?>/libs/bootstrap/js/bootstrap.min.js'></script>
	<script type='text/javascript' src='<?php bloginfo('template_url'); ?>/libs/owlcarousel/js/owl.carousel.min.js'></script>
	<script type='text/javascript' src='<?php bloginfo('template_url'); ?>/libs/lightgallery/js/lightgallery.min.js'></script>
	<script type='text/javascript' src='<?php bloginfo('template_url'); ?>/libs/lightgallery/js/lg-thumbnail.min.js'></script>
	<script type='text/javascript' src='<?php bloginfo('template_url'); ?>/libs/lightgallery/js/lg-zoom.min.js'></script>
	<script type='text/javascript' src='<?php bloginfo('template_url'); ?>/libs/lightgallery/js/lg-video.min.js'></script>
	<script type='text/javascript' src='<?php bloginfo('template_url'); ?>/libs/bootstrap.offcanvas/js/bootstrap.offcanvas.min.js'></script>
	<script type='text/javascript' src='<?php bloginfo('template_url'); ?>/js/main.js'></script>
	
</body>
</html>