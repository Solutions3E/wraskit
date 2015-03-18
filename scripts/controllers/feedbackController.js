'use strict';
myCustom.controller('feedbackController', function feedbackController($scope, $http, $window, $navigate) {

	$scope.check_login();

		$http({
				url: $scope.baseurl+"feedback/"+$scope.userId,
				method : 'POST',
				params : {}
			}).success(function(data) {
				alert("success");
			}).error(function(data) {
	        	alert("error");                
	    });
});
myCustom.filter('unsafe', function($sce) {

    return function(val) {

        return $sce.trustAsHtml(val);

    };

});

