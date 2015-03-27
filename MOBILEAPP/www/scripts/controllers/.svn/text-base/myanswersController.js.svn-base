'use strict';
myCustom.controller('myanswersController', function myanswersController($scope, $http, $window, $navigate, $routeParams) {

	$scope.check_login();
	$scope.loading=true;
	$scope.qid = $routeParams.qid;
	$scope.pid = $routeParams.uid;
	
	
	$http({
			url: $scope.baseurl+"userProfile/"+$scope.pid,
			method : 'GET',
			params : {}
		}).success(function(data) {
			$scope.userprofile = data;
		}).error(function(data) {
        alert("error");                
    	});

	//my answers
		$http({
			url: $scope.baseurl+"userAnswers/"+$scope.pid,
			method : 'GET',
			params : {}
		}).success(function(data) {
			$scope.answers = data;
		}).error(function(data) {
        alert("error");                
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
