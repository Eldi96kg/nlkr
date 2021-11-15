<?php
defined( 'ABSPATH' ) or die( 'No script kiddies please!' );
/**
 * Plugin Name: RimaR: Дополнительные типы данных
 * Description: Активация дополнительных типов данных для некоторых разделов сайта
 * Version: 1.0.0
 * Author: radueff
 * Author URI: http://rimar.kg/
 */

add_action('init', 'rimar_posttypes_register', 0);

function rimar_posttypes_register() {
	//Departments
	register_post_type('departments', array(
		'label'  => null,
		'labels' => array(
			'name'                => 'Отделы',
			'singular_name'       => 'Отдел',
			'menu_name'           => 'Отделы',
			'parent_item_colon'   => 'Текст родительского элемента',
			'all_items'           => 'Все отделы',
			'view_item'           => 'Просмотреть отдел',
			'add_new_item'        => 'Добавить новый отдел',
			'add_new'             => 'Новый отдел',
			'edit_item'           => 'Изменить отдел',
			'update_item'         => 'Обновить отдел',
			'search_items'        => 'Искать отдел',
			'not_found'           => 'Отделы не найдены',
			'not_found_in_trash'  => 'Отделов в Корзине не найдено'
		),
		'description'         => '',
		'public'              => true,
		'publicly_queryable'  => true,
		'exclude_from_search' => false,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_nav_menus'   => true,
		'show_in_admin_bar'   => true,
		'menu_position'       => 21,
		'menu_icon'           => 'dashicons-groups',
		'capability_type'     => 'post',
		'hierarchical'        => false,
		'supports'            => array('title','editor'), // 'title','editor','author','thumbnail','excerpt','trackbacks','custom-fields','comments','revisions','page-attributes','post-formats'
		'taxonomies'          => array(),
		'has_archive'         => true,
		'rewrite'             => true,
		'query_var'           => true,
	));
	
	//Centers
	register_post_type('centers', array(
		'label'  => null,
		'labels' => array(
			'name'                => 'Центры',
			'singular_name'       => 'Центр',
			'menu_name'           => 'Центры',
			'parent_item_colon'   => 'Текст родительского элемента',
			'all_items'           => 'Все центры',
			'view_item'           => 'Просмотреть центр',
			'add_new_item'        => 'Добавить новый центр',
			'add_new'             => 'Новый центр',
			'edit_item'           => 'Изменить центр',
			'update_item'         => 'Обновить центр',
			'search_items'        => 'Искать центр',
			'not_found'           => 'Центры не найдены',
			'not_found_in_trash'  => 'Центров в Корзине не найдено'
		),
		'description'         => '',
		'public'              => true,
		'publicly_queryable'  => true,
		'exclude_from_search' => false,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_nav_menus'   => true,
		'show_in_admin_bar'   => true,
		'menu_position'       => 21,
		'menu_icon'           => 'dashicons-building',
		'capability_type'     => 'post',
		'hierarchical'        => false,
		'supports'            => array('title','editor'), // 'title','editor','author','thumbnail','excerpt','trackbacks','custom-fields','comments','revisions','page-attributes','post-formats'
		'taxonomies'          => array(),
		'has_archive'         => true,
		'rewrite'             => true,
		'query_var'           => true,
	));
	
	//Projects
	register_post_type('projects', array(
		'label'  => null,
		'labels' => array(
			'name'                => 'Выполненные проекты',
			'singular_name'       => 'Проект',
			'menu_name'           => 'Выполненные проекты',
			'parent_item_colon'   => 'Текст родительского элемента',
			'all_items'           => 'Все проекты',
			'view_item'           => 'Просмотреть проект',
			'add_new_item'        => 'Добавить новый проект',
			'add_new'             => 'Новый проект',
			'edit_item'           => 'Изменить проект',
			'update_item'         => 'Обновить проект',
			'search_items'        => 'Искать проект',
			'not_found'           => 'Проекты не найдены',
			'not_found_in_trash'  => 'Проектов в Корзине не найдено'
		),
		'description'         => '',
		'public'              => true,
		'publicly_queryable'  => true,
		'exclude_from_search' => false,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_nav_menus'   => true,
		'show_in_admin_bar'   => true,
		'menu_position'       => 21,
		'menu_icon'           => 'dashicons-archive',
		'capability_type'     => 'post',
		'hierarchical'        => false,
		'supports'            => array('title','editor'), // 'title','editor','author','thumbnail','excerpt','trackbacks','custom-fields','comments','revisions','page-attributes','post-formats'
		'taxonomies'          => array(),
		'has_archive'         => true,
		'rewrite'             => true,
		'query_var'           => true,
	));
	
	//FAQ
	register_post_type('faq', array(
		'label'  => null,
		'labels' => array(
			'name'                => 'Вопросы и ответы',
			'singular_name'       => 'Вопрос',
			'menu_name'           => 'Вопросы и ответы',
			'parent_item_colon'   => 'Текст родительского элемента',
			'all_items'           => 'Все вопросы',
			'view_item'           => 'Просмотреть вопрос',
			'add_new_item'        => 'Добавить новый вопрос',
			'add_new'             => 'Новый вопрос',
			'edit_item'           => 'Изменить вопрос',
			'update_item'         => 'Обновить вопрос',
			'search_items'        => 'Искать вопрос',
			'not_found'           => 'Вопросы не найдены',
			'not_found_in_trash'  => 'Вопросов в Корзине не найдено'
		),
		'description'         => '',
		'public'              => true,
		'publicly_queryable'  => true,
		'exclude_from_search' => false,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_nav_menus'   => true,
		'show_in_admin_bar'   => true,
		'menu_position'       => 21,
		'menu_icon'           => 'dashicons-list-view',
		'capability_type'     => 'post',
		'hierarchical'        => false,
		'supports'            => array('title','editor'), // 'title','editor','author','thumbnail','excerpt','trackbacks','custom-fields','comments','revisions','page-attributes','post-formats'
		'taxonomies'          => array(),
		'has_archive'         => true,
		'rewrite'             => true,
		'query_var'           => true,
	));
	
	//Events
	register_post_type('events', array(
		'label'  => null,
		'labels' => array(
			'name'                => 'Мероприятия',
			'singular_name'       => 'Мероприятие',
			'menu_name'           => 'Мероприятия',
			'parent_item_colon'   => 'Текст родительского элемента',
			'all_items'           => 'Все мероприятия',
			'view_item'           => 'Просмотреть мероприятие',
			'add_new_item'        => 'Добавить новое мероприятие',
			'add_new'             => 'Новое мероприятие',
			'edit_item'           => 'Изменить мероприятие',
			'update_item'         => 'Обновить мероприятие',
			'search_items'        => 'Искать мероприятие',
			'not_found'           => 'Мероприятия не найдены',
			'not_found_in_trash'  => 'Мероприятий в Корзине не найдено'
		),
		'description'         => '',
		'public'              => true,
		'publicly_queryable'  => true,
		'exclude_from_search' => false,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_nav_menus'   => true,
		'show_in_admin_bar'   => true,
		'menu_position'       => 21,
		'menu_icon'           => 'dashicons-calendar-alt',
		'capability_type'     => 'post',
		'hierarchical'        => false,
		'supports'            => array('title','editor','thumbnail'), // 'title','editor','author','thumbnail','excerpt','trackbacks','custom-fields','comments','revisions','page-attributes','post-formats'
		'taxonomies'          => array(),
		'has_archive'         => true,
		'rewrite'             => true,
		'query_var'           => true,
	));
	
	//Online Libraries
	register_post_type('online-libraries', array(
		'label'  => null,
		'labels' => array(
			'name'                => 'Электронные базы данных',
			'singular_name'       => 'Электронная база данных',
			'menu_name'           => 'Электронные базы данных',
			'parent_item_colon'   => 'Текст родительского элемента',
			'all_items'           => 'Все базы данных',
			'view_item'           => 'Просмотреть базу данных',
			'add_new_item'        => 'Добавить новую базу данных',
			'add_new'             => 'Новая база данных',
			'edit_item'           => 'Изменить базу данных',
			'update_item'         => 'Обновить базу данных',
			'search_items'        => 'Искать базу данных',
			'not_found'           => 'Базы данных не найдены',
			'not_found_in_trash'  => 'Баз данных в Корзине не найдено'
		),
		'description'         => '',
		'public'              => true,
		'publicly_queryable'  => true,
		'exclude_from_search' => false,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_nav_menus'   => true,
		'show_in_admin_bar'   => true,
		'menu_position'       => 21,
		'menu_icon'           => 'dashicons-admin-links',
		'capability_type'     => 'post',
		'hierarchical'        => false,
		'supports'            => array('title','editor','thumbnail'), // 'title','editor','author','thumbnail','excerpt','trackbacks','custom-fields','comments','revisions','page-attributes','post-formats'
		'taxonomies'          => array(),
		'has_archive'         => true,
		'rewrite'             => true,
		'query_var'           => true,
	));
	
	//Funds
	register_post_type('funds', array(
		'label'  => null,
		'labels' => array(
			'name'                => 'Фонды и коллекции',
			'singular_name'       => 'Фонд и коллекция',
			'menu_name'           => 'Фонды и коллекции',
			'parent_item_colon'   => 'Текст родительского элемента',
			'all_items'           => 'Все фонды',
			'view_item'           => 'Просмотреть фонд',
			'add_new_item'        => 'Добавить новый фонд',
			'add_new'             => 'Новый фонд',
			'edit_item'           => 'Изменить фонд',
			'update_item'         => 'Обновить фонд',
			'search_items'        => 'Искать фонд',
			'not_found'           => 'Фонды не найдены',
			'not_found_in_trash'  => 'Фондов в Корзине не найдено'
		),
		'description'         => '',
		'public'              => true,
		'publicly_queryable'  => true,
		'exclude_from_search' => false,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_nav_menus'   => true,
		'show_in_admin_bar'   => true,
		'menu_position'       => 21,
		'menu_icon'           => 'dashicons-exerpt-view',
		'capability_type'     => 'post',
		'hierarchical'        => false,
		'supports'            => array('title','editor'), // 'title','editor','author','thumbnail','excerpt','trackbacks','custom-fields','comments','revisions','page-attributes','post-formats'
		'taxonomies'          => array(),
		'has_archive'         => true,
		'rewrite'             => true,
		'query_var'           => true,
	));
	
	//Catalogs
	register_post_type('catalogs', array(
		'label'  => null,
		'labels' => array(
			'name'                => 'Каталоги',
			'singular_name'       => 'Каталог',
			'menu_name'           => 'Каталоги',
			'parent_item_colon'   => 'Текст родительского элемента',
			'all_items'           => 'Все каталоги',
			'view_item'           => 'Просмотреть каталог',
			'add_new_item'        => 'Добавить новый каталог',
			'add_new'             => 'Новый каталог',
			'edit_item'           => 'Изменить каталог',
			'update_item'         => 'Обновить каталог',
			'search_items'        => 'Искать каталог',
			'not_found'           => 'Каталоги не найдены',
			'not_found_in_trash'  => 'Каталогов в Корзине не найдено'
		),
		'description'         => '',
		'public'              => true,
		'publicly_queryable'  => true,
		'exclude_from_search' => false,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_nav_menus'   => true,
		'show_in_admin_bar'   => true,
		'menu_position'       => 21,
		'menu_icon'           => 'dashicons-book-alt',
		'capability_type'     => 'post',
		'hierarchical'        => false,
		'supports'            => array('title','editor'), // 'title','editor','author','thumbnail','excerpt','trackbacks','custom-fields','comments','revisions','page-attributes','post-formats'
		'taxonomies'          => array(),
		'has_archive'         => true,
		'rewrite'             => true,
		'query_var'           => true,
	));
	
	//Halls
	register_post_type('halls', array(
		'label'  => null,
		'labels' => array(
			'name'                => 'Площадки',
			'singular_name'       => 'Площадка',
			'menu_name'           => 'Площадки',
			'parent_item_colon'   => 'Текст родительского элемента',
			'all_items'           => 'Все площадки',
			'view_item'           => 'Просмотреть площадку',
			'add_new_item'        => 'Добавить новую площадку',
			'add_new'             => 'Новая площадка',
			'edit_item'           => 'Изменить площадку',
			'update_item'         => 'Обновить площадку',
			'search_items'        => 'Искать площадку',
			'not_found'           => 'Площадки не найдены',
			'not_found_in_trash'  => 'Площадок в Корзине не найдено'
		),
		'description'         => '',
		'public'              => true,
		'publicly_queryable'  => true,
		'exclude_from_search' => false,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_nav_menus'   => true,
		'show_in_admin_bar'   => true,
		'menu_position'       => 21,
		'menu_icon'           => 'dashicons-microphone',
		'capability_type'     => 'post',
		'hierarchical'        => false,
		'supports'            => array('title','editor','thumbnail'), // 'title','editor','author','thumbnail','excerpt','trackbacks','custom-fields','comments','revisions','page-attributes','post-formats'
		'taxonomies'          => array(),
		'has_archive'         => true,
		'rewrite'             => true,
		'query_var'           => true,
	));
	
	//Rooms
	register_post_type('rooms', array(
		'label'  => null,
		'labels' => array(
			'name'                => 'Читальные залы',
			'singular_name'       => 'Читальный зал',
			'menu_name'           => 'Читальные залы',
			'parent_item_colon'   => 'Текст родительского элемента',
			'all_items'           => 'Все читальные залы',
			'view_item'           => 'Просмотреть читальный зал',
			'add_new_item'        => 'Добавить новый читальный зал',
			'add_new'             => 'Новый читальный зал',
			'edit_item'           => 'Изменить читальный зал',
			'update_item'         => 'Обновить читальный зал',
			'search_items'        => 'Искать читальный зал',
			'not_found'           => 'Читальные залы не найдены',
			'not_found_in_trash'  => 'Читальных залов в Корзине не найдено'
		),
		'description'         => '',
		'public'              => true,
		'publicly_queryable'  => true,
		'exclude_from_search' => false,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_nav_menus'   => true,
		'show_in_admin_bar'   => true,
		'menu_position'       => 21,
		'menu_icon'           => 'dashicons-admin-multisite',
		'capability_type'     => 'post',
		'hierarchical'        => false,
		'supports'            => array('title','editor','thumbnail'), // 'title','editor','author','thumbnail','excerpt','trackbacks','custom-fields','comments','revisions','page-attributes','post-formats'
		'taxonomies'          => array(),
		'has_archive'         => true,
		'rewrite'             => true,
		'query_var'           => true,
	));
	
	//New Books
	register_post_type('new-books', array(
		'label'  => null,
		'labels' => array(
			'name'                => 'Новые поступления',
			'singular_name'       => 'Новое поступление',
			'menu_name'           => 'Новые поступления',
			'parent_item_colon'   => 'Текст родительского элемента',
			'all_items'           => 'Все новые поступления',
			'view_item'           => 'Просмотреть новое поступление',
			'add_new_item'        => 'Добавить новое поступление',
			'add_new'             => 'Новое поступление',
			'edit_item'           => 'Изменить новое поступление',
			'update_item'         => 'Обновить новое поступление',
			'search_items'        => 'Искать новое поступление',
			'not_found'           => 'Новые поступления не найдены',
			'not_found_in_trash'  => 'Новых поступлений в Корзине не найдено'
		),
		'description'         => '',
		'public'              => true,
		'publicly_queryable'  => true,
		'exclude_from_search' => false,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_nav_menus'   => true,
		'show_in_admin_bar'   => true,
		'menu_position'       => 21,
		'menu_icon'           => 'dashicons-clipboard',
		'capability_type'     => 'post',
		'hierarchical'        => false,
		'supports'            => array('title','editor'), // 'title','editor','author','thumbnail','excerpt','trackbacks','custom-fields','comments','revisions','page-attributes','post-formats'
		'taxonomies'          => array(),
		'has_archive'         => true,
		'rewrite'             => true,
		'query_var'           => true,
	));
	
	
}

?>