<?php
/* @var $this BlogController */
/* @var $model Blog */

$this->breadcrumbs=array(
	'Home'=>array('/'),
	'Blogs'=>array('blog/admin'),
	'Manage',
);

$this->menu=array(
	array('label'=>'Create Blog', 'url'=>array('create')),
	array('label'=>'Privacy policy', 'url'=>array('/blog/privacy/admin')),
);

Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$('#blog-grid').yiiGridView('update', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<h1>Manage Blogs</h1>

<?php $this->widget('zii.widgets.grid.CGridView', array(
	'id'=>'blog-grid',
	'dataProvider'=>$model->search(),
	'filter'=>$model,
	'columns'=>array(
		'id',
		'title',

		array(            
            'name'=>'description',
            'type'=>'html',
        ),
		/*'user_id',
		'category',*/
		'created_time',
		array(
			'class'=>'CButtonColumn',
			'template'=>'{update}{delete}',
		),
	),
)); ?>
