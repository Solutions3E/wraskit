'use strict';
myCustom.controller('wraskinterestController', function wraskinterestController($scope, $http, $window, $navigate) {

	$scope.check_login();
	$scope.loading=true;
	$scope.userId =localStorage.getItem("userId");

	$scope.message = "";
	$scope.test = function(){ console.log($scope.message); }

	/*$("#second_cat").hide();
	$("#third_cat").hide();*/


	//wrask interest pop up box
	$(".wrask_it_popup").fadeIn('slow');
	$scope.pop_open = function () {
		$(".wrask_it_popup").fadeIn('slow');
		$(".popup-overlay").fadeIn('slow');
	}
	
	$scope.pop_close = function() {
			$(".wrask_it_popup").fadeOut('slow');
			$(".popup-overlay").fadeOut('slow');
	}




	$scope.$on('$viewContentLoaded', function(){
		var interval = setInterval(function(){
		  if (document.readyState == "complete") {
		      window.scrollTo(0, 0);
		      clearInterval(interval);
		  }
		},200);

	});

	$http({
		url: $scope.baseurl+"homepageWrasks/"+$scope.userId,
		method : 'GET',
		params : {}
	}).success(function(data) {
		//var parsed = JSON.stringify(data);

		$scope.wrasks = data;
		//alert(data.length);
		
		});

	$http({
		url: $scope.baseurl+"getcategories/",
		method : 'GET',
		params : {}
		}).success(function(data) {
			$scope.loading = false;
			$scope.categories = data;
			$scope.choosecategory = "choose category";
			//$scope.loading = false;
		});
	
	$scope.$watch('category.parent_id.length', function(length) {        
        var valid = length <= 5;
        $scope.wraskinterestForm.wrask.$setValidity("max2", valid);
    });

	$scope.submitForm = function (isValid) {
		if(isValid){
			$scope.loading=true;
			var category_id = $scope.category.parent_id;
			$http({
				url : $scope.baseurl+"wraskInterest",
				method : 'POST',
				data : {userId:$scope.userId,catId:category_id}
			}).success(function(data){
				$scope.loading = false;
				alert("wrask interest saved!");
				$navigate.go("/home");
			});
			

		}
	}
	//var pId = 1;
	
	/*$scope.getSubcategories = function (pid) {
		$("#second_cat").show();
		$("#third_cat").hide();
		$scope.selected_cat = pid;
	if(pid==null) {
		$scope.catval = "true";
	}
	
		$http({
			url: $scope.baseurl+"getSubcategories/"+pid,
			method : 'GET',
			params : {}
			}).success(function(data) {
				//var parsed = JSON.stringify(data);
				//alert(data);
				$scope.subcategories = data;
				$scope.choosecategory = "choose category";
				if(data.length == 0)
				{
					$("#second_cat").hide();
					$("#third_cat").hide();
				}
			});

	} // close function


	$scope.getchildcategories = function (cid) {
		$("#third_cat").show();
		$scope.selected_cat = cid;
		$http({
			url: $scope.baseurl+"getSubcategories/"+cid,
			method : 'GET',
			params : {}
			}).success(function(data) {
				$scope.childcategories = data;
				$scope.choosecategory = "choose category";
				if(data.length == 0)
				{
					$("#third_cat").hide();
				}
			});

	}*/ // close function

});
