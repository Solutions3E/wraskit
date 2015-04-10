'use strict';
myCustom.controller('submitanswerController', function submitanswerController($scope, $http, $window, $navigate, $routeParams) {

	$scope.check_login();
	$scope.loading 	=true;
	$scope.qid 		= $routeParams.qid;
	var user_id 	= $scope.userId;

	$scope.submitForm = function (isValid) {
		if(isValid) {
			var answer = $scope.answer;
			$http({
				url: $scope.baseurl+"submitAnswer/"+$scope.qid,
				method : 'GET',
				params : {answer:answer,userId:user_id,postId:$scope.qid}
			}).success(function(data) {
				//var parsed = JSON.stringify(data);
				//alert("Successfully posted answer!");
				$navigate.go("/answers/"+$scope.qid);
			});
		}
	}

});
