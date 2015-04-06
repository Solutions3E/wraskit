<?php
/* @var $this PostController */
/* @var $model Post */

$this->breadcrumbs=array(
	'Home'=>array('/'),
	'Wrasks'=>array('post/admin'),
	'Manage',
);

$this->menu=array(
	/*array('label'=>'List Wrasks', 'url'=>array('index')),
	array('label'=>'Create Wrask', 'url'=>array('create')),*/
);

Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$('#post-grid').yiiGridView('update', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<h1>Manage Wrasks</h1>

<?php //echo CHtml::link('Advanced Search','#',array('class'=>'search-button')); ?>
<div class="search-form" style="display:none">
<?php $this->renderPartial('_search',array(
	'model'=>$model,
)); ?>
</div><!-- search-form -->

<?php $this->widget('zii.widgets.grid.CGridView', array(
	'id'=>'post-grid',
	'dataProvider'=>$model->search(),
	'filter'=>$model,
	'columns'=>array(
		'id',
		'title',
		'content',
		'category_id',
		'user_id',
		array(
			'class'=>'CButtonColumn',
		),
	),
)); ?>
