'use strict';
myCustom.controller('profileController', function profileController($scope, $http, $window, $navigate, $routeParams) {

	$scope.check_login();
	$scope.loading=true;
	$scope.pid = $routeParams.uid;
	//alert($scope.pid);
	var user_id = $scope.userId;

		
	//profile and user details
	$http({
			url: $scope.baseurl+"userDetails/"+$scope.pid,
			method : 'GET',
			params : {}
		}).success(function(data) {
			//alert(JSON.stringify(data));
			$scope.userdetails = data;
		}).error(function(data) {
        alert("error");                
    });


	//user ratings
	$http({
			url: $scope.baseurl+"profileRating/"+$scope.pid,
			method : 'GET',
			params : {}
		}).success(function(data) {
			$scope.rating = data.point;
			if(data.point > 5) {
				$scope.rating = 5;
			}
		}).error(function(data) {
        	alert("error");                
    });


	//questions count
		/*$http({
			url: $scope.baseurl+"countuserQuestions/"+$scope.pid,
			method : 'GET',
			params : {}
		}).success(function(data) {
			$scope.countquestions = data;
			if(data == '"0"'){
				$scope.countquestions = 0;
			}
		}).error(function(data) {
        alert("error");                
    });*/

	//answers count
	$http({
		url: $scope.baseurl+"countuserAnswers/"+$scope.pid,
		method : 'GET',
		params : {}
	}).success(function(data) {
		$scope.countanswers = data;
		if(data == '"0"'){
				$scope.countanswers = 0;
			}
	}).error(function(data) {
    alert("error");                
	});

	//connects count
		$http({
			url: $scope.baseurl+"countMyconnects/"+$scope.pid,
			method : 'GET',
			params : {}
		}).success(function(data) {
			$scope.countmyconnects = data;
			if(data == '"0"'){
				$scope.countmyconnects = 0;
			}
		}).error(function(data) {
        alert("error");                
    	});


    $scope.connectUser = function(cid) {
		$http({
			url: 	$scope.baseurl+"connectUser/"+user_id,
			method: 'GET',
			params: {connect_id:cid}
		}).success(function(data) {
			alert('connected!');
		}).error(function(data) {
			alert('Something went wrong! Please try again');
		});
	}

		$http({
			url: 	$scope.baseurl+"isUserconnected/"+user_id,
			method: 'GET',
			params: {connect_id:$scope.pid}
		}).success(function(data) {
			if(data.length > '0'){
				$scope.showConnect    = '1';
			}
		}).error(function(data) {
			alert('Something went wrong! Please try again');
		});

});
