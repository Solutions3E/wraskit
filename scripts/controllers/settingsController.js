'use strict';
myCustom.controller('settingsController', function settingsController($scope, $http, $window, $navigate) {

	$scope.loading=true;
	$scope.logout = function () {
		localStorage.clear();
	    $navigate.go('/login');
	}

	/*$scope.submitForm = function(isValid) {
		
		if(isValid) {
			var email = $scope.email;
	        $http({
		    url: $scope.baseurl+"forgotPassword/1", 
	    	method: "GET",
	    	params: {email: email}
	 		})	.success(function(data){

				alert("hhhh");
				//$navigate.go("/home");
			})
			.error(function(data) {
		            alert("Invalid");                
		        })
		        .then(function(data) {
			});
		}
	}*/
});
