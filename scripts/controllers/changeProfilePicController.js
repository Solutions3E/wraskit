'use strict';
myCustom.controller('changeProfilePicController', function changeProfilePicController($scope, $http, $window, $navigate, $routeParams) {

	$scope.check_login();
	var user_id = $scope.userId;
	var image_upload_url = $scope.image_upload_url;
	$scope.base = $scope.baseurl;
	$scope.userId = localStorage.getItem("userId");
	$scope.current_uesr_id = $scope.userId;
});
