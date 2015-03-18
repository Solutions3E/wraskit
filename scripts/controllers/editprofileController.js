'use strict';
myCustom.controller('editprofileController', function editprofileController($scope, $http, $window, $navigate, $routeParams) {

	$scope.check_login();
	$scope.loading=true;
	var user_id = $scope.userId;
	
	$scope.get_user_details = function() {
		$http({
	        method : 'GET',
	        url: $scope.baseurl+"userDetails/"+$scope.userId,
	        data: {}, 
	    }).success(function(data) {
	        $scope.firstname = data.firstname;
	        $scope.lastname = data.lastname;
	        $scope.email = data.email;
	        $scope.love = data.love;
	        $scope.hate = data.hate;
	        $scope.city = data.city;
	        $scope.state = data.state;
	    })
	    .error(function(data) {
	        alert("error");                
	    })
	    .then(function(data) {
	        //alert("then");
	    });
	}

	$scope.submitForm = function (isValid) {
		if(isValid) {

			$http({
				url: $scope.baseurl+"update_profile/"+$scope.userId,
				method : 'GET',
				params : {fname:$scope.firstname,lname:$scope.lastname,email:$scope.email,love:$scope.love,hate:$scope.hate,city:$scope.city,state:$scope.state}
			}).success(function(data) {
				//alert("Profile updated successfully");
				$navigate.go('/myprofile');
			})
			.error(function(data) {
	            alert("error");                
	        });
		}
	}

	$scope.get_user_details();
	
});
