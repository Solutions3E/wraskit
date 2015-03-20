'use strict';
myCustom.controller('loginController', function loginController($scope, $http, $window, $navigate) {

	$scope.check_login();
	
	if($scope.userId) {
		$navigate.go('/home');
	}
	$scope.submitForm = function(isValid) {
		$scope.loading=true;
		if(isValid) {
			var user = $scope.username;
			var pass = $scope.password;

	        $http({
		    url: $scope.baseurl+"userLogin/1", 
	    	method: "GET",
	    	params: {username: user, password: pass}
	 		})	.success(function(data){
				$scope.loading  =false;
				$scope.username =data.username;
				$scope.userId 	=data.id;
				localStorage.setItem("userId", data.id);
				alert("Welcome "+$scope.username);
				$navigate.go("/home");
			})
			.error(function(data) {
		            alert("Invalid username or password"); 
		            $scope.loading  =false;               
		        })
		        .then(function(data) {
			});
		}
		
	}
});
