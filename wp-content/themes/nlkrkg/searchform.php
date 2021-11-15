<form role="search" method="get" action="<?php echo home_url( '/' ); ?>">
	<input type="search" name="s" value="<?php echo get_search_query() ?>" placeholder="Поиск по сайту..." autocomplete="off" />
	<button type="submit"><i class="fa fa-search"></i></button>
</form>