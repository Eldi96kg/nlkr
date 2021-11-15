<?php
// General setup
function rimar_setup() {
	//Theme support
	add_theme_support('post-thumbnails');
	add_image_size('thumb_default', 450, 300, true);
	add_image_size('thumb_slider', 850, 340, true);
	
	// Register nav menus
	register_nav_menus(
		array(
			'header_menu' => 'Header Menu',
			'footer_menu_1' => 'Footer Menu 1',
			'footer_menu_2' => 'Footer Menu 2',
			'footer_menu_3' => 'Footer Menu 3',
			'footer_menu_4' => 'Footer Menu 4'
		)
	);
}
add_action('after_setup_theme', 'rimar_setup');


//Add Additional Image Sizes to Post Content Editor
function rimar_image_size_names_choose($sizes) {
	$add_sizes = array(
		'thumb_default' 	=> 'Миниатюра стандартная',
	);
	$sizes = array_merge($sizes, $add_sizes);
	return $sizes;
}
add_filter('image_size_names_choose', 'rimar_image_size_names_choose');


//Remove admin bar css
add_action('get_header', 'rimar_remove_admin_login_header');
function rimar_remove_admin_login_header() {
	remove_action('wp_head', '_admin_bar_bump_cb');
}


// Admin load css
function rimar_load_admin_style() {
	wp_register_style( 'rimar_wp_admin_css', get_template_directory_uri() . '/css/admin.css', false, '1.0.0' );
	wp_enqueue_style( 'rimar_wp_admin_css' );
}
add_action( 'admin_enqueue_scripts', 'rimar_load_admin_style' );


//Custom style to TineMCE
function rimar_add_editor_styles() {
    add_editor_style('editor-style.css');
}
add_action('admin_init', 'rimar_add_editor_styles');


// Cut string with words
function rimar_cut_string($str, $length, $postfix='...', $encoding='UTF-8') {
	if (mb_strlen($str, $encoding) <= $length) {
		return $str;
    }
	$tmp = mb_substr($str, 0, $length, $encoding);
	return mb_substr($tmp, 0, mb_strripos($tmp, ' ', 0, $encoding), $encoding) . $postfix;
}


//Paging
function rimar_paging_nav() {
	if (is_singular()) {
        return;
    }
    global $wp_query;
    /** Stop execution if there's only 1 page */
    if ($wp_query->max_num_pages <= 1) {
        return;
    }
    $paged = get_query_var('paged') ? absint(get_query_var('paged')) : 1;
    $max = intval($wp_query->max_num_pages);
    /** Add current page to the array */
    if ($paged >= 1) {
        $links[] = $paged;
    }
    /** Add the pages around the current page to the array */
    if ($paged >= 3) {
        $links[] = $paged - 1;
        $links[] = $paged - 2;
    }
    if (($paged + 2) <= $max) {
        $links[] = $paged + 2;
        $links[] = $paged + 1;
    }
    echo '<div class="pagination_wrapper"><ul class="pagination">' . "\n";
    /** Previous Post Link */
    if (get_previous_posts_link()) {
        printf('<li class="pagination_previous">%s</li>' . "\n", get_previous_posts_link("<"));
    }
    /** Link to first page, plus ellipses if necessary */
    if (!in_array(1, $links)) {
        $class = 1 == $paged ? ' class="first active"' : ' class="first"';
        printf('<li%s><a href="%s">%s</a></li>' . "\n", $class, esc_url(get_pagenum_link(1)), '1');
        if (!in_array(2, $links)) {
            echo '<li><span class="disabled">...</span></li>';
        }
    }
    /** Link to current page, plus 2 pages in either direction if necessary */
    sort($links);
    foreach ((array)$links as $link) {
        $class = $paged == $link ? ' class="last active"' : '';
        printf('<li%s><a href="%s">%s</a></li>' . "\n", $class, esc_url(get_pagenum_link($link)), $link);
    }
    /** Link to last page, plus ellipses if necessary */
    if (!in_array($max, $links)) {
        if (!in_array($max - 1, $links)) {
            echo '<li><span class="disabled">...</span></li>' . "\n";
        }
        $class = $paged == $max ? ' class="active"' : '';
        printf('<li%s><a href="%s">%s</a></li>' . "\n", $class, esc_url(get_pagenum_link($max)), $max);
    }
    /** Next Post Link */
    if (get_next_posts_link()) {
        printf('<li class="pagination_next">%s</li>' . "\n", get_next_posts_link(">"));
    }
    echo '</ul></div>' . "\n";
}


//Add Missing Alt Tags To WordPress Images
function rimar_add_alt_tags($content) {
	global $post;
	preg_match_all('/<img (.*?)\/>/', $content, $images);
	if(!is_null($images)) {
		foreach($images[1] as $index => $value) {
			if(!preg_match('/alt=/', $value))  {
				$new_img = str_replace('<img', '<img alt="'.$post->post_title.'"', $images[0][$index]);
				$content = str_replace($images[0][$index], $new_img, $content);
			}
		}
	}
	return $content;
}
add_filter('the_content', 'rimar_add_alt_tags', 99999);


//Embed Video Fix
function rimar_add_video_wmode_transparent( $html ) {
	$pattern = '#(src="https?://www.youtube(?:-nocookie)?.com/(?:v|embed)/([a-zA-Z0-9-]+).")#';
	preg_match_all( $pattern, $html, $matches );
	 
	if ( count( $matches ) > 0) {
		foreach ( $matches[0] as $orig_src ) {
			if ( !strstr($orig_src, 'wmode=transparent' )) {
				$add = 'wmode=transparent"';
				 
				if ( !strstr($orig_src, '?') ) {
					$add = '?' . $add;
				}
				$new_src = substr( $orig_src, 0, -1 ) . $add;
				$html = str_replace( $orig_src, $new_src, $html );
			}
		}
	}
	return $html;
}
add_filter('the_excerpt', 'rimar_add_video_wmode_transparent', 10);
add_filter('the_content', 'rimar_add_video_wmode_transparent', 10);


// Remove MORE link from the post excerpt. Replaces "[...]" (appended to automatically generated excerpts) with an ellipsis.
function rimar_remove_excerpt_more( $more ) {
	return '&hellip;';
}
add_filter( 'excerpt_more', 'rimar_remove_excerpt_more' );


// Sets the post excerpt length to selected words.
function rimar_excerpt_length( $length ) {
	return 30;
}
add_filter( 'excerpt_length', 'rimar_excerpt_length' );


//Protect email
function rimar_protect_email($address) {
	$address = strtolower($address);
	$coded = "";
	$unmixedkey = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.@-";
	$inprogresskey = $unmixedkey;
	$mixedkey = "";
	$unshuffled = strlen($unmixedkey);
	for ($i = 0; $i <= strlen($unmixedkey); $i++) {
		$ranpos = rand(0, $unshuffled - 1);
		$nextchar = substr($inprogresskey, $ranpos, 1);
		$mixedkey .= $nextchar;
		$before = substr($inprogresskey, 0, $ranpos);
		$after = substr($inprogresskey, $ranpos + 1, $unshuffled - ($ranpos + 1));
		$inprogresskey = $before . '' . $after;
		$unshuffled -= 1;
	}
	$cipher = $mixedkey;
	$shift = strlen($address);
	$txt = "<script type=\"text/javascript\">\n" .
			"<!-" . "-\n";
	for ($j = 0; $j < strlen($address); $j++) {
		if (strpos($cipher, $address{$j}) == -1) {
			$chr = $address{$j};
			$coded .= $chr;
		} else {
			$chr = (strpos($cipher, $address{$j}) + $shift) % strlen($cipher);
			$coded .= $cipher{$chr};
		}
	}
	$txt .= "\ncoded = \"". $coded ."\"\n" .
			"  key = \"". $cipher ."\"\n" .
			"  shift=coded.length\n" .
			"  link=\"\"\n" .
			"  for (i=0; i<coded.length; i++) {\n" .
			"    if (key.indexOf(coded.charAt(i))==-1) {\n" .
			"      ltr = coded.charAt(i)\n" .
			"      link += (ltr)\n" .
			"    }\n" .
			"    else {     \n" .
			"      ltr = (key.indexOf(coded.charAt(i))-
					shift+key.length) % key.length\n" .
					"      link += (key.charAt(ltr))\n" .
					"    }\n" .
					"  }\n" .
					"document.write(\"<a href='mailto:\"+link+\"'>\"+link+\"</a>\")\n" .
					"\n" .
					"//-" . "->\n" .
					"<" . "/script><noscript>N/A" .
					"<" . "/noscript>";
	return $txt;
}


//Apply filter to phone number
function rimar_generate_tel($number) {
	$phone_number = stripslashes($number);
	$phone_number_link = str_replace(array('.', ' ', '(', ')', '+', '-' ), '', $phone_number);
	return $phone_number_link;
}


//Disable Srcset
function rimar_disable_srcset( $sources ) {
	return false;
}
add_filter( 'wp_calculate_image_srcset', 'rimar_disable_srcset' );
//Remove the reponsive stuff from the content
remove_filter( 'the_content', 'wp_make_content_images_responsive' );
remove_filter( 'wp_head', 'wp_make_content_images_responsive' );


//Disable rss
function rimar_disable_feed() {
	wp_die( __('No feed available, please visit our <a href="'. get_bloginfo('url') .'">homepage</a>!') );
}
add_action('do_feed', 'rimar_disable_feed', 1);
add_action('do_feed_rdf', 'rimar_disable_feed', 1);
add_action('do_feed_rss', 'rimar_disable_feed', 1);
add_action('do_feed_rss2', 'rimar_disable_feed', 1);
add_action('do_feed_atom', 'rimar_disable_feed', 1);
add_action('do_feed_rss2_comments', 'rimar_disable_feed', 1);
add_action('do_feed_atom_comments', 'rimar_disable_feed', 1);


//Remove WordPress canonical links
remove_action('wp_head', 'rel_canonical');


//Remove Yoast seo canonical links
add_filter('wpseo_canonical', '__return_false');


//Add lightgallery to content images
function rimar_add_lightgallery_to_content_image($content) {
	global $post;
	if(isset( $post->ID ) &&  $post->ID) {
		$pattern ="/<a(.*?)href=('|\")(.*?).(bmp|gif|jpeg|jpg|png)('|\")(.*?)>/i";
		$replacement = '<a$1href=$2$3.$4$5 class="lightgallery" title="'.$post->post_title.'"$6>';
		$content = preg_replace($pattern, $replacement, $content);
	}
	
	return $content;
}
add_filter('the_content', 'rimar_add_lightgallery_to_content_image', 10);


// Replaces the title for an attachment link.
function rimar_modify_attachment_link($markup, $id, $size, $permalink, $icon, $text) {
    $_post = get_post( $id );

	if ( empty( $_post ) || ( 'attachment' !== $_post->post_type ) || ! $url = wp_get_attachment_url( $_post->ID ) ) {
		return __( 'Missing Attachment' );
	}

	if ( $permalink ) {
		$url = get_attachment_link( $_post->ID );
	}

	if ( $text ) {
		$link_text = $text;
	} elseif ( $size && 'none' != $size ) {
		$link_text = wp_get_attachment_image( $_post->ID, $size, $icon, $attr );
	} else {
		$link_text = '';
	}

	if ( '' === trim( $link_text ) ) {
		$link_text = $_post->post_title;
	}

	if ( '' === trim( $link_text ) ) {
		$link_text = esc_html( pathinfo( get_attached_file( $_post->ID ), PATHINFO_FILENAME ) );
	}
	
	
    $post_title = esc_html($_post->post_excerpt);
	
    return "<a href='" . esc_url( $url ) . "' title='$post_title'>$link_text</a>";
}
add_filter('wp_get_attachment_link', 'rimar_modify_attachment_link', 10, 6);


//Per page for some Post Types
function rimar_posts_per_page($query) {
	if(!is_admin() && $query->is_main_query() && is_post_type_archive(array('centers', 'departments', 'faq', 'online-libraries'))) {
		$query->set('posts_per_page', '-1');
	}
}
add_action('pre_get_posts', 'rimar_posts_per_page');

?>