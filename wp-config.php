<?php
/**
 * Основные параметры WordPress.
 *
 * Скрипт для создания wp-config.php использует этот файл в процессе
 * установки. Необязательно использовать веб-интерфейс, можно
 * скопировать файл в "wp-config.php" и заполнить значения вручную.
 *
 * Этот файл содержит следующие параметры:
 *
 * * Настройки MySQL
 * * Секретные ключи
 * * Префикс таблиц базы данных
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** Параметры MySQL: Эту информацию можно получить у вашего хостинг-провайдера ** //
/** Имя базы данных для WordPress */
define('DB_NAME', 'nlkrwp');

/** Имя пользователя MySQL */
define('DB_USER', 'nlkr');

/** Пароль к базе данных MySQL */
define('DB_PASSWORD', 'tjbhRqjUVBQGxPmc');

/** Имя сервера MySQL */
define('DB_HOST', 'localhost');

/** Кодировка базы данных для создания таблиц. */
define('DB_CHARSET', 'utf8mb4');

/** Схема сопоставления. Не меняйте, если не уверены. */
define('DB_COLLATE', '');

/**#@+
 * Уникальные ключи и соли для аутентификации.
 *
 * Смените значение каждой константы на уникальную фразу.
 * Можно сгенерировать их с помощью {@link https://api.wordpress.org/secret-key/1.1/salt/ сервиса ключей на WordPress.org}
 * Можно изменить их, чтобы сделать существующие файлы cookies недействительными. Пользователям потребуется авторизоваться снова.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '^Yp$~@-;AE`mA`OANucZ[3GWd*U~CP*s|MQ*IE}!)(d=v-V(pI$yvZib^hf#z@n6');
define('SECURE_AUTH_KEY',  'xI`9H C/sT%-Sn,7/:]~_9N>6hd&O1>?OEdr-|YZ]ZR@t%!0on!Dv.aP:Gd+~VrW');
define('LOGGED_IN_KEY',    'xGhhh#`X4)tBpi}W 0.wtb&H?vm9B>^v43pT2*FKA$~G*tEA+ 4[:c9V~=d{pC*W');
define('NONCE_KEY',        'ze4A>O1-u9ie/D2fP>=oFdTbZ),61S>%WHme9zdQ1Wya,9cvH+Y7N1HO6WKyiA [');
define('AUTH_SALT',        'N[*#px9!kUgZ>+;48L{kXOQ/y8,IPUv^Qp,TMbnrlnl$yY~it0a5bJ/a)g(*lO8C');
define('SECURE_AUTH_SALT', 'GIWB&z|u%+3g].S0MCfd?L1O5TD.A]FNfjgOCsPUXHg/QG#$8fs@5mzoOqI+K.w]');
define('LOGGED_IN_SALT',   'a^#s-}KV1YA@v(`=?%IR{,d?,*8<a`F0vNoiF1CNA)EFO;_$9GF[f.+c^xe5UG>V');
define('NONCE_SALT',       '4HRNV*Oaz`KqE2%ec}JC$bW$--$DSna)iUz:XbaP31kb3?<]Bb4C&GQi+fnue|@s');

/**#@-*/

/**
 * Префикс таблиц в базе данных WordPress.
 *
 * Можно установить несколько сайтов в одну базу данных, если использовать
 * разные префиксы. Пожалуйста, указывайте только цифры, буквы и знак подчеркивания.
 */
$table_prefix  = 'nlkr18_';

/**
 * Для разработчиков: Режим отладки WordPress.
 *
 * Измените это значение на true, чтобы включить отображение уведомлений при разработке.
 * Разработчикам плагинов и тем настоятельно рекомендуется использовать WP_DEBUG
 * в своём рабочем окружении.
 *
 * Информацию о других отладочных константах можно найти в Кодексе.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* Это всё, дальше не редактируем. Успехов! */

/** Абсолютный путь к директории WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Инициализирует переменные WordPress и подключает файлы. */
require_once(ABSPATH . 'wp-settings.php');
