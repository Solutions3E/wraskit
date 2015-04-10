'use strict';
myCustom.controller('connectsController', function connectsController($scope, $http, $window, $navigate, $routeParams) {

	$scope.check_login();
	$scope.loading=true;
	var user_id = $scope.userId;
	//$scope.uid = $routeParams.uid;

		/*$http({
				url: $scope.baseurl+"connectedUsers/"+uid,
				method : 'GET',
				params : {}
			}).success(function(data) {
				//alert(JSON.stringify(data));
				$scope.connects = data;
			}).error(function(data) {
	        alert("error");                
	    });*/

	
	$scope.connectUsers = function() {
		$http({
				url: $scope.baseurl+"connectInUsers/"+user_id,
				method : 'GET',
				params : {}
			}).success(function(data) {
				//alert(JSON.stringify(data));
				$scope.users = data;
			}).error(function(data) {
	        alert("error");                
	    });
	}


	$scope.connectUser = function(cid) {
		$http({
			url: 	$scope.baseurl+"connectUser/"+user_id,
			method: 'GET',
			params: {connect_id:cid}
		}).success(function(data) {
			$("#connect_"+cid).fadeOut(1500);
		}).error(function(data) {
			alert('Something went wrong! Please try again');
		});
	}
	$scope.disconnectUser = function(cid) {
		$http({
			url: 	$scope.baseurl+"disconnectUser/"+user_id,
			method: 'GET',
			params: {connect_id:cid}
		}).success(function(data) {
			$("#connect_"+cid).fadeOut(1500);
		}).error(function(data) {
			alert('Something went wrong! Please try again');
		});
	}

	$scope.connectUsers ();
});
