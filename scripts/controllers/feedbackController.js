'use strict';
myCustom.controller('feedbackController', function feedbackController($scope, $http, $window, $navigate) {

	$scope.check_login();
	$scope.loading=true;
	var user_id = $scope.userId;

	$scope.submitForm = function (isValid) {
		if(isValid) {
			var content = $scope.content;
			var usermail = $scope.email;
			$http({
				url: $scope.baseurl+"feedback/",
				method : 'POST',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				params : {content:content,userid:user_id,usermail:usermail}
			}).success(function(data) {
				alert("Thank you for your valuable feedback!");
				//location.reload('/feedback/');
			});
		}
	}	

});

myCustom.filter('unsafe', function($sce) {

    return function(val) {

        return $sce.trustAsHtml(val);

    };

});

