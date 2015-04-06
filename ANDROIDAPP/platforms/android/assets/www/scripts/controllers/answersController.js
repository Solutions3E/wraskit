myCustom.controller('answersController', function answersController($scope, $http, $window, $navigate, $routeParams) {

	$scope.check_login();
	$scope.loading=true;
	$scope.qid = $routeParams.qid;
	$scope.wrasks = "";
	$scope.imageurl = $scope.siteurl;
	//alert($scope.imageurl);
	//$scope.question = "";
	
	//$scope.userId =localStorage.getItem("userId");
	$http({
		url: $scope.baseurl+"answers/"+$scope.qid,
		method : 'GET',
		params : {}
	}).success(function(data) {
		//alert(JSON.stringify(data));
		$scope.wrasks = data;
		//if($scope.wrasks != ""){
			$scope.wraskquestion();
		//}
	});


	$scope.shareTwitter = function(qid,content){
		//alert(qid);
		var link = "http://twitter.com/share?url="+$scope.siteurl+"#/answers/"+qid+"&text="+content;
		window.open(link, '_blank', 'location=yes'); 
	}


	//href="https://plus.google.com/share?url={{siteurl}}answers/{{wrask.qid}}&text={{wrask.content}}"
	$scope.shareGoogle = function(qid,content){
		//alert(content);
		//alert(qid);
		var link1 = "http://plus.google.com/share?url="+$scope.siteurl+"#/answers/"+qid+"&text="+content;
		window.open(link1, '_blank', 'location=yes'); 
	}
	
	//to get uer of the current question
	$http({
		url: $scope.baseurl+"getUserofQuestion/"+$scope.qid,
		method : 'GET',
		params : {}
	}).success(function(data) {
		$scope.quid = data.user_id;
		$scope.loading=false;
		if($scope.quid == $scope.userId) {
			$scope.hideBasicInfo = '1';
		}
	}).error(function(data) {
	            $scope.loading = false;
	            $scope.friends='{error : Some errors found}';
	});


		//reply to the question
		$scope.replyAnswer = function(reply,answerId){
						$scope.loading=true;
						$http({
							url: $scope.baseurl+"submitReply/"+answerId,
							method : 'GET',
							params : {userId:$scope.userId,content:reply}
						}).success(function(data) {
								$scope.loading=false;
								alert("reply saved");
								//$navigate.go('/answers/'+$scope.qid);
								//location.reload('/answers/'+$scope.qid);
						}).error(function(data) {
		                        $scope.loading = false;
		                        $scope.friends='{error : Some errors found}';
		                    });

		};


		$scope.wraskquestion = function () {
			 $scope.loading = true;
			$http({
				url: $scope.baseurl+"question/"+$scope.qid,
				method : 'GET',
				params : {}
			}).success(function(data) {
				 $scope.loading = false;
				$scope.question = data;
			});
			};
		/*$scope.oldlikes = true;
		$scope.newlikes = false;
		$scope.isProcessing = true;*/
		$scope.likeAnswer = function(wraskid) {

			var answerid = wraskid;
			$http({
				url: $scope.baseurl+"likeAnswer/"+answerid,
				method : 'GET',
				params : {userid:$scope.userId}
			}).success(function(data) {
				//alert(data);
				if(data == 1) {
					//window.location.reload();
					idx = $scope.wrasks.map(function(e){ return parseInt(e.answerid);}).indexOf(parseInt(answerid));
					$scope.wrasks[idx].likes = parseInt($scope.wrasks[idx].likes) + 1;
				}
				//window.location = self.location;
				//location.reload( true );
			}).error(function(data) {
                $scope.loading = false;
	            });
			};

		$scope.dislikeAnswer = function(wraskid) {

			var answerid = wraskid;
			$http({
				url: $scope.baseurl+"dislikeAnswer/"+answerid,
				method : 'GET',
				params : {userid:$scope.userId}
			}).success(function(data) {
				if(data == 1) {
					idx = $scope.wrasks.map(function(e){ return parseInt(e.answerid);}).indexOf(parseInt(answerid));
					$scope.wrasks[idx].dislikes = parseInt($scope.wrasks[idx].dislikes) + 1;
				}
				//$navigate.go('/answers/'+$scope.qid);
			}).error(function(data) {
	            alert('error : Some errors found');
	            });
			};

	$scope.share = function(wrask){
	    FB.ui(
	    {
	        method: 'feed',
	        name: wrask.firstname,
	        //link: 'http://www.hyperarts.com/external-xfbml/'+post.id,
	        link:$scope.siteurl+'#/answers/'+$scope.qid,
	        picture: $scope.siteurl+'img/login_logo.png',
	        caption: wrask.title,
	        description: wrask.content,
	        message: ''
	    });
  	}
});
