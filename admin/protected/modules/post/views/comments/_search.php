<?php
/* @var $this PostController */
/* @var $model Post */
/* @var $form CActiveForm */
?>

<div class="wide form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'action'=>Yii::app()->createUrl($this->route),
	'method'=>'get',
)); ?>

	<div class="row">
		<?php echo $form->label($model,'id'); ?>
		<?php echo $form->textField($model,'id'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'content'); ?>
		<?php echo $form->textArea($model,'content',array('rows'=>6, 'cols'=>50)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'user id'); ?>
		<?php echo $form->textField($model,'userId'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'create date'); ?>
		<?php echo $form->textField($model,'createDate'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'post id'); ?>
		<?php echo $form->textField($model,'postId')?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton('Search'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->