<?php

//print_r($model);
$this->breadcrumbs=array(
	'Answers'=>array('index'),
	$model->id,
	);

$this->menu=array(
	
	array('label'=>'Category','url'=>array('./category')),
	array('label'=>'Wrask','url'=>array('./post')),
	array('label'=>'List Answers','url'=>array('index')),
		
	array('label'=>'Delete Answer', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->id),'confirm'=>'Are you sure you want to delete this item?')),
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

<h1>View Answer #<?php echo $model->id; ?></h1>
<?php
	$replies	= Comments::model()->with('reply')->findByPk($model->id);
	//print_r($replies);
?>
<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
		'attributes'=>array(
			'id',
			'content',
			'userId',
			'postId',
			'createDate'
		),
	));
?>
<h1> Answer Replies </h1>


<?php
	foreach($replies->reply as $reply) {

	$this->widget('zii.widgets.CDetailView', array(
	
	'data'=>$reply,
	
		'attributes'=>array(
			//array('name'=>'id','value'=>$reply['id']),
			array('name'=>'content','value'=>$reply['content']),
			array('name'=>'userId','value'=>$reply['userId']),
		),
	));
	}
?>


