'use strict';
myCustom.controller('changePasswordController', function changePasswordController($scope, $http, $window, $navigate, $routeParams) {

	$scope.check_login();
	$scope.loading=true;
	var user_id = $scope.userId;
	
	$scope.submitForm = function (isValid) {
		if(isValid) {
			if($scope.npassword == $scope.cnpassword)
			{
				$http({
			        method : 'GET',
			        url: $scope.baseurl+"change_password/"+$scope.userId,
			        params: {cpassword:$scope.cpassword, npassword:$scope.npassword}, 
			    }).success(function(data) {
			        alert(data.message);
			        if(data.status == "success")
			        {
			        	$navigate.go('/myprofile')
			        }
			    })
			    .error(function(data) {
			        alert("error");                
			    })
			    .then(function(data) {
			        //alert("then");
			    });
			}
			else
			{
				alert("Password mismatch");
			}
		}
	}
	
});
