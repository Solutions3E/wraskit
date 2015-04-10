myCustom.controller('homeController', function homeController($scope, $http, $window, $navigate) {

	//$scope.check_login();
	$scope.loading=true;
	
	$scope.userId = localStorage.getItem("userId");
	if($scope.userId == "") {
		$scope.userId = 0;
	}

  /*$scope.share = function(wrask){
  	alert(wrask);
    FB.ui(
    {
        method: 'feed',
        name: wrask.firstname,
        //link: 'http://www.hyperarts.com/external-xfbml/'+post.id,
        link:$scope.siteurl+'#/answers/'+wrask.qid,
        picture: $scope.siteurl+'img/login_logo.png',
        caption: wrask.title,
        description: wrask.content,
        message: ''
    });
  }*/

	$scope.shareFacebook = function(wrask){
		OAuth.initialize('EwXYkiRYxmjt3M8zpiqJEmHsuzM');
        OAuth.popup('facebook', {
            cache: true
        })
        .done(function(result) {
            data = {message:wrask.textcontent};
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
	
  	$scope.shareTwitter = function(wrask){
  		OAuth.initialize('EwXYkiRYxmjt3M8zpiqJEmHsuzM');
            OAuth.popup('twitter', {
                cache: true
            })
            .done(function(result) {
              
              var twitterPost = result.post('/1.1/statuses/update.json?status='+wrask.textcontent);
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


    $scope.shareGoogleplus = function(wrask){
    	window.plugins.socialsharing.shareVia('com.google.android.apps.plus', wrask.textcontent, null, null, null, 
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





	$scope.$on('$viewContentLoaded', function(){
		var interval = setInterval(function(){
		  if (document.readyState == "complete") {
		      window.scrollTo(0, 0);
		      clearInterval(interval);
		  }
		},200);

	});
	if($scope.userId !=0) {
		$scope.userId =localStorage.getItem("userId");
	}
	$http({
		url: $scope.baseurl+"homepageWrasks/"+$scope.userId,
		method : 'GET',
		params : {}
		}).success(function(data) {
		$scope.wrasks = data;
		$scope.loading = false;
	});

	//direct wrasks
	$http({
		url: $scope.baseurl+"homedirectwrasks/"+$scope.userId,
		method : 'GET',
		params : {}
	}).success(function(data) {
		
		$scope.directwrasks = data;
		if(data.length > '0'){
			$scope.showDirect    = '1';
		}
		
	});

	/*$http({
		url: $scope.baseurl+"directWrasks/"+$scope.userId,
		method : 'GET',
		params : {}
	}).success(function(data) {
		
		$scope.directwrasks = data;
		if(data.length > '0'){
			$scope.showDirect    = '1';
		}
		
	});*/
	$scope.pop_close = function() {
			$(".wrask_it_popup").fadeOut('slow');
			$(".popup-overlay").fadeOut('slow');
	}
	$scope.isGuest = function() {
		if($scope.userId != "") {
			return false;
		} else {
			return true;
		}
	}

});
