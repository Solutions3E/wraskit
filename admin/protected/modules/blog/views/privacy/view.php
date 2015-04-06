<?php
/* @var $this PrivacyController */
/* @var $model Privacy */

$this->breadcrumbs=array(
	'Privacies'=>array('index'),
	$model->id,
);

$this->menu=array(
	array('label'=>'List Privacy', 'url'=>array('index')),
	array('label'=>'Create Privacy', 'url'=>array('create')),
	array('label'=>'Update Privacy', 'url'=>array('update', 'id'=>$model->id)),
	array('label'=>'Delete Privacy', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->id),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage Privacy', 'url'=>array('admin')),
);
?>

<h1>View Privacy #<?php echo $model->id; ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'id',
		'description',
		'last_updated_time',
	),
)); ?>
