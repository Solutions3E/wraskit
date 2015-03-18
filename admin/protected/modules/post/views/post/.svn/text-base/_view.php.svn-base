<?php
/* @var $this PostController */
/* @var $data Post */
?>

<div class="view">
<?php 
//echo "hiiiiii";
//die("tttttttt"); 
?>    
	<b><?php //echo CHtml::encode($data->getAttributeLabel('id')); ?></b>
	<?php //echo CHtml::link(CHtml::encode($data->id), array('view', 'id'=>$data->id)); ?>

	<b><?php //echo CHtml::encode($data->getAttributeLabel('title')); ?></b>
	<?php //echo CHtml::encode($data->title); ?>
	<!-- <br /> -->

	<b><?php //echo CHtml::encode($data->getAttributeLabel('content')); ?></b>
	<h1> <?php echo CHtml::encode($data->content); ?> </h1>

	<?php	
		$posts = Post::model()->with('comments')->findByPk($data->id); 
		$anscount = count($posts->comments);
	?>
	<h4>Answers (<?php echo $anscount; ?>)</h4>
	<?php	//foreach ($posts as $p) { // post object
		$comm=	$posts->comments;

		$i = 1;
		
		foreach($comm as $c){
			echo "Answer ".$i."&nbsp&nbsp";;
			echo CHtml::link(CHtml::encode($c->content), array('comments/view','id'=>$c->id));
			if($c->id!= "")	echo "<br><br>";
			$i++;
		}
	?>


	<div class="user_a">
	<b>Asked by : </b>
	<?php 
		$user = Profile::model()->findByPk($data->user_id);
		echo @$user->firstname;
	?> On <?php echo $data->createDate; ?>
	</div>

	<b><?php echo CHtml::encode($data->getAttributeLabel('category')); ?>: </b>
	<?php
		$profile = Category::model()->findByPk($data->category_id);
		echo $profile->category_name;
	?>
	<br /><br>

</div>