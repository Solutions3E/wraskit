'use strict';
myCustom.controller('searchController', function searchController($scope, $http, $window, $navigate, $routeParams) {

	$scope.check_login();
	var user_id = $scope.userId;

	$scope.shareTwitter = function(qid,content){
		//alert(qid);
		var link = "http://twitter.com/share?url="+$scope.siteurl+"#/answers/"+qid+"&text="+content;
		window.open(link, '_blank', 'location=yes'); 
	}


	//href="https://plus.google.com/share?url={{siteurl}}answers/{{wrask.qid}}&text={{wrask.content}}"
	$scope.shareGoogle = function(qid,content){
		//alert(content);
		//alert(qid);
		var link1 = "http://plus.google.com/share?url="+$scope.siteurl+"#/answers/"+qid+"&text="+content;
		window.open(link1, '_blank', 'location=yes'); 
	}
		
	/*$scope.search = function() {*/
		/*alert("sdfpro_pic");
		alert($scope.pro_pic);*/
		$http({
				url: $scope.baseurl+"searchPosts/"+user_id,
				method : 'GET',
				data : {}
			}).success(function(data) {
				//alert(JSON.stringify(data));
				$scope.questions = data;
			}).error(function(data) {
	        	alert("error");                
	    });
	// }
});
