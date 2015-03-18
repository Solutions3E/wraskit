<?php
/* @var $this PostController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'Wrasks',
);

$this->menu=array(
	array('label'=>'Category', 'url'=>array('./category')),
	array('label'=>'Create Wrask', 'url'=>array('create')),
	array('label'=>'Manage Wrask', 'url'=>array('admin')),
	array('label'=>'Answers', 'url'=>array('./comments')),
);
?>

<h1>Wrasks</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>
