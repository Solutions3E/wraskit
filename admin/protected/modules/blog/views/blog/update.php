<?php
/* @var $this BlogController */
/* @var $model Blog */

$this->breadcrumbs=array(
	'Home'=>array('/'),
	'Blogs'=>array('blog/admin'),
	'Update',
);

$this->menu=array(
	array('label'=>'List Blog', 'url'=>array('blog/admin')),
	array('label'=>'Privacy policy', 'url'=>array('/blog/privacy/admin')),
);
?>

<h1>Update Blog <?php echo $model->id; ?></h1>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>