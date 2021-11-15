<!DOCTYPE HTML>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
	<meta name="format-detection" content="telephone=no" />
	<title><?php wp_title('|', true, 'right'); ?></title>
	
	<link rel="apple-touch-icon" sizes="180x180" href="<?php bloginfo('template_url'); ?>/images/favicon/apple-touch-icon.png" />
	<link rel="icon" type="image/png" href="<?php bloginfo('template_url'); ?>/images/favicon/favicon-32x32.png" sizes="32x32" />
	<link rel="icon" type="image/png" href="<?php bloginfo('template_url'); ?>/images/favicon/favicon-16x16.png" sizes="16x16" />
	<link rel="manifest" href="<?php bloginfo('template_url'); ?>/images/favicon/site.webmanifest" />
	<link rel="mask-icon" href="<?php bloginfo('template_url'); ?>/images/favicon/safari-pinned-tab.svg" color="#0055a6" />
	<link rel="shortcut icon" href="<?php bloginfo('template_url'); ?>/images/favicon/favicon.ico" />
	<meta name="msapplication-TileColor" content="#0055a6" />
	<meta name="msapplication-config" content="<?php bloginfo('template_url'); ?>/images/favicon/browserconfig.xml" />
	<meta name="theme-color" content="#ffffff" />
	
	<script type='text/javascript' src='<?php echo esc_url(home_url('/')); ?>wp-includes/js/jquery/jquery.js?ver=1.12.4'></script>
	<script type='text/javascript' src='<?php echo esc_url(home_url('/')); ?>wp-includes/js/jquery/jquery-migrate.min.js?ver=1.4.1'></script>
	
	<?php if(is_singular() && get_option('thread_comments')) wp_enqueue_script('comment-reply'); ?>
	
	<?php wp_head(); ?>
	
	<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,400i,600,600i,700,700i" rel="stylesheet" />
	
	<link rel='stylesheet' href='<?php bloginfo('template_url'); ?>/libs/bootstrap/css/bootstrap.min.css' type='text/css' media='all' />
	<link rel='stylesheet' href='<?php bloginfo('template_url'); ?>/libs/fontawesome/css/font-awesome.min.css' type='text/css' media='all' />
	<link rel='stylesheet' href='<?php bloginfo('template_url'); ?>/libs/owlcarousel/css/owl.carousel.min.css' type='text/css' media='all' />
	<link rel='stylesheet' href='<?php bloginfo('template_url'); ?>/libs/lightgallery/css/lightgallery.min.css' type='text/css' media='all' />
	<link rel='stylesheet' href='<?php bloginfo('template_url'); ?>/libs/bootstrap.offcanvas/css/bootstrap.offcanvas.min.css' type='text/css' media='all' />
	<link rel='stylesheet' href='<?php bloginfo('template_url'); ?>/css/main.css' type='text/css' media='all' />
	
	<!--[if lt IE 9]>
		<script type='text/javascript' src='<?php bloginfo('template_url'); ?>/libs/html5ie/html5shiv.min.js'></script>
		<script type='text/javascript' src='<?php bloginfo('template_url'); ?>/libs/html5ie/respond.min.js'></script>
	<![endif]-->
</head>
<?php
	global $body_lang;
	if(function_exists('qtranxf_getLanguage')) {
		if(qtranxf_getLanguage() == 'ky') {
			$body_lang = 'ky';
		} else {
			$body_lang = 'ru';
		}
	} else {
		$body_lang = 'ru';
	}
?>
<body <?php body_class('body_lang_'. $body_lang ); ?>>
	<?php $rimar_communications = get_option('rimar_communications'); ?>
	
	<header class="header">
		<div class="container">
			<?php if(isset($rimar_communications)) { ?>
				<div class="header_info">
					<?php if(!empty($rimar_communications['address'][$body_lang])) { ?>
						<div class="header_info_item header_info_item_address">
							<div class="header_info_item_icon"><i class="fa fa-map-marker"></i></div>
							<div class="header_info_item_body">
								<?php echo stripslashes(nl2br($rimar_communications['address'][$body_lang])); ?>
							</div>
						</div>
					<?php } ?>
					<?php if(!empty($rimar_communications['phone'])) { ?>
						<div class="header_info_item header_info_item_phone">
							<div class="header_info_item_icon"><i class="fa fa-phone"></i></div>
							<div class="header_info_item_body">
								Тел.: <a href="tel:+<?php echo rimar_generate_tel($rimar_communications['phone']); ?>"><?php echo stripslashes($rimar_communications['phone']); ?></a>
								<?php if(!empty($rimar_communications['fax'])) { ?>
									<br />
									Факс: <a href="fax:+<?php echo rimar_generate_tel($rimar_communications['fax']); ?>"><?php echo stripslashes($rimar_communications['fax']); ?></a>
								<?php } ?>
							</div>
						</div>
					<?php } ?>
					<div class="header_info_item header_info_item_right">
						<?php /*<div class="header_lang">
							<a href="#"><img src="<?php bloginfo('template_url'); ?>/images/flag-ky.png" alt="" /></a>
							<a href="#"><img src="<?php bloginfo('template_url'); ?>/images/flag-ru.png" alt="" /></a>
							<a href="#"><img src="<?php bloginfo('template_url'); ?>/images/flag-en.png" alt="" /></a>
						</div>*/ ?>
						<div class="header_search">
							<?php echo get_search_form(); ?>
						</div>
					</div>
					
				</div>
			<?php } ?>
			
			<div class="header_logo">
				<a href="<?php echo esc_url(home_url('/')); ?>">
					<img src="<?php bloginfo('template_url'); ?>/images/logo.png" height="100" alt="<?php echo trim(strip_tags(get_bloginfo('name'))); ?>" />
				</a>
			</div>
			
			<button type="button" class="navbar-toggle offcanvas-toggle" data-toggle="offcanvas" data-target="#js-bootstrap-offcanvas">
				<span class="icon-bar"></span> 
				<span class="icon-bar"></span> 
				<span class="icon-bar"></span>
			</button>
		</div>
	</header>
	
	<nav class="header_menu">
		<div class="container">
			<?php
				if (has_nav_menu('header_menu')) :
					wp_nav_menu(array('theme_location' => 'header_menu'));
				endif;
			?>
		</div>
	</nav>
	
	<?php if(!is_front_page() and function_exists('yoast_breadcrumb')) {
		yoast_breadcrumb('<div class="breadcrumbs"><div class="container">','</div></div>');
	} ?>
	
	<div class="container" id="wrapper">
		<div class="row">
			<div class="col-md-8 col-lg-9 content">
				