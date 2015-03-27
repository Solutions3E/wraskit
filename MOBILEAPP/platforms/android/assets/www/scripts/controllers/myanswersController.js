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



		$scope.share = function(wrask){
		    FB.ui(
		    {
		        method: 'feed',
		        name: wrask.firstname,
		        link:$scope.siteurl+'#/answers/'+wrask.id,
		        picture: $scope.siteurl+'img/login_logo.png',
		        caption: wrask.title,
		        description: wrask.content,
		        message: ''
		    });
		  }
});
