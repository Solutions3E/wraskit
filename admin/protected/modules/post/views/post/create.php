<?php
/* @var $this PostController */
/* @var $model Post */

$this->breadcrumbs=array(
	'Wrask'=>array('index'),
	'Create',
);

$this->menu=array(
	array('label'=>'List Wrask', 'url'=>array('index')),
	array('label'=>'Manage Wrask', 'url'=>array('admin')),
);
?>

<h1>Create Wrask</h1>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>