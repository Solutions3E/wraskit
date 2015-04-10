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

		$scope.shareFacebook = function(qid,content){
		OAuth.initialize('EwXYkiRYxmjt3M8zpiqJEmHsuzM');
        OAuth.popup('facebook', {
            cache: true
        })
        .done(function(result) {
            data = {message:$scope.question.textcontent};
            data.name = "WRASK IT";
            result.post('/me/feed', {
                data: data
            })
            .done(function (response) {
                //this will display the id of the message in the console
                alert('Successfully posted to facebook.');
                $scope.$apply();
            })
            .fail(function (err) {
                //handle error with err
                alert('Failed to post to facebook. Please try again later.');
                $scope.$apply();
            });
        })
        .fail(function (err) {
          alert('Failed to initialize facebook.');
        }); 
	}
	//href="https://plus.google.com/share?url={{siteurl}}answers/{{wrask.qid}}&text={{wrask.content}}"
	
  	$scope.shareTwitter = function(qid,data){
  		OAuth.initialize('EwXYkiRYxmjt3M8zpiqJEmHsuzM');
            OAuth.popup('twitter', {
                cache: true
            })
            .done(function(result) {
              
              var twitterPost = result.post('/1.1/statuses/update.json?status='+$scope.question.textcontent);
              twitterPost.done(function (response) {
                  //this will display the id of the message in the console
                  alert('Successfully posted to twitter.');
                  $scope.$apply();
              });
              twitterPost.fail(function (err) {
                  //handle error with err
                  alert("Failed to post to twitter. Duplicate content.");
                  $scope.$apply();
              });
            })
            .fail(function (err) {
              alert('Failed to initialize twitter.');
            }); 
    }


    $scope.shareGoogleplus = function(qid,datas){
    	
    	window.plugins.socialsharing.shareVia('com.google.android.apps.plus', $scope.question.textcontent, null, null, null, 
    		function(){console.log('share ok')}, function(msg) {alert('error: ' + msg)});
	}
});
