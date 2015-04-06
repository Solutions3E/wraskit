'use strict';
myCustom.controller('wraskitController', function wraskitController($scope, $http, $window, $navigate) {

	$scope.check_login();
	$scope.loading=true;
	$scope.device_id = localStorage.getItem("wraskit_device_id");

	$scope.privacies = [
    	/*{name:'public',value:'0'},*/
    	{name:'Ask Community',value:'1'},
    	/*{name:'Ask A Connect, Coming Soon',value:'2'}*/
  	];
  	$scope.show_privacy = null;
  	$scope.direct_wrask = "1";
  	$scope.getPrivacy = function () {
  		//alert($scope.privacy);
  		if($scope.privacy == '2') {
  			//$(".private_wrask").fadeIn('slow');
  			$scope.show_privacy = "1";
  			$scope.direct_wrask = null;

  		} else {
  			$scope.show_privacy = null;
  			$scope.direct_wrask = "1";
  		}
  			
  	}


    //wrask interest pop up box
	$(".wrask_it_popup").fadeIn('slow');
	$scope.pop_open = function () {
		$(".wrask_it_popup").fadeIn('slow');
		$(".popup-overlay").fadeIn('slow');
	};
	
	$scope.pop_close = function() {
			$(".wrask_it_popup").fadeOut('slow');
			$(".popup-overlay").fadeOut('slow');
			//$navigate.go("/home");
	};

	//get connected users
	$http({
		url	   :$scope.baseurl+"connectedUsers/"+$scope.userId,
		method :'GET',
		params :{}
	}).success (function(data) {
		$scope.connectedUsers = data;
	}).error(function(data) {
	        alert("error, try again!");
	});
	//close connected users lists

    $scope.selectedOption = "0";

    $http({
		url: $scope.baseurl+"getcategories/",
		method : 'GET',
		params : {}
		}).success(function(data) {
			$scope.loading = false;
			$scope.categories = data;
			$scope.choosecategory = "choose category";
		});

	$scope.submitForm = function (isValid) {
		if(isValid){
			$scope.loading = true;
			var category_id = $scope.category.parent_id;
			var privacy 	= $scope.privacy;
			var question 	= $scope.question;
			var direct_user = $scope.direct_user;
			$http({
				url : $scope.baseurl+"submitQuestion",
				method : 'POST',
				data : {userid:$scope.userId,question:question,catId:category_id,privacy:privacy,direct_user:direct_user,device_id:$scope.device_id}
			}).success(function(data){
				//alert(JSON.stringify(data));
				$scope.loading = false;
				alert("You wrask has been saved!");
				$navigate.go("/home");
			}).error(function(data) {
				$scope.loading = false;
	         	alert("Oops, Something went wrong!");
			});
		}
	}

});    


