<?php
/* @var $this BlogController */
/* @var $model Blog */
/* @var $form CActiveForm */
?>

<div class="form">
<?php $this->widget('application.extensions.tinymce.SladekTinyMce'); ?>
<script type="text/javascript">
    tinymce.init({selector:'.solution'});
</script> 
<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'blog-form',
	// Please note: When you enable ajax validation, make sure the corresponding
	// controller action is handling ajax validation correctly.
	// There is a call to performAjaxValidation() commented in generated controller code.
	// See class documentation of CActiveForm for details on this.
	'enableAjaxValidation'=>false,
)); ?>

	<p class="note">Fields with <span class="required">*</span> are required.</p>

	<?php echo $form->errorSummary($model); ?>

	<div class="row">
		<?php echo $form->labelEx($model,'title'); ?>
		<?php echo $form->textField($model,'title',array('size'=>60,'maxlength'=>200)); ?>
		<?php echo $form->error($model,'title'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'description'); ?>
		<?php //echo $form->textArea($model,'description',array('rows'=>6, 'cols'=>50)); ?>
		<?php echo $form->textArea($model,'description',  array('rows'=>15,'class'=>"solution add_tkt_textarea" )); ?>
		<?php echo $form->error($model,'description'); ?>
	</div>

	<div class="row">
		<?php //echo $form->labelEx($model,'user_id'); ?>
		<?php //echo $form->textField($model,'user_id'); ?>
		<?php //echo $form->error($model,'user_id'); ?>
	</div>

	<div class="row">
		<?php //echo $form->labelEx($model,'category'); ?>
		<?php //echo $form->textField($model,'category'); ?>
		<?php //echo $form->error($model,'category'); ?>
	</div>

	<div class="row">
		<?php //echo $form->labelEx($model,'created_time'); ?>
		<?php //echo $form->textField($model,'created_time'); ?>
		<?php //echo $form->error($model,'created_time'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? 'Create' : 'Save'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->