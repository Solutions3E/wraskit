'use strict';
myCustom.controller('infoController', function infoController($scope, $http, $window, $navigate) {

	$scope.check_login();
	
	  	//user ratings
		$http({
				url: $scope.baseurl+"topUsersoftheMonth/"+$scope.userId,
				method : 'GET',
				params : {}
			}).success(function(data) {
				$scope.users = data;
				
			}).error(function(data) {
	        	alert("error");                
	    });

		$http({
				url: $scope.baseurl+"getBlog/"+$scope.userId,
				method : 'GET',
				params : {}
			}).success(function(data) {
				$scope.blogs = data;
				
			}).error(function(data) {
	        	alert("error");                
	    });
});
myCustom.filter('unsafe', function($sce) {

    return function(val) {

        return $sce.trustAsHtml(val);

    };

});

