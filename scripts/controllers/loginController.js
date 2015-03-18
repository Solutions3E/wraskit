'use strict';
myCustom.controller('loginController', function loginController($scope, $http, $window, $navigate) {

	$scope.check_login();
	$scope.loading=true;
	if($scope.userId) {
		$navigate.go('/home');
	}
	$scope.submitForm = function(isValid) {
		
		if(isValid) {
			var user = $scope.username;
			var pass = $scope.password;

	        $http({
		    url: $scope.baseurl+"userLogin/1", 
	    	method: "GET",
	    	params: {username: user, password: pass}
	 		})	.success(function(data){
				//alert(JSON.stringify(data));
				$scope.username =data.username;
				$scope.userId 	=data.id;
				localStorage.setItem("userId", data.id);
				alert("Welcome "+$scope.username);
				$navigate.go("/home");
			})
			.error(function(data) {
		            alert("Invalid username or password");                
		        })
		        .then(function(data) {
			});
		}
		
	}
});
