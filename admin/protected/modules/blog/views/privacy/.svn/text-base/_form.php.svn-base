<?php
/* @var $this PrivacyController */
/* @var $model Privacy */
/* @var $form CActiveForm */
?>

<div class="form">
<?php $this->widget('application.extensions.tinymce.SladekTinyMce'); ?>
<script type="text/javascript">
    tinymce.init({selector:'.solution'});
</script> 

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'privacy-form',
	// Please note: When you enable ajax validation, make sure the corresponding
	// controller action is handling ajax validation correctly.
	// There is a call to performAjaxValidation() commented in generated controller code.
	// See class documentation of CActiveForm for details on this.
	'enableAjaxValidation'=>false,
)); ?>

	<?php echo $form->errorSummary($model); ?>

	<div class="row">
		<?php echo $form->labelEx($model,'description'); ?>
		<?php //echo $form->textArea($model,'description',array('rows'=>6, 'cols'=>50)); ?>
		<?php echo $form->textArea($model,'description',  array('rows'=>15,'class'=>"solution add_tkt_textarea" )); ?>
		<?php echo $form->error($model,'description'); ?>
	</div>

	<div class="row">
		<?php //echo $form->labelEx($model,'last_updated_time'); ?>
		<?php //echo $form->textField($model,'last_updated_time'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? 'Create' : 'Save'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->