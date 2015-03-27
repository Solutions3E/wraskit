'use strict';
myCustom.controller('searchController', function searchController($scope, $http, $window, $navigate, $routeParams) {

	$scope.check_login();
	var user_id = $scope.userId;

		
	/*$scope.search = function() {*/
		/*alert("sdfpro_pic");
		alert($scope.pro_pic);*/
		$http({
				url: $scope.baseurl+"searchPosts/"+user_id,
				method : 'GET',
				data : {}
			}).success(function(data) {
				//alert(JSON.stringify(data));
				$scope.questions = data;
			}).error(function(data) {
	        	alert("error");                
	    });
	// }
});
