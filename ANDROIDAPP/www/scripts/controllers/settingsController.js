'use strict';
myCustom.controller('settingsController', function settingsController($scope, $http, $window, $navigate) {

	$scope.loading =true;
	$scope.check_login();
	$scope.userId  = localStorage.getItem("userId");
	$scope.logout  = function () {
		localStorage.clear();
			facebookConnectPlugin.getLoginStatus(
	        function(response){
	            if(response.status =="connected"){
	                facebookConnectPlugin.logout();
	            }
	        }); 
	    $navigate.go('/login');
	}
	

	$http({
		url: $scope.baseurl+"privacyPolicy/",
		method : 'GET',
		params : {}
		}).success(function(data) {
			$scope.privacy = data[0].description;
			$scope.loading = false;
	});

	$scope.submitForm = function (isValid) {
		if(isValid) {
			$scope.loading=true;
			var content = $scope.content;
			/*var usermail = $scope.email;*/
			$http({
				url: $scope.baseurl+"feedback/",
				method : 'POST',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				params : {content:content,userid:$scope.userId}
			}).success(function(data) {
				$scope.loading=false;
				alert("Thank you for your feedback!");
				//location.reload('/settings/');
				$scope.feedback = false;
				$scope.content = null;
			});
		}
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
