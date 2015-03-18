<?php

// uncomment the following to define a path alias
// Yii::setPathOfAlias('local','path/to/local-folder');

// This is the main Web application configuration. Any writable
// CWebApplication properties can be configured here.
return array(
	'basePath'=>dirname(__FILE__).DIRECTORY_SEPARATOR.'..',
	'name'=>'Wrask It Admin Panel',

	// preloading 'log' component
	'preload'=>array('log'),

	// autoloading model and component classes
	'import'=>array(
		'application.models.*',
		'application.components.*',
		'application.modules.user.models.*',
		'application.modules.post.models.*',
        'application.modules.user.components.*',
        'application.modules.rights.*',
        'application.modules.rights.components.*',
        'application.modules.blog.models.*',
	),

	'modules'=>array(
		// uncomment the following to enable the Gii tool
		'blog',
		'post',
		'user'=>array(
                'tableUsers' => 'tbl_users',
                'tableProfiles' => 'tbl_profiles',
                'tableProfileFields' => 'tbl_profiles_fields',
        ),
        'rights'=>array(
                'install'=>false,
        ),

		'gii'=>array(
			'class'=>'system.gii.GiiModule',
			'password'=>'123456',
			// If removed, Gii defaults to localhost only. Edit carefully to taste.
			'ipFilters'=>array('127.0.0.1',$_SERVER['REMOTE_ADDR']),
		),
		
	),

	// application components
	'components'=>array(
		'user'=>array(
			// enable cookie-based authentication
			'class'=>'RWebUser',
                // enable cookie-based authentication
                'allowAutoLogin'=>true,
                'loginUrl'=>array('/user/login'),
		),
		'authManager'=>array(
                'class'=>'RDbAuthManager',
                'connectionID'=>'db',
                'defaultRoles'=>array('Authenticated', 'Guest'),
        ),

		'phpThumb'=>array(
        'class'=>'ext.EPhpThumb.EPhpThumb',
    	),

        'aliases' => array(
		 #'RestfullYii' =>realpath(__DIR__ . '/../extensions/starship/RestfullYii'),
		'Category' =>realpath(__DIR__ . '/../modules/post/models/Category.php'),
	    ),
		// uncomment the following to enable URLs in path-format
		
		'urlManager'=>array(
			'urlFormat'=>'path',
			'rules'=>array(
				
				/*'<controller:\w+>/<id:\d+>'=>'<controller>/view',
				'<controller:\w+>/<action:\w+>/<id:\d+>'=>'<controller>/<action>',
				'<controller:\w+>/<action:\w+>'=>'<controller>/<action>',*/

				'post/<id:\d+>/<title:.*?>'=>'post/view',
		        'posts/<tag:.*?>'=>'post/index',
		        // REST patterns
		        array('api/list', 'pattern'=>'api/<model:\w+>', 'verb'=>'GET'),
		        array('api/view', 'pattern'=>'api/<model:\w+>/<id:\d+>', 'verb'=>'GET'),
		        array('api/update', 'pattern'=>'api/<model:\w+>/<id:\d+>', 'verb'=>'PUT'),
		        array('api/delete', 'pattern'=>'api/<model:\w+>/<id:\d+>', 'verb'=>'DELETE'),
		        array('api/create', 'pattern'=>'api/<model:\w+>', 'verb'=>'POST'),
		        // Other controllers
		        '<controller:\w+>/<action:\w+>'=>'<controller>/<action>',
			),
		),
		
		'db'=>array(
			'connectionString' => 'sqlite:'.dirname(__FILE__).'/../data/testdrive.db',
		),
		// uncomment the following to use a MySQL database
		

		'db'=>array(
			'connectionString' => 'mysql:host=localhost;dbname=wraskit',
			'emulatePrepare' => true,
			'username' => 'root',
			'password' => 'root',
			'charset' => 'utf8',
		),
		
		'errorHandler'=>array(
			// use 'site/error' action to display errors
			'errorAction'=>'site/error',
		),
		'log'=>array(
			'class'=>'CLogRouter',
			'routes'=>array(
				array(
					'class'=>'CFileLogRoute',
					'levels'=>'error, warning',
				),
				// uncomment the following to show log messages on web pages
				/*
				array(
					'class'=>'CWebLogRoute',
				),
				*/
			),
		),
	),

	// application-level parameters that can be accessed
	// using Yii::app()->params['paramName']
	'params'=>array(
		// this is used in contact page
		'adminEmail'=>'satheesh@3eplc.com',
	),
);