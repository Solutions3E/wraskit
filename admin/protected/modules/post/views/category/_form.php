<?php
/* @var $this CategoryController */
/* @var $model Category */
/* @var $form CActiveForm */
?>

<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'category-form',
	// Please note: When you enable ajax validation, make sure the corresponding
	// controller action is handling ajax validation correctly.
	// There is a call to performAjaxValidation() commented in generated controller code.
	// See class documentation of CActiveForm for details on this.
	'enableAjaxValidation'=>false,
)); ?>

	<p class="note">Fields with <span class="required">*</span> are required.</p>

	<?php echo $form->errorSummary($model); ?>

	<div class="row">
		<?php echo $form->labelEx($model,'category_name'); ?>
		<?php echo $form->textField($model,'category_name',array('size'=>60,'maxlength'=>255)); ?>
		<?php echo $form->error($model,'category_name'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'parent_id'); ?>
		<?php //echo $form->textField($model,'parent_id'); ?>
		
		<?php
			/*
			$categoryList = CHtml::ListData(Category::model()->findAll('parent_id = 0'),'id','category_name');
			$htmlOptions	= array('size' => '1', 'prompt'=>'-- select category --',
							'options'=>
                             array(
                               '0'=>array('selected'=>'selected')
                                 )
							);
			echo $form->dropDownList( $model,'parent_id', $categoryList, $htmlOptions ); 
			*/


			/*
			$parents = Category::model()->findAll('parent_id = 0'); 
			foreach ($parents as $parent) {
				//var_dump($parent);
				$child= $parent->getChilds() ; //to get the childs of Parent
			}
			*/

			
			$categoryList = CHtml::ListData(Category::model()->findAll(),'id','category_name','getparent.category_name');


			echo $form->dropDownList($model,'parent_id',$categoryList,array('prompt'=>'Choose'));
		?>

		<?php //echo $form->error($model,'parent_id'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? 'Create' : 'Save'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->