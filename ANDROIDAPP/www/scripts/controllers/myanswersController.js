'use strict';
myCustom.controller('myanswersController', function myanswersController($scope, $http, $window, $navigate, $routeParams) {

	$scope.check_login();
	var user_id = $scope.userId;
	
	$scope.loading=true;
	$scope.qid = $routeParams.qid;
	$scope.pid = $routeParams.uid;

	$scope.myanswer = false;
	if( $scope.pid == user_id) {
		$scope.myanswer = true;
	}
	
	$http({
			url: $scope.baseurl+"userProfile/"+$scope.pid,
			method : 'GET',
			params : {}
		}).success(function(data) {
			$scope.userprofile = data;
			$scope.loading=false;
		}).error(function(data) {
	        alert("error"); 
	        $scope.loading=false;               
    	});

	//my answers
		$http({
			url: $scope.baseurl+"userAnswers/"+$scope.pid,
			method : 'GET',
			params : {}
		}).success(function(data) {
			$scope.answers = data;
			$scope.loading=false;
		}).error(function(data) {
	        alert("error");         
	        $scope.loading=false;       
    	});

    //my questions
		$http({
			url: $scope.baseurl+"userQuestions/"+$scope.pid,
			method : 'GET',
			params : {}
		}).success(function(data) {
			$scope.questions = data;
		}).error(function(data) {
        alert("error");
    });

	$scope.shareFacebook = function(question){
		OAuth.initialize('EwXYkiRYxmjt3M8zpiqJEmHsuzM');
        OAuth.popup('facebook', {
            cache: true
        })
        .done(function(result) {
            data = {message:question.content};
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
	
  	$scope.shareTwitter = function(question){
  		OAuth.initialize('EwXYkiRYxmjt3M8zpiqJEmHsuzM');
            OAuth.popup('twitter', {
                cache: true
            })
            .done(function(result) {
              
              var twitterPost = result.post('/1.1/statuses/update.json?status='+question.content);
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


    $scope.shareGoogleplus = function(question){
    	window.plugins.socialsharing.shareVia('com.google.android.apps.plus', question.content, null, null, null, 
    		function(){console.log('share ok')}, function(msg) {alert('error: ' + msg)});
    /*OAuth.initialize('EwXYkiRYxmjt3M8zpiqJEmHsuzM');
		OAuth.popup('google_plus', {
			cache: false
        })	
			.done(function(result) {
		      var gpost = result.post('/plusDomains/v1/people/me/activities',{
                object:{originalContent: data}
            });
	          gpost.done(function (response) {
	              //this will display the id of the message in the console
	              alert('Successfully posted to google plus.');
	          });
	          gpost.fail(function (err) {
	              //handle error with err
	              alert("Failed to post to google plus. Please try again later."+JSON.stringify(err));
	          });
		})
		.fail(function (err) {
              alert('Failed to initialize google plus.');
        }); */
	}
});
