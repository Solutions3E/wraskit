<?php
/* @var $this PostController */
/* @var $model Post */

$this->breadcrumbs=array(
	'Wrasks'=>array('index'),
	$model->title,
);

$this->menu=array(
	array('label'=>'List Wrasks', 'url'=>array('index')),
	array('label'=>'Create Wrask', 'url'=>array('create')),
	array('label'=>'Update Wrask', 'url'=>array('update', 'id'=>$model->id)),
	array('label'=>'Delete Wrask', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->id),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage Wrask', 'url'=>array('admin')),
);
?>

<h1>View Wrasks #<?php echo $model->id; ?></h1>

<?php 
	$comments = Post::model()->with('comments')->findByPk($model->id);
	//print_r($comments);
	
?>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'id',
		'title',
		'content',
		 array('name'=>'category_name', 'value'=>$model->categories->category_name),
		'user_id',
	),
)); ?>
<h1> Answers </h1>


<?php
	foreach($comments->comments as $row) {

	$this->widget('zii.widgets.CDetailView', array(
	
	'data'=>$row,
	
		'attributes'=>array(
			//array('name'=>'id','value'=>$reply['id']),
			array('name'=>'id','value'=>$row['id']),
			array('name'=>'content','value'=>$row['content']),
		),
	));
	}
?>

