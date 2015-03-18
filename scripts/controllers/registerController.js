'use strict';
myCustom.controller('registerController', function registerController($scope, $http, $window, $navigate) {

	$scope.loading=true;
	$scope.email_exist = "";
	$scope.user_exist = "";

	$scope.submitForm = function(isValid) {
		
		if($scope.password != $scope.cpassword)
		{
			isValid = false;
			alert("Password and confirm password does not match");
		}
		if(isValid) {
			var firstname= $scope.firstname;
			var lastname = $scope.lastname;
			var email 	 = $scope.email;
			var username = $scope.username;
			var password = $scope.password;
			$scope.email_exist = "";
			$scope.user_exist = "";
	        $http({
			    url: $scope.baseurl+"userRegister/1", 
		    	method: "GET",
		    	params: {firstname:firstname, lastname:lastname, email:email, username: username, password: password}
	 		})	.success(function(data){
				//alert(JSON.stringify(data));
				if(data.email_exist) {
					//alert(data.email_exist);
					$scope.email_exist = data.email_exist;
				} 
				else if(data.user_exist) {
					//alert(data.user_exist);
					$scope.user_exist = data.user_exist;
				} else {
					alert("Registration successful!");
					localStorage.setItem("userId", data.id);
					$navigate.go('/wraskinterest');
				}
				
			})
			.error(function(data) {
		            alert("Something went wrong, please try again!");                
		        })
		        .then(function(data) {
			});
		}
		
	}
});
