<?php
/* @var $this PrivacyController */
/* @var $model Privacy */

$this->breadcrumbs=array(
	'Privacies'=>array('index'),
	'Manage',
);

$this->menu=array(
	array('label'=>'List Blog', 'url'=>array('blog/admin')),
	//array('label'=>'Create Privacy', 'url'=>array('create')),
);

Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$('#privacy-grid').yiiGridView('update', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<h1>Privacy Policy </h1>

<?php $this->widget('zii.widgets.grid.CGridView', array(
	'id'=>'privacy-grid',
	'dataProvider'=>$model->search(),
	/*'filter'=>$model,*/
	'columns'=>array(
		/*'id',*/
		/*'description',*/
		
		array(            
            'name'=>'description',
            'type'=>'html',
        ),
        'last_updated_time',
		array(
			'class'=>'CButtonColumn',
			'template'=>'{update}',
		),
	),
)); ?>
