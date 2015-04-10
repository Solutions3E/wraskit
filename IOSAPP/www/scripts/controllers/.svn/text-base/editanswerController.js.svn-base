'use strict';
myCustom.controller('editanswerController', function editanswerController($scope, $http, $window, $navigate, $routeParams) {

	$scope.check_login();

	$scope.loading=true;
	$scope.aid = $routeParams.aid;
	var user_id = $scope.userId;

	$http({
			url: $scope.baseurl+"answer/"+$scope.aid,
			method : 'GET',
			params : {}
		}).success(function(data) {
			$scope.answer = data;
			$scope.defanswer = $scope.answer.content;
		}).error(function(data) {
        alert("error");                
    	});

	$scope.submitForm = function (isValid) {
		if(isValid) {
			var newanswer = $scope.defanswer;
			$http({
				url: $scope.baseurl+"editAnswer/"+$scope.aid,
				method : 'GET',
				params : {answer:newanswer,userId:user_id,postId:$scope.aid}
			}).success(function(data) {
				alert("Your answer updated!");
				$navigate.go("/answers/"+$scope.qid);
			}).error(function(data) {
	        alert("error");                
	    	});
		}
	}

	
});
