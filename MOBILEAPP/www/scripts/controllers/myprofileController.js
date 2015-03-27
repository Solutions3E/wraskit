'use strict';
myCustom.controller('myprofileController', function myprofileController($scope, $http, $window, $navigate, $routeParams) {

	$scope.check_login();
	$scope.loading	=true;
	$scope.qid 		= $routeParams.qid;
	var user_id 	= $scope.userId;
	$scope.notify 	= false;

	$scope.go = function (url) {
      $location.path(url);
    }
		
    	$http({
			url: $scope.baseurl+"userNotify/"+$scope.userId,
			method : 'GET',
			params : {}
		}).success(function(data) {
			$scope.loading=false;
				$scope.notifycount = data[0];
			if(data[0] > 0) {
				$scope.notify = true;

			}
		}).error(function(data) {
        	alert("error");  
        	$scope.loading=false;              
    	});

		$http({
			url: $scope.baseurl+"userDetails/"+$scope.userId,
			method : 'GET',
			params : {}
		}).success(function(data) {
			$scope.loading=false;
			$scope.userdetails = data;
		}).error(function(data) {
        	alert("error");                
        	$scope.loading=false;
    	});

    	//user ratings
		$http({
				url: $scope.baseurl+"profileRating/"+$scope.userId,
				method : 'GET',
				params : {}
			}).success(function(data) {
				$scope.rating = data.point;
				if(data.point > 5) {
					$scope.rating = 5;
				}
			}).error(function(data) {
	        	alert("error");                
	    });

		//myquestions count
		$http({
			url: $scope.baseurl+"countuserQuestions/"+$scope.userId,
			method : 'GET',
			params : {}
		}).success(function(data) {
			$scope.countquestions = data;
			if(data == '"0"'){
				$scope.countquestions = 0;
			}
		}).error(function(data) {
        alert("error");                
    	})

    	//myanswers count
		$http({
			url: $scope.baseurl+"countuserAnswers/"+$scope.userId,
			method : 'GET',
			params : {}
		}).success(function(data) {
			$scope.countanswers = data;
			if(data == '"0"'){
				$scope.countanswers = 0;
			}
		}).error(function(data) {
        alert("error");                
    	});

		//notification

		$scope.notifyClick = function () {
			 $scope.loading = true;
			$http({
				url: $scope.baseurl+"notifyClick/"+$scope.userId,
				method : 'GET',
				params : {}
			}).success(function(data) {
				 $scope.loading = false;
				$navigate.go('/home');
			});
			};


    	//connects count
		$http({
			url: $scope.baseurl+"countMyconnects/"+$scope.userId,
			method : 'GET',
			params : {}
		}).success(function(data) {
			$scope.countmyconnects = data;
			if(data == '"0"'){
				$scope.countmyconnects = 0;
			}
		}).error(function(data) {
        alert("error");                
    	})


});
myCustom.filter('unsafe', function($sce) {

    return function(val) {

        return $sce.trustAsHtml(val);

    };

});