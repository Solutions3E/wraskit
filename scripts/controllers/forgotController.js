'use strict';
myCustom.controller('forgotController', function forgotController($scope, $http, $window, $navigate) {

	$scope.loading=true;
	$scope.submitForm = function(isValid) {
		
		if(isValid) {
			var email = $scope.email;
	        $http({
		    url: $scope.baseurl+"forgotPassword/1", 
	    	method: "GET",
	    	params: {email: email}
	 		})	.success(function(data){
				/*$scope.results = data;
				if($scope.results.email == email) {*/
					alert("Please chek your email");
					$navigate.go("/login");
				//}
			})
			.error(function(data) {
		            alert("Invalid Email");                
		        })
		        .then(function(data) {
			});
		}
		
	}
});
