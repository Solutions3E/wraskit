'use strict';
myCustom.controller('homeController', function homeController($scope, $http, $window, $navigate) {

	//$scope.check_login();
	$scope.loading=true;
	
	$scope.userId = localStorage.getItem("userId");
	if($scope.userId == "") {
		$scope.userId = 0;
	}

  $scope.share = function(wrask){
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
  }

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

  	/*$scope.shareTwitter = function(){
  		alert("hiii");
  		OAuth.initialize('vnT6WnPQQUgQv18oQLiUhHG5hv8');
            OAuth.popup('twitter', {
                cache: true
            })
            .done(function(result) {
              
                alert(JSON.stringify(data));
                var twitterPost = result.post('/1.1/statuses/update.json?status='+obj.title);
              twitterPost.done(function (response) {
                  //this will display the id of the message in the console
                  alert('Success','Successfully posted to twitter.');
              });
              twitterPost.fail(function (err) {
                  //handle error with err
                  alert(JSON.stringify(err));
              });
            })
            .fail(function (err) {
              alert('Error','Failed to initialize twitter.');
            }); 
    }*/


    /*$scope.shareGoogleplus = function(){
    	alert("google");
    OAuth.initialize('vnT6WnPQQUgQv18oQLiUhHG5hv8');
		OAuth.popup('google', {
			cache: true
        })	
			.done(function(result) {
		    alert(JSON.stringify(result));
		    //console.log(result);
		})
		.fail(function (err) {
              alert('Error','Failed to initialize twitter.');
        }); 
	}*/





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
