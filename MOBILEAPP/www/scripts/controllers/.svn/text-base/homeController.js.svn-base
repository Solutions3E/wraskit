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
