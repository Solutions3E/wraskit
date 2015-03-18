<?php
/* @var $this PostController */
/* @var $model Post */
/* @var $form CActiveForm */
?>

<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'post-form',
	// Please note: When you enable ajax validation, make sure the corresponding
	// controller action is handling ajax validation correctly.
	// There is a call to performAjaxValidation() commented in generated controller code.
	// See class documentation of CActiveForm for details on this.
	'enableAjaxValidation'=>false,
)); ?>

	<p class="note">Fields with <span class="required">*</span> are required.</p>

	<?php echo $form->errorSummary($model); ?>

	
	<div class="row">
		<?php echo $form->labelEx($model,'content'); ?>
		<?php echo $form->textArea($model,'content',array('rows'=>6, 'cols'=>50)); ?>
		<?php echo $form->error($model,'content'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'postId'); ?>
		<?php //echo $form->textField($model,'category_id'); ?>
		<?php //echo $form->error($model,'category_id'); ?>
		<?php
			
			$categorylist = CHtml::listData(Category::model()->findAll(),'id','category_name','getparent.category_name');

			//$htmlOptions	= array('prompt'=>'choose');
			echo $form->dropDownList($model,'category_id', $categorylist,array('prompt'=>'choose') );

		?>

	</div>

	<div class="row">
		<?php //echo $form->labelEx($model,'user_id'); ?>
		<?php $user_Id = Yii::app()->user->id; ?>
		<?php echo $form->hiddenField($model,'user_id',array('value'=>$user_Id)); ?>
		<?php echo $form->error($model,'user_id'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? 'Create' : 'Save'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->