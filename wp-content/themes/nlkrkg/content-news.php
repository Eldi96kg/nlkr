	<div class="clearfix news_item">
		<div class="news_item_img">
			<a href="<?php the_permalink(); ?>">
				<?php 
					if (has_post_thumbnail()) {
						the_post_thumbnail('thumb_default', array('class' => 'img-responsive', 'alt' => trim(strip_tags(get_the_title()))));
					} else {
						echo '<img src="'. get_bloginfo('template_url') .'/images/noimage.jpg" alt="No Image" class="img-responsive" />';
					}
				?>
				<span class="news_item_date">
					<span class="news_item_date_day"><?php echo get_the_date("d"); ?></span>
					<span class="news_item_date_month"><?php echo get_the_date("M"); ?></span>
					<span class="news_item_date_year"><?php echo get_the_date("Y"); ?></span>
				</span>
			</a>
		</div>
		<div class="news_item_body">
			<div class="news_item_title">
				<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
			</div>
			<div class="news_item_text"><?php the_excerpt(); ?></div>
			<div class="news_item_link">
				<a href="<?php the_permalink(); ?>">Подробнее</a>
			</div>
		</div>
	</div>