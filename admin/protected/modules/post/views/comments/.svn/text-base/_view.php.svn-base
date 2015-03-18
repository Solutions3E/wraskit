<?php


?>
<div class="view">

	<b><?php //echo CHtml::encode($data->getAttributeLabel('id')); ?></b>
	<?php //echo CHtml::link(CHtml::encode($data->id), array('view','id'=>$data->id)); ?>
	
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('content')); ?></b>
	<?php echo $data->content; ?>
	<br>

	<b><?php //echo CHtml::encode($data->getAttributelabel('userid')); ?></b>
	<?php //echo CHtml::encode($data->userId); ?>
	User : 
	<?php
		$user = Profile::model()->findByPk($data->userId);
		echo $user->firstname;
	?>
	<br>

	<b><?php echo CHtml::encode($data->getAttributelabel('createDate')); ?></b>
	<?php echo CHtml::encode($data->createDate); ?>
	<br>

	<b><?php //echo CHtml::encode($data->getAttributeLabel('postId')); ?></b>
	<?php //echo CHtml::encode($data->postId); ?>
	<br>

</div>